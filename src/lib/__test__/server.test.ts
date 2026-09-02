import { describe, expect, it, jest } from "@jest/globals";
import { EventEmitter } from "events";
import type { EufySecurity } from "eufy-security-client";
import type { ILogObj, Logger } from "tslog";
import type { WebSocket } from "ws";

import { ErrorCode } from "../error.js";
import { Client, type ClientsController } from "../server.js";

class SocketMock extends EventEmitter {
  public readonly OPEN = 1;
  public readyState = this.OPEN;
  public send = jest.fn();
  public close = jest.fn();
  public ping = jest.fn();
}

const createClient = () => {
  const socket = new SocketMock();
  const logger = {
    debug: jest.fn(),
    error: jest.fn(),
  } as unknown as Logger<ILogObj>;
  const client = new Client(
    socket as unknown as WebSocket,
    {} as EufySecurity,
    logger,
    {} as ClientsController,
  );

  return { client, logger, socket };
};

describe("Client.receiveMessage", () => {
  it("returns unknown_command when a message has no command", async () => {
    const { client, socket } = createClient();

    await client.receiveMessage(
      Buffer.from(JSON.stringify({ messageId: "missing-command" })),
    );

    expect(socket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: "result",
        success: false,
        messageId: "missing-command",
        errorCode: ErrorCode.unknownCommand,
      }),
    );
    expect(socket.close).not.toHaveBeenCalled();
  });

  it("closes invalid envelopes with a protocol error", async () => {
    const { client, socket } = createClient();

    await client.receiveMessage(
      Buffer.from(JSON.stringify({ command: "driver.connect" })),
    );

    expect(socket.close).toHaveBeenCalledWith(1002, "Invalid message");
    expect(socket.send).not.toHaveBeenCalled();
  });

  it("does not include malformed payload contents in logs", async () => {
    const { client, logger, socket } = createClient();

    await client.receiveMessage(
      Buffer.from('{"password":"must-not-be-logged"'),
    );

    expect(socket.close).toHaveBeenCalledWith(1002, "Invalid JSON");
    expect(logger.debug).toHaveBeenCalledWith(
      "Unable to parse WebSocket message",
      expect.objectContaining({ payloadLength: expect.any(Number) }),
    );
    expect(
      JSON.stringify((logger.debug as unknown as jest.Mock).mock.calls),
    ).not.toContain("must-not-be-logged");
  });
});

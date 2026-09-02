const { rmSync } = require("node:fs");

rmSync("dist", { recursive: true, force: true });
rmSync("tsconfig.tsbuildinfo", { force: true });

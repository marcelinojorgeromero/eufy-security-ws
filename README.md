# eufy-security-ws

> [!IMPORTANT]
> This fork branch is a temporary Home Assistant compatibility build. It pins the
> reviewed `eufy-security-client` Mega/v6 fixes by commit for reproducible builds.
> It remains dependent on legacy inventory APIs and is not affiliated with Eufy.
>
> Compatibility releases and support are published from this fork. Report
> regressions in the [fork issue tracker](https://github.com/marcelinojorgeromero/eufy-security-ws/issues)
> after removing credentials, tokens, serial numbers, and private addresses.

> [!CAUTION]
> # 🚨🚨🚨 LIBRARY DEPRECATION NOTICE 🚨🚨🚨
>
> ### ⚠️ Eufy is shutting down the legacy APIs this library is built on. ⚠️
>
> Eufy is in the middle of a large migration of their ecosystem. The newer **Eufy Mega**
> platform (the "5-in-1" app, covering Security / Clean / Lights / Care) is gradually
> becoming the only supported backend, and Eufy has **already started removing access to
> the legacy APIs** this library was originally built on. Until recently both worked in
> parallel — that is no longer guaranteed.
>
> **🔔 What this means for you:**
>
> - 🟢 A recent PR restores **push notifications** against the new v6 ("eufy_mega")
>   backend, so push works again **for now**. This is a short-term stopgap.
> - 🟡 Other functionality that still depends on legacy endpoints may stop working
>   **without warning** as Eufy continues the rollout. The current Eufy app no longer
>   uses the legacy API at all.
> - 🔴 Once the legacy API is fully shut down, **this library will stop functioning** —
>   no amount of patching here will change that.
>
> **🚧 What's next:**
>
> A new integration built around **Eufy Mega** is in active development (auto-discovery,
> less battery drain for P2P), designed from the ground up rather than bolted onto the
> Security-only structure, and coordinated across the Home Assistant, Homebridge and
> Homey communities so the new library works for everyone.
>
> ### 👉 Treat this release as a **temporary stopgap.** 👈
>
> *This notice will be updated as the migration progresses.*

![Logo](docs/_media/eufy-security-ws.png)

[![node](https://img.shields.io/node/v/eufy-security-ws.svg)](https://www.npmjs.com/package/eufy-security-ws)
[![NPM version](http://img.shields.io/npm/v/eufy-security-ws.svg)](https://www.npmjs.com/package/eufy-security-ws)
[![Downloads](https://img.shields.io/npm/dm/eufy-security-ws.svg)](https://www.npmjs.com/package/eufy-security-ws)
[![Total Downloads](https://img.shields.io/npm/dt/eufy-security-ws.svg)](https://www.npmjs.com/package/eufy-security-ws)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/eufy-security-ws)](https://libraries.io/npm/eufy-security-ws)
[![Known Vulnerabilities](https://snyk.io/test/github/marcelinojorgeromero/eufy-security-ws/badge.svg)](https://snyk.io/test/github/marcelinojorgeromero/eufy-security-ws)

[![NPM](https://nodei.co/npm/eufy-security-ws.png?downloads=true)](https://nodei.co/npm/eufy-security-ws/)

Small server wrapper around [eufy-security-client](https://www.npmjs.com/package/eufy-security-client) library to access it via a WebSocket.

Join us on Discord:

<a target="_blank" href="https://discord.gg/5wjQ2asb64"><img src="https://dcbadge.limes.pink/api/server/5wjQ2asb64" alt="" /></a>

The development of this server was inspired by the following project:

* [zwave-js-server](https://github.com/zwave-js/zwave-js-server)

Credits go to them as well.

If you appreciate my work and progress and want to support me, you can do it here:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/E1E332Q6Z)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.me/pbroetto)

**This project is not affiliated with Anker and Eufy (Eufy Security). It is a personal project that is maintained in spare time.**

## Get started

The upstream API documentation remains available [here](https://bropat.github.io/eufy-security-ws/). The supported Home Assistant image is published by the [compatibility add-on repository](https://github.com/marcelinojorgeromero/hassio-eufy-security-ws).

## Deployment

Instructions aimed at maintainers for deploying a new version: [Deployment](docs/deployment.md)

### `RSA_PKCS1_PADDING` / CVE-2023-46809

The Eufy cloud handshake requires `RSA_PKCS1_PADDING`, which Node.js restricted as part of the
Marvin attack fix (CVE-2023-46809). Earlier versions worked around this by launching Node with
`--security-revert=CVE-2023-46809`, but that flag is no longer recognized on Node 24+ and causes
Node to abort on startup (`Error: Attempt to revert an unknown CVE`).

This is now handled by `eufy-security-client`'s embedded (pure-JS) PKCS#1 implementation, which is
enabled by default (`enableEmbeddedPKCS1Support: true`). No Node flag is required and you no longer
need to set anything. To opt out, set `"enableEmbeddedPKCS1Support": false` in your config file.


## Changelog

### 1.9.9 (2026-02-14)

* Upgrade to eufy-security-client 3.7.0
* Feature: Add search by date for events @temp-droid in https://github.com/bropat/eufy-security-ws/pull/502
* Fix: Fixed websocket handle by @temp-droid in https://github.com/bropat/eufy-security-ws/pull/499

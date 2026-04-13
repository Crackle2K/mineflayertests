# mineflayer-multi-account

A Node.js project that uses [Mineflayer](https://github.com/PrismarineJS/mineflayer) to connect multiple Microsoft-authenticated Minecraft accounts to a server simultaneously. Each bot authenticates via Microsoft's device code flow and caches its token locally so subsequent runs do not require re-authentication.

---

## Requirements

- Node.js 18 or later
- npm 9 or later
- One or more valid Microsoft accounts that own Minecraft: Java Edition
- Network access to both Microsoft authentication endpoints and your target Minecraft server

---

## Installation

```
git clone https://github.com/Crackle2K/mineflayer-multi-account.git
cd mineflayer-multi-account
npm install
```

---

## Configuration

Edit `config.json` in the project root before running.

```json
{
  "server": {
    "host": "play.example.com",
    "port": 25565,
    "version": "1.20.4"
  },
  "accounts": [
    {
      "id": "account1",
      "username": "firstaccount@outlook.com"
    },
    {
      "id": "account2",
      "username": "secondaccount@outlook.com"
    }
  ],
  "botOptions": {
    "viewDistance": "tiny",
    "joinDelay": 3000
  }
}
```

### Fields

**server**

| Field     | Type   | Required | Description                                           |
|-----------|--------|----------|-------------------------------------------------------|
| `host`    | string | Yes      | Hostname or IP address of the Minecraft server        |
| `port`    | number | No       | Server port. Defaults to 25565                        |
| `version` | string | No       | Minecraft version string (e.g. `"1.20.4"`). Omit to auto-detect |

**accounts** (array)

Each entry represents one Microsoft account and the bot that will log in with it.

| Field      | Type   | Required | Description                                                         |
|------------|--------|----------|---------------------------------------------------------------------|
| `id`       | string | Yes      | A unique identifier for this account used for logging and token cache folder naming. Can be any string with no spaces. |
| `username` | string | Yes      | The Microsoft account email address associated with the Minecraft account |

**botOptions**

| Field         | Type   | Default  | Description                                                             |
|---------------|--------|----------|-------------------------------------------------------------------------|
| `viewDistance`| string | `"tiny"` | Chunk view distance sent to the server. Lower values reduce bandwidth. Options: `"tiny"`, `"short"`, `"normal"`, `"far"` |
| `joinDelay`   | number | `3000`   | Milliseconds to wait between each bot's connection attempt. Increase this if the server rate-limits logins. |

---

## Authentication

This project uses Microsoft's OAuth 2.0 device code flow, handled internally by `node-minecraft-protocol` (which Mineflayer depends on).

### First run

On the first run for each account, the console will print a message similar to:

```
To sign in, use a web browser to open the page https://www.microsoft.com/link
and enter the code XXXXXXXX to authenticate.
```

Open that URL in a browser, enter the displayed code, and sign in with the Microsoft account that corresponds to that bot. The program will continue automatically once authentication completes.

If you are running multiple accounts for the first time, each account will prompt in sequence. Watch the console and complete each device code prompt as it appears.

### Token caching

After the first successful login, the auth token is cached in `.cache/<account-id>/` inside the project directory. On subsequent runs the cached token is reused and no browser interaction is needed, until the token expires (typically after 90 days of inactivity).

The `.cache/` directory is listed in `.gitignore` and will never be committed to source control.

---

## Usage

```
npm start
```

The program will connect each bot to the configured server in sequence, waiting `joinDelay` milliseconds between each connection to avoid triggering server-side rate limits.

Console output is prefixed with the account `id` so you can tell bots apart:

```
[account1] Logged in as PlayerOne on play.example.com:25565
[account2] Logged in as PlayerTwo on play.example.com:25565
[account1] <SomePlayer> hello
```

---

## Project Structure

```
mineflayer-multi-account/
  src/
    index.js           Entry point. Reads config and spawns all bots.
    bot.js             Creates and configures a single Mineflayer bot.
    accountManager.js  Validates account config and manages token cache paths.
  config.json          Server and account configuration (edit this).
  .cache/              Auto-created at runtime. Stores per-account auth tokens.
  .gitignore
  LICENSE
  package.json
  README.md
```

---

## Extending the Bots

Open `src/bot.js` to add behaviour to each bot. The `createBot` function returns the Mineflayer bot object, so you can attach any Mineflayer plugin or event handler there.

Example: make each bot say "hello" after spawning.

```js
bot.once('spawn', () => {
  bot.chat('hello from ' + account.id);
});
```

Refer to the [Mineflayer documentation](https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md) for the full API.

---

## Adding More Accounts

Add additional entries to the `accounts` array in `config.json`. Each entry must have a unique `id`. The `username` field must be the email address of a Microsoft account that owns Minecraft: Java Edition.

```json
{
  "id": "account3",
  "username": "thirdaccount@outlook.com"
}
```

---

## Notes

- Microsoft does not permit multiple simultaneous sessions from the same account. Each entry in `accounts` must be a distinct Microsoft account.
- Some servers have per-IP connection limits. If you are running many bots from the same machine, you may hit those limits regardless of this project's `joinDelay` setting.
- This project does not support offline-mode (cracked) servers. All bots authenticate through Microsoft.
- Tokens are stored in plain JSON files inside `.cache/`. Do not share this directory.

---

## License

MIT. See [LICENSE](LICENSE) for full text.

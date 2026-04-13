const fs = require('fs');
const path = require('path');
const { createBot } = require('./bot');
const { loadAccounts } = require('./accountManager');

const CONFIG_PATH = path.join(__dirname, '..', 'config.json');

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`config.json not found at ${CONFIG_PATH}`);
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

async function main() {
  const config = loadConfig();
  const accounts = loadAccounts(config);
  const { server, botOptions = {} } = config;

  if (!server || !server.host) {
    throw new Error('config.json must contain a "server" object with at least a "host" field.');
  }

  const joinDelay = botOptions.joinDelay ?? 3000;

  console.log(`Starting ${accounts.length} bot(s) targeting ${server.host}:${server.port ?? 25565}`);
  console.log('On first run, each account will prompt you to visit a Microsoft device login URL.');
  console.log('Open each URL in a browser tab and sign in with the corresponding account.\n');

  const bots = [];

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];

    // Stagger joins to avoid hitting the server's connection rate limit.
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, joinDelay));
    }

    console.log(`[${account.id}] Connecting (${account.username})...`);
    const bot = createBot(account, server, botOptions);
    bots.push(bot);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

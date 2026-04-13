const mineflayer = require('mineflayer');
const { getProfilesFolder } = require('./accountManager');

/**
 * Creates and returns a Mineflayer bot for a single Microsoft account.
 *
 * On first run for a given account, node-minecraft-protocol will print a
 * device code URL to the console. Visit the URL in a browser, sign in with
 * the corresponding Microsoft account, and the bot will connect automatically.
 * Subsequent runs reuse the cached token stored in .cache/<accountId>/.
 *
 * @param {object} account        - Account entry from config.json { id, username }
 * @param {object} serverConfig   - Server entry from config.json { host, port, version }
 * @param {object} botOptions     - Extra options merged into createBot (viewDistance, etc.)
 * @returns {import('mineflayer').Bot}
 */
function createBot(account, serverConfig, botOptions) {
  const profilesFolder = getProfilesFolder(account.id);

  const bot = mineflayer.createBot({
    host: serverConfig.host,
    port: serverConfig.port,
    username: account.username,
    auth: 'microsoft',
    profilesFolder,
    version: serverConfig.version,
    viewDistance: botOptions.viewDistance ?? 'tiny',
  });

  bot.on('login', () => {
    console.log(`[${account.id}] Logged in as ${bot.username} on ${serverConfig.host}:${serverConfig.port}`);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    console.log(`[${account.id}] <${username}> ${message}`);
  });

  bot.on('kicked', (reason) => {
    console.error(`[${account.id}] Kicked: ${reason}`);
  });

  bot.on('error', (err) => {
    console.error(`[${account.id}] Error: ${err.message}`);
  });

  bot.on('end', (reason) => {
    console.log(`[${account.id}] Disconnected: ${reason}`);
  });

  return bot;
}

module.exports = { createBot };

const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, '..', '.cache');

/**
 * Ensures the token cache directory exists for a given account ID.
 * Each account gets its own subdirectory so their auth tokens never collide.
 */
function ensureCacheDir(accountId) {
  const dir = path.join(CACHE_DIR, accountId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

/**
 * Returns the profiles folder path for a given account.
 * Mineflayer (via node-minecraft-protocol) stores Microsoft auth tokens here.
 */
function getProfilesFolder(accountId) {
  return ensureCacheDir(accountId);
}

/**
 * Loads and validates the accounts config.
 * Throws if any account is missing required fields.
 */
function loadAccounts(config) {
  const { accounts } = config;

  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error('config.json must contain a non-empty "accounts" array.');
  }

  const seen = new Set();
  for (const account of accounts) {
    if (!account.id || typeof account.id !== 'string') {
      throw new Error(`Each account must have a unique string "id". Got: ${JSON.stringify(account)}`);
    }
    if (!account.username || typeof account.username !== 'string') {
      throw new Error(`Account "${account.id}" is missing a "username" (Microsoft email).`);
    }
    if (seen.has(account.id)) {
      throw new Error(`Duplicate account id "${account.id}" found in config.json.`);
    }
    seen.add(account.id);
  }

  return accounts;
}

module.exports = { getProfilesFolder, loadAccounts };

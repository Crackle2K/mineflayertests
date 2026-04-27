import Filter from 'bad-words'

const filter = new Filter()

/**
 * Checks if a name contains profanity or inappropriate content
 * @param {string} name - The player name to check
 * @returns {object} - { isValid: boolean, message: string }
 */
export function validatePlayerName(name) {
  const trimmed = name.trim()

  // Check if empty
  if (!trimmed.length) {
    return { isValid: false, message: 'Name is required' }
  }

  // Check length
  if (trimmed.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' }
  }

  if (trimmed.length > 30) {
    return { isValid: false, message: 'Name must be 30 characters or less' }
  }

  // Check for profanity
  if (filter.isProfane(trimmed)) {
    return {
      isValid: false,
      message: 'Please use an appropriate name for the leaderboard'
    }
  }

  return { isValid: true, message: '' }
}

/**
 * Sanitizes a player name by removing profanity
 * @param {string} name - The player name to sanitize
 * @returns {string} - The sanitized name
 */
export function sanitizePlayerName(name) {
  return filter.clean(name.trim())
}

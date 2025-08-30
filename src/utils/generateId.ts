/**
 * Utility functions for generating unique IDs for static data
 */

/**
 * Generates a unique ID using crypto.randomUUID() if available,
 * otherwise falls back to a timestamp-based approach
 */
export function generateUniqueId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for environments without crypto.randomUUID
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generates a shorter, more readable unique ID for use in data structures
 * Format: prefix-timestamp-random
 */
export function generateShortId(prefix: string = "item"): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generates a sequential ID with a prefix
 * Note: This is not truly unique across sessions, but useful for static data
 */
let counter = 0;
export function generateSequentialId(prefix: string = "item"): string {
  counter++;
  return `${prefix}-${counter}`;
}

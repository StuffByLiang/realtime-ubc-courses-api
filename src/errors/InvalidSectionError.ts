/**
 * @example
 * throw new invalidSectionError(message)
 * throw new invalidSectionError()
 */
export class InvalidSectionError extends Error {
  
    /**
     * @param {string} message ="Section Not Found"
     */
    constructor(message = "Section Not Found") {
      super(message);
    }
  }
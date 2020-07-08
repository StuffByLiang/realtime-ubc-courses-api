/**
 * @example
 * throw new invalidSectionError(message)
 * throw new invalidSectionError()
 */
class invalidSectionError extends Error {
  
    /**
     * @param {string} message ="Section Not Found"
     */
    constructor(message = "Section Not Found") {
      super(message);
    }
  }
  export default invalidSectionError; 
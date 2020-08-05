/**
 * @example
 * throw new InvalidSubjectError(message)
 * throw new InvalidSubjectError()
 */
export class InvalidSubjectError extends Error {
  /**
   * @param {string} message ="Subject Not Found"
   */
  constructor(message = "Subject Not Found") {
    super(message);
  }
}
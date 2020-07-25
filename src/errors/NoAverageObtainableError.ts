/**
 * @example
 * throw new InvalidSubjectError(message)
 * throw new InvalidSubjectError()
 */
export class NoAverageObtainableError extends Error {
  /**
   * @param {string} message ="Average incomputable"
   */
  constructor(message = "Average incomputable") {
    super(message);
  }
}
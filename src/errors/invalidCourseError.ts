/**
 * @example
 * throw new InvalidCourseError(message)
 * throw new InvalidCourseError()
 */
export class InvalidCourseError extends Error {
  /**
   * @param {string} message ="Course Not Found"
   */
  constructor(message = "Course Not Found") {
    super(message);
  }
}
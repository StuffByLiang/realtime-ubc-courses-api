/**
 * @example
 * throw new InvalidCourseError(message)
 * throw new InvalidCourseError()
 */
class InvalidCourseError extends Error {
  
  /**
   * @param {string} message ="CourseNotfound"
   */
  constructor(message = "Course Not found") {
    super(message);
  }
}
/**
 * @example
 * throw new InvalidCourseError(message)
 * throw new InvalidCourseError()
 */
class invalidCourseError extends Error {
  
  /**
   * @param {string} message ="Course Not Found"
   */
  constructor(message = "Course Not Found") {
    super(message);
  }
}
export default invalidCourseError; 
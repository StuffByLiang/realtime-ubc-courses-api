/**
 * @example
 * throw new InvalidSubjectError(message)
 * throw new InvalidSubjectError()
 */
class invalidSubjectError extends Error {
  
    /**
     * @param {string} message ="Subject Not Found"
     */
    constructor(message = "Subject Not Found") {
      super(message);
    }
  }
  export default invalidSubjectError;
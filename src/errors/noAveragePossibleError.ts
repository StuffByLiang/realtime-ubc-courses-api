/**
 * @example
 * throw new InvalidSubjectError(message)
 * throw new InvalidSubjectError()
 */
class noAveragePossibleError extends Error {
  
    /**
     * @param {string} message ="Average incomputable"
     */
    constructor(message = "Average incomputable") {
      super(message);
    }
  }
  export default noAveragePossibleError;
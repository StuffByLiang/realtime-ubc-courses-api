declare global {
  namespace jest {
    interface Matchers<R> {
      optional(recieved: any, argument: any): R;
    }
  }
}

const okObject = {
  message: () => "Ok",
  pass: true
};

expect.extend

expect.extend({
  optional(received, argument) {
      if (received === null || expect(received).toEqual(expect.any(argument))) {
          return okObject;
      } else {
          return {
              message: () => `expected ${received} to be ${argument} type or null`,
              pass: false
          };
      }
  }
});

export {};
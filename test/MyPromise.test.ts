import MyPromise from '../src/MyPromise';

describe("MyPromise", () => {
  test("constructor", () => {
    new MyPromise((resolve) => {
      setTimeout(() => resolve(1), 2000);
    }).then(res => {
      expect(res).toBe(1);
      return 2;
    }).then(res => expect(res).toBe(2))
  })
});

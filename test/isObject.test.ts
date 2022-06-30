import isObject from "../src/isObject";

describe('isObject', () => {
  test('{}', () => {
    expect(isObject({})).toBe(true);
  })

  test('null', () => {
    expect(isObject(null)).toBe(false);
  })

  test('() => {}', () => {
    expect(isObject(() => { })).toBe(true);
  })
})

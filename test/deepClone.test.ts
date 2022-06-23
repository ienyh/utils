import deepClone from "../package/deepClone";

describe('isObject', () => {

  const a = { name: "zhangsan" }
  const b = { name: "zhangsan", school: { name: "ncwu" } }
  const c = { name: "zhangsan", say: () => { } }


  test('{}', () => {
    expect(deepClone(a)).toEqual({ name: "zhangsan" });
  })

  test('null', () => {
    expect(deepClone(b)).toEqual(b);
  })

  test('() => {}', () => {
    expect(deepClone(c)).toEqual(c);
  })
})
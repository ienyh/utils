import compose from "../src/compose";

function plus1(x) {
  return x + 1
}

function plus2(x) {
  return x + 2
}

function plus3(x) {
  return x + 3
}

describe("test", () => {
  test("compose", () => {
    expect(compose(plus1, plus2, plus3)(4)).toBe(10)
  })
})

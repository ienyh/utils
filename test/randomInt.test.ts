import randomInt from "../src/randomInt";

describe("randomInt", () => {
  test("setItem", () => {
    const int = randomInt(2, 5)
    expect(int).toBeGreaterThanOrEqual(2);
    expect(int).toBeLessThanOrEqual(5);
  })
})

import LocalStorage from "../package/LocalStorage"

describe("LocalStorage", () => {
  test("setItem", () => {
    expect(LocalStorage.set("name", "utils")).toBe(true);
  })

  test("isExpired", () => {
    expect(LocalStorage.isExpired("gender")).toBe(true);
  })
})
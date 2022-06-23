import filter from "../package/filter";

describe("filter", () => {
  test("filter (array, function)", () => {
    expect(filter([1, 2, 3, 4, 5, 6], v => v > 3)).toEqual([4, 5, 6])
  })

  test("filter (array, array)", () => {
    expect(filter([1, 2, 3, 4, 5, 6], [2, 4, 6])).toEqual([1, 3, 5])
  })

  const person = {
    name: "zhangsan",
    gender: "male",
    age: 18,
    x: undefined,
    y: null,
    z: 0,
  }
  test("filter (obj, function)", () => {
    expect(
      filter(person, p => person[p] !== undefined && person[p] !== null)
    ).toEqual({
      name: "zhangsan",
      gender: "male",
      age: 18,
      z: 0,
    })
  })

  test("filter (obj, array)", () => {
    expect(
      filter(person, [undefined, null, 0])
    ).toEqual({
      name: "zhangsan",
      gender: "male",
      age: 18,
    })
  })
})

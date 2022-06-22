import delay from "../package/delay";

test("delay", () => {
  delay(1000).then(r => expect(r).toBeFalsy());
})
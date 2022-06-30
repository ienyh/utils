import delay from "../src/delay";

test("delay", () => {
  delay(1000).then(r => expect(r).toBeFalsy());
  delay(-1000).then(r => expect(r).toBeFalsy());
})
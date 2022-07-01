import co from '../src/co'
import delay from '../src/delay'

function* gen(int = 0) {
  yield delay(2000);
  const x = yield 1;
  const y = yield Promise.resolve(2);
  const z = yield () => 3;
  return x + y + z + int;
}

describe("co", () => {
  test("co", () => {
    co(gen).then(res => expect(res).toBe(6));
    // co(gen, 10).then(res => expect(res).toBe(16));
  })
})
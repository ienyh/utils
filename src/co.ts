
export default async function co(gen, ...args) {
  if (typeof gen === 'function') gen = gen(...args);
  if (!gen || typeof gen?.next !== 'function') return gen;
  let _value, _done;
  while (!_done) {
    const { value, done } = gen.next(_value);
    _done = done;
    _value = value;
    if (value instanceof Promise) _value = await value;
    if (typeof value === 'function') _value = value();
  }
  return _value;
}

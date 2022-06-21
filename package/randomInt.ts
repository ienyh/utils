
/**
 * 得到一个两数之间的随机整数，包括两个数在内
 * @param min 
 * @param max 
 * @returns randomInt
 */
export default function randomInt(min: number, max: number) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

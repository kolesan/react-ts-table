export function pipe(startingValue, ...functions) {
  return functions.reduce((v, fn) => fn(v), startingValue);
}
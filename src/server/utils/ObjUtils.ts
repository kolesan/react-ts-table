export function property(prop: string) {
  return o => o[prop];
}
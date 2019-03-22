export function includes(val: string) {
  return function(s) {
    return s.toUpperCase().includes(val.toUpperCase());
  }
}

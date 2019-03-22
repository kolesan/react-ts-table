export function includes(val: string) {
  return function(s) {
    return s.toUpperCase().includes(val.toUpperCase());
  }
}

export function stringOrder(descending) {
  return descending ? desc : asc;
}

export function desc(val: string, s: string) {
  return s.localeCompare(val);
}

export function asc(val: string, s: string) {
  return val.localeCompare(s);
}
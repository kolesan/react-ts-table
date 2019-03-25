export function includes(val: string) {
  return function(s) {
    return s.toUpperCase().includes(val.toUpperCase());
  }
}

export function stringComparator(descending) {
  return descending ? stringDesc : stringAsc;
}

export function stringDesc(val: string, s: string) {
  return s.localeCompare(val);
}

export function stringAsc(val: string, s: string) {
  return val.localeCompare(s);
}
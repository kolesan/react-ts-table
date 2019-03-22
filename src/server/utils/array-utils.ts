export function copy<T>(arr: Array<T>): Array<T> {
  return [...arr];
}

export function sorter(val: Function, compare: Function) {
  return function(a, b) {
    return compare(val(a), val(b))
  }
}

export function order(ascending: boolean) {
  return ascending ? asc : desc;
}

function asc(a, b) {
  return a < b;
}
function desc(a, b) {
  return a > b;
}

export function filter(valueProvider: Function, predicate: Function) {
  return function(o) {
    return predicate(valueProvider(o));
  }
}
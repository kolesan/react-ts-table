export function copy<T>(arr: Array<T>): Array<T> {
  return [...arr];
}

export function sorter(valueExtractor: Function, comparator: Function) {
  return function(a, b) {
    return comparator(valueExtractor(a), valueExtractor(b))
  }
}

export function numberComparator(descending: boolean) {
  return descending ? desc : asc;
}

function desc(a, b) {
  return b - a;
}
function asc(a, b) {
  return a - b;
}

export function filter(valueProvider: Function, predicate: Function) {
  return function(o) {
    return predicate(valueProvider(o));
  }
}
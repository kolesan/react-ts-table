export function pipe(startingValue, ...functions) {
  return functions.reduce((v, fn) => fn(v), startingValue);
}

export function curry(fn, ...curried) {
  return function(...args) {
    return fn(...args, ...curried);
  }
}

export function curryLeft(fn, ...curried) {
  return function(...args) {
    return fn(...curried, ...args);
  }
}

export function tap(fn) {
  return function(...args) {
    if (args.length > 1) {
      console.error("More than one argument traveling through pipeline. Arguments after first one will be ignored");
    }
    fn(...args);
    return args[0];
  }
}

export function trace(fn = v => v) {
  return function(v) {
    console.log(fn(v));
    return v;
  }
}
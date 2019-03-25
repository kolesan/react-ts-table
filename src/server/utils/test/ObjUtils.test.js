const { property } = require('../ObjUtils');

test(`'property(s)' returns a function that resolves property 's' from provided object`, () => {
  let obj = {
    a: "a",
    b: 0,
    c: [1, 2, 3],
    d: {
      e: "e",
      g: "g"
    }
  };

  expect(property("abc")(obj)).toBeUndefined();
  expect(property("a")(obj)).toEqual("a");
  expect(property("c")(obj)).toEqual([1, 2, 3]);
  expect(property("e")(property("d")(obj))).toEqual("e");
});

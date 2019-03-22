const { filter } = require('../array-utils');

test(`'filter' constructs filter callback using two other functions (value provider and predicate)(string)`, () => {
  let arr = [
    { name: "abc" },
    { name: "bcd" },
    { name: "cde" },
    { name: "def" },
    { name: "efg" }
  ];

  let byName = o => o.name;
  let includes = val => s => s.includes(val);
  let nameIncludesA = filter(byName, includes("a"));
  let nameIncludesB = filter(byName, includes("b"));
  let nameIncludesE = filter(byName, includes("e"));
  let nameIncludesEmptyString = filter(byName, includes(""));
  let nameIncludesNonexistentString = filter(byName, includes("abcdefg"));

  expect(arr.filter(nameIncludesA)).toEqual([
    { name: "abc" }
  ]);
  expect(arr.filter(nameIncludesB)).toEqual([
    { name: "abc" },
    { name: "bcd" }
  ]);
  expect(arr.filter(nameIncludesE)).toEqual([
    { name: "cde" },
    { name: "def" },
    { name: "efg" }
  ]);
  expect(arr.filter(nameIncludesEmptyString)).toEqual(arr);
  expect(arr.filter(nameIncludesNonexistentString)).toEqual([]);
});

test(`'filter' constructs filter callback using two other functions (value provider and predicate)(integer)`, () => {
  let arr = [
    { price: 10 },
    { price: 20 },
    { price: 30 },
    { price: 40 },
    { price: 50 }
  ];

  let byPrice = o => o.price;
  let moreThan = a => b => b > a;
  let moreThan5 = filter(byPrice, moreThan(5));
  let moreThan25 = filter(byPrice, moreThan(25));
  let moreThan100 = filter(byPrice, moreThan(100));

  expect(arr.filter(moreThan5)).toEqual(arr);
  expect(arr.filter(moreThan25)).toEqual([
    { price: 30 },
    { price: 40 },
    { price: 50 }
  ]);
  expect(arr.filter(moreThan100)).toEqual([]);
});

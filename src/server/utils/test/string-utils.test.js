const { includes } = require('../string-utils');

test(`includes(s) returns a function that accepts another string and checks if the second one contains the first`, () => {
  expect(includes("abc")("abcde")).toBe(true);
  expect(includes("abcdefg")("abcde")).toBe(false);
  expect(includes("ABC")("abcde")).toBe(true);
  expect(includes("ABCDEFG")("abcde")).toBe(false);
  expect(includes("abc")("ABCDE")).toBe(true);
  expect(includes("abcdefg")("ABCDE")).toBe(false);
  expect(includes("")("abcde")).toBe(true);
  expect(includes("abc")("")).toBe(false);
});

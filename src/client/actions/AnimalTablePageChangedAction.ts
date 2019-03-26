export const ANIMAL_TABLE_PAGE_CHANGED = Symbol("animal table page changed redux action");

export default function animalTablePageChanged(page) {
  console.log("Page changed", page);
  return {
    type: ANIMAL_TABLE_PAGE_CHANGED,
    page
  }
}
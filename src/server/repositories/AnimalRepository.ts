import { Repository, FindAllResult } from "./Repository";
import { data } from '../../../resources/MOCK_DATA';
import { Animal, AnimalProperties } from "../model/Animal";
import { property } from "../utils/ObjUtils";
import { copy, filter, numberComparator, sorter } from "../utils/ArrayUtils";
import { includes, stringComparator } from "../utils/StringUtils";
import { FindOptions } from "./FindOptions";
import { pipe } from "../utils/FunctionalUtils";
import { SortOptions } from "./SortOptions";
import { TakeOptions } from "./TakeOptions";
import { FilterOptions } from "./FilterOptions";
import { log } from "../utils/Logging";

export class AnimalRepository implements Repository<Animal> {
  findAll(options: FindOptions): FindAllResult<Animal> {
    const filtered = arrayFilter(options.filter)(data);

    const animals = pipe(filtered,
      arraySorter(options.sort),
      arraySlicer(options.take)
    );

    return {
      total: filtered.length,
      items: animals
    }
  }
}

function arrayFilter(options: FilterOptions) {
  const { fields = [], values = [] } = options;
  const filterEntries = makeFilterEntries(fields, values);
  const filters = resolveFilters(filterEntries);
  return function(arr: Animal[]): Animal[] {
    return applyFilters(arr, filters);
  };
}
function applyFilters(arr, filters) {
  let filtered = arr;
  for(let filter of filters) {
    filtered = filtered.filter(filter);
  }
  return filtered;
}
function resolveFilters(filterEntries) {
  return filterEntries.map(entry => {
    const field = entry[0];
    const value = entry[1];
    const predicate = resolveFilterPredicate(AnimalProperties.get(field).type);
    return filter(property(field), predicate(value));
  });
}
function makeFilterEntries(fields, values) {
  let entries = [];
  fields.forEach((field, i) => {
    entries.push([field, values[i]]);
  });
  return entries;
}

function resolveFilterPredicate(type: string) {
  if (type === "number") {
    return a => b => a === b;
  } else if (type === "string") {
    return includes
  } else {
    throw Error(`Unknown type '${type}' during filter predicate resolution`);
  }
}


function arraySorter(options: SortOptions) {
  const { field, descending } = options;
  return function(arr) {
    if (field) {
      const comparator = resolveComparator(AnimalProperties.get(field).type, descending);
      const sortByProperty = sorter(property(field), comparator);
      return copy(arr).sort(sortByProperty);
    }
    return arr;
  }
}

function resolveComparator(type: string, sortDescending: boolean) {
  if (type === "number") {
    return numberComparator(sortDescending)
  } else if (type === "string") {
    return stringComparator(sortDescending)
  } else {
    throw Error(`Unknown type '${type}' during comparator resolution`);
  }
}


function arraySlicer(options: TakeOptions) {
  const { start, count } = options;
  return function(arr) {
    return arr.slice(start, start + count);
  }
}

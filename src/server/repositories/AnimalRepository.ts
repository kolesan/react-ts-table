import { Repository, FindAllResult } from "./Repository";
import { data } from '../../../resources/MOCK_DATA';
import { Animal, AnimalProperties } from "../model/Animal";
import { property } from "../utils/obj-utils";
import { copy, filter, numberComparator, sorter } from "../utils/array-utils";
import { includes, stringComparator } from "../utils/string-utils";
import { FindOptions } from "./FindOptions";
import { pipe } from "../utils/functional-utils";
import { SortOptions } from "./SortOptions";
import { TakeOptions } from "./TakeOptions";
import { FilterOptions } from "./FilterOptions";

export class AnimalRepository implements Repository<Animal> {
  findAll(options: FindOptions): FindAllResult<Animal> {
    let animals = pipe(data,
      arrayFilter(options.filter),
      arraySorter(options.sort),
      arraySlicer(options.take)
    );

    return {
      total: data.length,
      items: animals
    }
  }
}

function arrayFilter(options: FilterOptions) {
  const { field, value } = options;
  return function(arr) {
    if (field && value) {
      const predicate = resolveFilterPredicate(AnimalProperties.get(field).type);
      const filterByProperty = filter(property(field), predicate(value));
      return arr.filter(filterByProperty);
    }
    return arr;
  };
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
  let { field, descending } = options;
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

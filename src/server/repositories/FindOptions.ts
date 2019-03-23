import { FilterOptions } from "./FilterOptions";
import { SortOptions } from "./SortOptions";
import { TakeOptions } from "./TakeOptions";

export interface FindOptions {
  readonly filter: FilterOptions,
  readonly sort: SortOptions,
  readonly take: TakeOptions
}
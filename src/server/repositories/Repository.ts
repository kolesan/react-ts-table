import { FindOptions } from "./FindOptions";

export interface FindAllResult<T> {
  readonly total: number;
  readonly items: T[];
}
export interface Repository<T> {
  findAll(options: FindOptions): FindAllResult<T>
}
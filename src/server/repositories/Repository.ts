import { FindOptions } from "./FindOptions";

export interface Repository<T> {
  findAll(options: FindOptions): T[]
}
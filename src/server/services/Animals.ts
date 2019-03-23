import { Repository } from "../repositories/Repository";
import { FindOptions } from "../repositories/FindOptions";
import { Animal } from "../model/Animal";

export class Animals {
  repo: Repository<Animal>;

  constructor(repo: Repository<Animal>) {
    this.repo = repo;
  }

  findAll(options: FindOptions): Animal[] {
    return this.repo.findAll(options);
  }
}
import { Repository } from "../repositories/Repository";
import { FindOptions } from "../repositories/FindOptions";
import { Animal } from "../model/Animal";

interface AnimalsFindAllResult {
  readonly total: number;
  readonly animals: Animal[];
}

export class Animals {
  repo: Repository<Animal>;

  constructor(repo: Repository<Animal>) {
    this.repo = repo;
  }

  findAll(options: FindOptions): AnimalsFindAllResult {
    let foundAnimals = this.repo.findAll(options);

    return {
      total: foundAnimals.total,
      animals: foundAnimals.items
    };
  }
}
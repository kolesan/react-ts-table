import { Router } from "./Router";
import { FindOptions } from "../repositories/FindOptions";
import { Animals } from "../services/Animals";
import { log } from "../utils/logging";
import { positiveFiniteNumber } from "../utils/request-utils";
import { AnimalProperties } from "../model/Animal";
import { ParameterValidationError } from "../errors/ParameterValidationError";

export class AnimalRouter implements Router {
  service: Animals;

  constructor(service: Animals) {
    this.service = service;
  }

  applyRoutes(app): void {
    app.get('/animals', (req, res) => {
      const start = positiveFiniteNumber(req.query.start, "start", 0);
      const count = positiveFiniteNumber(req.query.count, "count", 10);
      const sortBy = sortableAnimalProperty(req.query.sortBy, "sortBy");
      const filterBy = filterableAnimalProperty(req.query.filterBy, "filterBy");
      const filterValue = req.query.filterValue;
      const sortDescending = req.query.sortDesc !== undefined;

      let options: FindOptions = {
        filter: { field: filterBy, value: filterValue },
        sort: { field: sortBy, descending: sortDescending},
        take: { start, count }
      };

      log("Client requested animals: ");
      log(options);

      let foundAnimals = this.service.findAll(options);

      log(`Responding with [${foundAnimals.length}] animals`);
      log(foundAnimals.map(it=>it.name));

      res.send(foundAnimals);
      // setTimeout(
      //   () => res.send(data),
      //   Math.random() * 150
      // );
    });
  }
}

function validAnimalProperty(param: string, name: string): string {
  if (!AnimalProperties.get(param)) {
    throw new ParameterValidationError(
      `Invalid property '${name}: ${param}'. Property does not exist on Animal`,
      name,
      param
    );
  }
  return param;
}
function filterableAnimalProperty(param: string, name: string): string {
  if (!param) {
    return;
  }

  validAnimalProperty(param, name);
  if (!AnimalProperties.get(param).filterable) {
    throw new ParameterValidationError(
      `Invalid property '${name}: ${param}'. Property can not be filtered by`,
      name,
      param
    );
  }
  return param;
}
function sortableAnimalProperty(param: string, name: string): string {
  if (!param) {
    return;
  }

  validAnimalProperty(param, name);
  if (!AnimalProperties.get(param).sortable) {
    throw new ParameterValidationError(
      `Invalid property '${name}: ${param}'. Property can not be sorted by`,
      name,
      param
    );
  }
  return param;
}

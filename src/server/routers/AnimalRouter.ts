import { Router } from "./Router";
import { FindOptions } from "../repositories/FindOptions";
import { Animals } from "../services/Animals";
import { log } from "../utils/Logging";
import { positiveFiniteNumber } from "../utils/RequestUtils";
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
      const filterBy = filterableAnimalProperties(req.query.filterBy, "filterBy");
      const filterValue = filterValues(req.query.filterValue, "filterValue", filterBy);
      const sortDescending = req.query.sortDesc !== undefined;

      let options: FindOptions = {
        filter: { fields: filterBy, values: filterValue },
        sort: { field: sortBy, descending: sortDescending},
        take: { start, count }
      };

      log("Client requested animals: ");
      log(options);

      let foundAnimals = this.service.findAll(options);

      log(`Found [${foundAnimals.animals.length}] animals out of [${foundAnimals.total}]`);

      res.send(foundAnimals);
      // setTimeout(
      //   () => res.send(foundAnimals),
      //   Math.random() * 1500
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

function filterableAnimalProperties(param: string, name: string): string[] {
  if (!param) {
    return;
  }

  return param.split(",").map(property => {
    validAnimalProperty(property, name);
    if (!AnimalProperties.get(property).filterable) {
      throw new ParameterValidationError(
        `Invalid property '${name}: ${property}'. Property can not be filtered by`,
        name,
        property
      );
    }
    return property;
  });
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

function filterValues(param: string, name: string, filterBy: string[]): string[] {
  let values = param.split(",");
  if (values.length !== filterBy.length) {
    throw new ParameterValidationError(
      `Invalid property '${name}: ${param}'. Should be a list of values separated by a comma, with same count of values as filterBy.`,
      name,
      param
    );
  }
  return values;
}

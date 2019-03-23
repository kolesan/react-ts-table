import { Router } from "./Router";
import { FindOptions } from "../repositories/FindOptions";
import { Animals } from "../services/Animals";
import { log } from "../utils/logging";

export class AnimalRouter implements Router {
  service: Animals;

  constructor(service: Animals) {
    this.service = service;
  }

  applyRoutes(app): void {
    app.get('/animals', (req, res) => {
      const start = Number(req.query.start || 0);
      const count = Number(req.query.count || 10);
      const sortBy = req.query.sortBy;
      const filterBy = req.query.filterBy;
      const filterValue = req.query.filterValue;
      const sortDescending = req.query.sortDesc !== undefined;

      let options: FindOptions = {
        filter: { field: filterBy, value: filterValue },
        sort: { field: sortBy, descending: sortDescending},
        take: { start, count }
      };

      log("Client requested animals: ");
      log(options);

      res.send(this.service.findAll(options));
      // setTimeout(
      //   () => res.send(data),
      //   Math.random() * 150
      // );
    });
  }
}
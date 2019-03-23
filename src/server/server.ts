const path = require('path');
const express = require('express');

import { config } from './utils/config-loader';
import { FindOptions } from "./repositories/FindOptions";
import { AnimalRepository } from "./repositories/AnimalRepository";
import { Animals } from "./services/Animals";

const { port } = config.server;
const { bundleDir } = config;

console.log("Configuration: ", config);

let app = express();
let server = app.listen(port, () => console.log(`Express server listening on port ${port}!`));

if (!config.production) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

if (config.production) {
  console.log("Serving static content from: ", bundleDir);
  app.use(express.static(bundleDir));
  app.use((req, res) => res.sendFile(`${path.resolve(bundleDir)}/index.html`));
}

let animalRepo = new AnimalRepository();
let animals = new Animals(animalRepo);

app.get('/animals', (req, res) => {
  const start = Number(req.query.start || 0);
  const count = Number(req.query.count || 10);
  const sortBy = req.query.sortBy;
  const filterBy = req.query.filterBy;
  const filterValue = req.query.filterValue;
  const sortDescending = req.query.sortDesc !== undefined;

  console.log("Client requested animals: ");

  let options: FindOptions = {
    filter: { field: filterBy, value: filterValue },
    sort: { field: sortBy, descending: sortDescending},
    take: { start, count }
  };
  console.log(options);
  res.send(animals.findAll(options));
  // setTimeout(
  //   () => res.send(data),
  //   Math.random() * 150
  // );
});
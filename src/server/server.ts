const path = require('path');
const express = require('express');

import { config } from './utils/config-loader';
import { AnimalRepository } from "./repositories/AnimalRepository";
import { Animals } from "./services/Animals";
import { AnimalRouter } from "./routers/AnimalRouter";

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
let animalRouter = new AnimalRouter(animals);

animalRouter.applyRoutes(app);
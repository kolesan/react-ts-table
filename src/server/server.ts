const path = require('path');
const express = require('express');

import { log } from "./utils/logging";
import { config } from './utils/config-loader';
import { AnimalRepository } from "./repositories/AnimalRepository";
import { Animals } from "./services/Animals";
import { AnimalRouter } from "./routers/AnimalRouter";
import { parameterValidationErrorHandler, validationErrorHandler } from "./middleware/error-handlers";

const { port } = config.server;
const { bundleDir } = config;

log("Loading configuration: ", config);

let app = express();
let server = app.listen(port, () => log(`Express server listening on port ${port}!`));

if (config.production) {
  log("Serving static content from: ", bundleDir);
  app.use(express.static(bundleDir));
  app.use((req, res) => res.sendFile(`${path.resolve(bundleDir)}/index.html`));
}

if (!config.production) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

let animalRepo = new AnimalRepository();
let animals = new Animals(animalRepo);
let animalRouter = new AnimalRouter(animals);

animalRouter.applyRoutes(app);

app.use(parameterValidationErrorHandler);
app.use(validationErrorHandler);
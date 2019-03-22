const path = require('path');
const express = require('express');
const mockData = require('../../resources/MOCK_DATA');

import { copy, sorter, order, filter } from './utils/array-utils';
import { pipe, tap } from './utils/functional-utils';
import { property } from './utils/obj-utils';
import { includes } from './utils/string-utils';
import { config } from './utils/config-loader';

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


app.get('/animals', (req, res) => {
  const start = Number(req.query.start || 0);
  const count = Number(req.query.count || 10);
  const sortBy = req.query.sortBy;
  const filterBy = req.query.filterBy;
  const filterValue = req.query.filterValue;
  const sortDescending = Boolean(req.query.sortDesc || true);

  console.log("Client requested animals: ");
  console.log({start, count, sortBy, sortDescending, filterBy, filterValue, query: req.query});

  let sortByProperty = sorter(property(sortBy), order(!sortDescending));
  let filterByProperty = filter(property(filterBy), includes(filterValue));

  let data = pipe(mockData,
    copy,
    // tap(arr => console.log(arr.slice(0, 10))),
    arr => sortBy ? arr.sort(sortByProperty) : arr,
    // tap(arr => console.log(arr.slice(0, 10))),
    (arr: Array<Object>) => (filterBy && filterValue) ? arr.filter(filterByProperty) : arr,
    // tap(arr => console.log(arr.slice(0, 10))),
    arr => arr.slice(start, start + count),
    // tap(arr => console.log(arr.slice(0, 10)))
  );

  setTimeout(
    () => res.send(data),
    Math.random() * 150
  );
});
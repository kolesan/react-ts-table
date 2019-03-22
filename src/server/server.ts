const path = require('path');
const express = require('express');
const mockData = require('../../resources/MOCK_DATA');

import { copy, sorter, order, filter } from './utils/array-utils';
import { pipe, tap } from './utils/functional-utils';
import { property } from './utils/obj-utils';
import { includes, stringOrder } from './utils/string-utils';
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

interface Animal {
  name: string,
  growth: number,
  wiki: string,
  carnivore: boolean,
  height: number,
  origin: string
}

app.get('/animals', (req, res) => {
  const start = Number(req.query.start || 0);
  const count = Number(req.query.count || 10);
  const sortBy = req.query.sortBy;
  const filterBy = req.query.filterBy;
  const filterValue = req.query.filterValue;
  const sortDescending = req.query.sortDesc !== undefined;

  console.log("Client requested animals: ");
  let propType = typeof mockData[0][sortBy];
  console.log({start, count, sortBy, sortDescending, filterBy, filterValue, propType, query: req.query});

  let sortByStringPorperty = sorter(property(sortBy), stringOrder(sortDescending));
  let sortByNumberProperty = sorter(property(sortBy), order(sortDescending));
  let sortByProperty = propType == "string" ? sortByStringPorperty : sortByNumberProperty;
  let filterByProperty = filter(property(filterBy), includes(filterValue));

  let data = pipe(mockData,
    copy,
    // tap(arr => console.log(arr.slice(0, 10))),
    arr => sortBy && propType !== undefined ? arr.sort(sortByProperty) : arr,
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
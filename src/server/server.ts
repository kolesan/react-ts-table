import {number} from "prop-types";
const path = require('path');
const express = require('express');

import { data } from '../../resources/MOCK_DATA';
import { copy, sorter, numberComparator, filter } from './utils/array-utils';
import {pipe, tap, trace} from './utils/functional-utils';
import { property } from './utils/obj-utils';
import { includes, stringComparator } from './utils/string-utils';
import { config } from './utils/config-loader';
import { PROPERTY_TYPES } from "./Animal";

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
  const sortDescending = req.query.sortDesc !== undefined;

  console.log("Client requested animals: ");
  console.log({
    start, count, sortBy, sortDescending, filterBy,
    filterValue, query: req.query
  });

  let responseData = pipe(data,
    // trace(),//(arr => arr.slice(0, 10)),
    arrayFilter(filterBy, filterValue),
    // trace(),//(arr => arr.slice(0, 10)),
    arraySorter(sortBy, sortDescending),
    // trace(),//(arr => arr.slice(0, 10)),
    arr => arr.slice(start, start + count),
    // trace(),//(arr => arr.slice(0, 10)),
  );

  res.send(responseData);
  // setTimeout(
  //   () => res.send(data),
  //   Math.random() * 150
  // );
});

function arrayFilter(filterBy: string, filterValue: string) {
  return function(arr) {
    if (filterBy && filterValue) {
      const predicate = resolveFilterPredicate(PROPERTY_TYPES.get(filterBy));
      const filterByProperty = filter(property(filterBy), predicate(filterValue));
      return arr.filter(filterByProperty);
    }
    return arr;
  };
}

function resolveFilterPredicate(type: string) {
  if (type === "number") {
    return a => b => a === b;
  } else if (type === "string") {
    return includes
  } else {
    throw Error(`Unknown type '${type}' during filter predicate resolution`);
  }
}


function arraySorter(sortBy: string, sortDescending: boolean) {
  return function(arr) {
    if (sortBy) {
      const comparator = resolveComparator(PROPERTY_TYPES.get(sortBy), sortDescending);
      const sortByProperty = sorter(property(sortBy), comparator);
      return copy(arr).sort(sortByProperty);
    }
    return arr;
  }
}

function resolveComparator(type: string, sortDescending: boolean) {
  if (type === "number") {
    return numberComparator(sortDescending)
  } else if (type === "string") {
    return stringComparator(sortDescending)
  } else {
    throw Error(`Unknown type '${type}' during comparator resolution`);
  }
}
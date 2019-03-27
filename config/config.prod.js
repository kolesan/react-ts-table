const commonConfig = require('./config.common');

module.exports = Object.assign({}, commonConfig, {
  server: {
    protocol: "https",
    host: "animal-table.herokuapp.com"
  },
  bundleDir: "dist",
  production: true
});

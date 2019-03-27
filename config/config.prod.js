const commonConfig = require('./config.common');

module.exports = Object.assign({}, commonConfig, {
  server: {
    host: "carggo.herokuapp.com"
  },
  bundleDir: "dist",
  production: true
});

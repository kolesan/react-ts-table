const commonConfig = require('./config.common');

module.exports = Object.assign({}, commonConfig, {
  server: {
    host: "localhost",
    port: 8080
  },
  bundleDir: "dist",
  production: true
});

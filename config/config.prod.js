const commonConfig = require('./config.common');

module.exports = Object.assign({}, commonConfig, {
  server: {
    host: "localhost",
    port: 3000
  },
  bundleDir: "dist",
  production: true
});

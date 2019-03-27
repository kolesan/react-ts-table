const commonConfig = require('./config.common');

module.exports = Object.assign({}, commonConfig, {
  server: {
    protocol: "http",
    host: "213.159.43.178",
    port: 3000
  }
});

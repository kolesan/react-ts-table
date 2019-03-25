const environment = process.argv.slice(2)[0] || "prod";
const environmentConfig = require('../../../config/config.' + environment);

export {
  environmentConfig as config
};

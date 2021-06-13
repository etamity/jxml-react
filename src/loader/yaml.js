const yaml = require('js-yaml');
const unsafe = require('./js-types').all;
const schema = yaml.DEFAULT_SCHEMA.extend(unsafe);
module.exports = {
  load: (src) => {
    return yaml.load(src, { schema });
  },
};

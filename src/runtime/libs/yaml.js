import yaml from 'js-yaml';
const unsafe = require('../../loader/js-types').all;
const schema = yaml.DEFAULT_SCHEMA.extend(unsafe);

export default {
  load: (src) => {
    return yaml.load(src, { schema });
  },
};

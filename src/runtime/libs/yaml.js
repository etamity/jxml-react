import yaml from 'js-yaml';
import unsafe from './js-types';

const schema = yaml.DEFAULT_SCHEMA.extend(unsafe);

export default {
  load: (src) => {
    return yaml.load(src, { schema });
  },
};

import { transform } from './transform';
import renderAst from './renderAst';
export default ({ json }) => {
  try {
    return renderAst(json.render && transform(json.render));
  } catch (error) {}
};

import { transform } from './transform';
import renderAst from './renderAst';
import { useJXContext } from './JXContext';

export default ({ render }) => {
  const context = useJXContext();
  const transformRender =
    render &&
    transform({
      json: render,
      context,
    });
  try {
    return renderAst(transformRender, context);
  } catch (error) {
    console.log(error);
  }
};

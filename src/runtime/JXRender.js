import { transform } from './transform';
import renderAst from './renderAst';
import { useJXContext } from './JXContext';

export default ({ render, ...ownProps }) => {
  const { bindScript, EnvScope } = useJXContext();
  const transformRender =
    render &&
    transform({
      json: render,
      context: {
        bindScript,
        ownProps,
      },
    });
  try {
    return renderAst(transformRender, EnvScope, ownProps);
  } catch (error) {
    console.log(error);
  }
};

import { transform } from './transform';
import renderAst from './renderAst';
import { useJXContext } from './JXContext';

export default ({ json }) => {
  const { render } = json;
  const { bindScript } = useJXContext();
  const transformRender =
    render &&
    transform({
      json: render,
      context: {
        bindScript,
      },
    });
  try {
    return renderAst({ json: transformRender });
  } catch (error) {
    console.log(error);
  }
};

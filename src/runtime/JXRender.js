import { transform } from './transform';
import RenderAst from './RenderAst';
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
    return <RenderAst json={transformRender} />;
  } catch (error) {
    console.log(error);
  }
};

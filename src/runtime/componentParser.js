import JXRender from './JXRender';
import { getChildren } from './transform';
import { isFirstLetterIsUpper } from './libs/utils';
import renderAst from './renderAst';
export function getRawProps({ json }) {
  return Object.keys(json)
    .filter((name) => [!isFirstLetterIsUpper(name), name !== 'children'].every(Boolean))
    .reduce((props, name) => {
      return {
        ...props,
        [name]: json[name],
      };
    }, {});
}

export default (components, context) => {
  return Object.keys(components).reduce((root, next) => {
    const json = components[next];
    return {
      ...root,
      [next]: (props) => {
        const defaultProps = getRawProps({ json });
        const ownProps = { ...defaultProps, ...props };
        const mergeContext = {
          ...context,
          ownProps,
        };
        const render = getChildren({
          json,
          context: mergeContext,
        });

        return render.map((comp) => renderAst(comp, mergeContext));
      },
    };
  }, {});
};

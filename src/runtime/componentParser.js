import JXRender from './JXRender';
export default (components) => {
  return Object.keys(components).reduce((root, next) => {
    const { render, ...defaultProps } = components[next];
    return {
      ...root,
      [next]: (props) => <JXRender render={render} {...defaultProps} {...props} />,
    };
  }, {});
};

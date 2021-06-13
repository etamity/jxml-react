module.exports = function jxLoader(src) {
  let result = undefined;
  try {
    result = `
    import { JXProvider } from 'jxml-react';
    export default ({ context, ...props }) => <JXProvider context={context} {...props} children={\`${src}\`}/>
    `;

    return result;
  } catch (error) {
    console.error(error);
  }
};

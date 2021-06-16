const CodeTemplate = (src) => `import { JXProvider } from 'jxml-react';
export default ({ context, ...props }) => <JXProvider context={context} {...props} children={\`${src}\`}/>
`;

module.exports = {
  CodeTemplate,
};

# 🚀 JXML: Render components from Yaml file.

JXML turns yaml file into JSX components.

# Install:

```
npm i jxml-react
```

## Add webpack config:

```js
module.exports = {
  module: {
    // ...

    rules: [
      // ...

      {
        test: /\.jxml?$/,
        use: ['babel-loader', 'jxml-react/loader'],
      },
    ],
  },
};
```

# Example:

Create a yaml file with extension `./example.jxml`

```yaml
---
version: 1.0

state:
  pageTitle: Page title

props:
  title: Default Button

render:
  H1: this.state.pageTitle
  Button:
    style:
      background: blue
      color: white
      padding: 10px
    children: this.props.title
    onClick: !!js |
      () => {
        this.setState(state=> {
            state.pageTitle = 'Hello World!'
        })
      }
```

and then you can import this component to jsx file:

```jsx
import Example from './Example.jxml';

export default () => <Example />;
```

# Runtime Render:

```jsx
import { JXProvider } from 'jxml-react';

export default () => (
  <JXProvider context={{ components: {}, scope: {}, thisContext: {} }}>
    {`
---
version: 1.0 
render: 
  Button: Default Button
`}
  </JXProvider>
);
```

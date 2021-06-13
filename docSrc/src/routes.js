import loadDocs, { urlWithBase } from './libs/loadDocs';
import Example from './views/Example.jxml';

export default [
  ...loadDocs(require.context('./content', true, /.mdx*/)),
  {
    path: urlWithBase('/playground'),
    component: require('./layouts/DocsLayout').default,
    routes: [
      {
        path: urlWithBase('/playground/livecode'),
        component: import('./views/Playground'),
      },
      {
        path: urlWithBase('/playground/example'),
        component: Example,
      },
    ],
  },
  {
    path: '/',
    redirect: urlWithBase('/playground/livecode'),
  },
];

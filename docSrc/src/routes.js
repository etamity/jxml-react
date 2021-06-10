import loadDocs, { urlWithBase } from './libs/loadDocs';

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
    ],
  },
  {
    path: urlWithBase('/'),
    redirect: urlWithBase('/playground/livecode'),
  },
];

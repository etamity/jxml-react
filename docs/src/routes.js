import loadDocs from './libs/loadDocs';

export default [
  ...loadDocs(require.context('./content', true, /.mdx*/)),
  {
    path: '/playground',
    component: require('./layouts/DocsLayout').default,
    routes: [
      {
        path: '/playground/livecode',
        component: import('./views/Playground'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/playground/livecode',
  },
];

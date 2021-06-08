import loadDocs from './libs/loadDocs';

export default [
  {
    name: 'Getting Started',
    path: '/docs',
    component: require('./layouts/DocsLayout').default,
    routes: [
      ...loadDocs,
      {
        path: '/docs/playground',
        component: import('./components/Playground'),
      },
      {
        path: '/',
        redirect: '/docs/playground',
      },
    ],
  },
  {
    path: '/',
    redirect: '/docs/playground',
  },
];

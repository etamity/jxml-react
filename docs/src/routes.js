import loadDocs from './libs/loadDocs';

console.log(loadDocs);

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

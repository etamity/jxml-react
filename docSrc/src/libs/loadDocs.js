const mapDocRoutes = (key, r) => {
  const [file, category] = key.split('/').reverse();
  const [name] = file.split('.');
  const Component = r(key).default;
  const path = '/docs/' + category + '/' + name;
  const categoryName = category.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  const className = categoryName == 'examples' ? '' : 'mx-auto w-full prose';
  return {
    name: categoryName,
    component: require('../layouts/DocsLayout').default,
    path: '/docs/' + category.toLowerCase(),
    routes: [
      {
        path: urlWithBase(path.toLowerCase()),
        icon: 'far fa-file-alt',
        name: name.replace(/([a-z])([A-Z])/g, '$1 $2'),
        component: () => (
          <article className={className}>
            <Component />
          </article>
        ),
      },
    ],
  };
};

function importAll(r, map) {
  return r.keys().map((key) => map(key, r));
}

export default (context) => {
  const docs = importAll(context, mapDocRoutes);
  const transform = docs.reduce((root, next) => {
    const route = root[next.name];
    const routes = (route && route.routes && route.routes.concat(next.routes)) || next.routes;
    const newRoute = {
      ...root,
      [next.name]: {
        ...next,
        routes: routes,
      },
    };
    return newRoute;
  }, {});
  return Object.keys(transform).map((name) => ({
    ...transform[name],
  }));
};

const mapJxml = (key, r) => {
  return {
    name: key,
    file: r(key).default,
  };
};
export const loadJXML = importAll(
  require.context('!!raw-loader!../examples', true, /.raw.yml*/),
  mapJxml,
);

export const urlWithBase = (url) => (isProduction ? `/jxml-react${url}` : url);

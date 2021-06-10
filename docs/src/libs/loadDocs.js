const mapDocs = (key, r) => {
  const [dot, category, file] = key.split('/');
  const [name] = file.split('.');
  const Component = r(key).default;
  // const { config } = r(key);
  const path = '/docs/' + category + '/' + name;
  return {
    path: path.toLowerCase(),
    name,
    component: () => (
      <article className="mx-auto w-full prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <Component />
      </article>
    ),
  };
};

function importAll(r, map) {
  return r.keys().map((key) => map(key, r));
}

const documents = ((ctx) => {
  let keys = ctx.keys();
  let values = keys.map(ctx);
  return keys.reduce((o, k, i) => {
    o[k] = values[i];
    return o;
  }, {});
})(require.context('../content', true, /.mdx*/));

export default importAll(require.context('../content', true, /.mdx*/), mapDocs);

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

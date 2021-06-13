import Yaml from 'js-yaml';

import React, { useCallback, useEffect, useState } from 'react';

import Layout from './Layout';

const transformCode = (jxml) => ({
  code: jxml,
  json: Yaml.load(jxml),
});

export default ({ jxml }) => {
  const [{ code, json }, setState] = useState(transformCode(jxml));
  const onCodeChange = useCallback((value) => {
    try {
      setState(transformCode(value));
    } catch (error) {}
  }, []);

  useEffect(() => {
    setState(transformCode(jxml));
  }, [jxml]);
  return <Layout code={code} preview={json} onCodeChange={onCodeChange} />;
};

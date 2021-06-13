import React, { useCallback, useEffect, useState } from 'react';

import Layout from './Layout';

export default ({ jxml }) => {
  const [code, setState] = useState(jxml);
  const onCodeChange = useCallback((value) => {
    try {
      setState(value);
    } catch (error) {}
  }, []);

  useEffect(() => {
    setState(jxml);
  }, [jxml]);
  return <Layout code={code} onCodeChange={onCodeChange} />;
};

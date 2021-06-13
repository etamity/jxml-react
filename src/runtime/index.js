import React, { useEffect, useState } from 'react';
import yaml from '../loader/yaml';
import JXProvider from './JXProvider';

export default ({ children, ...props }) => {
  const [jxml, setJxml] = useState(null);
  useEffect(() => {
    try {
      const jx = yaml.load(children);
      if (jx) {
        jx.props = {
          ...jx.props,
          ...props,
        };
      }
      setJxml(jx);
    } catch (error) {
      console.error(error.message);
    }
  }, [children]);

  if (!jxml) {
    return null;
  }
  return (
    <JXProvider jx={jxml} {...props}>
      {children}
    </JXProvider>
  );
};

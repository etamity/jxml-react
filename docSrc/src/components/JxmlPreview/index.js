import Yaml from 'js-yaml';
import { JXProvider } from 'jxml-react';
import React, { useCallback, useEffect, useState } from 'react';

import Layout from './Layout.jxml';

import Editor from '@monaco-editor/react';
import IFrame from '../IFrame';
const MicroEvent = {
  emit: (event, data) => {
    const packed = { event, data };
    window.postMessage(packed, '*');
  },
  on: (event, callback) => {
    window.addEventListener('message', ({ data }) => {
      switch (data.event) {
        case event:
          callback && callback(data);
          break;
        default:
      }
    });
  },
};

const JxmlView = ({ url, ...props }) => {
  const [jxml, setJxml] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const jxmlText = await response.text();
      const jxmlJson = Yaml.load(jxmlText);
      setJxml(jxmlJson);
    }
    fetchData();
  }, [setJxml]);
  return (
    <JXProvider
      children={jxml}
      {...props}
      context={{ components: { MicroEvent, IFrame, JxmlView } }}
    />
  );
};

const RuntimePreview = (props) => {
  return <JXProvider {...props} context={{ components: { MicroEvent, IFrame, JxmlView } }} />;
};

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
  return (
    <Layout
      context={{ components: { Editor, RuntimePreview } }}
      code={code}
      preview={json}
      onCodeChange={onCodeChange}
    />
  );
};

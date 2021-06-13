import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import IFrame from '../IFrame';
import Yaml from 'js-yaml';
import { JXProvider } from 'jxml-react';

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

const RuntimePreview = (props) => {
  return (
    <JXProvider
      name="RuntimePreview"
      {...props}
      context={{ components: { MicroEvent, IFrame, JxmlView } }}
    />
  );
};

const JxmlView = ({ url, ...props }) => {
  const [jxml, setJxml] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const jxmlText = await response.text();
      try {
        const jxmlJson = Yaml.load(jxmlText);
        setJxml(jxmlJson);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);
  return (
    <JXProvider
      name="JxmlView"
      children={jxml}
      {...props}
      context={{ components: { MicroEvent, IFrame, JxmlView } }}
    />
  );
};

export default ({ code, preview, onCodeChange }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Editor
          height="100vh"
          defaultLanguage="yaml"
          value={code}
          theme="vs-dark"
          onChange={onCodeChange}
          options={{
            tabSize: 2,
            wordWrap: true,
          }}
        />
      </div>
      <div className="p-2 rounded border">
        <RuntimePreview>{preview}</RuntimePreview>
      </div>
    </div>
  );
};

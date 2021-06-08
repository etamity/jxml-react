import Yaml from 'js-yaml';
import { JXProvider } from 'jxml-react';
import React, { useCallback, useState } from 'react';
import Layout from './Layout.jxml';
import Editor from '@monaco-editor/react';
import IFrame from '../IFrame';
import { loadJXML } from '../../libs/loadDocs';
import Dropdown from '../Dropdowns';

console.log(JXProvider);
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

const RuntimePreview = (props) => (
  <JXProvider {...props} context={{ components: { MicroEvent, IFrame } }} />
);

export default ({ open }) => {
  const [{ code, json }, setState] = useState({
    code: loadJXML[0].file,
    json: Yaml.load(loadJXML[0].file),
  });
  const onCodeChange = useCallback((value) => {
    try {
      const newJson = Yaml.load(value);
      setState({
        code: value,
        json: newJson,
      });
    } catch (error) {
      // console.log(error);
    }
  }, []);

  const onChangeFile = useCallback((file) => {
    const newJson = Yaml.load(file.file);
    setState({
      code: file.file,
      json: newJson,
    });
  });
  return (
    <>
      <Dropdown
        label="Examples"
        onClick={(item) => onChangeFile(item)}
        items={loadJXML.map((file) => ({
          type: 'menu',
          label: file.name,
          file: file.file,
        }))}
      />
      <Layout
        context={{ components: { Editor, RuntimePreview } }}
        files={loadJXML}
        code={code}
        preview={json}
        onCodeChange={onCodeChange}
        style={
          open && {
            width: 250,
          }
        }
      />
    </>
  );
};

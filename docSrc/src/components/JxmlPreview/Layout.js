import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import IFrame from '../IFrame';
import { JXProvider } from 'jxml-react';

const RuntimePreview = (props) => {
  return <JXProvider {...props} context={{ components: { IFrame } }} />;
};

export default ({ code, onCodeChange }) => {
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
        <RuntimePreview>{code}</RuntimePreview>
      </div>
    </div>
  );
};

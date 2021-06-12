import React, { useCallback, useState } from 'react';
import JxmlPreview from '../components/JxmlPreview';
import { loadJXML } from '../libs/loadDocs';
import Dropdown from '../components/Dropdowns';

export default () => {
  const [code, setCode] = useState(loadJXML[0].file);
  const onChangeFile = useCallback((file) => {
    setCode(file.file);
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
      <JxmlPreview jxml={code} />
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;
  return (
    <iframe {...props} ref={setContentRef}>
      <div>ahshahsdhsahdah</div>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

import React, { useContext } from 'react';

const JXContext = React.createContext({});

export default JXContext;

export const useJXContext = () => useContext(JXContext);

import { useState, useEffect } from 'react';

export const useStorage = (initialState) => {
  let [state, setState] = useState(initialState);

  useEffect(() => {
    let existingState = localStorage.getItem('state');
    if (existingState) setState(JSON.parse(existingState));
  }, []);

  return [
    state,
    (state) => {
      setState(state);
      localStorage.setItem('state', JSON.stringify(state));
    },
  ];
};

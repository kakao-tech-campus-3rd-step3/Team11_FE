import { useState, useCallback } from 'react';

export const useBoolean = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, { on, off, toggle }] as const;
};

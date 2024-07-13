import { useState, useEffect } from 'react';

function useLS(key: string, initialValue: string): [string, (val: string) => void] {
  const getFromLS = () => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? savedValue : initialValue;
  };

  const [query, setQuery] = useState<string>(getFromLS);

  useEffect(() => {
    return () => {
      localStorage.setItem(key, query);
    };
  }, [key, query]);

  const setQueryLS = (val: string) => {
    setQuery(val);
    localStorage.setItem(key, val);
  };

  return [query, setQueryLS];
}

export default useLS;
import { useState, useEffect } from 'react';

function useLS() {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem("currentSearch") || "";
  });
  useEffect(() => {
    return () => {
      localStorage.setItem("currentSearch", query);
    };
  }, [query]);

  return [query, setQuery];
}

export default useLS;
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

  return [query, setQuery] as const;
}

export default useLS;
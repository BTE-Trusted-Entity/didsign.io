import React, { createContext, useContext, useMemo, useState } from 'react';

interface HashesContextType {
  hashes: string[];

  set(value: string[]): void;
}

const HashesContext = createContext<HashesContextType>({
  hashes: [],
  set() {
    return;
  },
});

export function useHashes(): HashesContextType {
  return useContext(HashesContext);
}

export function HashesProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [hashes, set] = useState<string[]>([]);
  const value = useMemo(() => ({ hashes, set }), [hashes, set]);
  return (
    <HashesContext.Provider value={value}>{children}</HashesContext.Provider>
  );
}

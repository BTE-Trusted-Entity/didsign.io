import React, { createContext, useContext, useMemo, useState } from 'react';

interface HashesContextType {
  hashes: string[];

  setHashes(value: string[]): void;
}

const HashesContext = createContext<HashesContextType>({
  hashes: [],
  setHashes() {
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
  const [hashes, setHashes] = useState<string[]>([]);
  const value = useMemo(() => ({ hashes, setHashes }), [hashes]);
  return (
    <HashesContext.Provider value={value}>{children}</HashesContext.Provider>
  );
}

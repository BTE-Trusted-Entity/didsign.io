import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface JWSState {
  hashArray: string[];
  finalHash: string;
  sign: string;
  signStatus:
    | 'Verified'
    | 'Not Checked'
    | 'Validating'
    | 'Corrupted'
    | 'Multiple Sign'
    | 'Invalid';
}

interface JWSContextType extends JWSState {
  setJWS(jwsOrSetter: JWSState | ((state: JWSState) => JWSState)): void;

  clearJWS(): void;
}

const initialState: JWSState = {
  hashArray: [],
  finalHash: '',
  sign: '',
  signStatus: 'Not Checked',
};

const JWSContext = createContext<JWSContextType>({
  ...initialState,
  setJWS() {
    return undefined;
  },
  clearJWS() {
    return undefined;
  },
});

export function useJWS(): JWSContextType {
  return useContext(JWSContext);
}

export function JWSProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [JWS, setJWS] = useState<JWSState>(initialState);
  const clearJWS = useCallback(() => setJWS(initialState), []);
  const value = useMemo(() => ({ ...JWS, setJWS, clearJWS }), [JWS, clearJWS]);
  return <JWSContext.Provider value={value}>{children}</JWSContext.Provider>;
}

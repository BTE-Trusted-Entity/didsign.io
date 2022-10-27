import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { IVerifiedSignatureContents } from '../../Utils/types';

interface VerifiedSignatureContextType extends IVerifiedSignatureContents {
  setVerifiedSignature(
    valueOrSetter:
      | IVerifiedSignatureContents
      | ((value: IVerifiedSignatureContents) => IVerifiedSignatureContents),
  ): void;

  clearVerifiedSignature(): void;
}

const initialState: IVerifiedSignatureContents = {
  signature: '',
  did: undefined,
  endpoints: [],
  w3name: '',
  txHash: '',
  credentials: [],
};

const VerifiedSignatureContext = createContext<VerifiedSignatureContextType>({
  ...initialState,
  setVerifiedSignature() {
    return undefined;
  },
  clearVerifiedSignature() {
    return undefined;
  },
});

export function useVerifiedSignature(): VerifiedSignatureContextType {
  return useContext(VerifiedSignatureContext);
}

export function VerifiedSignatureProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [verifiedSignature, setVerifiedSignature] =
    useState<IVerifiedSignatureContents>(initialState);

  const clearVerifiedSignature = useCallback(
    () => setVerifiedSignature(initialState),
    [],
  );

  const value = useMemo(
    () => ({
      ...verifiedSignature,
      setVerifiedSignature,
      clearVerifiedSignature,
    }),
    [clearVerifiedSignature, verifiedSignature],
  );

  return (
    <VerifiedSignatureContext.Provider value={value}>
      {children}
    </VerifiedSignatureContext.Provider>
  );
}

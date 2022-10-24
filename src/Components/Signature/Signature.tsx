import React, { createContext, useContext, useMemo, useState } from 'react';

import { Signature } from '../../Utils/types';

interface SignatureContextType extends Signature {
  setSignature(
    signatureOrSetter: Signature | ((value: Signature) => Signature),
  ): void;
}

const SignatureContext = createContext<SignatureContextType>({
  setSignature() {
    return undefined;
  },
});

export function useSignature(): SignatureContextType {
  return useContext(SignatureContext);
}

export function SignatureProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [signature, setSignature] = useState<Signature>({});
  const value = useMemo(() => ({ ...signature, setSignature }), [signature]);
  return (
    <SignatureContext.Provider value={value}>
      {children}
    </SignatureContext.Provider>
  );
}

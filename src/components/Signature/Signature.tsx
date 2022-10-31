import { createContext, useContext } from 'react';

import { Signature } from '../../utils/types';

interface SignatureContextType extends Signature {
  setSignature(
    signatureOrSetter: Signature | ((value: Signature) => Signature),
  ): void;
}

export const SignatureContext = createContext<SignatureContextType>({
  setSignature() {
    return undefined;
  },
});

export function useSignature(): SignatureContextType {
  return useContext(SignatureContext);
}

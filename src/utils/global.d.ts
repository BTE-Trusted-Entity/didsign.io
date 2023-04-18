import { SignWithDid } from './types';

export {};
declare global {
  interface Window {
    kilt: Record<
      string,
      {
        name?: string;
        signWithDid: SignWithDid;
      }
    >;
  }
}

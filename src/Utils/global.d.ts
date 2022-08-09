import { DidResourceUri } from '@kiltprotocol/sdk-js';

interface InjectedWindowProvider {
  signWithDid: (
    plaintext: string,
  ) => Promise<{ signature: string; didKeyUri: DidResourceUri }>;
}

export {};
declare global {
  interface Window {
    kilt: Record<string, InjectedWindowProvider>;
  }
}

import { DidResourceUri, RequestForAttestation } from '@kiltprotocol/sdk-js';

interface InjectedWindowProvider {
  signWithDid: (plaintext: string) => Promise<{
    signature: string;
    didKeyUri: DidResourceUri;
    credentials?: { name: string; credential: RequestForAttestation }[];
  }>;
}

export {};
declare global {
  interface Window {
    kilt: Record<string, InjectedWindowProvider>;
  }
}

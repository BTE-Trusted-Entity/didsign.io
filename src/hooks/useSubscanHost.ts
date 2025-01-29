const subscanHosts: Record<string, string | undefined> = {
  'wss://peregrine.kilt.io': 'https://kilt-testnet.subscan.io',
  'wss://spiritnet.kilt.io': 'https://spiritnet.subscan.io',
  'wss://kilt-rpc.dwellir.com': 'https://spiritnet.subscan.io',
  'wss://spiritnet.api.onfinality.io': 'https://spiritnet.subscan.io',
  'wss://kilt.ibp.network': 'https://spiritnet.subscan.io',
};

export function useSubscanHost(): string | undefined {
  const kiltEndpoint =
    process.env.REACT_APP_CHAIN_ENDPOINT || 'wss://spiritnet.kilt.io';

  return subscanHosts[new URL(kiltEndpoint).origin];
}

const subscanHosts: Record<string, string | undefined> = {
  'wss://peregrine.kilt.io/parachain-public-ws':
    'https://kilt-testnet.subscan.io',
  'wss://spiritnet.kilt.io': 'https://spiritnet.subscan.io',
  'wss://kilt-rpc.dwellir.com': 'https://spiritnet.subscan.io',
}

export function useSubscanHost(): string | undefined {
  const kiltEndpoint =
    process.env.REACT_APP_CHAIN_ENDPOINT || 'wss://spiritnet.kilt.io'

  return subscanHosts[kiltEndpoint]
}

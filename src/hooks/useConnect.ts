import { useEffect } from 'react';

import { disconnect, init } from '@kiltprotocol/sdk-js';

export function useConnect() {
  useEffect(() => {
    (async () => {
      await init({
        address:
          process.env.REACT_APP_CHAIN_ENDPOINT || 'wss://spiritnet.kilt.io',
      });
    })();
    return () => {
      disconnect();
    };
  }, []);
}

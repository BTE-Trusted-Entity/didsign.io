import { connect } from '@kiltprotocol/sdk-js';

export const apiPromise = connect(
  process.env.REACT_APP_CHAIN_ENDPOINT || 'wss://spiritnet.kilt.io',
);

import { BlockchainApiConnection } from '@kiltprotocol/chain-helpers'

import { Keyring } from '@polkadot/keyring'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

export async function getKiltAccounts() {
  const { api } = await BlockchainApiConnection.getConnectionOrConnect()
  const genesisHash = api.genesisHash.toHex()

  await web3Enable('DIDSign by BTE')
  const allAccounts = await web3Accounts()

  const kiltAccounts = allAccounts.filter(
    (account) =>
      !account.meta.genesisHash || account.meta.genesisHash === genesisHash
  )

  return kiltAccounts.map(({ address, meta }) => {
    return { address, source: meta.source, name: meta.name }
  })
}

export async function getExtrinsic(signature: string) {
  const { api } = await BlockchainApiConnection.getConnectionOrConnect()

  return api.tx.system.remark(signature)
}

export async function getFee() {
  const extrinsic = await getExtrinsic('Some remark')

  const fakeSeed = new Uint8Array(32)
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 38 })
  const keypair = keyring.addFromSeed(fakeSeed)

  return (await extrinsic.paymentInfo(keypair)).partialFee
}

export async function getTimestamp(blockHash: string) {
  const { api } = await BlockchainApiConnection.getConnectionOrConnect()

  const block = await api.at(blockHash)
  const timestamp = (await block.query.timestamp.now()).toNumber()

  return new Date(timestamp).toLocaleString()
}

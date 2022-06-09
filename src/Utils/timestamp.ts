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

  return kiltAccounts.map(({ address, meta: { source, name } }) => {
    return { address, source, name }
  })
}

export async function getExtrinsic(signature: string) {
  const { api } = await BlockchainApiConnection.getConnectionOrConnect()

  return api.tx.system.remark(signature)
}

export async function getFee() {
  const extrinsic = await getExtrinsic(
    '0x68a86f57289c19e016d94eedbbcb8c6ce97753adeee6e5a97f59970de706a41a4d73c37466892a562be1c456377c3c6dca477f0cf5b5c499b4dde15495c6fb87'
  )

  const fakeSeed = new Uint8Array(32)
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 38 })
  const keypair = keyring.addFromSeed(fakeSeed)

  return (await extrinsic.paymentInfo(keypair)).partialFee
}

export async function getTimestamp(blockHash: string) {
  const { api } = await BlockchainApiConnection.getConnectionOrConnect()

  const apiInstance = await api.at(blockHash)
  const timestamp = (await apiInstance.query.timestamp.now()).toNumber()

  return new Date(timestamp).toLocaleString()
}

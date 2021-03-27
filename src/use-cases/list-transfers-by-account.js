export default function makeListTransfersByAccount ({ transfersDb }) {
  return async function listTransfersByAccount ({ accountId }) {
    const transfers = await transfersDb.findByAccountId({ accountId })
    return transfers
  }
}

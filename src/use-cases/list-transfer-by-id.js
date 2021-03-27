export default function makeListTransferById ({ transfersDb }) {
  return async function listTransferById ({ id }) {
    const transfer = await transfersDb.findById({ id })
    return transfer
  }
}

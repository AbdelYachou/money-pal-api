export default function makeListTransfers ({ transfersDb }) {
  return async function listTransfers () {
    const transfers = await transfersDb.findAll()
    return transfers
  }
}


import makeTransfer from '../transfer'

export default function makeEditTransfer ({ transfersDb }) {
  return async function editTransfer ({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.')
    }
    if (!changes) {
      throw new Error('You must supply the transfer information.')
    }
    const existing = await transfersDb.findById({ id })
    if (!existing) {
      throw new RangeError('Transfer not found.')
    }
    const transfer = makeTransfer({ ...existing, ...changes, modifiedOn: null })
    const updated = await transfersDb.update({
      id: transfer.getId(),
      modifiedOn: transfer.getModifiedOn(),
      concept: transfer.getConcept(),
      commission: transfer.getCommision(),
      operationDate: transfer.getOperationDate(),
      ammount: transfer.getAmmount(),
      source: transfer.getSource(),
      destination: transfer.getDestination()
    })
    return { ...existing, ...updated }
  }
}

import makeTransfer from '../transfer/index.js'

export default function makeAddTransfer ({ transfersDb }) {
  return async function addTransfer (transferInfo) {
    const transfer = makeTransfer(transferInfo)

    return transfersDb.insert({
      createdOn: transfer.getCreatedOn(),
      modifiedOn: transfer.getModifiedOn(),
      concept: transfer.getConcept(),
      commission: transfer.getCommision(),
      operationDate: transfer.getOperationDate(),
      ammount: transfer.getAmmount(),
      source: transfer.getSource(),
      destination: transfer.getDestination()
    })
  }
}

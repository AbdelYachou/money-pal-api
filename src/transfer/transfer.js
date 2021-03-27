export default function buildMakeTransfer (Id) {
  return function makeTransfer ({
    id = Id.makeId(),
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    concept,
    commission,
    operationDate = Date.now(),
    ammount,
    source,
    destination
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('Transfer must have a valid id.')
    }
    if (!commission) {
      throw new Error('Transfer must have a commission.')
    }
    if (!operationDate) {
      throw new Error('Transfer must have an operationDate.')
    }
    if (!ammount) {
      throw new Error('Transfer must have an ammount.')
    }
    if (!source) {
      throw new Error('Transfer must have a source.')
    }
    if (!destination) {
      throw new Error('Transfer must have a destination.')
    }

    return Object.freeze({
      getId: () => id,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
      getConcept: () => concept,
      getCommision: () => commission,
      getOperationDate: () => operationDate,
      getAmmount: () => ammount,
      getSource: () => source,
      getDestination: () => destination
    })
  }
}

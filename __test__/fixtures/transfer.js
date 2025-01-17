import faker from 'faker'
import cuid from 'cuid'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export default function makeFakeTransfer (overrides) {
  const transfer = {
    id: Id.makeId(),
    createdOn: Date.now(),
    modifiedOn: Date.now(),
    concept: faker.lorem.sentence(),
    commission: faker.random.number(),
    operationDate: faker.date.future(),
    ammount: faker.finance.amount(),
    source: faker.finance.iban(),
    destination: faker.finance.iban()
  }
  return {
    ...transfer,
    ...overrides
  }
}

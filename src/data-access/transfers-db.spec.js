import { describe, it, expect, beforeEach } from '@jest/globals'
import makeDb from '../../__test__/fixtures/db.js'
import makeTransfersDb from './transfers-db.js'
import makeFakeTransfer from '../../__test__/fixtures/transfer.js'

describe('transfers db', () => {
  let transfersDb

  beforeEach(async () => {
    transfersDb = makeTransfersDb({ makeDb })
  })

  it('lists transfers', async () => {
    const inserts = await Promise.all(
      [makeFakeTransfer(), makeFakeTransfer(), makeFakeTransfer()].map(
        transfersDb.insert
      )
    )
    const found = await transfersDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('inserts a transfer', async () => {
    const transfer = makeFakeTransfer()
    const result = await transfersDb.insert(transfer)
    return expect(result).toEqual(transfer)
  })

  it('finds a transfer by id', async () => {
    const transfer = makeFakeTransfer()
    await transfersDb.insert(transfer)
    const found = await transfersDb.findById(transfer)
    expect(found).toEqual(transfer)
  })

  it('updates a transfer', async () => {
    const transfer = makeFakeTransfer({ ammount: 10 })
    await transfersDb.insert(transfer)
    transfer.ammount = 0
    const updated = await transfersDb.update(transfer)
    return expect(updated.ammount).toBe(transfer.ammount)
  })

  it('finds all transfers for an account', async () => {
    const transferOfAccountA = makeFakeTransfer()
    const transferOfAccountB = makeFakeTransfer({ source: null })
    await Promise.all([transferOfAccountA, transferOfAccountB].map(transfersDb.insert))
    expect(
      (await transfersDb.findByAccountId({
        accountId: transferOfAccountA.source
      }))[0]
    ).toEqual(transferOfAccountA)
  })

  it('deletes a transfer', async () => {
    const transfer = makeFakeTransfer()
    await transfersDb.insert(transfer)
    const deletedCount = await transfersDb.remove(transfer)
    return expect(deletedCount).toBe(1)
  })
})

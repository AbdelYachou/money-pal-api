import { describe, it, expect } from '@jest/globals'
import makeFakeTransfer from '../../__test__/fixtures/transfer'
import makeTransfer from './'

describe('transfer', () => {
  it('must have valid commission', () => {
    const transfer = makeFakeTransfer({ commission: null })
    expect(() => makeTransfer(transfer)).toThrow('Transfer must have a commission.')
  })
  it('can have an ammount', () => {
    const transfer = makeFakeTransfer({ ammount: null })
    expect(() => makeTransfer(transfer)).toThrow('Transfer must have an ammount.')
  })
  it('must have a source', () => {
    const noSource = makeFakeTransfer({ source: undefined })
    expect(() => makeTransfer(noSource)).toThrow('Transfer must have a source.')
  })
  it('must have a destination', () => {
    const noDestination = makeFakeTransfer({ destination: undefined })
    expect(() => makeTransfer(noDestination)).toThrow('Transfer must have a destination.')
  })
  it('can have an id', () => {
    const transfer = makeFakeTransfer({ id: 'invalid' })
    expect(() => makeTransfer(transfer)).toThrow('Transfer must have a valid id.')
    const noId = makeFakeTransfer({ id: undefined })
    expect(() => makeTransfer(noId)).not.toThrow()
  })
  it('can create an id', () => {
    const noId = makeFakeTransfer({ id: undefined })
    const transfer = makeTransfer(noId)
    expect(transfer.getId()).toBeDefined()
  })
  it('can have an concept as optional', () => {
    const transfer = makeFakeTransfer({ concept: undefined })
    expect(() => makeTransfer(transfer)).not.toThrow()
  })
  it('is createdOn now in UTC', () => {
    const noCreationDate = makeFakeTransfer({ createdOn: undefined })
    expect(noCreationDate.createdOn).not.toBeDefined()
    const d = makeTransfer(noCreationDate).getCreatedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('is modifiedOn now in UTC', () => {
    const noModifiedOnDate = makeFakeTransfer({ modifiedOn: undefined })
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined()
    const d = makeTransfer(noModifiedOnDate).getModifiedOn()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
  it('is operationDate now in UTC', () => {
    const noOperationDate = makeFakeTransfer({ operationDate: undefined })
    expect(noOperationDate.operationDate).not.toBeDefined()
    const d = makeTransfer(noOperationDate).getOperationDate()
    expect(d).toBeDefined()
    expect(new Date(d).toUTCString().substring(26)).toBe('GMT')
  })
})

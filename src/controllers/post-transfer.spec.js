import { describe, it, expect } from '@jest/globals'
import makePostTransfer from './post-transfer.js'
import makeFakeTransfer from '../../__test__/fixtures/transfer.js'

describe('post transfer controller', () => {
  it('successfully posts a transfer', async () => {
    const postTransfer = makePostTransfer({ addTransfer: c => c })
    const transfer = makeFakeTransfer()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: transfer
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(request.body.modifiedOn).toUTCString()
      },
      statusCode: 201,
      body: { posted: request.body }
    }
    const actual = await postTransfer(request)
    expect(actual).toEqual(expected)
  })

  it('reports user errors', async () => {
    const postTransfer = makePostTransfer({
      addTransfer: () => {
        throw Error('Pow!')
      }
    })
    const fakeTransfer = makeFakeTransfer()
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: fakeTransfer
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await postTransfer(request)
    expect(actual).toEqual(expected)
  })
})

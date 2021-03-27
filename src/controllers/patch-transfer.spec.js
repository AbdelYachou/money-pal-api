import makePatchTransfer from './patch-transfer'
import makeFakeTransfer from '../../__test__/fixtures/transfer'

describe('patch transfer controller', () => {
  it('Should successfully patches a transfer', async () => {
    const fakeTransfer = makeFakeTransfer()
    const patchTransfer = makePatchTransfer({ editTransfer: c => c })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: fakeTransfer.id
      },
      body: fakeTransfer
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date(fakeTransfer.modifiedOn).toUTCString()
      },
      statusCode: 200,
      body: { patched: request.body }
    }
    const actual = await patchTransfer(request)
    expect(actual).toEqual(expected)
  })
  it('Should reports user errors', async () => {
    const fakeTransfer = makeFakeTransfer()
    const patchTransfer = makePatchTransfer({
      editTransfer: () => {
        throw Error('Pow!')
      }
    })
    const request = {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        id: fakeTransfer.id
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
    const actual = await patchTransfer(request)
    expect(actual).toEqual(expected)
  })
})

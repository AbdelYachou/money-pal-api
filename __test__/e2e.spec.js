import axios from 'axios'
import transfersDb, { makeDb } from '../src/data-access'
import makeFakeTransfer from './fixtures/transfer'
import dotenv from 'dotenv'
dotenv.config()

describe('Transfers API', () => {

  beforeAll(() => {
    axios.defaults.baseURL = process.env.DM_BASE_URL
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500
    }
  })

  afterAll(async () => {
    const db = await makeDb()
    return db.collection('transfers').drop()
  })

  describe('adding transfers', () => {
    it('adds a transfer to the database', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined })
      )
      expect(response.status).toBe(201)
      const { posted } = response.data
      const doc = await transfersDb.findById(posted)
      expect(doc).toEqual(posted)
      return transfersDb.remove(posted)
    })
    it('requires transfer to contain an createdOn Date', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, createdOn: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
    it('requires transfer to contain an modifiedOn Date', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, modifiedOn: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
    it('requires transfer to contain a commission', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, commission: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
    it('requires transfer to contain a operationDate', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, operationDate: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
    it('requires transfer to contain an ammount', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, ammount: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
    it('requires transfer to contain a source', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, source: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
    it('requires transfer to contain a destination', async () => {
      const response = await axios.post(
        '/transfers',
        makeFakeTransfer({ id: undefined, destination: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
  })
  describe('modfying transfers', () => {
    it('modifies a transfer', async () => {
      const transfer = makeFakeTransfer({
        ammount: 0
      })
      await transfersDb.insert(transfer)
      const response = await axios.patch(`/transfers/${transfer.id}`, transfer)
      expect(response.status).toBe(200)
      expect(response.data.patched.text).toBe('<p>changed!</p>')
      return transfersDb.remove(transfer)
    })
  })
  describe('deleting transfers', () => {
    it('deletes', async () => {
      const transfer = makeFakeTransfer()
      await transfersDb.insert(transfer)
      const result = await axios.delete(`/transfers/${transfer.id}`)
      expect(result.data.deleted.deletedCount).toBe(1)
    })
  })
})

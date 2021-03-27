import Id from '../Id'

import { ObjectId } from 'mongodb';
export default function makeTransfersDb ({ makeDb }) {
  return Object.freeze({
    findAll,
    findById,
    findByAccountId,
    insert,
    remove,
    update
  })
  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('transfers').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('transfers').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }
  async function findByAccountId ({ accountId }) {
    const db = await makeDb()
    const query = { source: accountId }
    const result = await db.collection('transfers').find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function insert ({ id: _id = Id.makeId(), ...transferInfo }) {
    const db = await makeDb()
    const result = await db.collection('transfers').insertOne({  _id, ...transferInfo })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }
  async function update ({ id: _id, ...transferInfo }) {
    const db = await makeDb()
    const result = await db.collection('transfers').updateOne({ _id }, { $set: { ...transferInfo } })
    return result.modifiedCount > 0 ? { id: _id, ...transferInfo } : null
  }
  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('transfers').deleteOne({ _id })
    return result.deletedCount
  }
}

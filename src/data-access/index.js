import makeTransfersDb from './transfers-db'
import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = process.env.DM_TRANSFERS_DB_URL
const dbName = process.env.DM_TRANSFERS_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

export async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}

const transfersDb = makeTransfersDb({ makeDb })
export default transfersDb

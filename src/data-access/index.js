import makeTransfersDb from './transfers-db.js'
import { MongoClient, ServerApiVersion } from 'mongodb'

const url = process.env.DM_TRANSFERS_DB_URL
const dbName = process.env.DM_TRANSFERS_DB_NAME
console.log('connecting to ...', url)
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function makeDb () {
  try {
    await client.connect()
  } catch (err) {
    console.log('Unnable to establish db connection', err)
  }

  return client.db(dbName)
}

const transfersDb = makeTransfersDb({ makeDb })
export default transfersDb

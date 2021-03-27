import { makeDb } from '../src/data-access'
import dotenv from 'dotenv'
dotenv.config()
;(async function setupDb () {
  console.log('Setting up database...')
  // database collection will automatically be created if it does not exist
  const db = await makeDb()
   const result = await db.collection('transfers')
  console.log(result)
  console.log('Database setup complete...')
  process.exit()
})()

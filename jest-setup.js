import path, { dirname } from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { MongoMemoryServer } from 'mongodb-memory-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const globalConfigPath = path.join(__dirname, 'globalConfigMongo.json')

const mongod =
  global.__MONGOD__ ||
  new MongoMemoryServer({
    autoStart: false
  })

export default async () => {
  if (!mongod.runningInstance) {
    await mongod.start()
  }

  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getUri()
  }

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig))

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod
}

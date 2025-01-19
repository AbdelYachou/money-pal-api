import { createRequire } from 'node:module'
import path, { dirname } from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)

const NodeEnvironment = require('jest-environment-node', import.meta.url).default
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const globalConfigPath = path.join(__dirname, 'globalConfigMongo.json')

export default class MongoEnvironment extends NodeEnvironment {
  constructor (config) { // eslint-disable-line no-useless-constructor
    super(config)
  }

  async setup () {
    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'))

    this.global.__MONGO_URI__ = globalConfig.mongoUri
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName

    await super.setup()
  }

  async teardown () {
    await super.teardown()
  }

  runScript (script) {
    return super.runScript(script)
  }
}

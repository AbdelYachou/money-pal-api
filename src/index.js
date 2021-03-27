import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import {
  deleteTransfer,
  getTransfers,
  getTransferById,
  getTransfersByAccount,
  notFound,
  postTransfer,
  patchTransfer
} from './controllers'
import makeCallback from './express-callback'

dotenv.config()

const apiRoot = ''
const app = express()
app.use(bodyParser.json())

app.post(`${apiRoot}/transfers`, makeCallback(postTransfer))
app.delete(`${apiRoot}/transfers/:id`, makeCallback(deleteTransfer))
app.delete(`${apiRoot}/transfers`, makeCallback(deleteTransfer))
app.patch(`${apiRoot}/transfers/:id`, makeCallback(patchTransfer))
app.patch(`${apiRoot}/transfers`, makeCallback(patchTransfer))
app.get(`${apiRoot}/transfers`, makeCallback(getTransfers))
app.get(`${apiRoot}/transfers/:id`, makeCallback(getTransferById))
app.get(`${apiRoot}/accounts/:id/transfers`, makeCallback(getTransfersByAccount))
app.use(makeCallback(notFound))

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})

export default app

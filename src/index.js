import express, { json } from 'express'

import {
  deleteTransfer,
  getTransfers,
  getTransferById,
  getTransfersByAccount,
  notFound,
  postTransfer,
  patchTransfer
} from './controllers/index.js'
import makeCallback from './express-callback/index.js'

const apiRoot = ''
const app = express()
app.use(json())

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

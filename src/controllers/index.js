import {
  addTransfer,
  editTransfer,
  listTransfers,
  listTransferById,
  listTransfersByAccount,
  removeTransfer
} from '../use-cases/index.js'
import makeDeleteTransfer from './delete-transfer.js'
import makeGetTransfers from './get-transfers.js'
import makeGetTransferById from './get-transfer-by-id.js'
import makeGetTransfersByAccount from './get-transfers-by-account.js'
import makePostTransfer from './post-transfer.js'
import makePatchTransfer from './patch-transfer.js'
import notFound from './not-found.js'

const deleteTransfer = makeDeleteTransfer({ removeTransfer })
const getTransfers = makeGetTransfers({ listTransfers })
const getTransferById = makeGetTransferById({ listTransferById })
const getTransfersByAccount = makeGetTransfersByAccount({ listTransfersByAccount })
const postTransfer = makePostTransfer({ addTransfer })
const patchTransfer = makePatchTransfer({ editTransfer })

const transferController = Object.freeze({
  deleteTransfer,
  getTransfers,
  getTransferById,
  getTransfersByAccount,
  notFound,
  postTransfer,
  patchTransfer
})

export default transferController
export { deleteTransfer, getTransfers, getTransferById, getTransfersByAccount, notFound, postTransfer, patchTransfer }

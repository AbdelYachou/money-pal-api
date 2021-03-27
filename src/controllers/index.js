import {
  addTransfer,
  editTransfer,
  listTransfers,
  listTransferById,
  listTransfersByAccount,
  removeTransfer
} from '../use-cases'
import makeDeleteTransfer from './delete-transfer'
import makeGetTransfers from './get-transfers'
import makeGetTransferById from './get-transfer-by-id'
import makeGetTransfersByAccount from './get-transfers-by-account'
import makePostTransfer from './post-transfer'
import makePatchTransfer from './patch-transfer'
import notFound from './not-found'

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

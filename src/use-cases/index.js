import makeAddTransfer from './add-transfer.js'
import makeEditTransfer from './edit-transfer.js'
import makeRemoveTransfer from './remove-transfer.js'
import makeListTransfers from './list-transfers.js'
import makeListTransferById from './list-transfer-by-id.js'
import makeListTransfersByAccount from './list-transfers-by-account.js'
import transfersDb from '../data-access/index.js'

const addTransfer = makeAddTransfer({ transfersDb })
const editTransfer = makeEditTransfer({ transfersDb })
const listTransfers = makeListTransfers({ transfersDb })
const listTransferById = makeListTransferById({ transfersDb })
const listTransfersByAccount = makeListTransfersByAccount({ transfersDb })
const removeTransfer = makeRemoveTransfer({ transfersDb })

const transferService = Object.freeze({
  addTransfer,
  editTransfer,
  listTransfers,
  listTransferById,
  listTransfersByAccount,
  removeTransfer
})

export default transferService
export { addTransfer, editTransfer, listTransfers, listTransferById, listTransfersByAccount, removeTransfer }

import makeAddTransfer from './add-transfer'
import makeEditTransfer from './edit-transfer'
import makeRemoveTransfer from './remove-transfer'
import makeListTransfers from './list-transfers'
import makeListTransferById from './list-transfer-by-id'
import makeListTransfersByAccount from './list-transfers-by-account'
import transfersDb from '../data-access'

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

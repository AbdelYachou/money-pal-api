export default function makeRemoveTransfer ({ transfersDb }) {
  return async function removeTransfer ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a transfer id.')
    }

    const transferToDelete = await transfersDb.findById({ id })

    if (!transferToDelete) {
      return deleteNothing()
    }

    return deleteTransfer(transferToDelete)
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      message: 'Transfer not found, nothing to delete.'
    }
  }

  async function deleteTransfer (transfer) {
    await transfersDb.remove(transfer)
    return {
      deletedCount: 1,
      message: 'Transfer deleted.'
    }
  }
}

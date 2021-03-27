export default function makeDeleteTransfer ({ removeTransfer }) {
  return async function deleteTransfer (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const deleted = await removeTransfer({ id: httpRequest.params.id })
      return {
        headers,
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted }
      }
    } catch (e) {
      // TODO: Error logging
      console.error('Error makeDeleteTransfer', e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}

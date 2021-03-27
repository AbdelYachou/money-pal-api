export default function makeGetTransfersByAccount ({ listTransfersByAccount }) {
  return async function getTransfersByAccount (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const resultListTransfersByAccount = await listTransfersByAccount({ accountId: httpRequest.params.id })
      return {
        headers,
        statusCode: 200,
        body: resultListTransfersByAccount
      }
    } catch (e) {
      console.error('Error makeGetTransfersByAccount', e)
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

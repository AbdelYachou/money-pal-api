export default function makeGetTransferById ({ listTransferById }) {
  return async function getTransferById (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const resultListTransferById = await listTransferById({ id: httpRequest.params.id })
      return {
        headers,
        statusCode: 200,
        body: resultListTransferById
      }
    } catch (e) {
      console.error('Error makeGetTransferById', e)
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

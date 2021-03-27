export default function makeGetTransfers ({ listTransfers }) {
  return async function getTransfers (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const postTransfers = await listTransfers()
      return {
        headers,
        statusCode: 200,
        body: postTransfers
      }
    } catch (e) {
      console.error('Error makeGetTransfers', e)
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

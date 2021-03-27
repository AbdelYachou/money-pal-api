export default function makePostTransfer ({ addTransfer }) {
  return async function postTransfer (httpRequest) {
    try {
      const { ...transferInfo } = httpRequest.body
      const posted = await addTransfer({
        ...transferInfo
      })
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(posted.modifiedOn).toUTCString()
        },
        statusCode: 201,
        body: { posted }
      }
    } catch (e) {
      console.error('Error makePostTransfer', e)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}

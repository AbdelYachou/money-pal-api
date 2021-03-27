export default function makePatchTransfer ({ editTransfer }) {
  return async function patchTransfer (httpRequest) {
    try {
      const { ...transferInfo } = httpRequest.body
      const toEdit = {
        ...transferInfo,
        id: httpRequest.params.id
      }
      const patched = await editTransfer(toEdit)
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(patched.modifiedOn).toUTCString()
        },
        statusCode: 200,
        body: { patched }
      }
    } catch (e) {
      console.error('Error makePatchTransfer', e)
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 404,
          body: {
            error: e.message
          }
        }
      }
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

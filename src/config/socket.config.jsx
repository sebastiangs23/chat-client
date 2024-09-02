import Parse from 'parse'
import LiveQueryClient from 'parse/lib/browser/LiveQueryClient'

const devMode= import.meta.env.VITE_DEVELOPMENT_MODE
const appId = import.meta.env.VITE_MORALIS_APP_ID
const masterKey = import.meta.env.VITE_MORALIS_MASTER_KEY_PROD
const wsUrl = devMode === 'prod' ? import.meta.env.VITE_WS_URL_PROD : import.meta.env.VITE_WS_URL_DEV
const serverUrl = devMode === 'prod' ? import.meta.env.VITE_MORALIS_SERVER_URL_PROD : import.meta.env.VITE_MORALIS_SERVER_URL_DEV

const socketConnect = () => {
  Parse.initialize(appId)
  Parse.serverURL = serverUrl

  const client = new LiveQueryClient({
    applicationId: appId,
    serverURL: wsUrl,
    masterKey: masterKey,
  })

  console.log('al percer todo bien con el socketconnect!', client)

  return {
    client,
  }
}

export default socketConnect

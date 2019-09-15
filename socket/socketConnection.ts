import { Socket } from 'phoenix'
import { BASE_URL } from '../apiServices/apiConnector'

type eventFunc = (
  event: string,
  eventHandlerFunc: (message?: any) => void
) => void
export type SocketEventHandler = {
  on: eventFunc
}

function connect(jwt: string, onError: () => void): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const socket = new Socket(`${BASE_URL}socket`, {
      params: {
        jwt
      }
    })

    socket.onError(onError)

    socket.onOpen(() => {
      resolve(socket)
    })

    socket.connect()
  })
}

async function establishNew(
  jwt: string,
  relatedUserIds: string[],
  onError: () => void
) {
  const socket = await connect(
    jwt,
    () => {
      console.log('Error, retrying')
    }
  )
  const channels = relatedUserIds.map(userId => {
    const channel = socket.channel(`user:${userId}`)
    channel.join()
    return { channel, userId }
  })

  return {
    on: (event: string, eventHandler: (message?: any) => void) => {
      channels.map(({ channel }) => channel.on(event, eventHandler))
    }
  }
}

let singletonSocketEventHandler: Promise<SocketEventHandler> | null = null

export async function establishedSocket(
  jwt: string,
  relatedUserIds: string[],
  onError: () => void
) {
  if (!singletonSocketEventHandler) {
    singletonSocketEventHandler = establishNew(jwt, relatedUserIds, onError)
  }
  return singletonSocketEventHandler
}

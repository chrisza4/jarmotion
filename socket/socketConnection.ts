import { Socket } from 'phoenix'
import { BASE_URL } from '../apiServices/apiConnector'

export function connect(jwt: string, onError: () => void): Promise<Socket> {
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

export function listen(socket: Socket, userId: string) {
  const channel = socket.channel(`user:${userId}`)
  channel.join()
  return channel
}

import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null


export const connectSocket = (token: string): Socket => {
  if (socket?.connected) return socket

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    autoConnect: true,
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  return socket
}


export const getSocket = (): Socket | null => socket


export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

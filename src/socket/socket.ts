import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export const connectSocket = (token: string): Socket => {
  
  if (socket?.connected) return socket

  
  if (socket) {
    socket.auth = { token }
    socket.connect()
    return socket
  }

  
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id)
  })

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err.message)
  })

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason)
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
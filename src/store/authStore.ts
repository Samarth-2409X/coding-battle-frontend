import { create } from 'zustand'
import { IUser } from '../types'

interface AuthState {
  user: IUser | null
  token: string | null
  isLoggedIn: boolean

 
  login: (user: IUser, token: string) => void
  logout: () => void
  updateUser: (user: IUser) => void
}

const useAuthStore = create<AuthState>((set) => ({
  
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),

  login: (user, token) => {
   
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token, isLoggedIn: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, isLoggedIn: false })
  },

  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    set({ user })
  },
}))

export default useAuthStore

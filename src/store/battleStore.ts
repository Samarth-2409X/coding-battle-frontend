import { create } from 'zustand'
import { IBattleRoom, IProblem, SubmissionStatus } from '../types'

interface SubmissionResult {
  userId: string
  status: SubmissionStatus
  passedCases: number
  total: number
}

interface BattleState {
  room: IBattleRoom | null
  problem: IProblem | null
  countdown: number | null
  submissionResult: SubmissionResult | null
  winner: { winnerId: string; winnerUsername: string } | null
  myCode: string
  myLanguage: string

 
  setRoom: (room: IBattleRoom) => void
  setProblem: (problem: IProblem) => void
  setCountdown: (seconds: number | null) => void
  setSubmissionResult: (result: SubmissionResult) => void
  setWinner: (winner: { winnerId: string; winnerUsername: string }) => void
  setMyCode: (code: string) => void
  setMyLanguage: (language: string) => void
  resetBattle: () => void
}

const useBattleStore = create<BattleState>((set) => ({
  room: null,
  problem: null,
  countdown: null,
  submissionResult: null,
  winner: null,
  myCode: '',
  myLanguage: 'javascript',

  setRoom: (room) => set({ room }),
  setProblem: (problem) => set({ problem }),
  setCountdown: (countdown) => set({ countdown }),
  setSubmissionResult: (submissionResult) => set({ submissionResult }),
  setWinner: (winner) => set({ winner }),
  setMyCode: (myCode) => set({ myCode }),
  setMyLanguage: (myLanguage) => set({ myLanguage }),

  resetBattle: () =>
    set({
      room: null,
      problem: null,
      countdown: null,
      submissionResult: null,
      winner: null,
      myCode: '',
      myLanguage: 'javascript',
    }),
}))

export default useBattleStore

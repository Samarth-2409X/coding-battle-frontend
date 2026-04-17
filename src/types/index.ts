export interface IUserStats {
  totalBattles: number
  wins: number
  losses: number
  rating: number
  rank: number
}

export interface IUser {
  _id: string
  username: string
  email: string
  avatar?: string
  stats: IUserStats
  createdAt: string
}


export type Difficulty = 'easy' | 'medium' | 'hard'

export interface IExample {
  input: string
  output: string
  explanation?: string
}

export interface ITestCase {
  input: string
  expectedOutput: string
  isHidden: boolean
}

export interface IStarterCode {
  javascript: string
  python: string
  cpp: string
  java: string
}

export interface IProblem {
  _id: string
  title: string
  description: string
  difficulty: Difficulty
  tags: string[]
  examples: IExample[]
  starterCode: IStarterCode
  constraints: string
  createdBy: { username: string }
  isActive: boolean
  createdAt: string
}


export type BattleStatus = 'waiting' | 'countdown' | 'active' | 'finished'
export type Language = 'javascript' | 'python' | 'cpp' | 'java'
export type SubmissionStatus =
  | 'pending'
  | 'accepted'
  | 'wrong_answer'
  | 'time_limit_exceeded'
  | 'runtime_error'
  | 'compilation_error'

export interface IPlayer {
  userId: string
  username: string
  socketId: string
  isReady: boolean
  submissionStatus: string
  score: number
  language: string
}

export interface IBattleRoom {
  _id: string
  roomCode: string
  status: BattleStatus
  problem?: IProblem
  players: IPlayer[]
  maxPlayers: number
  timeLimit: number
  startedAt?: string
  finishedAt?: string
  winnerId?: string
  createdBy: string
  createdAt: string
}


export interface ITestResult {
  testCaseIndex: number
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput: string
  executionTime?: number
}

export interface ISubmission {
  _id: string
  userId: string
  problemId: IProblem | string
  battleRoomId?: string
  code: string
  language: Language
  status: SubmissionStatus
  testResults: ITestResult[]
  passedTestCases: number
  totalTestCases: number
  executionTime?: number
  createdAt: string
}


export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}


export interface AuthResponse {
  token: string
  user: IUser
}

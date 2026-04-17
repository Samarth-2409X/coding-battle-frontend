import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connectSocket, disconnectSocket } from '../socket/socket'
import useAuthStore from '../store/authStore'
import useBattleStore from '../store/battleStore'
import api from '../api/axios'
import { Language, IBattleRoom } from '../types'
import CodeEditor from '../components/battle/CodeEditor'
import ProblemPanel from '../components/battle/ProblemPanel'
import PlayerCard from '../components/battle/PlayerCard'
import Timer from '../components/battle/Timer'
import Button from '../components/ui/Button'
import Loader from '../components/ui/Loader'

const LANGUAGE_IDS: Record<Language, number> = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
}

const LANGUAGES: Language[] = ['javascript', 'python', 'cpp', 'java']

const Battle = () => {
  const { roomCode } = useParams<{ roomCode: string }>()
  const navigate = useNavigate()
  const { user, token } = useAuthStore()
  const {
    room, problem, countdown, submissionResult, winner,
    myCode, myLanguage,
    setRoom, setProblem, setCountdown, setSubmissionResult, setWinner,
    setMyCode, setMyLanguage, resetBattle,
  } = useBattleStore()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!token || !roomCode) return

    const socket = connectSocket(token)

    
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/api/battles/${roomCode}`)
        const fetchedRoom: IBattleRoom = res.data.data.room
        setRoom(fetchedRoom)
        if (fetchedRoom.problem) {
          setProblem(fetchedRoom.problem)
          setMyCode(fetchedRoom.problem.starterCode?.javascript || '')
        }
      } catch {
        navigate('/battle/create')
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()

  
    socket.emit('JOIN_ROOM', { roomCode })

    
    socket.on('ROOM_UPDATED', ({ room }) => {
      setRoom(room)
    })

    socket.on('PLAYER_JOINED', () => {
      
      api.get(`/api/battles/${roomCode}`).then((res) => setRoom(res.data.data.room))
    })

    socket.on('PLAYER_LEFT', () => {
      api.get(`/api/battles/${roomCode}`).then((res) => setRoom(res.data.data.room))
    })

    socket.on('COUNTDOWN', ({ seconds }: { seconds: number }) => {
      setCountdown(seconds)
    })

    socket.on('BATTLE_STARTED', ({ problem, timeLimit }) => {
      setProblem(problem)
      setMyCode(problem.starterCode?.javascript || '')
      setCountdown(null)
      
      api.get(`/api/battles/${roomCode}`).then((res) => setRoom(res.data.data.room))
    })

    socket.on('SUBMISSION_RESULT', (result) => {
      setSubmissionResult(result)
      setSubmitting(false)
    })

    socket.on('BATTLE_FINISHED', ({ winnerId, winnerUsername }) => {
      setWinner({ winnerId, winnerUsername })
    })

    socket.on('ERROR', ({ message }: { message: string }) => {
      console.error('Socket error:', message)
    })

    
    return () => {
      socket.emit('LEAVE_ROOM', { roomCode })
      socket.off('ROOM_UPDATED')
      socket.off('PLAYER_JOINED')
      socket.off('PLAYER_LEFT')
      socket.off('COUNTDOWN')
      socket.off('BATTLE_STARTED')
      socket.off('SUBMISSION_RESULT')
      socket.off('BATTLE_FINISHED')
      socket.off('ERROR')
      resetBattle()
    }
  }, [token, roomCode])

  const handleReady = () => {
    const socket = connectSocket(token!)
    socket.emit('PLAYER_READY', { roomCode })
    setIsReady(true)
  }

  const handleCodeChange = (code: string) => {
    setMyCode(code)
    const socket = connectSocket(token!)
    socket.emit('CODE_CHANGE', { roomCode, code, language: myLanguage })
  }

  const handleLanguageChange = (lang: Language) => {
    setMyLanguage(lang)
    if (problem) {
      setMyCode(problem.starterCode[lang] || '')
    }
  }

  const handleSubmit = () => {
    if (!room || !problem) return
    setSubmitting(true)
    const socket = connectSocket(token!)
    socket.emit('SUBMIT_CODE', {
      roomCode,
      code: myCode,
      language: myLanguage,
      languageId: LANGUAGE_IDS[myLanguage as Language],
    })
  }

  if (loading) return <Loader text="Joining battle room..." />

 
  if (winner) {
    const iWon = winner.winnerId === user?._id
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full space-y-5">
          <div className="text-6xl">{iWon ? '🏆' : '😔'}</div>
          <h1 className={`text-3xl font-bold ${iWon ? 'text-yellow-400' : 'text-gray-400'}`}>
            {iWon ? 'You Won!' : 'You Lost'}
          </h1>
          <p className="text-gray-400">
            {iWon
              ? 'Congratulations! You solved it first.'
              : `${winner.winnerUsername} solved it first.`}
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Button onClick={() => navigate('/battle/create')}>
              Play Again
            </Button>
            <Button variant="secondary" onClick={() => navigate('/leaderboard')}>
              Leaderboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  
  if (room?.status === 'waiting' || room?.status === 'countdown') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full space-y-6">

          
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Room Code</p>
            <p className="text-4xl font-black font-mono text-indigo-400 tracking-widest">
              {room.roomCode}
            </p>
            <p className="text-xs text-gray-500 mt-1">Share this with your opponent</p>
          </div>

         
          <div className="space-y-2">
            {room.players.map((player) => (
              <PlayerCard
                key={player.userId}
                player={player}
                isMe={player.userId === user?._id}
              />
            ))}
            {room.players.length < 2 && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-700 text-gray-600 text-sm">
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-700">?</div>
                Waiting for opponent...
              </div>
            )}
          </div>

          
          {countdown !== null && (
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Battle starting in</p>
              <p className="text-6xl font-black text-indigo-400">{countdown}</p>
            </div>
          )}

         
          {room.status === 'waiting' && room.players.length >= 2 && !isReady && (
            <Button fullWidth onClick={handleReady}>
              I'm Ready!
            </Button>
          )}

          {isReady && room.status === 'waiting' && (
            <div className="text-center text-green-400 text-sm font-medium">
              ✓ You're ready! Waiting for opponent...
            </div>
          )}
        </div>
      </div>
    )
  }

  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">

      
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">

        
        <div className="flex items-center gap-3">
          {room?.players.map((player) => (
            <PlayerCard
              key={player.userId}
              player={player}
              isMe={player.userId === user?._id}
            />
          ))}
        </div>

        
        {room?.startedAt && (
          <Timer
            startedAt={room.startedAt}
            timeLimit={room.timeLimit}
          />
        )}

        
        <div className="flex items-center gap-2">
          <select
            value={myLanguage}
            onChange={(e) => handleLanguageChange(e.target.value as Language)}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <Button onClick={handleSubmit} loading={submitting} variant="primary">
            Submit
          </Button>
        </div>
      </div>

      
      <div className="flex-1 flex overflow-hidden">

       
        <div className="w-2/5 border-r border-gray-800">
          {problem && <ProblemPanel problem={problem} />}
        </div>

        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-3">
            {problem && (
              <CodeEditor
                code={myCode}
                language={myLanguage as Language}
                onChange={handleCodeChange}
              />
            )}
          </div>

          
          {submissionResult && submissionResult.userId === user?._id && (
            <div className={`border-t px-4 py-3 flex items-center gap-4
              ${submissionResult.status === 'accepted'
                ? 'bg-green-900/20 border-green-800'
                : 'bg-red-900/20 border-red-800'
              }`}
            >
              <span className={`font-semibold text-sm
                ${submissionResult.status === 'accepted' ? 'text-green-400' : 'text-red-400'}`}
              >
                {submissionResult.status === 'accepted'
                  ? '✓ Accepted'
                  : `✗ ${submissionResult.status.replace(/_/g, ' ')}`}
              </span>
              <span className="text-gray-400 text-sm">
                {submissionResult.passedCases}/{submissionResult.total} test cases passed
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Battle

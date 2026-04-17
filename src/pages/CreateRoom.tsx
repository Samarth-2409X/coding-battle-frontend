import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState('')
  const [timeLimit, setTimeLimit] = useState(30)
  const [creating, setCreating] = useState(false)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  
  const handleCreate = async () => {
    setCreating(true)
    setError('')
    try {
      const res = await api.post('/api/battles/create', { mode: '1v1', timeLimit })
      navigate(`/battle/${res.data.data.room.roomCode}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create room')
    } finally {
      setCreating(false)
    }
  }

  
  const handleJoin = async () => {
    if (!roomCode.trim()) {
      setError('Please enter a room code')
      return
    }
    setJoining(true)
    setError('')
    try {
      await api.get(`/api/battles/${roomCode.toUpperCase()}`)
      navigate(`/battle/${roomCode.toUpperCase()}`)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Room not found')
    } finally {
      setJoining(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">Battle Room</h1>
        <p className="text-gray-400 text-sm">Create a new room or join with a code</p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6">

       
        <div className="card space-y-4">
          <h2 className="font-semibold text-gray-100">Create a room</h2>
          <p className="text-sm text-gray-400">
            A unique 6-character code will be generated. Share it with your opponent.
          </p>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-1.5">
              Time limit
            </label>
            <select
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="input-base"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>

          <Button fullWidth loading={creating} onClick={handleCreate}>
            Create Room
          </Button>
        </div>

        
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-600 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        
        <div className="card space-y-4">
          <h2 className="font-semibold text-gray-100">Join a room</h2>
          <p className="text-sm text-gray-400">
            Enter the 6-character code shared by your opponent.
          </p>

          <Input
            label="Room code"
            placeholder="ABC123"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            maxLength={6}
            className="uppercase tracking-widest text-lg text-center font-mono"
          />

          <Button fullWidth variant="secondary" loading={joining} onClick={handleJoin}>
            Join Room
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom

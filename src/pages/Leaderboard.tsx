import { useState, useEffect } from 'react'
import api from '../api/axios'
import { IUser } from '../types'
import Loader from '../components/ui/Loader'
import useAuthStore from '../store/authStore'

const Leaderboard = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const { user: currentUser } = useAuthStore()

  useEffect(() => {
    api.get('/api/auth/leaderboard')
      .then((res) => setUsers(res.data.data.users))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader text="Loading leaderboard..." />

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Leaderboard</h1>
        <p className="text-gray-400 text-sm">Top players ranked by rating</p>
      </div>

      <div className="card p-0 overflow-hidden">
        
        <div className="grid grid-cols-12 px-5 py-3 border-b border-gray-800 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span className="col-span-1">#</span>
          <span className="col-span-5">Player</span>
          <span className="col-span-2 text-center">Rating</span>
          <span className="col-span-2 text-center">Wins</span>
          <span className="col-span-2 text-center">Battles</span>
        </div>

        
        {users.map((u, index) => {
          const isMe = u._id === currentUser?._id
          const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600']
          const rankColor = index < 3 ? rankColors[index] : 'text-gray-600'
          const winRate = u.stats.totalBattles > 0
            ? Math.round((u.stats.wins / u.stats.totalBattles) * 100)
            : 0

          return (
            <div
              key={u._id}
              className={`grid grid-cols-12 px-5 py-4 border-b border-gray-800/50 items-center
                ${isMe ? 'bg-indigo-900/20' : 'hover:bg-gray-800/30'} transition-colors`}
            >
              
              <span className={`col-span-1 font-bold text-sm ${rankColor}`}>
                {index + 1}
              </span>

              
              <div className="col-span-5 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center
                  font-bold text-sm text-white
                  ${isMe ? 'bg-indigo-600' : 'bg-gray-700'}`}
                >
                  {u.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className={`text-sm font-medium ${isMe ? 'text-indigo-300' : 'text-gray-100'}`}>
                    {u.username}
                    {isMe && <span className="ml-1.5 text-xs text-indigo-400">(You)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{winRate}% win rate</p>
                </div>
              </div>

              
              <span className="col-span-2 text-center text-sm font-bold text-indigo-400">
                {u.stats.rating}
              </span>

              
              <span className="col-span-2 text-center text-sm text-green-400">
                {u.stats.wins}
              </span>

              
              <span className="col-span-2 text-center text-sm text-gray-400">
                {u.stats.totalBattles}
              </span>
            </div>
          )
        })}

        {users.length === 0 && (
          <div className="text-center py-16 text-gray-500 text-sm">
            No players yet. Be the first to battle!
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard

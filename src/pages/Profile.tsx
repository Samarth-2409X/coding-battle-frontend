import { useState, useEffect } from 'react'
import api from '../api/axios'
import useAuthStore from '../store/authStore'
import { ISubmission } from '../types'
import Loader from '../components/ui/Loader'
import { DifficultyBadge } from '../components/ui/Badge'

const Profile = () => {
  const { user } = useAuthStore()
  const [submissions, setSubmissions] = useState<ISubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/submissions/my')
      .then((res) => setSubmissions(res.data.data.submissions))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (!user) return null

  const winRate = user.stats.totalBattles > 0
    ? Math.round((user.stats.wins / user.stats.totalBattles) * 100)
    : 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

      
      <div className="card flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-black text-white">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{user.username}</h1>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs mt-0.5">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Rating', value: user.stats.rating, color: 'text-indigo-400' },
          { label: 'Battles', value: user.stats.totalBattles, color: 'text-gray-100' },
          { label: 'Wins', value: user.stats.wins, color: 'text-green-400' },
          { label: 'Win Rate', value: `${winRate}%`, color: 'text-yellow-400' },
        ].map((stat) => (
          <div key={stat.label} className="card text-center p-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Submissions</h2>

        {loading ? (
          <Loader text="Loading submissions..." />
        ) : submissions.length === 0 ? (
          <div className="card text-center text-gray-500 py-10">
            No submissions yet. Start practicing!
          </div>
        ) : (
          <div className="card p-0 overflow-hidden">
            {submissions.map((sub) => {
              const problem = sub.problemId as any
              const isAccepted = sub.status === 'accepted'
              return (
                <div
                  key={sub._id}
                  className="flex items-center justify-between px-5 py-3.5 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${isAccepted ? 'text-green-400' : 'text-red-400'}`}>
                      {isAccepted ? '✓' : '✗'}
                    </span>
                    <div>
                      <p className="text-sm text-gray-200">
                        {typeof problem === 'object' ? problem.title : 'Problem'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {sub.language} · {sub.passedTestCases}/{sub.totalTestCases} cases
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {typeof problem === 'object' && (
                      <DifficultyBadge difficulty={problem.difficulty} />
                    )}
                    <span className="text-xs text-gray-500">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

import { useState, useEffect } from 'react'
import api from '../api/axios'
import { IProblem, Difficulty } from '../types'
import ProblemCard from '../components/problem/ProblemCard'
import Loader from '../components/ui/Loader'

const DIFFICULTIES: ('all' | Difficulty)[] = ['all', 'easy', 'medium', 'hard']

const Problems = () => {
  const [problems, setProblems] = useState<IProblem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | Difficulty>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProblems()
  }, [filter])

  const fetchProblems = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?difficulty=${filter}` : ''
      const res = await api.get(`/api/problems${params}`)
      setProblems(res.data.data.problems)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  
  const filtered = problems.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

     
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Problems</h1>
        <p className="text-gray-400 text-sm">Practice coding problems before your battle</p>
      </div>

     
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-base flex-1"
        />

        
        <div className="flex gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors
                ${filter === d
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-100'
                }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      
      {loading ? (
        <Loader text="Loading problems..." />
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No problems found.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Problems

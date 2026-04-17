import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import { IProblem, Language, ISubmission } from '../types'
import CodeEditor from '../components/battle/CodeEditor'
import ProblemPanel from '../components/battle/ProblemPanel'
import Button from '../components/ui/Button'
import Loader from '../components/ui/Loader'
import { DifficultyBadge } from '../components/ui/Badge'

const LANGUAGES: Language[] = ['javascript', 'python', 'cpp', 'java']
const LANGUAGE_IDS: Record<Language, number> = {
  javascript: 63,
  python: 71,
  cpp: 54,
  java: 62,
}

const ProblemDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [problem, setProblem] = useState<IProblem | null>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState<Language>('javascript')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<ISubmission | null>(null)

  useEffect(() => {
    fetchProblem()
  }, [id])

  
  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '')
    }
  }, [language, problem])

  const fetchProblem = async () => {
    try {
      const res = await api.get(`/api/problems/${id}`)
      setProblem(res.data.data.problem)
      setCode(res.data.data.problem.starterCode.javascript)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!problem) return
    setSubmitting(true)
    setResult(null)

    try {
      const res = await api.post('/api/submissions', {
        problemId: problem._id,
        code,
        language,
        languageId: LANGUAGE_IDS[language],
      })
      setResult(res.data.data.submission)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader text="Loading problem..." />
  if (!problem) return <div className="text-center py-20 text-gray-500">Problem not found.</div>

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">

      
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-gray-100 text-sm">{problem.title}</h1>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        <div className="flex items-center gap-3">
          
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
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

        
        <div className="w-2/5 border-r border-gray-800 overflow-y-auto">
          <ProblemPanel problem={problem} />
        </div>

        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-3">
            <CodeEditor code={code} language={language} onChange={setCode} />
          </div>

          
          {result && (
            <div className="border-t border-gray-800 p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className={`font-semibold ${result.status === 'accepted' ? 'text-green-400' : 'text-red-400'}`}>
                  {result.status === 'accepted' ? '✓ Accepted' : '✗ ' + result.status.replace(/_/g, ' ')}
                </span>
                <span className="text-sm text-gray-400">
                  {result.passedTestCases}/{result.totalTestCases} test cases passed
                </span>
              </div>

              
              <div className="flex gap-2 flex-wrap">
                {result.testResults.map((t, i) => (
                  <div
                    key={i}
                    className={`text-xs px-2 py-1 rounded ${
                      t.passed ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
                    }`}
                  >
                    Case {i + 1}: {t.passed ? 'Pass' : 'Fail'}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProblemDetail

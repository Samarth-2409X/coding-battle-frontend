import { IProblem } from '../../types'
import { DifficultyBadge } from '../ui/Badge'

interface ProblemPanelProps {
  problem: IProblem
}

const ProblemPanel = ({ problem }: ProblemPanelProps) => {
  return (
    <div className="h-full overflow-y-auto p-4 space-y-5">

      {/* Title + difficulty */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-100">{problem.title}</h2>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      {/* Tags */}
      {problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
          {problem.description}
        </p>
      </div>

      {/* Constraints */}
      {problem.constraints && (
        <div>
          <h3 className="text-sm font-semibold text-gray-200 mb-2">Constraints</h3>
          <p className="text-sm text-gray-400 font-mono bg-gray-800 rounded-lg p-3">
            {problem.constraints}
          </p>
        </div>
      )}

      {/* Examples */}
      {problem.examples.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-200 mb-3">Examples</h3>
          <div className="space-y-3">
            {problem.examples.map((ex, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-3 space-y-2 text-sm font-mono">
                <div>
                  <span className="text-gray-500">Input: </span>
                  <span className="text-gray-200">{ex.input}</span>
                </div>
                <div>
                  <span className="text-gray-500">Output: </span>
                  <span className="text-green-400">{ex.output}</span>
                </div>
                {ex.explanation && (
                  <div>
                    <span className="text-gray-500">Explanation: </span>
                    <span className="text-gray-400 font-sans">{ex.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProblemPanel

import { Link } from 'react-router-dom'
import { IProblem } from '../../types'
import { DifficultyBadge } from '../ui/Badge'

interface ProblemCardProps {
  problem: IProblem
}

const ProblemCard = ({ problem }: ProblemCardProps) => {
  return (
    <Link
      to={`/problems/${problem._id}`}
      className="block card hover:border-gray-700 hover:bg-gray-800/50 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-100 truncate mb-1">
            {problem.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {problem.description}
          </p>
        </div>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>

      
      {problem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {problem.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

export default ProblemCard

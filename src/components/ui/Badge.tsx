import { Difficulty } from '../../types'

interface BadgeProps {
  label: string
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info'
}


interface DifficultyBadgeProps {
  difficulty: Difficulty
}

export const Badge = ({ label, variant = 'default' }: BadgeProps) => {
  const variants = {
    default: 'bg-gray-800 text-gray-300',
    success: 'bg-green-900/50 text-green-400',
    danger: 'bg-red-900/50 text-red-400',
    warning: 'bg-yellow-900/50 text-yellow-400',
    info: 'bg-indigo-900/50 text-indigo-400',
  }

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${variants[variant]}`}>
      {label}
    </span>
  )
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const map = {
    easy: 'bg-green-900/50 text-green-400',
    medium: 'bg-yellow-900/50 text-yellow-400',
    hard: 'bg-red-900/50 text-red-400',
  }

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${map[difficulty]}`}>
      {difficulty}
    </span>
  )
}

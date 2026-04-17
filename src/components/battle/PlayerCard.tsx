import { IPlayer } from '../../types'

interface PlayerCardProps {
  player: IPlayer
  isMe: boolean
}

const PlayerCard = ({ player, isMe }: PlayerCardProps) => {
  // Status color and label
  const statusMap: Record<string, { color: string; label: string }> = {
    pending:      { color: 'text-gray-400',   label: 'Coding...' },
    accepted:     { color: 'text-green-400',  label: 'Solved ✓' },
    wrong_answer: { color: 'text-red-400',    label: 'Wrong Answer' },
    error:        { color: 'text-yellow-400', label: 'Error' },
  }

  const status = statusMap[player.submissionStatus] || statusMap.pending

  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border
      ${isMe
        ? 'bg-indigo-900/30 border-indigo-700'
        : 'bg-gray-800/50 border-gray-700'
      }`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        font-bold text-sm text-white
        ${isMe ? 'bg-indigo-600' : 'bg-gray-600'}`}
      >
        {player.username.charAt(0).toUpperCase()}
      </div>

      {/* Name + status */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-100 truncate">
          {player.username}
          {isMe && <span className="ml-1.5 text-xs text-indigo-400">(You)</span>}
        </p>
        <p className={`text-xs ${status.color}`}>{status.label}</p>
      </div>

      {/* Ready badge when waiting */}
      {player.isReady && player.submissionStatus === 'pending' && (
        <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
          Ready
        </span>
      )}
    </div>
  )
}

export default PlayerCard

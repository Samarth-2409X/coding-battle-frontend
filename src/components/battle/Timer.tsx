import { useState, useEffect } from 'react'

interface TimerProps {
  startedAt: string      
  timeLimit: number       
  onExpire?: () => void
}

const Timer = ({ startedAt, timeLimit, onExpire }: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    const totalSeconds = timeLimit * 60
    const started = new Date(startedAt).getTime()

    const tick = () => {
      const elapsed = Math.floor((Date.now() - started) / 1000)
      const remaining = totalSeconds - elapsed

      if (remaining <= 0) {
        setSecondsLeft(0)
        onExpire?.()
        return
      }
      setSecondsLeft(remaining)
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [startedAt, timeLimit, onExpire])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  
  const isLow = secondsLeft < 120
  const isVeryLow = secondsLeft < 30

  return (
    <div className={`flex items-center gap-1.5 font-mono font-bold text-lg
      ${isVeryLow ? 'text-red-400 animate-pulse' : isLow ? 'text-yellow-400' : 'text-green-400'}`}
    >
      <span>⏱</span>
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}

export default Timer

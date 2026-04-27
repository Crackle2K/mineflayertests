function formatMs(ms) {
  return (ms / 1000).toFixed(2) + 's'
}

function getRating(ms, difficulty) {
  const thresholds = {
    Easy:   [30000, 60000],
    Medium: [45000, 90000],
    Hard:   [60000, 120000],
  }
  const [gold, silver] = thresholds[difficulty] ?? [60000, 120000]
  if (ms <= gold)   return { label: 'Gold',   color: 'text-yellow-400' }
  if (ms <= silver) return { label: 'Silver', color: 'text-slate-300'  }
  return                   { label: 'Bronze', color: 'text-amber-600'  }
}

const DIFF_TEXT = {
  Easy:   'text-[#96E072]',
  Medium: 'text-[#96E072]',
  Hard:   'text-[#E8FCCF]',
}

export default function GameOverScreen({ playerName, totalTimeMs, difficulty, submitting, onPlayAgain }) {
  const rating = getRating(totalTimeMs, difficulty)

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 fade-in">
      <h1 className="text-3xl font-extrabold text-[#e8fccf] mb-1">Nice work, {playerName}!</h1>
      <p className="text-[#96E072] text-sm mb-8">
        You finished all 10 courses on{' '}
        <span className={`font-semibold ${DIFF_TEXT[difficulty]}`}>{difficulty}</span> mode.
      </p>

      {/* Time card */}
      <div className="w-full max-w-sm bg-[#1a3d0f] border border-[#3E8914] rounded-2xl p-8 text-center mb-6 shadow-md">
        <p className="text-xs uppercase tracking-widest text-[#3DA35D] mb-3 font-semibold">Total Time</p>
        <p className="text-5xl font-mono font-extrabold text-[#e8fccf] mb-3">{formatMs(totalTimeMs)}</p>
        <span className={`text-sm font-bold ${rating.color}`}>{rating.label} Rating</span>
      </div>

      {submitting && (
        <p className="text-xs text-[#3DA35D] mb-4 animate-pulse">Saving your score...</p>
      )}

      <button
        onClick={onPlayAgain}
        className="w-full max-w-sm py-4 rounded-xl bg-[#3DA35D] hover:bg-[#96E072] text-[#0a2608] font-bold text-lg transition-colors duration-150 cursor-pointer"
      >
        Play Again
      </button>
    </div>
  )
}

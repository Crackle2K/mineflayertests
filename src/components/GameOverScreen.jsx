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
  Easy:   'text-emerald-400',
  Medium: 'text-violet-400',
  Hard:   'text-rose-400',
}

export default function GameOverScreen({ playerName, totalTimeMs, difficulty, submitting, onPlayAgain }) {
  const rating = getRating(totalTimeMs, difficulty)

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 fade-in">
      <h1 className="text-3xl font-extrabold text-white mb-1">Nice work, {playerName}!</h1>
      <p className="text-slate-400 text-sm mb-8">
        You finished all 10 courses on{' '}
        <span className={`font-semibold ${DIFF_TEXT[difficulty]}`}>{difficulty}</span> mode.
      </p>

      {/* Time card */}
      <div className="w-full max-w-sm bg-[#1a1830] border border-[#2d2b52] rounded-2xl p-8 text-center mb-6">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Total Time</p>
        <p className="text-5xl font-mono font-extrabold text-white mb-3">{formatMs(totalTimeMs)}</p>
        <span className={`text-sm font-bold ${rating.color}`}>{rating.label} Rating</span>
      </div>

      {submitting && (
        <p className="text-xs text-slate-500 mb-4 animate-pulse">Saving your score...</p>
      )}

      <button
        onClick={onPlayAgain}
        className="w-full max-w-sm py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-lg transition-colors duration-150 cursor-pointer"
      >
        Play Again
      </button>
    </div>
  )
}

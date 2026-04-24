import { useState } from 'react'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const DIFF_META = {
  Easy:   { label: 'Easy',   desc: 'Core Grade 9–12 courses',    accent: 'border-emerald-600 text-emerald-400' },
  Medium: { label: 'Medium', desc: 'Arts, tech & social courses', accent: 'border-violet-600 text-violet-400'  },
  Hard:   { label: 'Hard',   desc: 'Obscure & specialized codes', accent: 'border-rose-600 text-rose-400'      },
}

export default function StartScreen({ playerName, setPlayerName, onStart }) {
  const [selectedDiff, setSelectedDiff] = useState(null)
  const canStart = playerName.trim().length > 0 && selectedDiff !== null

  function handleStart() {
    if (canStart) onStart(playerName.trim(), selectedDiff)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 fade-in">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
        Course Code Game
      </h1>
      <p className="text-slate-400 text-sm mb-10">Ontario Edition · Guess 10 course codes as fast as you can</p>

      {/* Name input */}
      <div className="w-full max-w-sm mb-8">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          Your name
        </label>
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          placeholder="e.g. Alex"
          maxLength={30}
          className="w-full bg-[#1a1830] border border-[#2d2b52] rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
      </div>

      {/* Difficulty selector */}
      <div className="w-full max-w-sm mb-10">
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Difficulty
        </label>
        <div className="flex flex-col gap-3">
          {DIFFICULTIES.map(diff => {
            const m = DIFF_META[diff]
            const isSelected = selectedDiff === diff
            return (
              <button
                key={diff}
                onClick={() => setSelectedDiff(diff)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-150 cursor-pointer
                  ${isSelected
                    ? `bg-[#1a1830] ${m.accent} shadow-lg`
                    : 'bg-[#1a1830] border-[#2d2b52] text-slate-400 hover:border-slate-500'
                  }`}
              >
                <div className="text-left flex-1">
                  <div className={`font-bold ${isSelected ? m.accent.split(' ')[1] : 'text-white'}`}>{m.label}</div>
                  <div className="text-xs text-slate-500">{m.desc}</div>
                </div>
                {isSelected && <span className="text-sm font-bold">Selected</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        disabled={!canStart}
        className={`w-full max-w-sm py-4 rounded-xl font-bold text-lg transition-all duration-150
          ${canStart
            ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg cursor-pointer'
            : 'bg-[#1a1830] text-slate-600 border border-[#2d2b52] cursor-not-allowed'
          }`}
      >
        Start Game
      </button>
    </div>
  )
}

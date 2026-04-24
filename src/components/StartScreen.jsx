import { useState } from 'react'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const DIFF_META = {
  Easy:   { label: 'Easy',   desc: 'Core Grade 9–12 courses',    color: 'from-emerald-500 to-teal-500'  },
  Medium: { label: 'Medium', desc: 'Arts, tech & social courses', color: 'from-violet-500 to-purple-600' },
  Hard:   { label: 'Hard',   desc: 'Obscure & specialized codes', color: 'from-rose-500 to-pink-600'    },
}

export default function StartScreen({ playerName, setPlayerName, onStart }) {
  const [selectedDiff, setSelectedDiff] = useState(null)
  const canStart = playerName.trim().length > 0 && selectedDiff !== null

  function handleStart() {
    if (canStart) onStart(playerName.trim(), selectedDiff)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 fade-in">
      {/* Title */}
      <div className="mb-2 flex items-center gap-3">
        <span className="text-4xl">🎓</span>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          Code Course Game
        </h1>
      </div>
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
                    ? `bg-gradient-to-r ${m.color} border-transparent shadow-lg scale-[1.02]`
                    : 'bg-[#1a1830] border-[#2d2b52] hover:border-violet-700'
                  }`}
              >
                <span className={`w-3 h-3 rounded-full bg-gradient-to-br ${m.color} shrink-0`} />
                <div className="text-left">
                  <div className="font-bold text-white">{m.label}</div>
                  <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>{m.desc}</div>
                </div>
                {isSelected && <span className="ml-auto text-white text-lg">✓</span>}
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
            ? 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-lg hover:scale-[1.02] cursor-pointer'
            : 'bg-[#1a1830] text-slate-600 border border-[#2d2b52] cursor-not-allowed'
          }`}
      >
        Start Game →
      </button>
    </div>
  )
}

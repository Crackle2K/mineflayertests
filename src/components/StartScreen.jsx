import { useState } from 'react'
import { validatePlayerName } from '../lib/nameValidator'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const DIFF_META = {
  Easy:   { label: 'Easy',   desc: 'Core Grade 9–12 courses',    accent: 'border-[#3DA35D] text-[#96E072]' },
  Medium: { label: 'Medium', desc: 'Arts, tech & social courses', accent: 'border-[#3DA35D] text-[#96E072]'  },
  Hard:   { label: 'Hard',   desc: 'Obscure & specialized codes', accent: 'border-[#96E072] text-[#E8FCCF]'      },
}

export default function StartScreen({ playerName, setPlayerName, onStart }) {
  const [selectedDiff, setSelectedDiff] = useState(null)
  const validation = validatePlayerName(playerName)
  const canStart = validation.isValid && selectedDiff !== null

  function handleStart() {
    if (canStart) onStart(playerName.trim(), selectedDiff)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-6 fade-in">
      <h1 className="text-4xl font-extrabold tracking-tight text-[#e8fccf] mb-2">
        Course Code Game
      </h1>
      <p className="text-[#96E072] text-sm mb-10">Ontario Edition · Guess 10 course codes as fast as you can</p>

      {/* Name input */}
      <div className="w-full max-w-sm mb-8">
        <label className="block text-xs font-semibold text-[#96E072] uppercase tracking-widest mb-2">
          Your name
        </label>
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          placeholder="e.g. Alex"
          maxLength={30}
          className={`w-full bg-[#1a3d0f] border rounded-xl px-4 py-3 text-[#e8fccf] placeholder-[#3DA35D] focus:outline-none focus:ring-2 transition ${
            !validation.isValid && playerName.length > 0
              ? 'border-[#ff6b6b] focus:ring-[#ff6b6b]'
              : 'border-[#3E8914] focus:ring-[#3DA35D]'
          }`}
        />
        {!validation.isValid && playerName.length > 0 && (
          <p className="text-xs text-[#ff9999] mt-2">{validation.message}</p>
        )}
      </div>

      {/* Difficulty selector */}
      <div className="w-full max-w-sm mb-10">
        <label className="block text-xs font-semibold text-[#96E072] uppercase tracking-widest mb-3">
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
                    ? `bg-[#1a3d0f] ${m.accent} shadow-lg`
                    : 'bg-[#1a3d0f] border-[#3E8914] text-[#96E072] hover:border-[#3DA35D]'
                  }`}
              >
                <div className="text-left flex-1">
                  <div className={`font-bold ${isSelected ? m.accent.split(' ')[1] : 'text-[#e8fccf]'}`}>{m.label}</div>
                  <div className="text-xs text-[#3DA35D]">{m.desc}</div>
                </div>
                {isSelected && <span className="text-sm font-bold text-[#96E072]">Selected</span>}
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
            ? 'bg-[#3DA35D] hover:bg-[#96E072] text-[#0a2608] shadow-lg cursor-pointer'
            : 'bg-[#1a3d0f] text-[#3DA35D] border border-[#3E8914] cursor-not-allowed'
          }`}
      >
        Start Game
      </button>
    </div>
  )
}

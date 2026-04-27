import { useState } from 'react'
import { validatePlayerName } from '../lib/nameValidator'

const DIFFICULTIES = ['Easy', 'Medium', 'Hard']

const DIFF_META = {
  Easy:   { label: 'Easy',   desc: 'Core Grade 9–12 courses',    accent: 'border-[#4CAF50] text-[#2e7d32]' },
  Medium: { label: 'Medium', desc: 'Arts, tech & social courses', accent: 'border-[#4CAF50] text-[#2e7d32]'  },
  Hard:   { label: 'Hard',   desc: 'Obscure & specialized codes', accent: 'border-[#66BB6A] text-[#1b5e20]'      },
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
      <h1 className="text-4xl font-extrabold tracking-tight text-[#1a1a1a] mb-2">
        Course Code Game
      </h1>
      <p className="text-[#666] text-sm mb-10">Ontario Edition · Guess 10 course codes as fast as you can</p>

      {/* Name input */}
      <div className="w-full max-w-sm mb-8">
        <label className="block text-xs font-semibold text-[#666] uppercase tracking-widest mb-2">
          Your name
        </label>
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
          placeholder="e.g. Alex"
          maxLength={30}
          className={`w-full bg-white border rounded-xl px-4 py-3 text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:ring-2 transition ${
            !validation.isValid && playerName.length > 0
              ? 'border-[#ff6b6b] focus:ring-[#ff6b6b]'
              : 'border-[#4CAF50] focus:ring-[#66BB6A]'
          }`}
        />
        {!validation.isValid && playerName.length > 0 && (
          <p className="text-xs text-red-600 mt-2">{validation.message}</p>
        )}
      </div>

      {/* Difficulty selector */}
      <div className="w-full max-w-sm mb-10">
        <label className="block text-xs font-semibold text-[#666] uppercase tracking-widest mb-3">
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
                    ? `bg-[#e8f5e0] ${m.accent} shadow-lg`
                    : 'bg-white border-[#4CAF50] text-[#666] hover:border-[#66BB6A]'
                  }`}
              >
                <div className="text-left flex-1">
                  <div className={`font-bold ${isSelected ? m.accent.split(' ')[1] : 'text-[#1a1a1a]'}`}>{m.label}</div>
                  <div className="text-xs text-[#999]">{m.desc}</div>
                </div>
                {isSelected && <span className="text-sm font-bold text-[#2e7d32]">Selected</span>}
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
            ? 'bg-[#4CAF50] hover:bg-[#66BB6A] text-white shadow-lg cursor-pointer'
            : 'bg-[#e8f5e0] text-[#999] border border-[#4CAF50] cursor-not-allowed'
          }`}
      >
        Start Game
      </button>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'

const DIFF_COLORS = {
  Easy:   'text-[#96E072] bg-[#96E072]/10 border-[#3DA35D]/30',
  Medium: 'text-[#96E072] bg-[#96E072]/10 border-[#3DA35D]/30',
  Hard:   'text-[#E8FCCF] bg-[#E8FCCF]/10 border-[#96E072]/30',
}

function useElapsedTimer() {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())
  const rafRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      setElapsed(Date.now() - startRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return elapsed
}

function formatMs(ms) {
  const s = Math.floor(ms / 1000)
  const centis = Math.floor((ms % 1000) / 10)
  return `${s}.${String(centis).padStart(2, '0')}s`
}

export default function GameView({
  currentCourse,
  questionIndex,
  totalQuestions,
  difficulty,
  answer,
  setAnswer,
  shake,
  submitAnswer,
}) {
  const inputRef = useRef(null)
  const elapsed = useElapsedTimer()

  useEffect(() => {
    inputRef.current?.focus()
  }, [questionIndex])

  function handleKeyDown(e) {
    if (e.key === 'Enter') submitAnswer()
  }

  const progress = (questionIndex / totalQuestions) * 100

  return (
    <div className="flex flex-col items-center justify-center h-full py-10 px-6 fade-in">
      {/* Top bar */}
      <div className="w-full max-w-lg flex items-center justify-between mb-6 text-sm">
        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${DIFF_COLORS[difficulty]}`}>
          {difficulty}
        </span>
        <span className="font-mono text-[#96E072] text-base tabular-nums">{formatMs(elapsed)}</span>
        <span className="text-[#3DA35D] text-xs font-medium">
          {questionIndex + 1} <span className="text-[#3E8914]">/</span> {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg h-1.5 bg-[#1a3d0f] rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-[#96E072] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Course name card */}
      <div className="w-full max-w-lg bg-[#1a3d0f] border border-[#3E8914] rounded-2xl p-8 mb-6 text-center fade-in shadow-md">
        <p className="text-xs uppercase tracking-widest text-[#3DA35D] mb-4 font-semibold">Course Name</p>
        <h2 className="text-2xl font-bold text-[#e8fccf] leading-snug">{currentCourse?.name}</h2>
      </div>

      {/* Answer input */}
      <div className={`w-full max-w-lg ${shake ? 'shake' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="TYPE CODE"
          maxLength={8}
          spellCheck={false}
          autoComplete="off"
          className="w-full bg-[#1a3d0f] border-2 border-[#3E8914] rounded-xl px-5 py-4 text-center text-2xl font-mono font-bold uppercase tracking-widest text-[#e8fccf] placeholder-[#3E8914] focus:outline-none focus:border-[#3DA35D] focus:ring-2 focus:ring-[#3DA35D]/20 transition"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={submitAnswer}
        className="mt-4 w-full max-w-lg py-3 rounded-xl bg-[#3DA35D] hover:bg-[#96E072] text-[#0a2608] font-bold transition-colors duration-150 cursor-pointer"
      >
        Submit
      </button>

      <p className="mt-4 text-xs text-[#3DA35D]">Press Enter or click Submit · Case-insensitive</p>
    </div>
  )
}

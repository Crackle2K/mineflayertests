import { useState, useRef, useEffect } from 'react'

const DIFF_COLORS = {
  Easy:   'text-emerald-400 bg-emerald-400/10 border-emerald-500/30',
  Medium: 'text-violet-400 bg-violet-400/10 border-violet-500/30',
  Hard:   'text-rose-400 bg-rose-400/10 border-rose-500/30',
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
        <span className="font-mono text-slate-300 text-base tabular-nums">{formatMs(elapsed)}</span>
        <span className="text-slate-400 text-xs font-medium">
          {questionIndex + 1} <span className="text-slate-600">/</span> {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-lg h-1.5 bg-[#1a1830] rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Course name card */}
      <div className="w-full max-w-lg bg-[#1a1830] border border-[#2d2b52] rounded-2xl p-8 mb-6 text-center fade-in">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">Course Name</p>
        <h2 className="text-2xl font-bold text-white leading-snug">{currentCourse?.name}</h2>
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
          className="w-full bg-[#1a1830] border-2 border-[#2d2b52] rounded-xl px-5 py-4 text-center text-2xl font-mono font-bold uppercase tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={submitAnswer}
        className="mt-4 w-full max-w-lg py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors duration-150 cursor-pointer"
      >
        Submit
      </button>

      <p className="mt-4 text-xs text-slate-600">Press Enter or click Submit · Case-insensitive</p>
    </div>
  )
}

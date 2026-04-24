import { useState } from 'react'
import { useGame } from './hooks/useGame'
import StartScreen from './components/StartScreen'
import GameView from './components/GameView'
import GameOverScreen from './components/GameOverScreen'
import Leaderboard from './components/Leaderboard'

export default function App() {
  const game = useGame()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  function handlePlayAgain() {
    setRefreshTrigger(n => n + 1)
    game.playAgain()
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Game Panel ──────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-[60vh] lg:min-h-screen">
        <header className="px-6 py-4 border-b border-[#2d2b52] flex items-center gap-3 shrink-0">
          <span className="font-extrabold text-white text-sm tracking-tight">Course Code Game</span>
          <span className="text-xs text-slate-500 border border-[#2d2b52] rounded-full px-2 py-0.5">Ontario Edition</span>
        </header>

        <div className="flex-1 flex flex-col">
          {game.phase === 'start' && (
            <StartScreen
              playerName={game.playerName}
              setPlayerName={game.setPlayerName}
              onStart={game.startGame}
            />
          )}

          {game.phase === 'playing' && (
            <GameView
              currentCourse={game.currentCourse}
              questionIndex={game.questionIndex}
              totalQuestions={game.totalQuestions}
              difficulty={game.difficulty}
              answer={game.answer}
              setAnswer={game.setAnswer}
              shake={game.shake}
              submitAnswer={game.submitAnswer}
            />
          )}

          {game.phase === 'over' && (
            <GameOverScreen
              playerName={game.playerName}
              totalTimeMs={game.totalTimeMs}
              difficulty={game.difficulty}
              submitting={game.submitting}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>
      </main>

      {/* ── Leaderboard Panel ───────────────────────────────────── */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 border-t border-[#2d2b52] lg:border-t-0">
        <div className="lg:sticky lg:top-0 lg:h-screen">
          <Leaderboard refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  )
}

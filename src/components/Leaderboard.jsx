import { useEffect } from 'react'
import { useLeaderboard } from '../hooks/useLeaderboard'

const TABS = ['Easy', 'Medium', 'Hard']

const TAB_ACTIVE = {
  Easy:   'border-emerald-600 text-emerald-400',
  Medium: 'border-violet-600 text-violet-400',
  Hard:   'border-rose-600 text-rose-400',
}

function formatMs(ms) {
  return (ms / 1000).toFixed(2) + 's'
}

export default function Leaderboard({ refreshTrigger }) {
  const { tab, setTab, rows, loading, error, refresh } = useLeaderboard()

  useEffect(() => {
    if (refreshTrigger > 0) refresh()
  }, [refreshTrigger, refresh])

  return (
    <aside className="flex flex-col h-full bg-[#13122a] border-l border-[#2d2b52]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-[#2d2b52]">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-bold text-white">Leaderboard</h2>
          <span className="text-xs text-slate-500">Top 10</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#0f0e1a] rounded-lg p-1">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer
                ${tab === t
                  ? `bg-[#1a1830] border ${TAB_ACTIVE[t]}`
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {loading && (
          <div className="flex items-center justify-center py-10">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 text-slate-500 text-xs">
            <p>Leaderboard unavailable</p>
            <p className="mt-1 text-slate-600">{error}</p>
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-xs">
            <p>No scores yet for {tab}.</p>
            <p className="mt-1">Be the first!</p>
          </div>
        )}

        {!loading && !error && rows.map((row, i) => (
          <div
            key={row.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#1a1830] border border-[#2d2b52]"
          >
            <span className="text-xs font-mono font-bold text-slate-500 w-5 text-center shrink-0">
              {i + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-slate-200 truncate">
              {row.player_name}
            </span>
            <span className="text-sm font-mono font-bold tabular-nums text-slate-300">
              {formatMs(row.time_ms)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer refresh */}
      <div className="px-5 py-3 border-t border-[#2d2b52]">
        <button
          onClick={refresh}
          disabled={loading}
          className="w-full text-xs text-slate-500 hover:text-slate-300 transition py-1 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </aside>
  )
}

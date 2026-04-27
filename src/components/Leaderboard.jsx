import { useEffect } from 'react'
import { useLeaderboard } from '../hooks/useLeaderboard'

const TABS = ['Easy', 'Medium', 'Hard']

const TAB_ACTIVE = {
  Easy:   'border-[#3DA35D] text-[#96E072]',
  Medium: 'border-[#3DA35D] text-[#96E072]',
  Hard:   'border-[#96E072] text-[#E8FCCF]',
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
    <aside className="flex flex-col h-full bg-[#0a2608] border-l border-[#3E8914]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-[#3E8914]">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-base font-bold text-[#e8fccf]">Leaderboard</h2>
          <span className="text-xs text-[#3DA35D]">Top 10</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1a3d0f] rounded-lg p-1 border border-[#3E8914]">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 cursor-pointer
                ${tab === t
                  ? `bg-[#0a2608] border ${TAB_ACTIVE[t]}`
                  : 'text-[#3DA35D] hover:text-[#96E072]'
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
            <div className="w-6 h-6 border-2 border-[#3DA35D] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-8 text-[#3DA35D] text-xs">
            <p>Leaderboard unavailable</p>
            <p className="mt-1 text-[#96E072]">{error}</p>
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div className="text-center py-10 text-[#3DA35D] text-xs">
            <p>No scores yet for {tab}.</p>
            <p className="mt-1">Be the first!</p>
          </div>
        )}

        {!loading && !error && rows.map((row, i) => (
          <div
            key={row.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#1a3d0f] border border-[#3E8914]"
          >
            <span className="text-xs font-mono font-bold text-[#3DA35D] w-5 text-center shrink-0">
              {i + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-[#e8fccf] truncate">
              {row.player_name}
            </span>
            <span className="text-sm font-mono font-bold tabular-nums text-[#96E072]">
              {formatMs(row.time_ms)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer refresh */}
      <div className="px-5 py-3 border-t border-[#3E8914]">
        <button
          onClick={refresh}
          disabled={loading}
          className="w-full text-xs text-[#3DA35D] hover:text-[#96E072] transition py-1 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </aside>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useLeaderboard() {
  const [tab, setTab] = useState('Easy')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchLeaderboard = useCallback(async (difficulty) => {
    if (!supabase) {
      setError('Supabase not configured')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const { data, error: sbErr } = await supabase
        .from('leaderboard')
        .select('id, player_name, time_ms, created_at')
        .eq('difficulty', difficulty)
        .order('time_ms', { ascending: true })
        .limit(10)

      if (sbErr) throw sbErr
      setRows(data ?? [])
    } catch (err) {
      setError(err.message ?? 'Failed to load leaderboard')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeaderboard(tab)
  }, [tab, fetchLeaderboard])

  const refresh = useCallback(() => fetchLeaderboard(tab), [tab, fetchLeaderboard])

  return { tab, setTab, rows, loading, error, refresh }
}

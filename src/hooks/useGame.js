import { useState, useRef, useCallback } from 'react'
import { getCoursesByDifficulty, shuffle } from '../data/courses'
import { supabase } from '../lib/supabase'

const QUESTIONS_PER_GAME = 10

export function useGame() {
  const [phase, setPhase] = useState('start') // 'start' | 'playing' | 'over'
  const [playerName, setPlayerName] = useState('')
  const [difficulty, setDifficulty] = useState(null)
  const [courses, setCourses] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [shake, setShake] = useState(false)
  const [totalTimeMs, setTotalTimeMs] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const startTimeRef = useRef(null)

  const startGame = useCallback((name, diff) => {
    const pool = getCoursesByDifficulty(diff)
    const selected = shuffle(pool).slice(0, QUESTIONS_PER_GAME)
    setCourses(selected)
    setPlayerName(name)
    setDifficulty(diff)
    setQuestionIndex(0)
    setAnswer('')
    setShake(false)
    setTotalTimeMs(0)
    startTimeRef.current = Date.now()
    setPhase('playing')
  }, [])

  const submitAnswer = useCallback(() => {
    const current = courses[questionIndex]
    if (!current) return

    const isCorrect = answer.trim().toUpperCase() === current.code.toUpperCase()

    if (!isCorrect) {
      setShake(true)
      setTimeout(() => setShake(false), 400)
      return
    }

    const nextIndex = questionIndex + 1
    setAnswer('')

    if (nextIndex >= QUESTIONS_PER_GAME) {
      const elapsed = Date.now() - startTimeRef.current
      setTotalTimeMs(elapsed)
      setPhase('over')
      pushScore(playerName, elapsed, difficulty)
    } else {
      setQuestionIndex(nextIndex)
    }
  }, [answer, courses, questionIndex, playerName, difficulty])

  async function pushScore(name, timeMs, diff) {
    if (!supabase) return
    setSubmitting(true)
    try {
      await supabase.from('leaderboard').insert({
        player_name: name,
        time_ms: timeMs,
        difficulty: diff,
      })
    } catch (err) {
      console.error('Failed to save score:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const playAgain = useCallback(() => {
    setPhase('start')
    setAnswer('')
    setDifficulty(null)
  }, [])

  const currentCourse = courses[questionIndex] ?? null

  return {
    phase,
    playerName,
    setPlayerName,
    difficulty,
    currentCourse,
    questionIndex,
    totalQuestions: QUESTIONS_PER_GAME,
    answer,
    setAnswer,
    shake,
    totalTimeMs,
    submitting,
    startGame,
    submitAnswer,
    playAgain,
  }
}

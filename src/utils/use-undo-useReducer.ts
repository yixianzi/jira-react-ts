import { useCallback, useState } from 'react'

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[]
    present: T
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  // 回到上一步状态
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState
      if (past.length === 0) return currentState
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  }, [])

  // 回溯,撤销，往前跳
  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState
      if (future.length === 0) return currentState
      const next = future[0]
      const newFuture = future.slice(0)

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState
      if (newPresent === present) return currentState
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    })
  }, [])

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}

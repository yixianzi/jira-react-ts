import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from 'utils'
interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  // 组件没退出销毁才会设置data，避免在已卸载组件上赋值
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [mountedRef, dispatch])
}

export const useAsync = <D>(initialState?: State<D>, initalConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initalConfig }

  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
    ...defaultInitialState,
    ...initialState
  })

  const safeDispatch = useSafeDispatch(dispatch)

  const [retry, setRetry] = useState(() => () => {
    // 不能直接返回一个函数，否则是惰性初始化，会先执行函数
  })

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null
      }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null
      }),
    [safeDispatch]
  )

  // 用来出发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise 类型数据') // 会打断一切进程，下面不会执行
      }
      setRetry(() => () => {
        if (runConfig) {
          run(runConfig?.retry(), runConfig)
        }
      })
      // setState({ ...state, stat: 'loading' })
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          // if (mountedRef.current) {
          // 组件没退出销毁才会设置data，避免在已卸载组件上赋值
          setData(data)
          // }
          return data
        })
        .catch((error) => {
          // catch会消化异常，如果不主动抛出，外面是就接收不到异常的
          setError(error)
          if (config.throwOnError) {
            return Promise.reject(error) // 主动抛出
          }
          return error
        })
    },
    [config.throwOnError, safeDispatch, setData, setError]
  )

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    // retry调用时，重新跑run，刷新state
    retry,
    setData,
    setError,
    ...state
  }
}

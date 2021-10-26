import { useState } from 'react'
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

export const useAsync = <D>(initialState?: State<D>, initalConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initalConfig }

  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const mountedRef = useMountedRef()

  const [retry, setRetry] = useState(() => () => {
    // 不能直接返回一个函数，否则是惰性初始化，会先执行函数
  })

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null
    })

  const setError = (error: Error) =>
    setState({
      error,
      stat: 'error',
      data: null
    })

  // 用来出发异步请求
  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise 类型数据') // 会打断一切进程，下面不会执行
    }
    setRetry(() => () => {
      if (runConfig) {
        run(runConfig?.retry(), runConfig)
      }
    })
    setState({ ...state, stat: 'loading' })
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data)
        }
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
  }

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

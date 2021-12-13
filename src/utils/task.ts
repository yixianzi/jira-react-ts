import { useQuery } from 'react-query'
import { Task } from 'types/task'
import { useHttp } from './http'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  // react-query，默认会将2s中的相同请求参数的请求catch，只发送一次
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

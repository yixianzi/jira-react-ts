import { QueryKey, useMutation, useQuery } from 'react-query'
import { Project } from 'types/project'
import { Task } from 'types/task'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  // react-query，默认会将2s中的相同请求参数的请求catch，只发送一次
  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: 'POST',
        data: params
      }),
    useAddConfig(queryKey)
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id)
  })
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

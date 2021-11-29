import { useMemo } from 'react'
import { useUrlQueryParam } from 'utils/url'

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const projectsParam = useMemo(
    () => ({
      ...param,
      personId: Number(param.personId) || undefined
    }),
    [param]
  )

  return [projectsParam, setParam] as const
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}

import { useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { useProjectsSearchParams } from 'screens/project-list/util'
import { cleanObject } from 'utils'
import { useProject } from './project'
/**
 * 返回页面url中，指定建的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams()
  return [
    useMemo(
      () =>
        keys.reduce((prev: { [key in K]: string }, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // fromEntries，iterator 遍历器，设置新的url
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    // undo? 两个指令写在一块第一行的那个会不生效（实际上是生效的，但好像又跳转了）
    if (projectCreate) {
      setProjectCreate({ projectCreate: undefined })
    } else {
      setEditingProjectId({ editingProjectId: undefined })
    }
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

  // 返回三个以下时，可以返回tuple，三个以上考虑对象
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  } as const
}

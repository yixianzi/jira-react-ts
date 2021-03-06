import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/use-select'
import React, { useState } from 'react'
import { useSetUrlSearchParam } from 'utils/url'
import { useTasksSearchParams } from './util'

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParmas = useSetUrlSearchParam()
  const [inputName, setInputName] = useState('')
  const reset = () => {
    setSearchParmas({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
    setInputName('')
  }

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: '20rem' }}
        placeholder={'任务名'}
        value={inputName}
        onChange={(evt) => {
          setSearchParmas({ name: evt.target.value })
          setInputName(evt.target.value)
        }}
      />
      <UserSelect
        defaultOptionName={'经办人'}
        value={searchParams.processorId}
        onChange={(value) => setSearchParmas({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={'类型'}
        value={searchParams.typeId}
        onChange={(value) => setSearchParmas({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}

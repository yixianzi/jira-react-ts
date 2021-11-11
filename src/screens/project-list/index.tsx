import { SearchPanel } from './search-panel'
import { List } from './list'
import React from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Button, Row } from 'antd'
import { projectListActions } from './project-list.slice'
import { useDispatch } from 'react-redux'

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param, 200)
  const { isLoading, data: list, retry } = useProject(debouncedParam)

  const { data: users } = useUsers()
  const dispatch = useDispatch()
  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <Row justify={'space-between'}>
        <h2>项目列表</h2>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List refresh={retry} dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`

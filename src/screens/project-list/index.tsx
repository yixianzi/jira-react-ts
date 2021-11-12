import { SearchPanel } from './search-panel'
import { List } from './list'
import React from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { useProject } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Row } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from 'utils/url'

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams()
  const debouncedParam = useDebounce(param, 200)
  const { isLoading, data: list, retry } = useProject(debouncedParam)
  const { open } = useProjectModal()

  const { data: users } = useUsers()
  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <Row justify={'space-between'}>
        <h2>项目列表</h2>
        <ButtonNoPadding type={'link'} onClick={open}>
          创建项目
        </ButtonNoPadding>
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

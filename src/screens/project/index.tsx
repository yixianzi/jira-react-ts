import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/Kanban'
import styled from '@emotion/styled'
import { Menu } from 'antd'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <NavLink to={'kanban'}>看板</NavLink>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <NavLink to={'epic'}>任务组</NavLink>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen />}></Route>
          <Route path={'/epic'} element={<EpicScreen />}></Route>
          <Navigate to={window.location.pathname + '/kanban'} replace={true}></Navigate>
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.div`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
  height: 100%;
`

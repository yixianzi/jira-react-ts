import { Select, Input, Form } from 'antd'
import { UserSelect } from 'components/use-select'
import React from 'react'
import { Project } from './list'

export interface User {
  id: number
  name: string
  token: string
}

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  // param: {
  //   name: string;
  //   personId: string;
  // };
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        ></UserSelect>
        {/* <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  )
}

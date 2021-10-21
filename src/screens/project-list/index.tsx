import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams();
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, data: list } = useProject(debouncedParam);

  const { data: users } = useUsers();
  useDocumentTitle("项目列表", false);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;

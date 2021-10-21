import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import React from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
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

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;

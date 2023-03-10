import { Outlet } from "react-router-dom";

import { Content, Header, Layout, PopularLink } from "@/components";

export function Battle() {
  return (
    <Layout>
      <Header>
        <PopularLink to="/" />
        <h1 className="flex" style={{ fontSize: 24 }}>
          BATTLE
        </h1>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

import { Outlet } from "react-router-dom";

import { Content, Header, Layout, PopularLink } from "@/components";

export default function Battle() {
  return (
    <Layout>
      <Header>
        <PopularLink to="/" />
        <h1 style={{ fontSize: 24 }}>BATTLE</h1>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

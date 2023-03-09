import "antd/dist/reset.css";
import "normalize.css/normalize.css";
import "./index.css";

import { App as AntdApp, ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Battle, Popular } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Popular />,
  },
  {
    path: "battle",
    element: <Battle />,
  },
]);

export function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
      local={zhCN}
    >
      <AntdApp style={{ height: "100%" }}>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

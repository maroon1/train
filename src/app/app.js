import "antd/dist/reset.css";
import "normalize.css/normalize.css";
import "./index.css";

import { App as AntdApp, ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Battle, Popular } from "./pages";

const BattlePlayer = lazy(() => import("./pages/battle-player"));
const BattleResult = lazy(() => import("./pages/battle-result"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Popular />,
  },
  {
    path: "battle",
    element: <Battle />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <BattlePlayer />
          </Suspense>
        ),
      },
      {
        path: "result",
        element: (
          <Suspense>
            <BattleResult />
          </Suspense>
        ),
      },
    ],
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

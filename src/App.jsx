import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout.jsx";

const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        // タスク一覧画面
        path: "/",
        element: (
          <div>
            <div>タスク一覧</div>
            <Link to="trash">ゴミ箱へ</Link>
          </div>
        ),
      },
      {
        // ゴミ箱画面
        path: "trash",
        element: (
          <div>
            <div>ゴミ箱</div>
            <Link to="/">タスク一覧へ</Link>
          </div>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

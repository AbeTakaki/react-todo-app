import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout.jsx";
import { TaskList } from "./components/TaskList.jsx";

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
        element: <TaskList />
      },
      {
        // ゴミ箱画面
        path: "trash",
        element: <div>ゴミ箱</div>
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

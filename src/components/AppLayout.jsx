import { BookCheck, Trash2 } from "lucide-react";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "react-router-dom";

// サイドメニューを配列で定義
const sideMenu = [
  {
    path: "/",
    label: "タスク一覧",
    icon: <BookCheck />,
  },
  {
    path: "/trash",
    label: "ゴミ箱",
    icon: <Trash2 />,
  },
];

// メニューリンクのスタイル、バリエーションを定義
const linkVariants = cva("flex items-center gap-2 rounded px-5 py-3", {
  variants: {
    active: {
      true: "bg-blue-400 text-white",
      false: "hover:bg-slate-100",
    },
  },
});

export const AppLayout = ({ children }) => {
  // 現在のパスを取得
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen">
      <div className="flex min-w-64 flex-col gap-5 p-6">
        <h1 className="text-3xl">Todo App</h1>
        <nav>
          <ul className="flex flex-col gap-2">
            {sideMenu.map(({ path, label, icon }) => (
              <li>
                <Link
                  to={path}
                  className={linkVariants({ active: pathname === path })}>
                    {icon}
                    {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="mx-auto h-screen flex-1 overflow-y-auto overscroll-none bg-slate-100">{children}</main>
    </div>
  )
}
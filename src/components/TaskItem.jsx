import { cva } from "class-variance-authority";
import { Trash2 } from "lucide-react";

// 入力フィールドを定義
const inputVariants = cva("flex-1 border px-2 py-1 border-gray-300 bg-white", {
  variants: {
    // 完了済みタスクのスタイルを定義
    completed: {
      true: "text-gray-400 line-through disabled:coursor-not-allowed",
    },
  },
});

export function TaskItem({ task }) {
  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      <div className="flex items-center">
        {/* タスクステータス変更用のチェックボックス */}
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={task.status === "completed"}
        />
      </div>
      <input 
        type="text"
        className={inputVariants({ completed: task.status === "completed" })}
        defaultValue={task.title}
        disabled={task.status === "completed"}
      />
      {/* タスクをゴミ箱に移動するボタン */}
      <button
        type="button"
        className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
        aria-label={`タスク 「${task.title}」をゴミ箱へ移動する`}
      >
        <Trash2 className="size-5 text-gray-500" />
      </button>
    </div>
  )
}
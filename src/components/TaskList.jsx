import { TaskItem } from './TaskItem';
import { useEffect, useState } from 'react';
import { CreateTaskForm } from './CreateTaskForm';

export function TaskList () {
  // タスク一覧の状態を管理
  const [ taskList, setTaskList] = useState(() => {
    // ローカルストレージから"taskLost"のデータを取得
    const taskListStorage = localStorage.getItem("taskList");
    // ローカルストレージにデータがあれば、それをパースして返し、無ければ空の配列を返す
    return JSON.parse(taskListStorage ?? "[]");
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  },[taskList]);

  // 新しいタスクを追加
  const createTask = (title) => {
    setTaskList((prevTaskList) => {
      // 新しいタスクオブジェクトを生成
      const newTask = {
        id: Date.now(),
        title,
        status: "notStarted",
      };
      return [...prevTaskList, newTask];
    });
  };

  // ゴミ箱タスクを除いたタスク一覧
  const activeTaskList = taskList.filter(({ status }) => status !== "trashed");

  // タスクを更新する
  const updateTask = (id, updateTask) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) =>
      // 対象タスクのidが一致する場合、そのタスクを更新
      task.id === id ? {...task, ...updateTask } : task,
      );
    });
  };

  return (
    <div className="relative">
      <div className='sticky top-0 flex flex-col items-end gap-2 bg-slate-100 px-10 py-5'>
        <div className='w-full'>
          <CreateTaskForm onSubmit={createTask} />
        </div>
      </div>
      <div className='space-y-3 px-10 pb-10'>
        {activeTaskList.length === 0 ? (
          <p className='text-center text-sm'>タスクがありません</p>
        ) : (
          activeTaskList.map((task) => <TaskItem key={task.id} task={task} onChange={updateTask} />)
        )}
      </div>
    </div>
  )
}
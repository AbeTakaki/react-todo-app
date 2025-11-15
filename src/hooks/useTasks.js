import { useLocalStorageState } from "./useLocalStorageState";

export function useTasks() {
  // ローカルストレージを利用してタスク一覧の状態を管理
  const [taskList, setTaskList] = useLocalStorageState("taskList", []);

  const activeTaskList = taskList.filter(({ status }) => status !== "trashed");

  // 新しいタスクを追加する関数
  const createTask = (title) => {
    setTaskList((prevTaskList) => {
      const newTask = {
        id: Date.now(),
        title,
        status: "notStarted",
      };
      return [...prevTaskList, newTask];
    });
  };

  // 既存のタスクを更新する関数
  const updateTask = (id, updatedTask) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
    });
  };

  // ゴミ箱のタスク一覧
  const trashedTaskList = taskList.filter(({ status }) => status === "trashed");
  // タスクを削除する
  const deleteTask = (id) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.id !== id);
    });
  };

  // ゴミ箱のタスクをすべて削除する
  const deleteAllTrashedTasks = () => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.status !== "trashed");
    });
  };

  return {
    activeTaskList,
    createTask,
    updateTask,
    trashedTaskList,
    deleteTask,
    deleteAllTrashedTasks,
  };
}
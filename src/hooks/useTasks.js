import { useLocalStorageState } from "./useLocalStorageState";

export function useTasks() {
  // ローカルストレージを利用してタスク一覧の状態を管理
  const [taskList, setTaskList] = useLocalStorageState("taskList", []);

  const activeTaskLList = taskList.filter(({ status }) => status !== "trashed");

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
  const updateTask = (id, updateTask) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) =>
        task.id === id ? { ...task, ...updateTask } : task
      );
    });
  };

  return {
    activeTaskLList,
    createTask,
    updateTask,
  };
}
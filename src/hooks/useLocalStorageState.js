import { useState } from "react";

export function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    // ローカルストレージから初期値を取得
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorageState = (value) => {
    setState((prevState) => {
      // 新しい状態を計算
      const newState = 
        typeof value === "function" ? value(prevState) : value;
      // ローカルストレージに新しい状態を保存
      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    });
  };

  return [state, setLocalStorageState];
}
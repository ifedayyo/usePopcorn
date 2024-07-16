import { useState } from "react";

export function useLocalStorageState(initialState) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
}

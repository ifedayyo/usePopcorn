import { useState, useEffect } from "react";

export function useLocalStorageState(initialState) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(value));
    },
    [value]
    //now we need to render the above
  );
}

import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      //CLEAN-UP Function for cleaning our event listener
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}

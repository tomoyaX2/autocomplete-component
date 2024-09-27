import { useRef } from "react";

export const useDebouncedCallback = () => {
  const callbackTimeoutRef = useRef(
    setTimeout(() => {
      return;
    })
  );

  const debounce = (callback: (args?: any) => void, timeout: number) => {
    clearTimeout(callbackTimeoutRef.current);

    callbackTimeoutRef.current = setTimeout(() => {
      callback();
    }, timeout);
  };

  return debounce;
};

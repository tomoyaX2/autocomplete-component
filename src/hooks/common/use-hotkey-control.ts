import { KeyboardEvent } from "react";

enum Key {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Enter = "Enter",
  Escape = "Escape",
}

type HandleKeyItem = {
  [K in Key]?: () => void;
};

export const useHotkeyControl = (controls: HandleKeyItem) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const effect = controls[event.key as Key];

    if (!!effect) {
      effect();
    }
  };
  return { handleKeyDown };
};

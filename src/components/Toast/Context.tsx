import { createContext } from "react";
import { ToastOptions } from "./types";

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

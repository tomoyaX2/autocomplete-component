import { ReactNode, useState } from "react";
import { ToastOptions } from "./types";
import { ToastContext } from "./Context";
import { Toast } from ".";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = (options: ToastOptions) => {
    setToasts((prevToasts) => [...prevToasts, options]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast, index) => (
          <Toast key={index} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

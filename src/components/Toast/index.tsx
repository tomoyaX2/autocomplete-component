import React from "react";
import "./styles.css";
interface ToastProps {
  variant?: "destructive" | "success" | "info";
  title: string;
  description?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variant = "info",
  title,
  description,
}) => {
  let toastClass = "toast-info";
  if (variant === "destructive") toastClass = "toast-destructive";
  else if (variant === "success") toastClass = "toast-success";

  return (
    <div className={`toast ${toastClass}`}>
      <strong>{title}</strong>
      {description && <p>{description}</p>}
    </div>
  );
};

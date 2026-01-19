import React from "react";
import { useMenu } from "./MenuContext";

const ToastContainer = () => {
  const { toast } = useMenu();
  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast show">{toast}</div>
    </div>
  );
};

export default ToastContainer;

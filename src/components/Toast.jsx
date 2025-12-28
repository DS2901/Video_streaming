import { useEffect } from "react";
import "../Developer.css";

const Toast = ({ message, variant = "info", onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timeoutId = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(timeoutId);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="toast-host" role="status" aria-live="polite">
      <div className={`toast toast-${variant}`}>
        <span className="toast-message">{message}</span>
        <button type="button" className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;

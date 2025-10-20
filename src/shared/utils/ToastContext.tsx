"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
  showToast: (msg: string, isPouch?: boolean, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(3000);

  const showToast = (msg: string, dur = 3000) => {
    setMessage(msg);
    setDuration(dur);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, dur);
  };

  return (
    <>
      <ToastContext.Provider value={{ showToast }}>
        {children}
        {visible && (
          <div className="toastContainer">
            <span className="toastMessage">{message}</span>
          </div>
        )}
      </ToastContext.Provider>
      <style jsx>
        {`
          .toastContainer {
            position: fixed;
            display: flex;
            justify-content: center;
            bottom: 10%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
          }

          .toastMessage {
            white-space: nowrap;
            background-color: #333;
            color: #fff;
            padding: 16px 24px;
            border-radius: 24px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
            animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
            opacity: 1;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};

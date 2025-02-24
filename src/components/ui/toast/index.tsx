import { ReactElement, useMemo, useState } from "react";
import { ToastContext } from "./toast-context";
import { useTimeout } from "../../../lib";
import { AlertProps, AlertStylesProps, getAlertIcon, getAlertStyles } from "../alert";
import "./toasts.css";

export function Toast({ id, message, variant, close }: Omit<AlertProps, 'children'>) {
  useTimeout(() => {
    close();
  }, 5000);
  const Icon = getAlertIcon(variant);
  return (
    <div
      role="alert"
      className={`toasts`}>
      <div className={`${getAlertStyles(variant)} flex items-center p-2 toast`} style={{ zIndex: id }}>
        <Icon />
        <p className="subtitle ml-6">{message}</p>
      </div>
    </div>
  );
}

export interface ToastType extends AlertStylesProps {
  id: number;
  message: string;
  title?: string;
};

export function ToastProvider({ children }: { children: ReactElement }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  function openToast({ message, variant, title }: Omit<ToastType, "id">) {
    const newToast = {
      title,
      message,
      variant,
      id: Date.now(),
    };
    setToasts((prevToasts) => [newToast, ...prevToasts]);
  }

  function closeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div>
        {toasts &&
          toasts.map(({ id, title, message, variant }) => {
            return (
              <Toast
                key={id}
                id={id}
                title={title}
                message={message}
                variant={variant}
                close={() => closeToast(id)}
              />
            );
          })}
      </div>
    </ToastContext.Provider>
  );
}

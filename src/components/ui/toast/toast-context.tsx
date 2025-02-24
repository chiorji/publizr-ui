import { useContext, createContext } from "react";
import { ToastType } from ".";

type ToastContextValue = {
  open: (props: Omit<ToastType, "id">) => void;
  close: (id: number) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
export const useToast = () => useContext(ToastContext);

import { RefObject, useEffect } from "react";

export const useInputFocus = (ref: RefObject<HTMLElement>, callback: (v: boolean) => void) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("focus", () => callback(true));
      ref.current.addEventListener("blur", () => callback(false));
    }
  })
}
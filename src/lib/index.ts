import { useEffect, useRef } from "react";

function hasKey<K extends string, T extends object>(k: K, o: T): o is T & Record<K, unknown> {
  return k in o;
}

export const processRequestError = (error: unknown, defaultValue?: string) => {
  let message = '';
  let defaultMessage = defaultValue ?? 'Failed! Please check your network connection.';
  if (
    error !== null &&
    error &&
    typeof error === 'object' &&
    hasKey('data', error) && error.data &&
    typeof error.data === 'object' &&
    hasKey('message', error.data) &&
    typeof error.data.message === 'string'
  ) {
    message += error.data.message;
  }

  if (
    error !== null &&
    error &&
    typeof error === 'object' &&
    hasKey('data', error) &&
    typeof error.data === 'object' &&
    error.data &&
    hasKey('description', error.data) &&
    typeof error.data.description === 'string'
  ) {
    message += error.data.description;
  }

  if (
    error !== null &&
    error &&
    typeof error === 'object' &&
    hasKey('data', error) &&
    typeof error.data === 'object' &&
    error.data &&
    hasKey('validation', error.data) &&
    typeof error.data.validation === 'object' &&
    error.data.validation
  ) {
    message += Object.values(error.data.validation).join(', ');
  }

  return message != '' ? message : defaultMessage;
}

export function useTimeout(callbackFunction: () => void, timeout?: number): void {
  const savedCallback = useRef(callbackFunction);

  useEffect(() => {
    savedCallback.current = callbackFunction;
  }, [callbackFunction]);

  useEffect(() => {
    const timeoutId = setTimeout(() => savedCallback.current(), timeout ?? 3000);
    return () => clearTimeout(timeoutId);
  }, []);
}

export const imageExtensions: Record<string, boolean> = {
  tiff: true,
  tif: true,
  bmp: true,
  jpg: true,
  jpeg: true,
  gif: true,
  png: true,
  eps: true,
};

export const isValidEmail = (v: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
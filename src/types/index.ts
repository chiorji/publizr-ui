import { ReactNode } from "react";

export interface GetResponse<T> {
  success: boolean
  message: string
  data: T
  size: number
}

export interface OptionContract {
  label: string
  value: string | number
  icon?: ReactNode
}

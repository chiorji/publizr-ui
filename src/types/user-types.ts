import { GetResponse } from "./index";

export type USER_ROLE = 'ADMIN' | 'AUTHOR';
export interface User {
  id: number;
  username: string;
  email: string;
  image_url: string;
  role: USER_ROLE,
  created_at: number;
  updated_at: number;
  is_deleted: boolean;
}

export interface CreateAccountFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginSignupResponse<T> extends GetResponse<T> {
  data: T;
  token: string;
}
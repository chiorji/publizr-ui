import { ROLE } from "../rbac/roles";
import { GetResponse } from "../types/index";
export interface User {
  id: number;
  username: string;
  email: string;
  image_url: string;
  role: keyof typeof ROLE,
  created_at: number | null;
  updated_at: number | null;
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
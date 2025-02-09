export type USER_ROLE = 'ADMIN' | 'AUTHOR';
export interface User {
  id: number;
  username: string;
  email: string;
  image_url: string;
  role: USER_ROLE,
  created_at: Date;
  updated_at: Date;
}

export interface CreateAccountFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OAuthProvider {
  provider: 'google' | 'github';
}

export interface LoginResponse {
  success: boolean
  token: string
  data: User
}

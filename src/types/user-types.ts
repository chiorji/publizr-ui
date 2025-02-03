import { Post } from './post-types'; // Adjust the import path as necessary

export interface User {
  id: number;
  name: string;
  email: string;
  image_url: string;
  role: 'admin' | 'user';
  posts: Post[];
  created_at: Date;
  updated_at: Date;
  last_login: Date;
  last_active: Date;
}

export  interface CreateAccountFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
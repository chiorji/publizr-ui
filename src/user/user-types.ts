import { ROLE } from "../rbac/roles";
export interface User {
  id: number;
  username: string;
  email: string;
  image_url: string;
  role: keyof typeof ROLE,
  created_at: number;
  updated_at: number;
  is_deleted: boolean;
}

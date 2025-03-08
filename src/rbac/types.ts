import { PermissionKeys } from './roles';

export const Views = {
  AUTHOR: 'author',
  POSTS: 'posts',
  PUBLISH: 'publish',
  DISCOVER: 'discover',
  UPDATE: 'update',
  LOGIN: 'login',
  SIGNUP: 'signup'
} as const;

export type Path = typeof Views[keyof typeof Views];

export type RouteObject = {
  name: string
  path: Path
  label: string
  permissions: PermissionKeys
}

export type Routes = RouteObject[];
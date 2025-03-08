import { RouteObject } from "./types";

export const routes: RouteObject[] = [
  {
    path: 'discover',
    name: 'discover',
    label: 'Discover',
    permissions: 'user.read'
  },
  {
    path: 'posts',
    name: 'posts',
    label: 'All',
    permissions: 'post.read'
  },
  {
    path: 'author',
    name: 'author',
    label: 'Mine',
    permissions: 'post.edit'
  },
  {
    path: 'publish',
    name: 'publish',
    label: 'New',
    permissions: 'post.publish'
  },
  {
    path: 'login',
    name: 'get-started',
    label: 'Get Started',
    permissions: 'post.read'
  }
]
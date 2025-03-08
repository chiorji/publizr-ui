export const ROLE = {
  ADMIN: 'ADMIN',
  AUTHOR: 'AUTHOR',
  VIEWER: 'VIEWER'
} as const;

export const PermissionMapping = {
  "user.edit": [ROLE.ADMIN, ROLE.AUTHOR],
  "user.delete": [ROLE.ADMIN],
  "user.read": Object.values(ROLE),
  "post.publish": [ROLE.ADMIN, ROLE.AUTHOR],
  "post.delete": [ROLE.ADMIN, ROLE.AUTHOR],
  "post.edit": [ROLE.ADMIN, ROLE.AUTHOR],
  "post.read": Object.values(ROLE),
  "post.feature": [ROLE.ADMIN],
  "post.all.delete": [ROLE.ADMIN]
}

export type PermissionKeys = keyof typeof PermissionMapping;

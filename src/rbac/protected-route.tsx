import { ReactNode } from "react"
import { PermissionKeys } from "./roles"
import { useRoleBasedAccess } from "./rbac-hook"
import { NotFound } from "../components/ui/404"

type ProtectedProps = {
  permission: PermissionKeys
  children: ReactNode
}

export const Protected: React.FC<ProtectedProps> = ({ children, permission }) => {
  const { hasPermission } = useRoleBasedAccess();
  return hasPermission(permission) ? <>{children}</> : <NotFound />
}
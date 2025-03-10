import { useSelector } from "react-redux";
import { PermissionMapping, PermissionKeys } from "./roles";
import { RootState } from "../api-store/store";

export const useRoleBasedAccess = () => {
  const { role } = useSelector((state: RootState) => state.authStateSlice);
  const hasPermission = (permission: PermissionKeys) => {
    return PermissionMapping[permission].some((r) => r === role);
  }

  return { hasPermission };
}

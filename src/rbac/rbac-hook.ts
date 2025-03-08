import { useSelector } from "react-redux";
import { PermissionMapping, PermissionKeys } from "./roles";
import { RootState } from "../app/store";

export const useRoleBasedAccess = () => {
  const { role } = useSelector((state: RootState) => state.userSlice.user);
  const hasPermission = (permission: PermissionKeys) => {
    return PermissionMapping[permission].some((r) => r === role);
  }

  return { hasPermission };
}

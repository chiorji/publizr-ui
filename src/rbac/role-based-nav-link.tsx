import { useMemo } from "react";
import { Routes } from "./types";
import { NavLink } from "./nav-link";
import { PermissionMapping, ROLE } from "./roles";
import { useLocation } from "react-router-dom";

interface Props {
  routes: Routes
  role: keyof typeof ROLE
  isLoggedIn: boolean
}

export const RoleBasedNavLink: React.FC<Props> = ({ routes, role, isLoggedIn }) => {
  const { pathname } = useLocation();
  if (isLoggedIn) routes = routes.filter((route) => !['login', 'signup'].includes(route.path));
  const viewable = useMemo(() => routes.map((route) => {
    const canView = PermissionMapping[route.permissions].some((r) => r === role);
    const active = !!pathname.includes(route.path);
    return canView ? <NavLink
      key={route.name}
      route={route}
      active={active}
    /> : null;
  }), [isLoggedIn, role, pathname]);

  return <>{viewable}</>
}
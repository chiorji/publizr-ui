import { Link } from "react-router-dom"
import { RouteObject } from "./types"

const getLinkStyles = (name: string) => {
  switch (name) {
    case 'get-started':
      return '!bg-blue-600 !text-white px-4 py-2 rounded-md !hover:bg-blue-700'
    case 'active':
      return 'text-gray-600 hover:text-gray-800 font-bold'
    default:
      return 'text-gray-600 hover:text-gray-800';
  }
}

export const NavLink: React.FC<{ route: RouteObject, active: boolean }> = ({ route, active }) => {
  const linkStyles = getLinkStyles(route.name);
  const activeStyles = getLinkStyles('active');
  return (
    <Link to={route.path} className={`${linkStyles} ${active ? activeStyles : ''}`}>
      {route.label}
    </Link>
  )
}
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, persistor } from '../app/store';
import { resetStore } from '../user/user-state';
import Thumbnail from './thumbnail';
import { useRoleBasedAccess } from '../rbac/rbac-hook';
import { RoleBasedNavLink } from '../rbac/role-based-nav-link';
import { routes } from '../rbac/routes';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hasPermission } = useRoleBasedAccess();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.userSlice);

  const handleLogout = async () => {
    await persistor.purge();
    persistor.flush().then(() => {
      dispatch(resetStore());
      navigate('/posts');
    });
  };

  return (
    <nav className="border-b min-w-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center text-gray-800">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-3xl font-bold">Publizr</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <RoleBasedNavLink routes={routes} role={user.role} isLoggedIn={isAuthenticated}/>
            {hasPermission("user.edit") && <Thumbnail
              username={user.username}
              email={user.email}
              role={user.role}
              avatarUrl={'/laptop.jpg'}
              handleLogout={handleLogout}
            />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
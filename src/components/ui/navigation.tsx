import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, persistor } from '../../app/store';
import { setCurrentUser, setIsAuthenticated, setToken } from '../../app/states/user-state';
import { User } from '../../types/user-types';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.users);

  const handleLogout = () => {
    persistor.flush().then(() => {
      dispatch(setIsAuthenticated(false));
      dispatch(setCurrentUser({} as User));
      dispatch(setToken(""));
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
            <Link to="/posts/recent" className="text-gray-600 hover:text-gray-900">Publications</Link>
            {isAuthenticated && (
              <>
              <Link to="/dashboard/publish" className="text-gray-600 hover:text-gray-900">New Post</Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link to="#" onClick={handleLogout} className="text-red-400 hover:text-red-600">Logout</Link>
                <img src={'/laptop.jpg'} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
              </>
            )}
            {!isAuthenticated && (
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
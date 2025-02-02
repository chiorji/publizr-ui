import { useNavigate, Link } from 'react-router-dom';
import { Edit3 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setIsAuthenticated } from '../app/features/users-slice';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.users);

  const handleLogout = () => {
    dispatch(setIsAuthenticated(false));
    navigate('/');
  };

  return (
    <nav className="border-b min-w-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center text-blue-600">
            <Link to="/" className="flex items-center">
              <Edit3 className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Publisher</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/posts" className="text-gray-600 hover:text-gray-900">Publications</Link>
            {isAuthenticated && (
              <>
                <Link to="#" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">Logout</Link>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
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
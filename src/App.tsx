import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './views/navigation'
import HomePage from './views/home-page'
import LoginScreen from './views/login-screen'
import SignupScreen from './views/signup-screen'
import PostListing from './views/posts/post-listing'
import PostDetail from './views/posts/post-detail'
import Dashboard from './views/dashboard';
import NewPost from './views/posts/new-post';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/posts" element={<PostListing />}/>
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/*" element={<div className='text-xl text-red-400 text-center p-8'>
            <h1>Page not found</h1>
            <p className='text-gray-800'>The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <p className='text-gray-800'>Please try your search again or contact the administrator.</p>
          </div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
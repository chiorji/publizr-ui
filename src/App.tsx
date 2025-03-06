import { Routes, Route, Outlet } from 'react-router-dom'
import Navigation from './components/ui/navigation'
import HomePage from './views/home-page'
import LoginScreen from './views/login-screen'
import SignupScreen from './views/signup-screen'
import PostListing from './views/posts/post-listing'
import PostDetail from './views/posts/post-detail'
import DashboardHome from './views/dashboard/dashboard';
import Publish from './views/posts/publish';
import { useRedirectIfRequireAuth } from './hooks'
import RecentPosts from './views/posts/recent-posts'
import { Suspense } from 'react'
import { NotFound } from './components/ui/404'
import UpdatePost from './views/posts/update-post'
import { ResetPassword } from './views/reset-password'
import { AdminPostView } from './views/dashboard/admin-post-view'
import { AdminUserView } from './views/dashboard/admin-user-view'

const App = () => {
  useRedirectIfRequireAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/posts/recent" element={<RecentPosts />} />
          <Route path="/posts" element={<PostListing />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/dashboard" element={<Outlet />}>
            <Route index element={<DashboardHome />} />
            <Route path="publish" element={<Publish />} />
            <Route path="update" element={<UpdatePost />} />
          </Route>
          <Route path='/admin' element={<Outlet />}>
            <Route index element={<AdminUserView />} />
            <Route path='posts' element={<AdminPostView />} />
            <Route path='post/:slug' element={<PostDetail />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
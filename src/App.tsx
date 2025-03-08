import { Routes, Route } from 'react-router-dom'
import Navigation from './components/ui/navigation'
import HomePage from './views/home-page'
import LoginScreen from './views/login-screen'
import SignupScreen from './views/signup-screen'
import PostDetail from './post/post-detail'
import Publish from './post/post-publish';
import { PostList } from './post/post-list'
import { Suspense } from 'react'
import { NotFound } from './components/ui/404'
import UpdatePost from './post/post-update'
import { ResetPassword } from './views/reset-password'
import { Protected } from './rbac/protected-route'
import { UserList } from './user/user-list'
import { PostByAuthor } from './post/post-by-author'

const App = () => {

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/posts" element={
            <Protected permission='post.read'>
              <PostList />
            </Protected>
          } />

          <Route path="/posts/:slug" element={<Protected permission='post.read'>
            <PostDetail />
          </Protected>} />

          <Route path='/discover' element={<Protected permission='user.read'>
            <UserList />
          </Protected>} />

          <Route path="/publish" element={
            <Protected permission='post.publish'>
              <Publish />
            </Protected>
          } />

          <Route path="/update" element={
            <Protected permission='post.edit'>
              <UpdatePost />
            </Protected>
          } />

          <Route path="/author" element={
            <Protected permission='post.publish'>
              <PostByAuthor />
            </Protected>
          } />

          <Route path="/*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
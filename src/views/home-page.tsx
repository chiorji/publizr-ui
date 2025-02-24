import { useNavigate } from 'react-router-dom';
import { ArrowRight, Edit3, Users, Zap, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.users);

  const getStartedClickHandler = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white min-w-screen">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Share your stories with</span>
                  <span className="block text-blue-600">the world</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Start your blogging journey today. Create, share, and connect with readers worldwide using our modern publishing platform.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow">
                    <button
                      onClick={getStartedClickHandler}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Writing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to start blogging
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Powerful features to help you create, grow, and manage your blog.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <Edit3 className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Rich Text Editor</h3>
                <p className="mt-2 text-base text-gray-500">
                  Write beautiful posts with our intuitive editor. Support for markdown, images, and more.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Built-in Community</h3>
                <p className="mt-2 text-base text-gray-500">
                  Connect with readers through comments, likes, and follows. Build your audience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Analytics</h3>
                <p className="mt-2 text-base text-gray-500">
                  Track your blog's performance with detailed analytics and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start blogging?</span>
            <span className="block text-blue-200">Join thousands of writers today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={getStartedClickHandler}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md bg-white text-blue-600 hover:bg-blue-50"
              >
                Get started
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import { useState } from 'react';

type Props = {
  username: string
  handleLogout: () => void
  email: string
  avatarUrl: string
}

const Thumbnail = ({username, email, avatarUrl, handleLogout}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
        <img src={avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
        <span className="hidden md:inline-block text-gray-700">{username}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <img src={avatarUrl} alt="User Avatar" className="w-16 h-16 rounded-full object-cover mx-auto" />
            <div className="mt-2 text-center">
              <p className="text-gray-700 font-bold">{username}</p>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
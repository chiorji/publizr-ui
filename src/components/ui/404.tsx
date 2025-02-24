export const NotFound = () => {
  return (
    <div className='text-red-400 text-center p-8 h-screen flex flex-col justify-center'>
      <div className='max-w-[600px] mx-auto'>
        <h1 className='text-6xl text-red-400'>404</h1>
        <div className='my-4'>
          <p className='text-sm text-gray-800 my-2'>The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <p className='text-sm text-gray-800'>Please try your search again or contact the administrator.</p>
        </div>
      </div>
    </div>
  );
}
export const EmptyContent = ({ message }: { message?: string }) => {
  return (
    <div className='text-xl text-red-400 text-center p-8 h-screen flex flex-col justify-center'>
      <div className='w-full mx-auto'>
        <h1 className='text-6xl text-red-400'>HEY, THERE'S A CATCH!</h1>
        <div className='my-4'>
          <p className='text-gray-800 my-2'>{message ?? "NO CONTENT TO DISPLAY"}</p>
        </div>
      </div>
    </div>
  );
}
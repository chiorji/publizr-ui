import { ReactNode } from "react";

export const EmptyContent = ({ message }: { message?: ReactNode }) => {
  return (
    <div className='text-xl text-red-400 text-center p-8 h-screen flex flex-col justify-center'>
      <div className='w-full mx-auto'>
        <h1 className='text-xl text-red-400'>HEY, THERE'S A CATCH!</h1>
        <div className='my-4'>
          {message ? message :
            <p className='text-gray-800 my-2'>NO CONTENT TO DISPLAY</p>
          }
        </div>
      </div>
    </div>
  );
}
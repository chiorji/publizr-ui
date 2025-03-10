import React, { ComponentProps, ReactNode } from "react";

type LoaderControlProps = ComponentProps<"div"> & {
  isLoading: boolean;
  children: ReactNode;
  isError: boolean;
  reloadHandler?: () => void
  error?: { title: string; subtitle?: string };
}

export const LoaderControl: React.FC<LoaderControlProps> = (props) => {
  const { isLoading, reloadHandler, children, isError, error } = props;
  const showContent = !isLoading && !isError;

  return (
    <div className="text-gray-800 w-full h-auto min-h-100 flex flex-col">
      {isLoading && <div className="flex flex-col m-auto">
        <p>Loading...</p>
      </div>
      }

      {(!isLoading && isError) && <div className="flex flex-col items-center m-auto">
        <p className="text-2xl font-bold">{error?.title}</p>
        <span>{error?.subtitle}</span>
        {reloadHandler && <button
          type="button"
          className="bg-red-500 text-white mt-8 rounded-sm p-2 px-4"
          onClick={reloadHandler}
        >
          Reload widget
        </button>
        }
      </div>
      }
      
      {showContent ? <>{children}</> : null}
    </div>
  )
}
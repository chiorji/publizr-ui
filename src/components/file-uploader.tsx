import { ChangeEvent, useState } from "react";
import { Image, AlertCircle } from 'lucide-react';
import { imageExtensions } from "../lib";
import { Alert, AlertDescription } from "./alert";

interface FileUploaderProps {
  accept: string[];
  changeHandler: (file: File | null) => void;
  sizeLimit?: number;
  title?: string;
  subtitle?: string;
  src?: string;
};

export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const { title, subtitle, accept, sizeLimit = 1, changeHandler, src } = props;
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(src ?? '');
  const [validationError, setValidationError] = useState("")

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const currentFileSize = Math.round(file.size / 1024 / 1024);
      const ext = file.name.split(".").pop()?.toLowerCase();

      const isRequiredFileFormat = accept.some((val: string) => val.toLowerCase() === ext);

      if (isRequiredFileFormat) {
        if (currentFileSize >= sizeLimit) {
          reader.abort();
          setValidationError("File size is too large, limit is 1MB");
          return false;
        }

        if (!ext && !imageExtensions[ext as string]) {
          reader.abort();
          setValidationError("Invalid image type, valid types are " + accept.join(", "));
          return false;
        }
      }

      if (!isRequiredFileFormat) {
        reader.abort();
        setValidationError(`Please upload file of types: ${accept.join(", ")}`);
        return false;
      }
      reader.onloadend = () => {
        changeHandler(file);
        setValidationError('')
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const onImageClearHandler = () => {
    setPreview(null);
    changeHandler(null);
    setValidationError('');
  }

  return (
    <div className='space-y-2'>
      <label htmlFor="cover-image" className="block text-sm font-medium text-gray-700" >
        {title ?? "Cover Image"}
      </label>
      < div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" >
        <div className="space-y-1 text-center" >
          {
            preview ? (
              <div className="relative" >
                <img
                  src={typeof preview === 'string' ? preview : undefined}
                  alt="Preview"
                  className="mx-auto h-32 w-auto"
                />
                <button
                  type="button"
                  onClick={onImageClearHandler}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600" >
                  <label
                    htmlFor="poster_card"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                  >
                    <span>{subtitle ?? 'Upload a file'} </span>
                    < input
                      id="poster_card"
                      name="poster_card"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                    />
                  </label>
                  < p className="pl-1" > or drag and drop </p>
                </div>
                < p className="text-xs text-gray-500" >{accept.join(', ')}</p>
              </>
            )}
        </div>
      </div>
      {
        validationError && (
          <Alert variant="destructive" >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError} </AlertDescription>
          </Alert>
        )
      }
    </div>
  )
}
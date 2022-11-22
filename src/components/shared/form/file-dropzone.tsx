import { type FormFieldProps } from "./text-field";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { RiUploadCloud2Fill } from "react-icons/ri";
import ErrorMessage from "../error-message";

export type FileDropzoneProps = Omit<FormFieldProps, "value"> & {
  handleChange: (files: File[]) => void;
  handleBlur: (name: string) => void;
};

const FileDropZone = ({
  handleChange,
  placeholder,
  label,
  name,
  error,
  handleBlur,
  fullWidth,
  required,
}: FileDropzoneProps) => {
  const onBlur = () => {
    handleBlur(name);
  };

  const { getRootProps } = useDropzone({
    onDrop: handleChange,
    onDropAccepted: onBlur,
    onDropRejected: onBlur,
    onFileDialogCancel: onBlur,
    onDragOver: onBlur,
  });
  return (
    <div className={`${fullWidth ? "w-full" : "w-max"} px-4 pb-6`}>
      <div className={`flex items-center justify-between font-medium`}>
        <label
          className={`${
            required &&
            "after:ml-[1px]  after:align-top after:text-red-600 after:content-['*']"
          }`}
        >
          {label}
        </label>
        <AiOutlineInfoCircle />
      </div>
      <div
        {...getRootProps()}
        className={`${fullWidth ? "w-full" : "w-[300px]"}
        mt-1
         h-[150px] cursor-pointer rounded-sm border-none bg-white p-2 outline-dotted  outline-2 outline-gray-300 placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-300`}
      >
        <input type="file" className="hidden" name={name} />
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-base">
          <RiUploadCloud2Fill className="text-2xl text-primary" />
          <span> Browse or drop files here</span>
          <span className="text-sm font-medium text-gray-600">
            {placeholder}
          </span>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FileDropZone;

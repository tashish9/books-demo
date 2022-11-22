import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import ErrorMessage from "./shared/error-message";
import { type FileDropzoneProps } from "./shared/form/file-dropzone";
import Image from "next/image";

type Props = Omit<FileDropzoneProps, "label" | "placeholder"> & {
  value: File | undefined;
};

const AddBookCover = ({
  error,
  handleBlur,
  value,
  handleChange,
  name,
}: Props) => {
  const [coverImage, setCoverImage] = useState<string>("");
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

  useEffect(() => {
    const readURL = (file: File) => {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target?.result);
        reader.onerror = (e) => rej(e);
        reader.readAsDataURL(file);
      });
    };

    const setUrl = async () => {
      if (value) {
        const result = await readURL(value);
        setCoverImage(result as string);
      }
    };
    setUrl();
  }, [value]);

  return (
    <>
      <div
        {...getRootProps()}
        className="relative flex aspect-a4 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary text-primary"
      >
        <input type="file" className="hidden" />

        {!coverImage && (
          <>
            <AiOutlinePlus />
            <p className=" text-base underline decoration-2 underline-offset-[3px]">
              Add a Book Cover
            </p>
          </>
        )}
        {coverImage && <Image src={coverImage} alt="Book Cover" fill />}
      </div>
      {error && <ErrorMessage message={error} />}
    </>
  );
};

export default AddBookCover;

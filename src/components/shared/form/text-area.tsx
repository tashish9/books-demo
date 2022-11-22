import React from "react";
import { type FormFieldProps } from "./text-field";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ErrorMessage from "../error-message";

type Props = FormFieldProps & {
  rows: number;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({
  handleChange,
  label,
  name,
  rows,
  fullWidth,
  error,
  handleBlur,
  value,
  placeholder,
  required,
}: Props) => {
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

      <textarea
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${fullWidth && "w-full"} ${
          error
            ? "outline-red-500 focus-visible:outline-red-500"
            : "outline-gray-300 focus-visible:outline-gray-300"
        } mt-1
        resize-none rounded-sm border-none bg-white p-2 outline outline-2   placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 `}
      />

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default TextArea;

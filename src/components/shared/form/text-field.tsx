import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ErrorMessage from "../error-message";

export type FormFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  fullWidth?: boolean;
  error: false | undefined | string;
  required?: boolean;
  value: string | number;
};

type TextFieldProps = FormFieldProps & {
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const TextField = ({
  type,
  name,
  label,
  error,
  handleChange,
  handleBlur,
  value,
  placeholder,
  fullWidth,
}: TextFieldProps) => {
  return (
    <div className={`${fullWidth ? "w-full" : "w-max"} px-4 pb-6`}>
      <div className={`flex items-center justify-between font-medium`}>
        <label
          className={`${"after:ml-[1px]  after:align-top after:text-red-600 after:content-['*']"}`}
        >
          {label}
        </label>
        <AiOutlineInfoCircle />
      </div>

      <input
        type={type || "text"}
        name={name}
        value={value}
        placeholder={placeholder || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${fullWidth && "w-full"} ${
          error
            ? "outline-red-500 focus-visible:outline-red-500"
            : "outline-gray-300 focus-visible:outline-gray-300"
        }
        mt-1 rounded-sm border-none bg-white p-2 outline outline-2   placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 `}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default TextField;

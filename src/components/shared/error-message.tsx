import { MdErrorOutline } from "react-icons/md";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="mt-[3px] ml-[1px] flex w-fit items-center  gap-1 text-center text-sm text-red-500">
      <MdErrorOutline />
      {message}
    </p>
  );
};

export default ErrorMessage;

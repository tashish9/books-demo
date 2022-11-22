import { type ButtonProps } from "./outlined-button";

const ContainedButton = ({
  children,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className="flex items-center rounded-md  border-2 bg-primary px-4 py-2 text-white"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default ContainedButton;

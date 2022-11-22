import { type PropsWithChildren } from "react";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit";
};

export type ButtonProps = Props & PropsWithChildren;

const OutlinedButton = ({
  children,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className="flex  items-center rounded-md  border-2 border-primary px-4 py-2 text-primary"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default OutlinedButton;

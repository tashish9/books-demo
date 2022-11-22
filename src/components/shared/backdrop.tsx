import { type PropsWithChildren } from "react";

const BackDrop = ({ children }: PropsWithChildren) => {
  return (
    <div className="fixed top-0 left-0 z-0 h-full w-full bg-black opacity-50">
      {children}
    </div>
  );
};

export default BackDrop;

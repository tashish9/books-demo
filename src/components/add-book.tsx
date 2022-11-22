import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  onClick: () => void;
};

const AddBook = ({ onClick }: Props) => {
  return (
    <div
      className="mx-auto w-[150px] cursor-pointer  sm:w-[180px] lg:w-[190px]"
      onClick={onClick}
    >
      <div className="my-2 flex h-[272px] w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-primary text-primary outline-blue-500 transition-all duration-75 hover:outline">
        <AiOutlinePlus />
        <p className="text-base underline decoration-2 underline-offset-[3px]">
          Add a Book
        </p>
      </div>
    </div>
  );
};

export default AddBook;

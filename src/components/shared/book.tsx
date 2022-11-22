import { Book } from "@prisma/client";
import Image from "next/image";
import router from "next/router";

const Book = ({ book }: { book: Book }) => {
  const handleClick = () => {
    router.push(`read/${book.id}`);
  };
  return (
    <div
      className="mx-auto w-[150px] cursor-pointer sm:w-[180px] lg:w-[190px]"
      onClick={handleClick}
    >
      <div className="relative my-2 h-[272px] w-full overflow-hidden rounded-xl outline-blue-500 transition-all duration-75 hover:outline">
        <Image fill src={book.coverImage} alt="book cover"></Image>
      </div>
      <h3 className="text-lg font-bold italic text-black">{book.title}</h3>
      <p className=" text-sm text-gray-400 ">
        {JSON.parse(book.authors as string)}
      </p>
    </div>
  );
};

export default Book;

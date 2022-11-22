import Image from "next/image";

type Props = {
  src: string;
};

const BookCover = ({ src }: Props) => {
  return (
    <div className="b relative flex aspect-a4 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-primary text-primary">
      <Image fill src={src} alt="book cover" />
    </div>
  );
};

export default BookCover;

import { type Book } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import BookCover from "../../components/book-cover";
import ContainedButton from "../../components/shared/buttons/contained-button";
import OutlinedButton from "../../components/shared/buttons/outlined-button";
import ErrorMessage from "../../components/shared/error-message";
import Iframe from "../../components/shared/iframe/iframe";
import LoadingSpinner from "../../components/shared/spinner/loading-spinner";
import { trpc } from "../../utils/trpc";

const Page: NextPage = () => {
  const [isReadingBook, setIsReadingBook] = useState(false);
  const [book, setBook] = useState<null | Book>(null);
  const router = useRouter();
  const { id } = router.query;

  const { isLoading } = trpc.books.getOne.useQuery(
    { bookId: id as string },
    {
      enabled: !!id,
      onSuccess: (data) => {
        setBook(data);
      },
      retry: false,
    }
  );

  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      if (isReadingBook && body) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }
  }, [isReadingBook]);

  return (
    <>
      <Head>
        <title> Read Book</title>
        <meta name="description" content="Generated by nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="min-h-screen lg:px-20"
        onClick={() => {
          setIsReadingBook(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Esc") {
            setIsReadingBook(false);
          }
        }}
      >
        <div className="mt-16">
          <OutlinedButton
            onClick={() => {
              router.push("/");
            }}
          >
            <BiChevronLeft className="mr-1 text-xl" />
            <p className="font-medium leading-5">Back to Home</p>
          </OutlinedButton>
        </div>

        {isLoading && (
          <div className="mt-10 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && !book && (
          <div className="mt-10 flex scale-125 items-center justify-center">
            <ErrorMessage message="Some error occurred" />
          </div>
        )}

        {book && (
          <div className="mt-6 flex">
            <div className="w-[30%]">
              <BookCover src={book.coverImage} />
            </div>
            <div className="w-[70%] px-10">
              <h1 className="text-4xl font-semibold text-primary">
                {book.title}
              </h1>
              <h6 className="mt-2 text-lg text-gray-500">
                {JSON.parse(book.authors as string)}
              </h6>
              <h6 className="mt-1 text-lg text-gray-500">
                Book Read Time : {book.readTime} mins
              </h6>
              <p className="mt-4 font-medium">{book.details}</p>
              <div className="mt-4">
                <ContainedButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsReadingBook(true);
                  }}
                >
                  Read This Book
                </ContainedButton>
              </div>
            </div>
            {isReadingBook && <Iframe src={book.pdf} />}
          </div>
        )}
      </main>
    </>
  );
};

export default Page;

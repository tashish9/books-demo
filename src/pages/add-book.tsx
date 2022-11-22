import { type NextPage } from "next";
import Head from "next/head";
import OutlinedButton from "../components/shared/buttons/outlined-button";
import { BiChevronLeft } from "react-icons/bi";
import AddBookCover from "../components/add-book-cover";
import { useFormik } from "formik";
import { z, type ZodError } from "zod";
import TextField from "../components/shared/form/text-field";
import TextArea from "../components/shared/form/text-area";
import FileDropZone from "../components/shared/form/file-dropzone";
import ContainedButton from "../components/shared/buttons/contained-button";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const AddBook: NextPage = () => {
  const router = useRouter();

  const addBook = trpc.books.create.useMutation();
  const AddBookValidationSchema = z.object({
    name: z.string().min(1, "Invalid book name"),
    authors: z.string().min(1, "Invalid author name"),
    readTime: z.union([z.string(), z.number()]).refine(
      (val) => {
        let num: number;
        if (typeof val === "number") num = val;
        else num = Number(val);

        if (isNaN(num)) return false;
        if (num <= 0) return false;
        return true;
      },
      {
        message: "Invalid read time",
      }
    ),
    details: z.string().min(1, 'Invalid book details"'),
    cover: z.object(
      {
        type: z.enum(["image/png", "image/jpg", "image/jpeg"], {
          errorMap: () => {
            return {
              message: "Invalid image format",
            };
          },
        }),
      },
      {
        errorMap: () => {
          return {
            message: "Cover image is required",
          };
        },
      }
    ),
    pdf: z.object(
      {
        type: z.enum(["application/pdf"], {
          errorMap: () => {
            return {
              message: "Please upload pdf only",
            };
          },
        }),
        size: z
          .number()
          .nonnegative()
          .lte(1048576, "Please upload file upto 10mb only"),
      },
      {
        errorMap: () => {
          return {
            message: "Pdf is required",
          };
        },
      }
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cover: undefined,
      authors: "",
      readTime: "",
      details: "",
      pdf: undefined,
    },
    validate: (values) => {
      try {
        AddBookValidationSchema.parse(values);
      } catch (error) {
        return (error as ZodError).formErrors.fieldErrors;
      }
    },
    onSubmit: async (values) => {
      console.log(values);
      const coverImageFormData = new FormData();
      coverImageFormData.append("cover", values.cover as unknown as File);

      const pdfFormData = new FormData();
      pdfFormData.append("cover", values.pdf as unknown as File);

      const coverImageResponse = await fetch(
        "http://localhost:3000/api/upload",
        {
          body: coverImageFormData,
          // headers: {},
          method: "POST",
        }
      );
      const coverImage = await coverImageResponse.json();

      const pdfFormDataResponse = await fetch(
        "http://localhost:3000/api/upload",
        {
          body: pdfFormData,
          // headers: {},
          method: "POST",
        }
      );

      const pdf = await pdfFormDataResponse.json();

      const something = {
        ...values,
        pdf: pdf.fileName,
        cover: coverImage.fileName,
        readTime: Number(values.readTime),
      };

      const response = await addBook.mutate(something);

      console.log(response);
    },
  });

  const handlePDFChange = (files: File[]) => {
    formik.setFieldValue("pdf", files[0]);
  };

  const handleCoverChange = (files: File[]) => {
    formik.setFieldValue("cover", files[0]);
  };

  const handleDropZoneBlur = (name: string) => {
    formik.setFieldTouched(name);
  };

  return (
    <>
      <Head>
        <title> Add Book</title>
        <meta name="description" content="Generated by nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen lg:px-20">
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

        <form className=" mt-6 flex h-full " onSubmit={formik.handleSubmit}>
          <div className="w-[30%] ">
            <AddBookCover
              error={formik.touched.cover && formik.errors.cover}
              handleBlur={handleDropZoneBlur}
              handleChange={handleCoverChange}
              name="cover"
              value={formik.values.cover}
              required
            />
          </div>
          <div className="h-full w-[70%]">
            <TextField
              label="Name of the Book"
              name="name"
              value={formik.values.name}
              handleChange={formik.handleChange}
              required
              handleBlur={formik.handleBlur}
              type="input"
              placeholder="Enter the published name"
              fullWidth
              error={formik.touched.name && formik.errors.name}
            />
            <div className="flex justify-between">
              <TextField
                label="Author of the Book"
                name="authors"
                required
                value={formik.values.authors}
                handleBlur={formik.handleBlur}
                error={formik.touched.authors && formik.errors.authors}
                handleChange={formik.handleChange}
                placeholder="All all the authors comma separated"
                fullWidth
              />
              <TextField
                label="Book read time"
                name="readTime"
                type="number"
                required
                value={formik.values.readTime}
                handleBlur={formik.handleBlur}
                error={formik.touched.readTime && formik.errors.readTime}
                handleChange={formik.handleChange}
                placeholder="Add time in mins"
                fullWidth
              />
            </div>
            <TextArea
              label="Book Details"
              name="details"
              required
              rows={6}
              value={formik.values.details}
              handleBlur={formik.handleBlur}
              error={formik.touched.details && formik.errors.details}
              handleChange={formik.handleChange}
              placeholder="Should not be more than 300 words"
              fullWidth
            />
            <FileDropZone
              label="Upload PDF"
              name="pdf"
              required
              handleBlur={handleDropZoneBlur}
              error={formik.touched.pdf && formik.errors.pdf}
              handleChange={handlePDFChange}
              placeholder="Supports: PDF, upto 10MB"
            />

            <div className="ml-3">
              <ContainedButton type="submit">Add Book</ContainedButton>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddBook;
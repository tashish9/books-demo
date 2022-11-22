import { router } from "../trpc";
import { booksRouter } from "./books";

export const appRouter = router({
  books: booksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

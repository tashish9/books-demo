import { router } from "../trpc";
import { exampleRouter } from "./example";
import { booksRouter } from "./books";

export const appRouter = router({
  example: exampleRouter,
  books: booksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

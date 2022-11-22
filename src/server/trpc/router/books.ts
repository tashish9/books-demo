import { z } from "zod";

import { router, publicProcedure } from "../trpc";
// const { Readable } = require("stream");

import { google } from "googleapis";

import { env } from "../../../env/server.mjs";

// interface Blob {
//   readonly size: number;
//   readonly type: string;
//   arrayBuffer(): Promise<ArrayBuffer>;
//   slice(start?: number, end?: number, contentType?: string): Blob;
//   stream(): ReadableStream<Uint8Array>;
//   text(): Promise<string>;
// }

// interface File extends Blob {
//   readonly lastModified: number;
//   readonly name: string;
//   readonly webkitRelativePath: string;
// }

const oAuth2Client = new google.auth.OAuth2({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  redirectUri: env.REDIRECT_URI,
});

oAuth2Client.setCredentials({
  refresh_token: env.DRIVE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

export const booksRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),
  getOne: publicProcedure
    .input(
      z.object({
        bookId: z.string().min(1),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.book.findUnique({
        where: {
          id: input.bookId,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Invalid book name"),
        authors: z.string().min(1, "Invalid author name"),
        readTime: z.number().positive().min(1),
        details: z.string().min(1, 'Invalid book details"'),
        cover: z.string().min(1),
        pdf: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = {
        title: input.name,
        coverImage: "/static".concat("/", input.cover),
        authors: JSON.stringify(
          input.authors.split(",").map((el) => {
            return el.trim();
          })
        ),
        details: input.details,
        readTime: input.readTime,
        pdf: "/static".concat("/", input.pdf),
      };

      return ctx.prisma.book.create({
        data,
      });
    }),
});

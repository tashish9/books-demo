// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  DRIVE_REFRESH_TOKEN: z.string(),
  CLIENT_SECRET: z.string(),
  CLIENT_ID: z.string(),
  REDIRECT_URI: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_BAR: z.string(),
  NEXT_PUBLIC_DRIVE_REFRESH_TOKEN: z.string(),
  NEXT_PUBLIC_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_CLIENT_ID: z.string(),
  NEXT_PUBLIC_REDIRECT_URI: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_BAR: process.env.NEXT_PUBLIC_BAR,
  NEXT_PUBLIC_DRIVE_REFRESH_TOKEN: process.env.NEXT_PUBLIC_DRIVE_REFRESH_TOKEN,
  NEXT_PUBLIC_CLIENT_SECRET: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  NEXT_PUBLIC_REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
};

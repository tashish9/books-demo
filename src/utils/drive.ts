import { google } from "googleapis";

import { env } from "../env/client.mjs";

const oAuth2Client = new google.auth.OAuth2({
  clientId: env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: env.NEXT_PUBLIC_CLIENT_SECRET,
  redirectUri: env.NEXT_PUBLIC_REDIRECT_URI,
});

oAuth2Client.setCredentials({
  refresh_token: env.NEXT_PUBLIC_DRIVE_REFRESH_TOKEN,
});

export const drive = google.drive({
  version: "v3",
  auth: oAuth2Client,
});

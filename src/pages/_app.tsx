import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import NavBar from "../components/nav-bar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);

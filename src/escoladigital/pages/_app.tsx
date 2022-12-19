import "../styles/globals.css";
import Navbar from "../components/NavBar";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white min-h-screen min-w-screen">
      <Navbar />

      <Component {...pageProps} />
    </div>
  );
}

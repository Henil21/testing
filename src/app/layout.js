import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/navbar";
import ScrollUp from "./components/ScrollUp/ScrollUp";
import Head from "next/head";
import StoreProvider from "./redux/StoreProvider";
import ClientLayout from "./ClientLayout";  // Import the new client layout component
import Script from "next/script";
import { ProfileProvider } from "./hooks/ProfileProvider";

export const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Axamine.ai - AI Integrated Diagnostic",
  description:
    "Axamine is an AI integrated diagnostic platform offering state-of-the-art solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Axamine - AI Integrated Diagnostic</title>
        <meta
          name="description"
          content="Axamine is an AI integrated diagnostic platform offering state-of-the-art solutions."
        />
        <meta
          name="keywords"
          content="Axamine, AI, Diagnostic, Healthcare, Technology, Henilsinh Raj, Axamine AI, Medtech"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.axamine.in" />
      </Head>
      <>
   <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />
  </>
      <body className={`${poppins.className}`}>
        <StoreProvider>
        <ProfileProvider>
            <Navbar />
            <ClientLayout>
              {children}
            </ClientLayout>
            <ScrollUp />
          </ProfileProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

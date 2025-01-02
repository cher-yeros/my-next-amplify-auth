'use client'


import type { Metadata } from "next";

// import "react-toastify/dist/ReactToastify.css";

import "react-toastify/ReactToastify.css";

import { Inter } from "next/font/google";
// import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

// import "@/app/globals.css";
import "@/assets/css/globals.css";

import "@/assets/css/about.css";
import "@/assets/css/auth.css";
import "@/assets/css/course_categories.css";
import "@/assets/css/courses.css";
import "@/assets/css/faq.css";
import "@/assets/css/footer.css";
import "@/assets/css/header.css";
import "@/assets/css/hero.css";
import "@/assets/css/main.css";
// import "@/assets/css/navbar.css";
import "@/assets/css/navbar1.css";
import "@/assets/css/team.css";

import "@/assets/css/bootstrap.min.css";

import BottomNavbar from "@/components/layout/BottomNavbar";
import StoreProvider from "@/components/layout/StoreProvider";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "aos/dist/aos.css";
import { Bounce, ToastContainer } from "react-toastify";
// import config from '@/utils/amplify_config'
const brandingSF = localFont({
  src: [
    {
      path: "../assets/fonts/BrandingSF-Bold.woff2",
      weight: "bold",
      style: "normal",
      // path: '../assets/fonts/BrandingSF-Bold.woff2'
    },
    {
      path: "../assets/fonts/BrandingSF-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/BrandingSF-BlackIt.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../assets/fonts/BrandingSF-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/BrandingSF-SemiBoldIt.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/BrandingSF-LightIt.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/BrandingSF-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/BrandingSF-ThinIt.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../assets/fonts/BrandingSF-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/BrandingSF-SemiLightIt.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../assets/fonts/BrandingSF-SemiLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/BrandingSF-BoldIt.woff2",
      weight: "bold",
      style: "italic",
    },
    {
      path: "../assets/fonts/BrandingSF-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/BrandingSF-MediumIt.woff2",
      weight: "500",
      style: "italic",
    },
  ],
});

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Lela Hub",
  description: "Lela Hub E-Learning Platform",
};


// Amplify.configure(outputs);
// configureAmplify()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className={brandingSF.className}>
        {/* <Suspense
          fallback={
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          }
          >  */}
        <StoreProvider>
          {/* <PersistGate persistor={persistor}> */}
          {/* <ToastContainer theme="colored" autoClose={500} />{" "} */}
          {/* <Navbar /> */}
          {/* <TopNavbar /> */}

          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
<Authenticator>
 <BottomNavbar />
          {children}        </Authenticator>

          {/* <TopNavbar /> */}
         
          {/* <Script src="/assets/js/main.js" /> */}
          {/* <Script src="/assets/js/slick.min.js"></Script> */}
          <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
          {/* </PersistGate>{" "} */}
        </StoreProvider>{" "}
        {/* </Suspense> */}
      </body>
    </html>
  );
}

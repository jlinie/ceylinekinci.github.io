import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import BackButton from "@/components/BackButton";
import { UiProvider } from "@/components/UiContext"; 
import { CursorProvider } from "@/components/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import SiteMenu from "@/components/SiteMenu";
import TopNavBar from "@/components/TopNavBar";

import Head from "next/head"; 

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ceylin Portfolio",
  description: "Portfolio of Ceylin Ekinci",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black overflow-hidden`}
      >
       <UiProvider>
          <CursorProvider>
            <CustomCursor />
            <TopNavBar />      
            <SiteMenu />       
            {children}
            <BackButton />    
          </CursorProvider>
        </UiProvider>
      </body>
    </html>
  );
}

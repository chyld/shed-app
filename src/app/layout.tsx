import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shed Store",
  description: "Find your perfect shed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ChartColumnBigIcon } from "lucide-react";
import {
  ClerkProvider,
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserDropDown from "@/components/common/user-dropdown";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
          <nav className="bg-primary p-4 text-white h-20 flex items-center justify-between">
            <Link
              className="font-bold text-2xl flex gap-1 items-center"
              href="/dashboard"
            >
              <ChartColumnBigIcon className="text-lime-500" />
              NextCash
            </Link>
            <div>
              <SignedOut>
                <div className="flex items-center">
                  <Button
                    asChild
                    variant="link"
                    className="text-white hover:cursor-pointer"
                  >
                    <SignInButton />
                  </Button>

                  <Button
                    asChild
                    variant="link"
                    className="text-white hover:cursor-pointer"
                  >
                    <SignUpButton />
                  </Button>
                </div>
              </SignedOut>

              <SignedIn>
                <UserDropDown />
              </SignedIn>
            </div>
          </nav>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rxume",
  description: "AI Powered Resume Builder",
};

import { ClerkProvider } from '@clerk/nextjs';
import { enUS } from '@clerk/localizations';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      localization={{
        ...enUS,
        unstable__errors: {
          ...enUS.unstable__errors,
          form_identifier_exists: 'An account with this email already exists. Please log in instead.',
        }
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

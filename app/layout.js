import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Providers } from "./providers";

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: "Social Media Post Agent",
  description: "AI-powered Twitter content creation and scheduling",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav.webp" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
          {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

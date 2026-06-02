import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/SessionProvider";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Adenola & Sons | FMCG Distribution in Nigeria",
  description:
    "Adenola & Sons is an indigenous firm involved in the marketing and sales of FMCG (fast moving consumer goods) and other allied products. We distribute superior products and services that improves the life of consumers.",
  keywords: [
    "Adenola & Sons",
    "FMCG",
    "distribution",
    "Nigeria",
    "consumer goods",
    "supply chain",
    "manufacturing",
  ],
  authors: [{ name: "Adenola & Sons" }],
  openGraph: {
    title: "Adenola & Sons",
    description:
      "We distribute superior products and services that improves the life of consumers",
    type: "website",
    locale: "en_NG",
    siteName: "Adenola & Sons",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/Logo.png" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}

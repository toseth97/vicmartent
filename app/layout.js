import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import { SessionProvider } from "./components/SessionProvider";

export const metadata = {
    title: "ADENOLA & SONS - Premium Distribution Solutions",
    description: "Leading distributor of FMCG and consumer goods in Nigeria. Quality products, responsive service, and trusted distribution networks.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head></head>
            <body suppressHydrationWarning={true}>
                <SessionProvider>
                    <Navigation />
                    <main className="pt-20">
                        {children}
                    </main>
                    <Footer />
                    <CookieConsent />
                </SessionProvider>
            </body>
        </html>
    );
}

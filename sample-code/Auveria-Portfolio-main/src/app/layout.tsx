import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { siteName, siteTagline } from "@/content/site";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { SearchProvider } from "@/lib/search-context";
import { AuthProvider } from "@/lib/auth-context";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteTagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--color-paper)] font-sans text-[var(--color-ink)] antialiased">
        <FirebaseAnalytics />
        <AuthProvider>
          <ThemeProvider defaultTheme="dark">
            <CurrencyProvider>
              <SearchProvider>
                <CartProvider>
                  <CustomCursor />
                  <div className="page-noise fixed inset-0 -z-10 opacity-50" aria-hidden />
                  <SiteShell>{children}</SiteShell>
                </CartProvider>
              </SearchProvider>
            </CurrencyProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

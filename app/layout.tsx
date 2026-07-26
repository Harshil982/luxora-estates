import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GrainOverlay } from "@/components/visual/grain-overlay";
import { AiAssistant } from "@/components/assistant/ai-assistant";
import { ThemeProvider, themeInitScript } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const SITE = "https://luxora-estates.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Luxora Estates — Where Extraordinary Living Begins",
    template: "%s · Luxora Estates",
  },
  description:
    "Luxora Estates curates the world's most exceptional residences — penthouses, villas and mansions across New York, Dubai, London, Malibu and beyond. Invest beyond imagination.",
  keywords: [
    "luxury real estate",
    "penthouses",
    "villas",
    "mansions",
    "Dubai property",
    "New York penthouse",
    "luxury investment",
    "Luxora Estates",
  ],
  authors: [{ name: "Luxora Estates" }],
  openGraph: {
    title: "Luxora Estates — Where Extraordinary Living Begins",
    description:
      "The world's most exceptional residences, curated. Invest beyond imagination.",
    type: "website",
    siteName: "Luxora Estates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxora Estates",
    description: "Where Extraordinary Living Begins.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <SmoothScroll>
            <GrainOverlay />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AiAssistant />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

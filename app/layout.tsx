import type { Metadata } from "next";
import { Playfair_Display, Inter, Amiri } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
 variable: "--font-playfair",
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
});

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
 weight: ["300", "400", "500"],
});

const amiri = Amiri({
 variable: "--font-amiri",
 subsets: ["arabic", "latin"],
 weight: ["400", "700"],
});

export const metadata: Metadata = {
 title: "Sadaf & Nadeem — Wedding Invitation",
 description:
   "You are cordially invited to celebrate the union of Sadaf and Nadeem.",
 openGraph: {
   title: "Sadaf & Nadeem — Wedding Invitation",
   description:
     "You are cordially invited to celebrate the union of Sadaf and Nadeem.",
   type: "website",
 },
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
   <html
     lang="en"
     className={`${playfair.variable} ${inter.variable} ${amiri.variable} h-full antialiased`}
   >
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    </head>
     <body className="h-full bg-[#FAFAF7] text-[#1A3626] env-safe">
       {children}
     </body>
   </html>
 );
}

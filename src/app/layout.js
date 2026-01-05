import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair"
});

export const metadata = {
  title: "TQTA - Turan Qastro Turizm Akademiyası",
  description: "CTH Akreditasiya Sertifikatlı Kulinariya və Turizm Təhsil Portalı",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className={`${inter.className} ${playfair.variable}`}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
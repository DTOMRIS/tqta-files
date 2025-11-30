import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Turan Gastro Akademi",
  description: "Eğitim Yönetim Sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          <Providers>
            {/* Mobil Menü (Sadece mobilde görünür) */}
            <MobileNav />

            {/* Sol Menü (Masaüstünde görünür) */}
            <Sidebar />

            {/* Ana İçerik Alanı */}
            <main className="flex-1 md:ml-72 overflow-y-auto h-screen pt-16 md:pt-0">
              <div className="p-4 md:p-8 max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </Providers>
          <Toaster position="top-right" richColors />
        </div>
      </body>
    </html>
  );
}
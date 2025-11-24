import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Turan Gastro Akademi",
  description: "EÄŸitim YÃ¶netim Sistemi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          {/* Sol MenÃ¼ (Sabit) */}
          <Sidebar />
          
          {/* Ana Ä°Ã§erik AlanÄ± */}
          <main className="flex-1 md:ml-72 overflow-y-auto h-screen">
            <div className="p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
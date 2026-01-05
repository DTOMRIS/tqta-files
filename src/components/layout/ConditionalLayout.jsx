'use client';

import { usePathname } from 'next/navigation';
import Sidebar from "./Sidebar";
import { MobileNav } from "./MobileNav";
import AISousChef from '@/components/ai-studio/AISousChef';
import Beledchiniz from '@/components/ai-studio/Beledchiniz';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Sidebar olmayan sayfalar
  const noSidebarPages = ['/landing', '/login', '/register'];
  const showSidebar = !noSidebarPages.includes(pathname);

  if (!showSidebar) {
    // Landing ve login sayfaları için full-screen layout
    return <>{children}</>;
  }

  // Dashboard sayfaları için sidebar ile layout
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobil Menü (Sadece mobilde görünür) */}
      <MobileNav />

      {/* Sol Menü (Masaüstünde görünür) */}
      <Sidebar />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 md:ml-64 overflow-y-auto h-screen pt-16 md:pt-0 bg-muted/30">
        <div className="max-w-[1920px] mx-auto">
          {children}
        </div>
      </main>

      {/* AI Agents - Tüm səhifələrdə mövcuddur */}
      <AISousChef />
      <Beledchiniz />
    </div>
  );
}




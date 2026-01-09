'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Landing sayfasındaysa direkt children döndür
  if (pathname === '/landing') {
    return <>{children}</>;
  }
  
  // Diğer sayfalarda normal layout
  return <>{children}</>;
}
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, FileText, Settings, LogOut, ChefHat, Building2, Globe, FileWarning, ScrollText, BookOpen, Award, GraduationCap } from 'lucide-react';

const sidebarSections = [
  {
    title: "Ümumi İdarəetmə",
    items: [
      { title: "Ana Panel", href: "/", icon: LayoutDashboard },
      { title: "Tələbə Qeydiyyat", href: "/telebe-qeydiyyat", icon: Users }, // Sözleşmeli Kayıt
      { title: "Tələbələr", href: "/telebeler", icon: Users }, // Tüm Öğrenciler
      { title: "Hoca Paneli", href: "/hoca-panel", icon: GraduationCap },
      { title: "Kurslar və Qiymətlər", href: "/kurslar", icon: BookOpen }, // Fiyat Listesi
    ]
  },
  {
    title: "DMA (Dövlət Məşğulluq)",
    items: [
      { title: "İmtahan Protokolları", href: "/dma-idare", icon: ScrollText },
    ]
  },
  {
    title: "CTH (Beynəlxalq)",
    items: [
      { title: "CTH Operasyon", href: "/cth-panel", icon: Award },
      { title: "Sınav Merkezi", href: "/sinav-merkezi/degerlendirme", icon: Globe },
      { title: "Kalite Güvence (IV)", href: "/kalite-kontrol", icon: FileText },
      { title: "Sənədlər və Formlar", href: "/formlar", icon: FileText }, // CTH Belgeleri
    ]
  },
  {
    title: "Sistem",
    items: [
      { title: "Ayarlar", href: "/ayarlar", icon: Settings },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex h-screen w-72 flex-col fixed left-0 top-0 border-r bg-slate-900 text-white">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="p-2 bg-blue-600 rounded-lg"><ChefHat className="h-6 w-6 text-white" /></div>
        <div><h1 className="font-bold text-lg">Turan Gastro</h1><p className="text-xs text-slate-400">Akademi Yönetimi</p></div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
        {sidebarSections.map((section, index) => (
          <div key={index}>
            <h3 className="mb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all group", pathname === item.href ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white")}>
                  <item.icon className="h-4 w-4" /> {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

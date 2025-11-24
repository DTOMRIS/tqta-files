'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileCheck,
  ClipboardCheck,
  FileText,
  Settings,
  LogOut,
  ChefHat
} from 'lucide-react';

const sidebarItems = [
  {
    title: "Ana Panel",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Telebe Qeydiyyat",
    href: "/telebe-qeydiyyat",
    icon: Users,
  },
  {
    title: "Sinav Merkezi (CTH)",
    href: "/sinav-merkezi/degerlendirme",
    icon: FileCheck,
  },
  {
    title: "Kalite Guvence (IV)",
    href: "/kalite-kontrol",
    icon: ClipboardCheck,
  },
  {
    title: "Raporlar & Formlar",
    href: "/formlar",
    icon: FileText,
  },
  {
    title: "Ayarlar",
    href: "/ayarlar",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-screen w-72 flex-col fixed left-0 top-0 border-r bg-slate-900 text-white">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="p-2 bg-blue-600 rounded-lg">
          <ChefHat className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">Turan Gastro</h1>
          <p className="text-xs text-slate-400">Akademi Yonetimi</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all group",
              pathname === item.href
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            )}
          >
            <item.icon className={cn("h-5 w-5 transition-colors", pathname === item.href ? "text-white" : "text-slate-500 group-hover:text-white")} />
            {item.title}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
          <LogOut className="h-5 w-5" />
          Cixis Yap
        </button>
      </div>
    </div>
  );
}
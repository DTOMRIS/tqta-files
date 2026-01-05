"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  ChefHat,
  Settings,
  LogOut,
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Star,
  Globe,
  Briefcase,
  FileText,
  ShieldCheck,
  Search,
  UserPlus,
  Bot
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // TÜM MENÜLERİ GERİ GETİRDİM (AZERİCE)
  const menuItems = [
    {
      title: "Ana Panel",
      path: "/",
      icon: <Home size={20} />
    },
    {
      title: "Tələbələr",
      path: "/telebeler",
      icon: <Users size={20} />
    },
    {
      title: "Müəllim Paneli",
      path: "/hoca-panel",
      icon: <ChefHat size={20} />
    },
    {
      title: "Yeni Qeydiyyat",
      path: "/telebe-qeydiyyat",
      icon: <UserPlus size={20} />
    },
    {
      title: "Kurslar",
      path: "/kurslar",
      icon: <BookOpen size={20} />
    },
    {
      title: "Akademik İzləmə",
      path: "/akademik-takip",
      icon: <GraduationCap size={20} />
    },
    {
      title: "Qiymətləndirmə",
      path: "/qiymetlendirme",
      icon: <Star size={20} />
    },
    {
      title: "İmtahan Mərkəzi",
      path: "/sinav-merkezi",
      icon: <ClipboardCheck size={20} />
    },
    {
      title: "CTH Paneli",
      path: "/cth-panel",
      icon: <Globe size={20} />
    },
    {
      title: "DMA İdarəetmə",
      path: "/dma-idare",
      icon: <Briefcase size={20} />
    },
    {
      title: "Sənədlər",
      path: "/sened-idare",
      icon: <FileText size={20} />
    },
    {
      title: "Keyfiyyətə Nəzarət",
      path: "/kalite-kontrol",
      icon: <ShieldCheck size={20} />
    },
    {
      title: "Daxili Yoxlama (IV)",
      path: "/iv-panel",
      icon: <Search size={20} />
    },
    {
      title: "İçerik Yönetimi",
      path: "/icerik-yonetimi",
      icon: <FileText size={20} />
    },
    {
      title: "Başvurular",
      path: "/basvurular",
      icon: <ClipboardCheck size={20} />
    },
    {
      title: "Agent Paneli",
      path: "/agent-panel",
      icon: <Globe size={20} />
    },
    {
      title: "Sorular",
      path: "/sorular",
      icon: <FileText size={20} />
    },
    {
      title: "AI Studio",
      path: "/ai-studio",
      icon: <Bot size={20} />
    }
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white min-h-screen fixed left-0 top-0 overflow-y-auto z-50 border-r border-border shadow-sm">

      {/* LOGO ALANI */}
      <div className="p-6 border-b border-border flex items-center gap-3 bg-gradient-to-br from-primary-50 to-primary-100/50">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
          <ChefHat size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">TQTA Sistem</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Tədris İdarəetmə</p>
        </div>
      </div>

      {/* MENÜ LİNKLERİ */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary-500/20 font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className={`transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* ALT KISIM */}
      <div className="p-4 border-t border-border space-y-1 bg-muted/30">
        <Link 
          href="/ayarlar/users" 
          className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-sm font-medium"
        >
          <Users size={18} />
          <span>İstifadəçilər</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-all duration-200 text-sm font-medium">
          <Settings size={18} />
          <span>Tənzimləmələr</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 text-sm font-medium">
          <LogOut size={18} />
          <span>Çıxış</span>
        </button>
      </div>
    </div>
  );
}

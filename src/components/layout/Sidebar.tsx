"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  ChefHat,
  Settings,
  LogOut,
  FileText
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // SADECE ÇALIŞAN VE GEREKLİ MENÜLER
  const menuItems = [
    {
      title: "Ana Panel", // Dashboard
      path: "/",
      icon: <Home size={20} />
    },
    {
      title: "Tələbələr", // Öğrenci Listesi
      path: "/telebeler",
      icon: <Users size={20} />
    },
    {
      title: "Müəllim Paneli", // Hoca Paneli
      path: "/hoca-panel",
      icon: <ChefHat size={20} />
    },
    // Gereksizler kaldırıldı (Sınav Merkezi, Kalite Güvence vb.)
    // İleride "Sənədlər" modülü gelince buraya ekleriz:
    // { title: "Sənədlər", path: "/senedler", icon: <FileText size={20} /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto z-50 border-r border-slate-800">

      {/* LOGO ALANI */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <ChefHat size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">TQTA Sistem</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Tədris İdarəetmə</p>
        </div>
      </div>

      {/* MENÜ LİNKLERİ */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <span className={`transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`}>
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* ALT KISIM */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition text-sm">
          <Settings size={18} />
          <span>Tənzimləmələr</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-900/10 rounded-xl transition text-sm">
          <LogOut size={18} />
          <span>Çıxış</span>
        </button>
      </div>
    </div>
  );
}

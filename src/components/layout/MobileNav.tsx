'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu, X, ChefHat,
    Home, Users, UserPlus, BookOpen, GraduationCap,
    Star, ClipboardCheck, Globe, Briefcase, FileText,
    ShieldCheck, Search
} from 'lucide-react';
import { cn } from "@/lib/utils";

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // MOBİL İÇİN DE TÜM MENÜLERİ GERİ GETİRDİM
    const menuItems = [
        {
            title: "Ana Panel",
            path: "/",
            icon: Home
        },
        {
            title: "Tələbələr",
            path: "/telebeler",
            icon: Users
        },
        {
            title: "Müəllim Paneli",
            path: "/hoca-panel",
            icon: ChefHat
        },
        {
            title: "Yeni Qeydiyyat",
            path: "/telebe-qeydiyyat",
            icon: UserPlus
        },
        {
            title: "Kurslar",
            path: "/kurslar",
            icon: BookOpen
        },
        {
            title: "Akademik İzləmə",
            path: "/akademik-takip",
            icon: GraduationCap
        },
        {
            title: "Qiymətləndirmə",
            path: "/qiymetlendirme",
            icon: Star
        },
        {
            title: "İmtahan Mərkəzi",
            path: "/sinav-merkezi",
            icon: ClipboardCheck
        },
        {
            title: "CTH Paneli",
            path: "/cth-panel",
            icon: Globe
        },
        {
            title: "DMA İdarəetmə",
            path: "/dma-idare",
            icon: Briefcase
        },
        {
            title: "Sənədlər",
            path: "/sened-idare",
            icon: FileText
        },
        {
            title: "Keyfiyyətə Nəzarət",
            path: "/kalite-kontrol",
            icon: ShieldCheck
        },
        {
            title: "Daxili Yoxlama (IV)",
            path: "/iv-panel",
            icon: Search
        },
        {
            title: "İstifadəçilər",
            path: "/ayarlar/users",
            icon: Users
        }
    ];

    return (
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-600 rounded-lg">
                    <ChefHat className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">Turan Gastro</span>
            </div>

            <button onClick={() => setIsOpen(true)} className="p-2 hover:bg-slate-800 rounded-lg">
                <Menu className="h-6 w-6" />
            </button>

            {/* Overlay & Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="relative w-64 h-full bg-slate-900 text-white shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="p-4 flex items-center justify-between border-b border-slate-800">
                            <h2 className="font-bold text-lg">Menü</h2>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all group",
                                        pathname === item.path
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

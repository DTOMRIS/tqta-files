'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChefHat } from 'lucide-react';
import { cn } from "@/lib/utils";
import { sidebarSections } from './Sidebar';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

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

                        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
                            {sidebarSections.map((section, index) => (
                                <div key={index}>
                                    <h3 className="mb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {section.items.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all group",
                                                    pathname === item.href
                                                        ? "bg-blue-600 text-white"
                                                        : "text-slate-400 hover:text-white"
                                                )}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

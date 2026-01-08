'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

const NAVY_BLUE = '#0A192F';
const GOLD = '#C5A022';

interface SidebarItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  submenu?: { label: string; href: string }[];
}

export const TeacherSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const sidebarItems: SidebarItem[] = [
    {
      label: 'Panel',
      href: '/portal/teacher',
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: 'Derslerim',
      icon: <BookOpen size={20} />,
      submenu: [
        { label: 'Peşəkar Aşçılıq', href: '/portal/teacher/courses/1' },
        { label: 'Restoran Servisi', href: '/portal/teacher/courses/2' },
        { label: 'Barista Hazırlığı', href: '/portal/teacher/courses/3' },
      ],
    },
    {
      label: 'Öğrenci Yönetimi',
      href: '/portal/teacher/students',
      icon: <Users size={20} />,
    },
    {
      label: 'Ödevler & Sınavlar',
      href: '/portal/teacher/assignments',
      icon: <FileText size={20} />,
    },
    {
      label: 'Notlandırma',
      href: '/portal/teacher/grades',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'İletişim',
      href: '/portal/teacher/announcements',
      icon: <MessageSquare size={20} />,
    },
    {
      label: 'Analitikler',
      href: '/portal/teacher/analytics',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'Ayarlar',
      href: '/portal/teacher/settings',
      icon: <Settings size={20} />,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold" style={{ color: NAVY_BLUE }}>
          TQTA
        </h1>
        <p className="text-xs text-gray-400 mt-1">Öğretmen Portalı</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-2">
        {sidebarItems.map((item, idx) => {
          const isActive =
            item.href && pathname === item.href;
          const isMenuExpanded = expandedMenus.includes(item.label);

          return (
            <div key={idx}>
              {item.submenu ? (
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={`w-full flex items-center justify-between px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    isMenuExpanded
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: GOLD }}>{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      isMenuExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link href={item.href || '#'}>
                  <a
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </Link>
              )}

              {/* Submenu */}
              {item.submenu && isMenuExpanded && (
                <div className="pl-6 space-y-1 mt-2">
                  {item.submenu.map((subitem, subidx) => (
                    <Link key={subidx} href={subitem.href}>
                      <a
                        className={`block px-6 py-2 rounded-lg text-xs font-medium transition-all ${
                          pathname === subitem.href
                            ? 'bg-yellow-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subitem.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-6">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
          onClick={() => {
            localStorage.removeItem('userRole');
            window.location.href = '/';
          }}
        >
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 bg-white border-r border-gray-200 fixed h-screen">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50">
          <div className="w-64 bg-white h-screen">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherSidebar;

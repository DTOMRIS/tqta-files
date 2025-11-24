import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserPlus,
  BookOpen,
  FileText,
  Award,
  ShieldCheck,
  FolderOpen,
  Settings
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* LOGO ALANI */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold text-blue-400">Turan Gastro</h1>
        <p className="text-xs text-slate-400">Akademi Yönetimi</p>
      </div>

      <nav className="flex-1 p-4 space-y-8">

        {/* GRUP 1: Ümumi İdarəetmə */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
            Ümumi İdarəetmə
          </h3>
          <div className="space-y-1">
            <Link href="/" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <LayoutDashboard size={18} />
              <span>Ana Panel</span>
            </Link>
            <Link href="/telebe-qeydiyyat" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/telebe-qeydiyyat') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <UserPlus size={18} />
              <span>Tələbə Qeydiyyat</span>
            </Link>
            <Link href="/kurslar" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/kurslar') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <BookOpen size={18} />
              <span>Kurslar və Qiymətlər</span>
            </Link>
          </div>
        </div>

        {/* GRUP 2: DMA (Dövlət Məşğulluq) */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
            DMA (Dövlət Məşğulluq)
          </h3>
          <div className="space-y-1">
            {/* İmtahan Protokolları için Evrak Merkezine yönlendiriyoruz */}
            <Link href="/sened-idare" className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive('/sened-idare') ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}>
              <FileText size={18} />
              <span>İmtahan Protokolları</span>
            </Link>
          </div>
        </div>

        {/* GRUP 3: CTH (Beynəlxalq) */}
        <div>
'use client';

import React from 'react';
import AdminSidebar from '@/components/portal/AdminSidebar';
import { RoleGuard } from '@/components/portal/RoleGuard';
import { UserRole, Permission } from '@/lib/permissions';
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Target,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const NAVY_BLUE = '#0A192F';
const GOLD = '#C5A022';

export default function AdminDashboard() {
  return (
    <RoleGuard requiredRole={UserRole.ADMIN}>
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-80">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 pt-20 lg:pt-0">
          <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: NAVY_BLUE }}>
                  Admin Paneli
                </h1>
                <p className="text-gray-500 text-sm mt-2">Platformun genel durumu ve analitikleri</p>
              </div>
              <button
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: GOLD,
                  color: NAVY_BLUE,
                }}
              >
                Rapor İndir
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  label: 'Toplam Leadlar',
                  value: '1,284',
                  change: '+12%',
                  positive: true,
                  icon: Users,
                },
                {
                  label: 'Konversiya Oranı',
                  value: '4.2%',
                  change: '-0.5%',
                  positive: false,
                  icon: Target,
                },
                {
                  label: 'Gözlenen Gelir',
                  value: '45,000₼',
                  change: '+8%',
                  positive: true,
                  icon: ShoppingCart,
                },
                {
                  label: 'AI Chat Aktivite',
                  value: '890',
                  change: '+24%',
                  positive: true,
                  icon: TrendingUp,
                },
              ].map((kpi, idx) => {
                const IconComponent = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: GOLD + '20', color: GOLD }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-semibold ${
                          kpi.positive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {kpi.positive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        {kpi.change}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs font-semibold mb-1">{kpi.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                  </div>
                );
              })}
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Konversiya Hunisi */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                  Konversiya Hunisi
                </h2>
                <div className="space-y-4">
                  {[
                    { stage: 'Landing Sayfası', value: 100, color: NAVY_BLUE },
                    { stage: 'Program Sayfası', value: 65, color: '#0097A7' },
                    { stage: 'AI Chat', value: 40, color: GOLD },
                    { stage: 'Lead Formu', value: 12, color: '#4CAF50' },
                    { stage: 'Kayıt', value: 4, color: '#FF6B6B' },
                  ].map((step, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          {step.stage}
                        </span>
                        <span className="text-sm font-bold" style={{ color: step.color }}>
                          {step.value}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            backgroundColor: step.color,
                            width: `${step.value}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sistem Durumu */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                  Sistem Durumu
                </h2>
                <div className="space-y-4">
                  {[
                    { label: 'Sunucu', status: 'Sağlıklı', color: 'green' },
                    { label: 'Veritabanı', status: 'Sağlıklı', color: 'green' },
                    { label: 'API', status: 'Sağlıklı', color: 'green' },
                    { label: 'Email', status: 'Uyarı', color: 'yellow' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.color === 'green'
                              ? 'bg-green-500'
                              : item.color === 'yellow'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                        ></div>
                        <span className="text-xs font-semibold text-gray-600">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Uyarılar */}
            <div>
              <h2 className="text-xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                Önemli Uyarılar
              </h2>
              <div className="space-y-3">
                {[
                  {
                    title: 'Düşük Konversiya Oranı',
                    message: 'Geçen haftaya göre %0.5 düştü. Kontrol etmek için tıklayın.',
                    severity: 'warning',
                  },
                  {
                    title: 'Veritabanı Yedekleme',
                    message: 'Son yedekleme 48 saat önce yapıldı. Şimdi yedekleyin.',
                    severity: 'info',
                  },
                  {
                    title: 'Email Hizmeti Yavaş',
                    message: '15 dakikalık gecikme tespit edildi. Teknik ekibe bildir.',
                    severity: 'warning',
                  },
                ].map((alert, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-4 flex items-start gap-4 ${
                      alert.severity === 'warning'
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <AlertCircle
                      size={20}
                      className={
                        alert.severity === 'warning'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }
                    />
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{
                          color:
                            alert.severity === 'warning'
                              ? '#D97706'
                              : '#0EA5E9',
                        }}
                      >
                        {alert.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

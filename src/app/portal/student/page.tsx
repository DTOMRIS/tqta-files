'use client';

import React from 'react';
import StudentSidebar from '@/components/portal/StudentSidebar';
import { RoleGuard } from '@/components/portal/RoleGuard';
import { UserRole, Permission } from '@/lib/permissions';
import { BarChart3, Clock, Award, TrendingUp } from 'lucide-react';

const NAVY_BLUE = '#0A192F';
const GOLD = '#C5A022';

export default function StudentDashboard() {
  return (
    <RoleGuard
      requiredRole={UserRole.STUDENT}
      requiredPermissions={[Permission.VIEW_OWN_COURSES]}
    >
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-64">
          <StudentSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 pt-20 lg:pt-0">
          <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: NAVY_BLUE }}>
                  Öğrenci Paneli
                </h1>
                <p className="text-gray-500 text-sm mt-2">Merhaba, Aysel! Bugünün özetin burada.</p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">GPA</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      4.8
                    </h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <Award size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">Katılım</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      96%
                    </h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <TrendingUp size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">Aktif Kurslar</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      3
                    </h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <BarChart3 size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">Sertifikalar</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      2
                    </h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <Award size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Aktif Kurslar */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                Aktif Kurslarım
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Peşəkar Aşçılıq',
                    teacher: 'Chef İbrahim',
                    progress: 65,
                    daysLeft: 21,
                  },
                  {
                    title: 'Restoran Servisi',
                    teacher: 'Fatih Yılmaz',
                    progress: 45,
                    daysLeft: 35,
                  },
                  {
                    title: 'Barista Hazırlığı',
                    teacher: 'Leyla Həsənova',
                    progress: 80,
                    daysLeft: 12,
                  },
                ].map((course, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.teacher}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-gray-600">İlerleme</p>
                        <span className="text-sm font-bold" style={{ color: GOLD }}>
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            backgroundColor: GOLD,
                            width: `${course.progress}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{course.daysLeft} gün kaldı</span>
                    </div>

                    <button
                      className="w-full mt-4 py-2 rounded-lg font-semibold transition-all"
                      style={{
                        backgroundColor: GOLD,
                        color: NAVY_BLUE,
                      }}
                    >
                      Kursa Devam Et
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Son Etkinlikler */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                Son Etkinlikler
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="space-y-4">
                  {[
                    '🎓 Barista sertifikasını tamamladın!',
                    '📝 Restoran Servisi Final Sınavı gönderildi',
                    '⭐ Aşçılık Modülü 2 tamamlandı',
                    '📚 Yeni ders yüklendi: Michelin Mutfağı',
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 pb-4 border-b border-gray-200 last:border-0">
                      <span className="text-2xl">{activity.split(' ')[0]}</span>
                      <span className="text-gray-700">{activity.substring(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

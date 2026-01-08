'use client';

import React from 'react';
import TeacherSidebar from '@/components/portal/TeacherSidebar';
import { RoleGuard } from '@/components/portal/RoleGuard';
import { UserRole, Permission } from '@/lib/permissions';
import { Users, BookOpen, TrendingUp, MessageSquare } from 'lucide-react';

const NAVY_BLUE = '#0A192F';
const GOLD = '#C5A022';

export default function TeacherDashboard() {
  return (
    <RoleGuard requiredRole={UserRole.TEACHER}>
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-64">
          <TeacherSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <TeacherSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 pt-20 lg:pt-0">
          <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: NAVY_BLUE }}>
                  Öğretmen Paneli
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  Merhaba, Chef İbrahim! Sınıflarınızın genel durumu.
                </p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">Aktif Dersler</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      5
                    </h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <BookOpen size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">Toplam Öğrenci</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      127
                    </h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <Users size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-semibold mb-1">Ortalama Katılım</p>
                    <h3 className="text-3xl font-bold" style={{ color: NAVY_BLUE }}>
                      88%
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
                    <p className="text-gray-400 text-sm font-semibold mb-1">Cevapsız Sorular</p>
                    <h3 className="text-3xl font-bold text-orange-600">12</h3>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: GOLD + '20', color: GOLD }}
                  >
                    <MessageSquare size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Derslerim */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                Derslerim
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Peşəkar Aşçılıq',
                    students: 35,
                    modules: 12,
                    avgGrade: 4.5,
                  },
                  {
                    title: 'Restoran Servisi',
                    students: 28,
                    modules: 8,
                    avgGrade: 4.3,
                  },
                  {
                    title: 'Barista Hazırlığı',
                    students: 22,
                    modules: 6,
                    avgGrade: 4.7,
                  },
                  {
                    title: 'Sommelier Temel',
                    students: 18,
                    modules: 5,
                    avgGrade: 4.2,
                  },
                  {
                    title: 'Mutfak İşletmeciliği',
                    students: 24,
                    modules: 10,
                    avgGrade: 4.4,
                  },
                  {
                    title: 'Hijyen & Güvenlik',
                    students: 31,
                    modules: 4,
                    avgGrade: 4.8,
                  },
                ].map((course, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Öğrenciler:</span>
                        <span className="font-semibold text-gray-900">{course.students}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Modüller:</span>
                        <span className="font-semibold text-gray-900">{course.modules}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Ort. Not:</span>
                        <span className="font-semibold" style={{ color: GOLD }}>
                          {course.avgGrade}
                        </span>
                      </div>
                    </div>

                    <button
                      className="w-full py-2 rounded-lg font-semibold transition-all"
                      style={{
                        backgroundColor: GOLD,
                        color: NAVY_BLUE,
                      }}
                    >
                      Sınıfı Yönet
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Yapılacak İşler */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY_BLUE }}>
                Yapılacak İşler
              </h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="space-y-4">
                  {[
                    '📋 14 adet ödev notlandırması bekleniyor',
                    '❓ Barista modülü hakkında 3 soru var',
                    '📊 Aşçılık sınıfı ara raporu hazırlanmalı',
                    '📢 Final sınavı duyurusu gönderilmeli',
                  ].map((task, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 pb-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-gray-700">{task.substring(3)}</span>
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

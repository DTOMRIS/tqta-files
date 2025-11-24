'use client';

import { useState } from 'react';
import { KURSLAR } from '@/data/kurslar'; // Typescript verisini çeker
import { Button } from "@/components/ui/button"; // Senin UI kütüphanen
import Link from 'next/link';

export default function KurslarPage() {
  const [filter, setFilter] = useState('HEPSI');

  // Filtreleme mantığı
  const filteredKurslar = KURSLAR.filter(kurs =>
    filter === 'HEPSI' ? true : kurs.tip === filter
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kurs İdarəetmə (CTH & DMA)</h1>
        <Link href="/kurslar/yeni">
          <Button>+ Yeni Kurs</Button>
        </Link>
      </div>

      {/* Filtre Butonları */}
      <div className="flex gap-2 bg-slate-100 p-1 rounded-lg w-fit">
        {['HEPSI', 'DMA', 'CTH', 'STANDART'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === f
              ? 'bg-white shadow text-blue-600'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tablo */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-medium text-slate-500">Kurs Adı</th>
              <th className="p-4 font-medium text-slate-500">Tip</th>
              <th className="p-4 font-medium text-slate-500">Qiymət</th>
              <th className="p-4 font-medium text-slate-500">Müddət</th>
              <th className="p-4 font-medium text-slate-500 text-right">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {filteredKurslar.map((kurs) => (
              <tr key={kurs.id} className="border-b last:border-0 hover:bg-slate-50">
                <td className="p-4 font-medium">{kurs.ad}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${kurs.tip === 'CTH' ? 'bg-purple-100 text-purple-700' :
                    kurs.tip === 'DMA' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {kurs.tip}
                  </span>
                </td>
                <td className="p-4">
                  {kurs.qiymet.dmaOdenissiz ? (
                    <span className="text-green-600 font-bold">Ödənişsiz (DMA)</span>
                  ) : (
                    <div className="flex flex-col">
                      <span>{kurs.qiymet.satisAZN} AZN</span>
                      {kurs.tip === 'CTH' && (
                        <span className="text-xs text-slate-400">Maliyet: £{kurs.cth?.feeGBP}</span>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-4 text-slate-600">
                  {kurs.muddet.toplamGun} Gün / {kurs.muddet.toplamSaat} Saat
                </td>
                <td className="p-4 text-right">
                  <Link href={`/kurslar/${kurs.id}`}>
                    <Button variant="outline" size="sm">Detay</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
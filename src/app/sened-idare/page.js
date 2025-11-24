'use client';

import { useState } from 'react';
import { KURSLAR } from '@/data/kurslar';
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download } from 'lucide-react';

export default function SenedIdarePage() {
  const [selectedKurs, setSelectedKurs] = useState(null);

  // Sadece Aktif Kursları Getir
  const aktifKurslar = KURSLAR.filter(k => k.aktif);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Printer /> Sənəd və Evrak Mərkəzi
      </h1>
      <p className="text-gray-500">DMA Tabelləri, CTH Qeydiyyat formları və İmtahan protokolları buradan idarə olunur.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* SOL: Kurs Seçimi */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="font-semibold mb-4 text-lg">1. Kurs Seçin</h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {aktifKurslar.map(kurs => (
              <div
                key={kurs.id}
                onClick={() => setSelectedKurs(kurs)}
                className={`p-3 rounded-md cursor-pointer border transition-all ${selectedKurs?.id === kurs.id
                    ? 'bg-blue-50 border-blue-500 shadow-sm'
                    : 'hover:bg-gray-50 border-transparent'
                  }`}
              >
                <div className="font-medium text-sm">{kurs.ad}</div>
                <div className="flex gap-2 mt-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${kurs.tip === 'DMA' ? 'bg-blue-100 text-blue-700' :
                      kurs.tip === 'CTH' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100'
                    }`}>
                    {kurs.tip}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ: Evrak İşlemleri */}
        <div className="md:col-span-2 bg-slate-50 p-8 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">

          {selectedKurs ? (
            <div className="space-y-6 w-full max-w-md">
              <div>
                <h3 className="text-2xl font-bold">{selectedKurs.ad}</h3>
                <p className="text-gray-500">{selectedKurs.muddet.toplamGun} Gün / {selectedKurs.muddet.toplamSaat} Saat</p>
              </div>

              <div className="grid gap-4">
                {/* DMA ÖZEL BUTONLARI */}
                {selectedKurs.tip === 'DMA' && (
                  <>
                    <div className="bg-white p-4 rounded border text-left">
                      <h4 className="font-bold text-blue-700 mb-2 flex items-center gap-2">
                        <FileText size={16} /> DMA Evrak Paketi
                      </h4>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Davamiyyət Tabeli (Excel)
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> İmtahan Protokolu (Docx)
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Xaric Olma Əmri
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* CTH ÖZEL BUTONLARI */}
                {selectedKurs.tip === 'CTH' && (
                  <>
                    <div className="bg-white p-4 rounded border text-left">
                      <h4 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                        <FileText size={16} /> CTH (London) Paketi
                      </h4>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Registration Form (GBP Invoice)
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Assessment Cover Sheet
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* STANDART BUTONLAR */}
                <div className="bg-white p-4 rounded border text-left">
                  <h4 className="font-bold text-gray-700 mb-2">Ümumi Sənədlər</h4>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="secondary">
                      <Printer className="mr-2 h-4 w-4" /> Tələbə Siyahısı (PDF)
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>Sol tərəfdən bir kurs seçin ki, lazımi sənədləri hazırlayaq.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
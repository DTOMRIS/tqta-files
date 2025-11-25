'use client';
import { useState } from 'react';
import { KURSLAR } from '@/data/kurslar';
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function SenedIdarePage() {
  const [selectedKurs, setSelectedKurs] = useState(null);
  const aktifKurslar = KURSLAR.filter(k => k.aktif);

  // --- GARANTİLİ EXCEL İNDİRME ---
  const handleDownloadExcel = () => {
    if (!selectedKurs) return;

    try {
      console.log("Excel hazırlığı başladı...");

      // 1. Veriyi Hazırla (Satır Satır)
      const basliklar = ["Ad Soyad", "Kurs", "Tarix", "1", "2", "3", "4", "5", "...", "30", "Yekun"];
      const ornekOgrenci = ["Nümunə Tələbə", selectedKurs.ad, "Mart 2025", "G", "G", "qb", "G", "G", "...", "G", "Devamlı"];

      // 2. Tabloyu Oluştur
      const ws = XLSX.utils.aoa_to_sheet([
        ["AZƏRBAYCAN RESPUBLİKASI ƏMƏK VƏ ƏHALİNİN SOSİAL MÜDAFİƏSİ NAZİRLİYİ"],
        ["DÖVLƏT MƏŞĞULLUQ AGENTLİYİ"],
        [],
        [`KURS: ${selectedKurs.ad.toUpperCase()}`],
        [`MÜDDƏT: ${selectedKurs.muddet.toplamGun} Gün / ${selectedKurs.muddet.toplamSaat} Saat`],
        [],
        basliklar,
        ornekOgrenci,
        ["", "", "", "", "", "", "", "", "", "", ""], // İmza yerleri için boşluk
        ["Direktor:", "", "", "Mühür Yeri:", "", "", "", "", "", "", ""]
      ]);

      // 3. Sütun Genişliklerini Ayarla (Görünüm Düzgün Olsun)
      ws['!cols'] = [{ wch: 25 }, { wch: 30 }, { wch: 15 }, { wch: 5 }, { wch: 5 }];

      // 4. Kitabı Oluştur
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Davamiyyət");

      // 5. İNDİR (En Basit ve Güvenli Yöntem)
      XLSX.writeFile(wb, `Tabel_${selectedKurs.id}_2025.xlsx`);

      console.log("İndirme tetiklendi.");

    } catch (error) {
      console.error("Excel hatası:", error);
      alert("Excel oluşturulurken hata çıktı: " + error.message);
    }
  };
  // ------------------------------------------

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Printer /> Sənəd və Evrak Mərkəzi
      </h1>
      <p className="text-gray-500">DMA Tabelləri, CTH Qeydiyyat formları ve İmtahan protokolları.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SOL: Kurs Seçimi */}
        <div className="bg-white p-4 rounded-lg shadow border h-fit">
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
        <div className="md:col-span-2 bg-slate-50 p-8 rounded-lg border border-dashed flex flex-col items-center justify-center text-center min-h-[400px]">
          {selectedKurs ? (
            <div className="space-y-6 w-full max-w-md">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-xl font-bold text-gray-800">{selectedKurs.ad}</h3>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><CheckCircle size={14} /> {selectedKurs.muddet.toplamGun} Gün</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} /> {selectedKurs.muddet.toplamSaat} Saat</span>
                </div>
              </div>

              <div className="grid gap-4">
                {selectedKurs.tip === 'DMA' && (
                  <div className="bg-white p-4 rounded border text-left border-l-4 border-l-blue-500">
                    <h4 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                      <FileText size={18} /> DMA (Məşğulluq) Paketi
                    </h4>
                    <div className="space-y-3">
                      {/* BUTON TİPİNE DİKKAT: type="button" EKLENDİ */}
                      <Button
                        type="button"
                        onClick={handleDownloadExcel}
                        className="w-full justify-start h-12 text-md bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="mr-2 h-5 w-5" /> Davamiyyət Tabeli İndir (.xlsx)
                      </Button>

                      <Button type="button" className="w-full justify-start h-12 text-md" variant="outline">
                        <Download className="mr-2 h-5 w-5" /> İmtahan Protokolu (.docx)
                      </Button>
                    </div>
                  </div>
                )}

                {selectedKurs.tip === 'CTH' && (
                  <div className="bg-white p-4 rounded border text-left border-l-4 border-l-purple-500">
                    <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                      <FileText size={18} /> CTH (London) Paketi
                    </h4>
                    <div className="space-y-3">
                      <Button type="button" className="w-full justify-start h-12 text-md" variant="default">
                        <Download className="mr-2 h-5 w-5" /> Registration Invoice (£{selectedKurs.cth?.feeGBP})
                      </Button>
                    </div>
                  </div>
                )}

                {selectedKurs.tip === 'STANDART' && (
                  <div className="text-gray-500 italic">Bu kurs üçün xüsusi sənəd yoxdur.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <Printer size={64} className="mx-auto mb-6 opacity-20" />
              <p className="text-lg">Sənədləri hazırlamaq üçün sol tərəfdən kurs seçin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
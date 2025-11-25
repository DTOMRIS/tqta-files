import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/schema';
import { sql, like, or, and, eq } from 'drizzle-orm';
import * as XLSX from 'xlsx';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const kursId = searchParams.get('kursId') || '';

        // Filtr şərtləri
        const conditions = [eq(students.aktif, true)];

        if (kursId) {
            conditions.push(eq(students.kursId, kursId));
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        // Bütün tələbələri çək
        const studentsList = await db
            .select({
                id: students.id,
                ad: students.ad,
                soyad: students.soyad,
                ataAdi: students.ataAdi,
                email: students.email,
                telefon: students.telefon,
                dogumTarixi: students.dogumTarixi,
                cinsiyet: students.cinsiyet,
                kursId: students.kursId,
                anaKategoriya: students.anaKategoriya,
                tehsilFormati: students.tehsilFormati,
                kayitTarihi: students.kayitTarihi,
                finalPrice: students.finalPrice,
                odenisNovu: students.odenisNovu,
                finKod: students.finKod
            })
            .from(students)
            .where(whereClause);

        // Excel formatına çevir
        const excelData = studentsList.map((s, index) => ({
            '№': index + 1,
            'Ad': s.ad,
            'Soyad': s.soyad,
            'Ata adı': s.ataAdi || '',
            'Email': s.email,
            'Telefon': s.telefon,
            'Doğum tarixi': s.dogumTarixi || '',
            'Cinsiyet': s.cinsiyet || '',
            'FİN': s.finKod || '',
            'Kurs': s.kursId,
            'Kateqoriya': s.anaKategoriya || '',
            'Format': s.tehsilFormati || '',
            'Qeydiyyat tarixi': s.kayitTarihi ? new Date(s.kayitTarihi).toLocaleDateString('az-AZ') : '',
            'Ödəniş': s.finalPrice || 0,
            'Ödəniş növü': s.odenisNovu || ''
        }));

        // Workbook yarat
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Sütun genişlikleri
        ws['!cols'] = [
            { wch: 5 },   // №
            { wch: 15 },  // Ad
            { wch: 15 },  // Soyad
            { wch: 15 },  // Ata adı
            { wch: 25 },  // Email
            { wch: 15 },  // Telefon
            { wch: 12 },  // Doğum
            { wch: 8 },   // Cinsiyet
            { wch: 10 },  // FİN
            { wch: 30 },  // Kurs
            { wch: 15 },  // Kateqoriya
            { wch: 20 },  // Format
            { wch: 15 },  // Qeydiyyat
            { wch: 10 },  // Ödəniş
            { wch: 20 }   // Ödəniş növü
        ];

        XLSX.utils.book_append_sheet(wb, ws, 'Tələbələr');

        // Binary buffer yarat
        const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        // Response
        return new NextResponse(buf, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="telebeler_${new Date().toISOString().split('T')[0]}.xlsx"`
            }
        });

    } catch (error: any) {
        console.error('Excel Export Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Excel yaradılarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}

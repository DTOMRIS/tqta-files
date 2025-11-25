// src/app/api/students/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { students } from '@/lib/schema';
import { sql, like, or, and, eq, desc } from 'drizzle-orm';

// GET - Tələbə siyahısı (axtarış, filtr, pagination)
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const kursId = searchParams.get('kursId') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        // Filtr şərtləri
        const conditions = [];

        // Axtarış (ad, soyad, email, telefon, FİN)
        if (search) {
            conditions.push(
                or(
                    like(students.ad, `%${search}%`),
                    like(students.soyad, `%${search}%`),
                    like(students.email, `%${search}%`),
                    like(students.telefon, `%${search}%`),
                    like(students.finKod, `%${search}%`)
                )
            );
        }

        // Kurs filtri
        if (kursId) {
            conditions.push(eq(students.kursId, kursId));
        }

        // Aktif tələbələr
        conditions.push(eq(students.aktif, true));

        // Query
        const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

        // Toplam sayı
        const totalResult = await db
            .select({ count: sql<number>`count(*)::int` })
            .from(students)
            .where(whereClause);

        const total = totalResult[0]?.count || 0;

        // Tələbələr
        const studentsList = await db
            .select({
                id: students.id,
                ad: students.ad,
                soyad: students.soyad,
                email: students.email,
                telefon: students.telefon,
                kursId: students.kursId,
                anaKategoriya: students.anaKategoriya,
                kayitTarihi: students.kayitTarihi,
                finalPrice: students.finalPrice,
                odenisNovu: students.odenisNovu
            })
            .from(students)
            .where(whereClause)
            .orderBy(desc(students.kayitTarihi))
            .limit(limit)
            .offset(offset);

        return NextResponse.json({
            success: true,
            data: {
                students: studentsList,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });

    } catch (error: any) {
        console.error('Students GET Error:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Tələbələr alınarkən xəta baş verdi' },
            { status: 500 }
        );
    }
}

// POST - Yeni tələbə əlavə et
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Gelen veriyi kontrol et (Log)
        console.log("Kayıt isteği geldi:", body);

        // Vəli məlumatlarını hazırla (əgər varsa)
        const veliMelumatlari = body.veliAdSoyad ? {
            adSoyad: body.veliAdSoyad,
            yaxinliq: body.veliYaxinliq,
            elaqe: body.veliElaqe,
            isPozisiyasi: body.veliIsPozisiyasi,
            isUnvani: body.veliIsUnvani,
            evTelefonu: body.veliEvTelefonu,
            sosialStatus: body.veliSosialStatus,
            evUnvani: body.veliEvUnvani,
            sehidYakini: body.sehidYakini || false,
            qaziYakini: body.qaziYakini || false
        } : null;

        // Sağlıq məlumatları
        const saglikMelumatlari = {
            alerjiVarmi: body.alerjiVarmi,
            xronikiXestelik: body.xronikiXestelik,
            qanQrupu: body.qanQrupu,
            tibbiArayis: body.tibbiArayis
        };

        // Sertifikatlar
        const sertifikatlar = {
            dma: body.dmaSertifikati || false,
            turkiye: body.turkiyeSertifikati || false,
            tqta: body.tqtaSertifikati || false,
            cth: body.cthSertifikati || false,
            dekontAlindi: body.sertifikatDekontu || false
        };

        // Ödəniş detayları
        const odenisDetaylari = {
            discountType: body.discountType,
            discountPercent: body.discountPercent || 0,
            ilkOdenis: body.ilkOdenis,
            endirimKodu: body.endirimKodu,
            odenisSecimi: body.odenisSecimi
        };

        // Neon Veritabanına Ekle
        const yeniOgrenci = await db.insert(students).values({
            // Şəxsi Məlumatlar
            ad: body.ad,
            soyad: body.soyad,
            ataAdi: body.ataAdi,
            email: body.email,
            telefon: body.mobilTelefon,
            dogumTarixi: body.dogumTarixi,
            cinsiyet: body.cinsiyet,
            whatsapp: body.whatsappNomresi,
            evUnvani: body.evUnvani,

            // Təhsil və İş
            tehsilSeviyyesi: body.tehsilSeviyyesi,
            ixtisas: body.ixtisas,
            isYeri: body.isYeri,
            stajYeri: body.stajYeri,
            xariciDil: body.xariciDil,

            // Vəli
            veliMelumatlari,

            // Sənəd
            senedNovu: body.senedNovu,
            finKod: body.finKod,
            seriyaNo: body.seriyaNo,

            // Kurs
            kursId: body.kursId,
            anaKategoriya: body.anaKategoriya,
            tehsilFormati: body.tehsilFormati,
            telimDili: body.telimDili,
            baslamaTarixi: body.baslamaTarixi,

            // Sağlıq
            saglikMelumatlari,

            // Sertifikatlar
            sertifikatlar,

            // Ödəniş
            odenisNovu: body.odenisNovu,
            finalPrice: body.finalPrice || 0,
            odenisDetaylari,

            // Müqavilə
            muqavileTipi: body.muqavileTipi,

            // Sistem
            aktif: true,

            // Əlavə detaylar
            detaylar: {
                sertleriQebulEtdim: body.sertleriQebulEtdim,
                melumatIslemesiRazi: body.melumatIslemesiRazi,
                elaqeVasitesi: body.elaqeVasitesi
            }
        }).returning();

        return NextResponse.json({ success: true, data: yeniOgrenci[0] });

    } catch (error: any) {
        console.error("Veritabanı Hatası:", error);
        return NextResponse.json(
            { success: false, error: "Kayıt başarısız oldu: " + (error?.message || "Bilinməyən xəta") },
            { status: 500 }
        );
    }
}
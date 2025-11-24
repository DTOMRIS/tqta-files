'use client';
import { useParams, useRouter } from 'next/navigation';
import { KURSLAR } from '@/data/kurslar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ArrowLeft, Clock, FileText, GraduationCap, Banknote, Info } from 'lucide-react';

const CTH_FEES = [
    { item: "Exemptions/RPL", fee: "£50", desc: "Əvvəlki təhsil/iş təcrübəsinə görə moduldan azadlıq istəyən tələbə üçün." },
    { item: "Assessment transfer fee (within deadline)", fee: "£10", desc: "Tələbə imtahan tarixini dəyişirsə." },
    { item: "Assessment transfer fee (after deadline)", fee: "£20", desc: "Gec müraciət olarsa." },
    { item: "Unit re-sit", fee: "pro-rata", desc: "Eyni moduldan 2-ci dəfə imtahan verirsə. (Modul başına hesablanır)" },
    { item: "CTH individual unit certificate", fee: "£25", desc: "Tələbə yalnız 1 modul üçün ayrıca sertifikat istəyirsə." },
    { item: "Certificate reprint", fee: "£25", desc: "Sertifikat itəndə/kopiya istəyəndə." },
    { item: "Late entry assessment fee (per unit)", fee: "£15", desc: "İmtahan pəncərəsi bağlanandan 10 gün əvvəl verilən gec giriş." },
    { item: "Enquiry about results: Re-mark", fee: "£60", desc: "Praktiki və yazılı imtahanlar üçün nəticənin yenidən yoxlanılması." },
    { item: "Enquiry about results: MCQ re-mark", fee: "£20", desc: "Multiple choice imtahanı üçün nəticənin yenidən yoxlanılması." },
];

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const course = KURSLAR.find(k => k.id === id);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h1 className="text-2xl font-bold text-red-500">Kurs tapılmadı</h1>
                <Button onClick={() => router.back()}>Geri Qayıt</Button>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-6 max-w-5xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 hover:bg-slate-100">
                <ArrowLeft className="mr-2 h-4 w-4" /> Geri Qayıt
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-3">{course.ad}</h1>
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${course.tip === 'CTH' ? 'bg-purple-100 text-purple-700' :
                            course.tip === 'DMA' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                            {course.tip}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-700 border">
                            {course.kategoriId}
                        </span>
                        {course.aktif ? (
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">Aktif</span>
                        ) : (
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">Pasif</span>
                        )}
                    </div>
                </div>
                <div className="text-right bg-slate-50 p-4 rounded-lg border">
                    <div className="text-3xl font-bold text-green-600">
                        {course.qiymet.dmaOdenissiz ? 'Ödənişsiz (DMA)' : `${course.qiymet.satisAZN} AZN`}
                    </div>
                    {course.qiymet.maliyetGBP && (
                        <div className="text-sm text-slate-500 mt-1 font-medium">Maliyyət: £{course.qiymet.maliyetGBP}</div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* MÜDDƏT VƏ PROQRAM */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-slate-700"><Clock className="mr-2 h-5 w-5" /> Müddət və Proqram</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-3 rounded border">
                                <span className="text-xs text-slate-500 uppercase font-bold">Toplam Gün</span>
                                <div className="text-xl font-bold">{course.muddet.toplamGun} gün</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded border">
                                <span className="text-xs text-slate-500 uppercase font-bold">Toplam Saat</span>
                                <div className="text-xl font-bold">{course.muddet.toplamSaat} saat</div>
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <h4 className="font-semibold mb-2 text-sm">Dərs Bölgüsü</h4>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-slate-600">Nəzəriyyə:</span>
                                <span className="font-medium">{course.muddet.dersProgrami.nezeriyye} saat</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(course.muddet.dersProgrami.nezeriyye / course.muddet.toplamSaat) * 100}%` }}></div>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-slate-600">Praktika:</span>
                                <span className="font-medium">{course.muddet.dersProgrami.praktika} saat</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(course.muddet.dersProgrami.praktika / course.muddet.toplamSaat) * 100}%` }}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CTH DETALLARI */}
                {course.tip === 'CTH' && course.cth && (
                    <div className="space-y-6">
                        <Card className="border-purple-200 bg-purple-50/50">
                            <CardHeader>
                                <CardTitle className="flex items-center text-purple-700"><GraduationCap className="mr-2 h-5 w-5" /> CTH (UK) Detalları</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center border-b border-purple-100 pb-2">
                                    <span className="text-purple-900 font-medium">Səviyyə (Level):</span>
                                    <span className="font-bold text-lg text-purple-700">{course.cth.level}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-xs text-purple-600 uppercase font-bold">TQT (Total Time)</span>
                                        <div className="font-semibold">{course.cth.tqt} saat</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-purple-600 uppercase font-bold">GLH (Guided Learning)</span>
                                        <div className="font-semibold">{course.cth.glh} saat</div>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded border border-purple-200 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-purple-900">İmtahan və Sertifikat Rüsumu:</span>
                                        <span className="font-bold text-xl text-purple-700">£{course.cth.feeGBP}</span>
                                    </div>
                                    <p className="text-xs text-purple-500 mt-1">* Bu məbləğ İngiltərəyə ödənilir.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* CTH ƏLAVƏ XƏRCLƏR (ACCORDION) */}
                        <Accordion className="bg-white border rounded-lg px-4">
                            <AccordionItem>
                                <details className="group">
                                    <AccordionTrigger className="text-purple-700 font-semibold">
                                        <div className="flex items-center">
                                            <Info className="mr-2 h-4 w-4" /> CTH Əlavə Əməliyyat Xərcləri (Operational Fees)
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-3 pt-2">
                                            <p className="text-xs text-slate-500 italic mb-3">
                                                * Bu bəndlər tələbə ödənişinə aid deyil, TQTA–CTH əməliyyat haqlarıdır.
                                            </p>
                                            <div className="grid gap-3">
                                                {CTH_FEES.map((fee, index) => (
                                                    <div key={index} className="flex justify-between items-start border-b pb-2 last:border-0">
                                                        <div>
                                                            <div className="font-medium text-slate-800">{fee.item}</div>
                                                            <div className="text-xs text-slate-500">{fee.desc}</div>
                                                        </div>
                                                        <div className="font-bold text-purple-700 whitespace-nowrap ml-4">{fee.fee}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </details>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )}

                {/* DMA DETALLARI */}
                {course.tip === 'DMA' && course.dma && (
                    <Card className="border-blue-200 bg-blue-50/50">
                        <CardHeader>
                            <CardTitle className="flex items-center text-blue-700"><FileText className="mr-2 h-5 w-5" /> DMA (Dövlət) Tələbləri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center border-b border-blue-100 pb-2">
                                <span className="text-blue-900 font-medium">Tabel Tipi:</span>
                                <span className="font-bold text-blue-700">{course.dma.tabelTipi}</span>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-blue-900 mb-2">Tələb Olunan Sənədlər Paketi:</span>
                                <ul className="space-y-1">
                                    {course.dma.senedPaketi.map((s, i) => (
                                        <li key={i} className="flex items-center text-sm text-blue-800 bg-white px-2 py-1 rounded border border-blue-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* STANDART DETALLARI */}
                {course.tip === 'STANDART' && (
                    <Card className="border-gray-200 bg-gray-50/50">
                        <CardHeader>
                            <CardTitle className="flex items-center text-gray-700"><Banknote className="mr-2 h-5 w-5" /> Ödəniş və Şərtlər</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600">Bu kurs standart ödənişli əsaslarla tədris olunur. Tələbə ödənişi tam və ya hissəli şəkildə həyata keçirə bilər.</p>
                            <div className="bg-white p-4 rounded border">
                                <span className="text-xs text-gray-500 uppercase font-bold">Kurs Qiyməti</span>
                                <div className="text-2xl font-bold text-gray-800">{course.qiymet.satisAZN} AZN</div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

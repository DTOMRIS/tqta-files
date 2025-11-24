'use client';

import { useState } from 'react';
import { KursTam, EgitimTipi, CTHDetay, DMADetay } from '@/types/kurs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function KursYonetimFormu() {
    const [activeTab, setActiveTab] = useState<'TEMEL' | 'MUDDET' | 'QIYMET' | 'OZEL'>('TEMEL');

    const [formData, setFormData] = useState<KursTam>({
        id: '',
        ad: '',
        kategoriId: '',
        tip: 'STANDART',
        aktif: true,
        qiymet: {
            satisAZN: 0,
            dmaOdenissiz: false,
        },
        muddet: {
            toplamGun: 0,
            toplamSaat: 0,
            dersProgrami: {
                nezeriyye: 0,
                praktika: 0,
            },
        },
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [parent]: { ...prev[parent as keyof KursTam], [field]: value }
        }));
    };

    const handleMuddetChange = (field: string, value: number) => {
        setFormData(prev => ({
            ...prev,
            muddet: { ...prev.muddet, [field]: value }
        }));
    };

    const handleProgramChange = (field: string, value: number) => {
        setFormData(prev => ({
            ...prev,
            muddet: {
                ...prev.muddet,
                dersProgrami: { ...prev.muddet.dersProgrami, [field]: value }
            }
        }));
    };

    const handleCTHChange = (field: keyof CTHDetay, value: any) => {
        setFormData(prev => ({
            ...prev,
            cth: { ...(prev.cth || { level: 'Level 2', tqt: 0, glh: 0, feeGBP: 0 }), [field]: value }
        }));
    };

    const handleDMAChange = (field: keyof DMADetay, value: any) => {
        setFormData(prev => ({
            ...prev,
            dma: { ...(prev.dma || { tabelTipi: 'Standart', senedPaketi: [] }), [field]: value }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        alert('Kurs başarıyla kaydedildi (Konsola bakınız)');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Kurs İdarəetmə Paneli</h2>
                <div className="flex space-x-2">
                    {['TEMEL', 'MUDDET', 'QIYMET', 'OZEL'].map((tab) => (
                        <Button
                            key={tab}
                            type="button"
                            variant={activeTab === tab ? 'default' : 'outline'}
                            onClick={() => setActiveTab(tab as any)}
                        >
                            {tab === 'TEMEL' && 'Əsas Məlumatlar'}
                            {tab === 'MUDDET' && 'Müddət və Proqram'}
                            {tab === 'QIYMET' && 'Qiymət'}
                            {tab === 'OZEL' && 'Xüsusi (CTH/DMA)'}
                        </Button>
                    ))}
                </div>
            </div>

            {/* TEMEL BILGILER */}
            {activeTab === 'TEMEL' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Əsas Məlumatlar</CardTitle>
                        <CardDescription>Kursun adı, kateqoriyası və tipi.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="ad">Kurs Adı</Label>
                                <Input id="ad" value={formData.ad} onChange={(e) => handleInputChange('ad', e.target.value)} placeholder="Örn: Aşpazlıq Sənəti" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="id">Kurs Kodu (ID)</Label>
                                <Input id="id" value={formData.id} onChange={(e) => handleInputChange('id', e.target.value)} placeholder="Örn: cth-l2-cook" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="kategori">Kateqoriya ID</Label>
                                <Input id="kategori" value={formData.kategoriId} onChange={(e) => handleInputChange('kategoriId', e.target.value)} placeholder="ictimai-iase" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tip">Təhsil Tipi</Label>
                                <select
                                    id="tip"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.tip}
                                    onChange={(e) => handleInputChange('tip', e.target.value)}
                                >
                                    <option value="STANDART">Standart Kurs</option>
                                    <option value="CTH">CTH (Beynəlxalq)</option>
                                    <option value="DMA">DMA (Dövlət Sifarişi)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="aktif" checked={formData.aktif} onCheckedChange={(checked) => handleInputChange('aktif', checked)} />
                            <Label htmlFor="aktif">Kurs Aktivdir</Label>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* MUDDET VE PROGRAM */}
            {activeTab === 'MUDDET' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Müddət və Dərs Proqramı</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Toplam Gün</Label>
                                <Input type="number" value={formData.muddet.toplamGun} onChange={(e) => handleMuddetChange('toplamGun', parseInt(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Toplam Saat</Label>
                                <Input type="number" value={formData.muddet.toplamSaat} onChange={(e) => handleMuddetChange('toplamSaat', parseInt(e.target.value))} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nəzəriyyə Saatı</Label>
                                <Input type="number" value={formData.muddet.dersProgrami.nezeriyye} onChange={(e) => handleProgramChange('nezeriyye', parseInt(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <Label>Praktika Saatı</Label>
                                <Input type="number" value={formData.muddet.dersProgrami.praktika} onChange={(e) => handleProgramChange('praktika', parseInt(e.target.value))} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* FIYATLANDIRMA */}
            {activeTab === 'QIYMET' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Qiymətlandirmə</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Satış Qiyməti (AZN)</Label>
                            <Input type="number" value={formData.qiymet.satisAZN} onChange={(e) => handleNestedChange('qiymet', 'satisAZN', parseInt(e.target.value))} />
                        </div>

                        {formData.tip === 'CTH' && (
                            <div className="space-y-2">
                                <Label className="text-purple-600">CTH Maliyyəti (GBP)</Label>
                                <Input type="number" value={formData.qiymet.maliyetGBP || 0} onChange={(e) => handleNestedChange('qiymet', 'maliyetGBP', parseInt(e.target.value))} />
                            </div>
                        )}

                        <div className="flex items-center space-x-2 pt-4">
                            <Checkbox
                                id="dmaOdenissiz"
                                checked={formData.qiymet.dmaOdenissiz}
                                onCheckedChange={(checked) => handleNestedChange('qiymet', 'dmaOdenissiz', checked)}
                            />
                            <Label htmlFor="dmaOdenissiz">Dövlət tərəfindən qarşılanır (Ödənişsiz)</Label>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* OZEL AYARLAR (CTH / DMA) */}
            {activeTab === 'OZEL' && (
                <Card className={formData.tip === 'CTH' ? 'border-purple-200 bg-purple-50' : formData.tip === 'DMA' ? 'border-blue-200 bg-blue-50' : ''}>
                    <CardHeader>
                        <CardTitle>
                            {formData.tip === 'CTH' ? 'CTH (Confederation of Tourism and Hospitality) Detalları' :
                                formData.tip === 'DMA' ? 'DMA (Dövlət Məşğulluq Agentliyi) Detalları' :
                                    'Xüsusi Ayarlar'}
                        </CardTitle>
                        <CardDescription>
                            {formData.tip === 'STANDART' ? 'Standart kurs üçün xüsusi ayar yoxdur.' : 'Seçilən təhsil tipinə uyğun parametrlər.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        {formData.tip === 'CTH' && (
                            <>
                                <div className="space-y-2">
                                    <Label>Səviyyə (Level)</Label>
                                    <select
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.cth?.level}
                                        onChange={(e) => handleCTHChange('level', e.target.value)}
                                    >
                                        <option value="Level 2">Level 2</option>
                                        <option value="Level 3">Level 3</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>TQT (Total Qualification Time)</Label>
                                        <Input type="number" value={formData.cth?.tqt || 0} onChange={(e) => handleCTHChange('tqt', parseInt(e.target.value))} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>GLH (Guided Learning Hours)</Label>
                                        <Input type="number" value={formData.cth?.glh || 0} onChange={(e) => handleCTHChange('glh', parseInt(e.target.value))} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>İmtahan və Sertifikat Ücreti (GBP)</Label>
                                    <Input type="number" value={formData.cth?.feeGBP || 0} onChange={(e) => handleCTHChange('feeGBP', parseInt(e.target.value))} />
                                </div>
                            </>
                        )}

                        {formData.tip === 'DMA' && (
                            <>
                                <div className="space-y-2">
                                    <Label>Tabel Tipi</Label>
                                    <select
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.dma?.tabelTipi}
                                        onChange={(e) => handleDMAChange('tabelTipi', e.target.value)}
                                    >
                                        <option value="Standart">Standart (8 Saat)</option>
                                        <option value="Xüsusi">Xüsusi (4 Saat / Yarım gün)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Tələb Olunan Sənədlər (Vergül ilə ayırın)</Label>
                                    <Textarea
                                        value={formData.dma?.senedPaketi?.join(', ') || ''}
                                        onChange={(e) => handleDMAChange('senedPaketi', e.target.value.split(',').map(s => s.trim()))}
                                        placeholder="Örn: Şəxsiyyət vəsiqəsi, Form 086, Göndəriş"
                                    />
                                </div>
                            </>
                        )}

                        {formData.tip === 'STANDART' && (
                            <p className="text-muted-foreground italic">Bu kurs tipi üçün əlavə parametr tələb olunmur.</p>
                        )}

                    </CardContent>
                </Card>
            )}

            <CardFooter className="flex justify-end pt-6">
                <Button type="submit" size="lg" className="w-full md:w-auto">
                    Kursu Yadda Saxla
                </Button>
            </CardFooter>
        </form>
    );
}

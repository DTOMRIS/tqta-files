// src/types/kurs.ts

export type EgitimTipi = 'STANDART' | 'DMA' | 'CTH';

// CTH (İngiltere) Detayları
export interface CTHDetay {
    level: 'Level 2' | 'Level 3';
    tqt: number;      // Total Qualification Time
    glh: number;      // Guided Learning Hours
    feeGBP: number;   // CTH'e ödenen sterlin ücreti
}

// DMA (Devlet) Detayları
export interface DMADetay {
    tabelTipi: 'Standart' | 'Xüsusi'; // 8 saatlik veya 4 saatlik
    senedPaketi: string[]; // ["Öhdəlik", "Xaric olma", "İmtahan Protokolu"]
}

export interface KursTam {
    id: string;
    ad: string;
    kategoriId: string;
    tip: EgitimTipi;

    // Fiyatlandırma
    qiymet: {
        satisAZN: number;      // Öğrencinin ödediği
        maliyetGBP?: number;   // CTH ise maliyet
        dmaOdenissiz: boolean; // Devlet karşılıyor mu?
    };

    // Zamanlama
    muddet: {
        toplamGun: number;
        toplamSaat: number;
        dersProgrami: {
            nezeriyye: number;
            praktika: number;
        };
    };

    // Özel Modüller
    cth?: CTHDetay;
    dma?: DMADetay;

    aktif: boolean;
}
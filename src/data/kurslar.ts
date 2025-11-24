// src/data/kurslar.ts
import { KursTam } from '@/types/kurs';

export const KURSLAR: KursTam[] = [
    // --- CTH KURSLARI ---
    {
        id: 'cth-foh-l2',
        ad: 'Level 2 Certificate in Professional Restaurant Front of House Service CTH',
        kategoriId: 'ictimai-iase',
        tip: 'CTH',
        aktif: true,
        qiymet: { satisAZN: 1000, maliyetGBP: 155, dmaOdenissiz: false },
        muddet: {
            toplamGun: 30,
            toplamSaat: 155,
            dersProgrami: { nezeriyye: 50, praktika: 105 }
        },
        cth: { level: 'Level 2', tqt: 155, glh: 155, feeGBP: 155 }
    },
    {
        id: 'cth-barista-l2',
        ad: 'Level 2 Award in Barista Skills cth',
        kategoriId: 'ictimai-iase',
        tip: 'CTH',
        aktif: true,
        qiymet: { satisAZN: 1000, maliyetGBP: 75, dmaOdenissiz: false },
        muddet: {
            toplamGun: 10,
            toplamSaat: 25,
            dersProgrami: { nezeriyye: 10, praktika: 15 }
        },
        cth: { level: 'Level 2', tqt: 25, glh: 25, feeGBP: 75 }
    },
    {
        id: 'cth-cookery-l2',
        ad: 'Aşpaz Level 2 CTH',
        kategoriId: 'ictimai-iase',
        tip: 'CTH',
        aktif: true,
        qiymet: { satisAZN: 1200, maliyetGBP: 135, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 80,
            dersProgrami: { nezeriyye: 20, praktika: 60 }
        },
        cth: { level: 'Level 2', tqt: 80, glh: 80, feeGBP: 135 }
    },

    // --- DMA KURSLARI ---
    {
        id: 'dma-ofisiant',
        ad: 'Peşəkar Restoran Ofisiantı Təlimi DMA',
        kategoriId: 'ictimai-iase',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 900, dmaOdenissiz: true },
        muddet: {
            toplamGun: 30,
            toplamSaat: 180,
            dersProgrami: { nezeriyye: 60, praktika: 120 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-barista',
        ad: 'Professional Barista Hazırlığı DMA',
        kategoriId: 'ictimai-iase',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 900, dmaOdenissiz: true },
        muddet: {
            toplamGun: 30,
            toplamSaat: 154,
            dersProgrami: { nezeriyye: 50, praktika: 104 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-aspaz-l3',
        ad: 'Peşəkar Aşpazlıq Proqramı L3 49 gün DMA',
        kategoriId: 'ictimai-iase',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 1700, dmaOdenissiz: true },
        muddet: {
            toplamGun: 49,
            toplamSaat: 292,
            dersProgrami: { nezeriyye: 90, praktika: 202 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-qapici',
        ad: 'Mehmanxana qapıçısı DMA',
        kategoriId: 'turizm',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 700, dmaOdenissiz: true },
        muddet: {
            toplamGun: 20,
            toplamSaat: 107,
            dersProgrami: { nezeriyye: 30, praktika: 77 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-qeydiyyatci',
        ad: 'Qeydiyyatçı (otel) DMA',
        kategoriId: 'turizm',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 700, dmaOdenissiz: true },
        muddet: {
            toplamGun: 29,
            toplamSaat: 170,
            dersProgrami: { nezeriyye: 50, praktika: 120 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-konfrans',
        ad: 'Konfrans və tədbir təşkilatçısı DMA',
        kategoriId: 'turizm',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 700, dmaOdenissiz: true },
        muddet: {
            toplamGun: 27,
            toplamSaat: 129,
            dersProgrami: { nezeriyye: 40, praktika: 89 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-turoperator',
        ad: 'Turoperator və Turagent DMA',
        kategoriId: 'turizm',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 650, dmaOdenissiz: true },
        muddet: {
            toplamGun: 30,
            toplamSaat: 168,
            dersProgrami: { nezeriyye: 50, praktika: 118 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-beledci',
        ad: 'Milli park bələdçisi DMA',
        kategoriId: 'turizm',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 700, dmaOdenissiz: true },
        muddet: {
            toplamGun: 30,
            toplamSaat: 171,
            dersProgrami: { nezeriyye: 50, praktika: 121 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },
    {
        id: 'dma-xadime',
        ad: 'Otel xadiməçisi DMA',
        kategoriId: 'turizm',
        tip: 'DMA',
        aktif: true,
        qiymet: { satisAZN: 700, dmaOdenissiz: true },
        muddet: {
            toplamGun: 29,
            toplamSaat: 164,
            dersProgrami: { nezeriyye: 50, praktika: 114 }
        },
        dma: { tabelTipi: 'Standart', senedPaketi: ['Məşğulluq öhdəliyi', 'İmtahan Protokolu', 'Tabel'] }
    },

    // --- STANDART KURSLAR ---
    {
        id: 'std-barista-ekspress',
        ad: 'Ekspress Barista Hazırlığı',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 300, dmaOdenissiz: false },
        muddet: {
            toplamGun: 5,
            toplamSaat: 16,
            dersProgrami: { nezeriyye: 4, praktika: 12 }
        }
    },
    {
        id: 'std-barmen',
        ad: 'Professional Barmen Hazırlığı',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 900, dmaOdenissiz: false },
        muddet: {
            toplamGun: 30,
            toplamSaat: 157,
            dersProgrami: { nezeriyye: 40, praktika: 117 }
        }
    },
    {
        id: 'std-barmen-ekspress',
        ad: 'Ekspress Barmen Hazırlığı',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 345, dmaOdenissiz: false },
        muddet: {
            toplamGun: 5,
            toplamSaat: 16,
            dersProgrami: { nezeriyye: 4, praktika: 12 }
        }
    },
    {
        id: 'std-aspaz-l3',
        ad: 'Peşəkar Aşpazlıq Proqramı L3 49 gün',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 1700, dmaOdenissiz: false },
        muddet: {
            toplamGun: 49,
            toplamSaat: 292,
            dersProgrami: { nezeriyye: 90, praktika: 202 }
        }
    },
    {
        id: 'std-pide',
        ad: 'Pide və Lahmacun Ustası',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 900, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 80,
            dersProgrami: { nezeriyye: 20, praktika: 60 }
        }
    },
    {
        id: 'std-pizza',
        ad: 'Pizza Ustası',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 900, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 80,
            dersProgrami: { nezeriyye: 20, praktika: 60 }
        }
    },
    {
        id: 'std-doner',
        ad: 'Dönər Ustası',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 900, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 80,
            dersProgrami: { nezeriyye: 20, praktika: 60 }
        }
    },
    {
        id: 'std-hamburger',
        ad: 'Hamburger Hazırlığı',
        kategoriId: 'ictimai-iase',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 500, dmaOdenissiz: false },
        muddet: {
            toplamGun: 5,
            toplamSaat: 16,
            dersProgrami: { nezeriyye: 4, praktika: 12 }
        }
    },
    {
        id: 'std-satis',
        ad: 'Pərakəndə Satış Məsləhətçisi',
        kategoriId: 'idareetme',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 500, dmaOdenissiz: false },
        muddet: {
            toplamGun: 5,
            toplamSaat: 16,
            dersProgrami: { nezeriyye: 8, praktika: 8 }
        }
    },
    {
        id: 'std-restoran-ops',
        ad: 'Restoran Əməliyyat İdarəçiliyi',
        kategoriId: 'idareetme',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 1800, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 84,
            dersProgrami: { nezeriyye: 42, praktika: 42 }
        }
    },
    {
        id: 'std-restoran-mudiri',
        ad: 'Restoran İdarəçilik Proqramı',
        kategoriId: 'idareetme',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 1800, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 84,
            dersProgrami: { nezeriyye: 42, praktika: 42 }
        }
    },
    {
        id: 'std-coffeeshop',
        ad: 'Coffee Shop İdarəçilik',
        kategoriId: 'idareetme',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 1800, dmaOdenissiz: false },
        muddet: {
            toplamGun: 20,
            toplamSaat: 84,
            dersProgrami: { nezeriyye: 42, praktika: 42 }
        }
    },
    {
        id: 'std-franchise',
        ad: 'Françayzinq İdarəetmə',
        kategoriId: 'idareetme',
        tip: 'STANDART',
        aktif: true,
        qiymet: { satisAZN: 400, dmaOdenissiz: false },
        muddet: {
            toplamGun: 5,
            toplamSaat: 24,
            dersProgrami: { nezeriyye: 12, praktika: 12 }
        }
    }
];
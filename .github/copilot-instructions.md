## Amaç
Bu depo üzerinde çalışan AI ajanlarının hızlıca üretken olabilmesi için kısa ve uygulanabilir bağlam sağlayın.

## Büyük Resim (yerel düzen)
- Bu repo öncelikle Next.js App Router kullanan bir uygulamadır; ana uygulama `src/app` altında bulunur (bkz. `src/app/layout.js`).
- İki ayrı Vite uygulaması vardır: `ai studyo/` ve `tqta---turan-gastro-turizm-akademiyası/` — her biri kendi `package.json` dosyasına sahiptir ve Vite kullanır.
- Veritabanı migrasyonları ve snapshot'lar `drizzle/` dizininde; sunucu tarafı yardımcı script'ler `scripts/tools/` altında.

## Ana entegrasyon noktaları
- UI giriş ve layout: `src/app/layout.js` — `Providers`, responsive `Sidebar` ve `ConditionalLayout` kullanılıyor.
- Middleware: `src/middleware.ts` (şu an `NextResponse.next()` döndürüyor; route matcher değişiklikleri için kontrol edin).
- DB katmanı: `drizzle/` SQL snapshot'ları içerir; `scripts/tools/` doğrulama ve güncelleme script'lerine ev sahipliği yapar (`check_db.js`, `update_db.ts` vb.).
- Bileşenler: `@/components` alias ile import ediliyor. Hem kök `components/` hem `src/components/` mevcut — Next.js çalıştırmaları için `src/components` tercih edin.
- Statik varlıklar: `public/` ve Next build çıktısı `.next/`.

## Geliştirici iş akışları & komutlar (denenecekler)
- Vite uygulamaları: ilgili klasörde çalıştırın:

```bash
cd "ai studyo"
npm run dev
```

- Next.js uygulaması: root `package.json`'u kontrol edin; yoksa tipik komutlar `next dev`, `next build`, `next start`'tır.
- Scriptler: düz JS script'leri `node scripts/tools/check_db.js` ile çalıştırın. TypeScript script'leri için `npx tsx` veya `npx ts-node` kullanın, örn `npx tsx scripts/create-admin.ts`.

## Projeye özgü kalıplar & konvansiyonlar
- Karma dosya türleri: `.js`, `.ts`, `.tsx` karışık şekilde bulunur; dosya türünü koruyarak değişiklik yapın.
- Dil: yorum ve metinler Türkçe/Azerice olabilir — orijinali korumaya özen gösterin.
- UI kütüphaneleri: Tailwind + Sonner (toasts) + `next/font` kullanılıyor. Tailwind/PostCSS konfigürasyonları `scripts/tools/` altında bulunabilir.
- DB ve script'ler: `scripts/tools/` altında birçok yardımcı ve doğrulama script'i var; yeni migration akışları oluşturmadan önce bu script'leri kullanın.
- Alias kullanım: `@/` path alias'ı kullanılıyor — dosya taşımalarında `tsconfig/jsconfig` ve Next.js path çözümlemesine dikkat edin.

## Değiştirilmesi/Kaçınılması gerekenler
- Yapılabilir: küçük, odaklı refactorlar (bileşen ayrıştırma, `src/components/*` düzeltmeleri, `src/lib` veya `drizzle` yardımcılarında tip iyileştirmeleri).
- Kaçınılması gereken: repo çapında geniş yeniden adlandırmalar, iki `components/` kökünü karıştırmak veya `middleware.ts` varsayımlarını uygulamayı çalıştırmadan değiştirmek.

## Önemli dosyalar (inceleyin)
- `src/app/layout.js`
- `src/middleware.ts`
- `scripts/tools/` — DB ve bakım script'leri
- `drizzle/0000_cool_reavers.sql` ve `drizzle/meta/` — DB snapshot/journal
- `ai studyo/package.json` — örnek Vite uygulaması komutları

## Test / build çalıştırma notları
- Bu çalışma alanında tek, garanti bir root `package.json` olmayabilir; alt projelerdeki `package.json`'ları kontrol edin ve oradaki script'leri kullanın.
- DB ile ilgili script'ler için `.js` dosyalarını `node`, `.ts` dosyalarını `npx tsx` veya `npx ts-node` ile çalıştırın.

## Şüphedeyseniz
- Değişiklik yapmadan önce hatayı yerelde yeniden üretin ve küçük, yeniden üretilebilir değişiklikler yapın.
- Hangi sayfa, hangi API ve hangi DB durumunun gerektiğini kısa bir şekilde sorun.

---
Kök `package.json`'u paylaşırsanız, `npm` script'lerini kesinleştirip dosyaya ekleyebilirim.

---
If you want, I can refine any section (commands, examples, or add precise `npm` scripts after you confirm the root `package.json`).

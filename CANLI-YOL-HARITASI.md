# 🚀 TQTA Web Sitesi Canlıya Alma Yol Haritası

## ✅ Tamamlanan İşler
- [x] Landing sayfası tüm güncellemeler
- [x] CTH Approved Centre bölümü
- [x] Gerçek öğrenci yorumları
- [x] Workshop resimleri güncellendi
- [x] Production build başarılı

---

## 📋 CANLI ÖNCESI KONTROL LİSTESİ

### 1️⃣ Domain ve Hosting Ayarları
- [ ] Domain satın alındı mı? (tqta.az)
- [ ] DNS ayarları yapılandırıldı mı?
- [ ] SSL sertifikası hazır mı?

### 2️⃣ Hosting Seçenekleri (Önerilen)
| Platform | Avantaj | Fiyat |
|----------|---------|-------|
| **Vercel** (Önerilen) | Next.js için optimize, otomatik SSL, kolay deploy | Ücretsiz/Pro |
| Netlify | Kolay kullanım | Ücretsiz/Pro |
| Railway | Database dahil | $5/ay |
| DigitalOcean App | VPS alternatifi | $5/ay |

### 3️⃣ Environment Variables (Canlıda Ayarlanacak)
```env
# .env.production
NEXTAUTH_URL=https://tqta.az
NEXTAUTH_SECRET=güçlü-secret-key
DATABASE_URL=production-database-url
GOOGLE_GEMINI_API_KEY=your-api-key
```

### 4️⃣ Database
- [ ] Production database oluşturuldu mu?
- [ ] Migrations çalıştırıldı mı?
- [ ] Seed data yüklendi mi?

---

## 🔧 VERCEL İLE DEPLOY (Önerilen)

### Adım 1: GitHub'a Push
```bash
git add .
git commit -m "Production ready"
git push origin main
```

### Adım 2: Vercel'e Bağla
1. https://vercel.com adresine git
2. "New Project" tıkla
3. GitHub repo'sunu seç
4. Environment variables ekle
5. Deploy

### Adım 3: Domain Bağla
1. Vercel Dashboard > Settings > Domains
2. tqta.az ekle
3. DNS kayıtlarını güncelle:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

---

## ⚠️ BİLİNEN SORUNLAR (Canlı Öncesi Düzeltilmeli)

### Devre Dışı Bırakılan Sayfalar
Bu sayfalar SSR/SSG hatası nedeniyle geçici olarak devre dışı:
- `/gamifikasiya` → `_gamifikasiya_disabled`
- `/karyera-testi` → `_karyera-testi_disabled`

**Çözüm:** Bu sayfalara `export const dynamic = 'force-dynamic'` ekle

### Auth Uyarıları
Bazı API route'larında `auth` import hatası var. Bunlar çalışmayı engellemez ama düzeltilmeli.

---

## 📱 CANLI SONRASI TEST LİSTESİ

- [ ] Ana sayfa yükleniyor mu?
- [ ] Tüm resimler görünüyor mu?
- [ ] Formlar çalışıyor mu?
- [ ] Login/Register çalışıyor mu?
- [ ] Mobile responsive mi?
- [ ] SSL aktif mi? (https)
- [ ] WhatsApp linki çalışıyor mu?
- [ ] E-posta linki çalışıyor mu?

---

## 🎯 HIZLI DEPLOY KOMUTU (Vercel CLI)

```bash
# Vercel CLI kur
npm i -g vercel

# Deploy
cd c:\codelar\egitim-sistemi
vercel --prod
```

---

## 📞 Destek
Herhangi bir sorun için:
- WhatsApp: +994 51 769 61 81
- E-posta: info@tqta.az

---

*Son Güncelleme: 11 Ocak 2026*

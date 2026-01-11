# 🚀 TQTA Canlıya Alma Checklist - 11 Yanvar 2026

## ✅ Pre-Deployment (Tamamlandı)

### Build & Code
- [x] `npm run build` başarılı (hata yok)
- [x] Tüm TypeScript hataları giderildi
- [x] Türkçe/Azerbaycanca karakterli dosya adları düzeltildi
- [x] Resim yolları güncellendi

### İçerik Güncellemeleri
- [x] CTH sertifikat bilgileri güncellendi
- [x] Masterclass instructor: "TQTA" olarak ayarlandı
- [x] Tecrübe: "15+" → "30+" olarak değiştirildi
- [x] Email: corporate@tqta.az → info@tqta.az
- [x] Otel partnerleri: Rixos, Kempinski, Jumeirah kaldırıldı, Sheraton eklendi
- [x] Gerçek öğrenci referansları eklendi (Rəhimova Xalidə, İbrahimli Aytən, İmanova Nuranə)
- [x] Kurs içerikleri mesleğe uygun hale getirildi (qapıçı, xadimə, vs.)

### Devre Dışı Sayfalar
- [x] `/gamifikasiya` - SSR hatası nedeniyle devre dışı
- [x] `/karyera-testi` - SSR hatası nedeniyle devre dışı

---

## 🔧 Deployment Günü (Yarın)

### 1. Vercel/Hosting Ayarları
```bash
# Environment Variables (Vercel Dashboard'da ayarlanmalı):
DATABASE_URL=postgresql://neondb_owner:***@ep-wild-glade-ag9cwx7y-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
UPLOADTHING_SECRET=sk_live_***
UPLOADTHING_APP_ID=n0h3eqmngl
UPLOADTHING_TOKEN=***
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA16m269H7XiZ_JshXzEhK9wbtiwUn4mEI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tqta-files.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tqta-files
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tqta-files.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=862062147030
NEXT_PUBLIC_FIREBASE_APP_ID=1:862062147030:web:9be14adf6ef4e3256e6077
NEXTAUTH_SECRET=<güçlü-bir-secret-key>
NEXTAUTH_URL=https://tqta.az
```

### 2. Domain Ayarları
- [ ] DNS A/CNAME kayıtları Vercel'e yönlendirildi
- [ ] SSL sertifikası aktif
- [ ] www → non-www yönlendirmesi

### 3. Deploy Komutları
```bash
# Git'e push
git add .
git commit -m "Production ready - 11 Yanvar 2026"
git push origin main

# Vercel otomatik deploy edecek
# veya manuel: vercel --prod
```

### 4. Post-Deploy Kontroller
- [ ] Ana sayfa yükleniyor: https://tqta.az/landing
- [ ] Kurs detay sayfaları çalışıyor: /kurslar/cth-barista-l2
- [ ] Workshop bölümü görünüyor
- [ ] Resimler düzgün yükleniyor
- [ ] Form gönderimi çalışıyor
- [ ] Login/Register çalışıyor
- [ ] Admin panel erişilebilir

---

## 📱 Test Edilecek Sayfalar

| Sayfa | URL | Durum |
|-------|-----|-------|
| Landing | /landing | ✅ |
| Kurslar | /kurslar | ✅ |
| Kurs Detay | /kurslar/[id] | ✅ |
| Workshop Detay | /workshoplar/[slug] | ✅ |
| Login | /login | ✅ |
| Register | /register | ✅ |
| Admin | /portal/admin | ✅ |
| Tələbə Qeydiyyat | /telebe-qeydiyyat | ✅ |
| DMA İdarə | /dma-idare | ✅ |

---

## ⚠️ Bilinen Kısıtlamalar

1. **Gamifikasiya sistemi** - Geçici olarak devre dışı (SSR sorunu)
2. **Karyera testi** - Geçici olarak devre dışı (SSR sorunu)
3. **API auth uyarıları** - Bazı API route'larda auth export uyarısı var (çalışıyor ama warning veriyor)

---

## 📞 Acil Durum

Sorun olursa:
1. Vercel Dashboard'dan son working deployment'a rollback yap
2. Logları kontrol et: Vercel → Project → Deployments → Logs
3. Database bağlantısını kontrol et: Neon Dashboard

---

## 🎉 Go Live!

Herşey hazır! Yarın canlıya alabilirsiniz.

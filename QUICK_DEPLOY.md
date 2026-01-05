# ⚡ HIZLI DEPLOYMENT (5 DAKİKA)

## 🎯 ÖNEMLİ BİLGİLER

1. **MySQL DEĞİL, PostgreSQL kullanılıyor!**
2. **Hostinger/GoDaddy uygun DEĞİL** (Next.js için)
3. **EN İYİ:** Vercel + Neon PostgreSQL (ücretsiz)

---

## 📋 ADIM ADIM

### 1️⃣ Neon PostgreSQL (2 dakika)

1. https://neon.tech → "Sign Up" (GitHub ile)
2. "Create Project" → İsim ver (örn: "tqta-portal")
3. **DATABASE_URL**'i kopyala (şöyle görünür):
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```
4. ✅ Hazır!

**Ücretsiz:** 512 MB veritabanı (başlangıç için yeterli)

---

### 2️⃣ Vercel (3 dakika)

1. https://vercel.com → "Sign Up" (GitHub ile)
2. "Add New Project"
3. GitHub repo'nuzu seçin
4. **Environment Variables** ekleyin:
   
   **DATABASE_URL:**
   ```
   postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```
   (Neon'dan kopyaladığınız)

   **NEXTAUTH_URL:**
   ```
   https://your-app-name.vercel.app
   ```
   (Vercel size otomatik verir, sonra güncelleyin)

   **NEXTAUTH_SECRET:**
   ```
   rastgele-uzun-string-buraya-en-az-32-karakter
   ```
   (Terminal'de: `openssl rand -base64 32`)

5. "Deploy" butonuna tıklayın
6. 2-3 dakika bekleyin
7. ✅ Hazır!

**Ücretsiz:** Sınırsız proje, 100 GB/ay bandwidth

---

## 🔧 MIGRATION ÇALIŞTIRMA

### İlk Kurulumda (Bir Kere)

```bash
# Local'de çalıştır
npm install
npx drizzle-kit generate
npx drizzle-kit migrate
```

Veya Vercel'de otomatik çalışır (build sırasında).

---

## ✅ KONTROL LİSTESİ

- [ ] Neon PostgreSQL hesabı açıldı
- [ ] DATABASE_URL kopyalandı
- [ ] Vercel hesabı açıldı
- [ ] GitHub repo bağlandı
- [ ] Environment variables eklendi:
  - [ ] DATABASE_URL
  - [ ] NEXTAUTH_URL
  - [ ] NEXTAUTH_SECRET
- [ ] Deploy edildi
- [ ] Migration çalıştırıldı
- [ ] Site açılıyor ✅

---

## 💰 MALİYET

**Başlangıç:**
- Vercel: $0/ay (ücretsiz)
- Neon: $0/ay (ücretsiz)
- **Toplam: $0/ay**

**Büyüme (100+ kullanıcı):**
- Vercel Pro: $20/ay
- Neon Pro: $19/ay
- **Toplam: ~$40/ay**

---

## ❌ YAPMA

- ❌ Hostinger/GoDaddy alma (Next.js çalışmaz)
- ❌ MySQL kullanma (PostgreSQL gerekli)
- ❌ DATABASE_URL'i GitHub'a commit etme

---

## ✅ YAP

- ✅ Vercel + Neon PostgreSQL kullan
- ✅ Environment variables Vercel'de sakla
- ✅ GitHub'a push et, otomatik deploy olsun

---

## 🆘 SORUN GİDERME

### Site açılmıyor?
- Environment variables kontrol et
- Vercel logs'a bak (Settings > Logs)

### Database bağlantı hatası?
- DATABASE_URL doğru mu kontrol et
- Neon'da proje aktif mi kontrol et

### Migration hatası?
- Local'de çalıştır: `npx drizzle-kit migrate`

---

## 📞 YARDIM

- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**5 dakikada hazır!** 🚀








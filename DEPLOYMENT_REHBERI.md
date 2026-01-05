# 🚀 TQTA Portal - Deployment Rehberi (Basit)

## ⚠️ ÖNEMLİ: MySQL DEĞİL, PostgreSQL!

Sisteminiz **PostgreSQL** kullanıyor (MySQL değil). Bu çok önemli!

---

## 🎯 EN İYİ SEÇENEK: Vercel + Neon PostgreSQL

### Neden Vercel?
- ✅ Next.js için özel olarak yapılmış (Vercel Next.js'i yaratan şirket)
- ✅ Ücretsiz tier var (hobby plan)
- ✅ Otomatik deployment (GitHub'a push edince otomatik deploy)
- ✅ SSL sertifikası otomatik
- ✅ CDN dahil (hızlı yükleme)
- ✅ Kolay kurulum (5 dakika)

### Neden Neon PostgreSQL?
- ✅ Ücretsiz tier var (512 MB veritabanı)
- ✅ Serverless (sadece kullandığın kadar öde)
- ✅ Hızlı ve güvenilir
- ✅ Zaten kullanıyorsunuz (package.json'da var)

---

## 📋 ADIM ADIM KURULUM

### 1. Neon PostgreSQL Hesabı Aç (ÜCRETSİZ)

1. https://neon.tech adresine git
2. "Sign Up" butonuna tıkla
3. GitHub ile giriş yap (kolay)
4. Yeni proje oluştur
5. **DATABASE_URL**'i kopyala (şöyle görünür: `postgresql://user:pass@host/dbname`)

**Ücretsiz Plan:**
- 512 MB veritabanı
- 1 proje
- Yeterli başlangıç için

---

### 2. Vercel Hesabı Aç (ÜCRETSİZ)

1. https://vercel.com adresine git
2. "Sign Up" butonuna tıkla
3. GitHub ile giriş yap
4. "Add New Project" butonuna tıkla
5. GitHub repo'nuzu seçin

**Ücretsiz Plan:**
- Sınırsız proje
- 100 GB bandwidth/ay
- Otomatik SSL
- Yeterli başlangıç için

---

### 3. Vercel'e Deploy Et

#### Yöntem 1: GitHub ile (ÖNERİLEN)

1. Kodunuzu GitHub'a push edin
2. Vercel'de "Import Project" yapın
3. GitHub repo'nuzu seçin
4. Vercel otomatik olarak Next.js'i algılar
5. **Environment Variables** ekleyin:
   ```
   DATABASE_URL=postgresql://... (Neon'dan aldığınız)
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=rastgele-uzun-bir-string-buraya
   ```
6. "Deploy" butonuna tıklayın
7. 2-3 dakika bekleyin
8. ✅ Hazır!

#### Yöntem 2: Vercel CLI ile

```bash
# Vercel CLI yükle
npm i -g vercel

# Proje klasöründe
vercel

# Sorulara cevap ver:
# - Link to existing project? No
# - Project name? tqta-portal
# - Directory? ./
# - Override settings? No

# Environment variables ekle
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
```

---

## 🔧 Environment Variables (Gizli Bilgiler)

Vercel'de **Settings > Environment Variables** bölümüne şunları ekleyin:

```
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=rastgele-uzun-string-en-az-32-karakter
```

**NEXTAUTH_SECRET oluşturma:**
```bash
# Terminal'de çalıştır
openssl rand -base64 32
```

---

## ❌ HOSTİNGER VE GODADDY NEDEN UYGUN DEĞİL?

### Hostinger/GoDaddy Problemleri:
- ❌ Shared hosting (Node.js desteği yok veya çok sınırlı)
- ❌ Next.js çalıştırmak için VPS gerekiyor (pahalı)
- ❌ Kurulum çok zor (SSH, server yönetimi gerekir)
- ❌ SSL sertifikası manuel kurulum
- ❌ PostgreSQL desteği ekstra ücretli

### Ne Zaman Hostinger/GoDaddy?
- Sadece statik HTML/CSS siteler için
- WordPress için
- **Next.js için DEĞİL!**

---

## 💰 MALİYET KARŞILAŞTIRMASI

### Vercel + Neon (ÖNERİLEN)
- **Vercel:** Ücretsiz (hobby plan)
- **Neon:** Ücretsiz (512 MB)
- **Toplam:** $0/ay (başlangıç için)

### Hostinger/GoDaddy
- **Hosting:** $3-5/ay (shared hosting)
- **VPS:** $10-20/ay (Node.js için gerekli)
- **PostgreSQL:** Ekstra ücret
- **Toplam:** $15-25/ay minimum

---

## 🎯 ALTERNATİF SEÇENEKLER

### Railway (Kolay, Ücretsiz Tier Var)
- ✅ Next.js + PostgreSQL birlikte
- ✅ Ücretsiz tier ($5 kredi/ay)
- ✅ Kolay kurulum
- 🌐 https://railway.app

### Render (Kolay, Ücretsiz Tier Var)
- ✅ Next.js + PostgreSQL
- ✅ Ücretsiz tier (yavaş ama çalışır)
- 🌐 https://render.com

### DigitalOcean (Daha Gelişmiş)
- ✅ VPS (tam kontrol)
- ❌ Ücretsiz tier yok ($6/ay minimum)
- ❌ Kurulum zor (SSH, server yönetimi)
- 🌐 https://digitalocean.com

---

## 📝 ÖNERİLEN YOL HARİTASI

### Başlangıç (İlk 3 Ay)
1. ✅ **Vercel** (ücretsiz) - Web hosting
2. ✅ **Neon PostgreSQL** (ücretsiz) - Veritabanı
3. **Toplam:** $0/ay

### Büyüme (3+ Ay, 100+ kullanıcı)
1. **Vercel Pro** ($20/ay) - Daha fazla bandwidth
2. **Neon Pro** ($19/ay) - Daha fazla veritabanı
3. **Toplam:** ~$40/ay

### Kurumsal (1000+ kullanıcı)
1. **Vercel Enterprise** (özel fiyat)
2. **Neon Enterprise** (özel fiyat)
3. Veya kendi sunucunuz (VPS)

---

## 🚀 HIZLI BAŞLANGIÇ (5 DAKİKA)

### 1. Neon PostgreSQL
```bash
# 1. https://neon.tech → Sign Up
# 2. Yeni proje oluştur
# 3. DATABASE_URL'i kopyala
```

### 2. Vercel
```bash
# 1. https://vercel.com → Sign Up
# 2. GitHub repo'yu bağla
# 3. Environment variables ekle
# 4. Deploy!
```

### 3. Migration Çalıştır
```bash
# Local'de çalıştır (bir kere)
npm run db:migrate

# Veya Vercel'de otomatik çalışır (build sırasında)
```

---

## 🔒 GÜVENLİK NOTLARI

1. **DATABASE_URL** asla GitHub'a commit etme!
2. `.env` dosyasını `.gitignore`'a ekle
3. **NEXTAUTH_SECRET** güçlü bir string olsun (32+ karakter)
4. Vercel'de environment variables kullan (güvenli)

---

## ❓ SIK SORULAN SORULAR

### S: MySQL kullanabilir miyim?
**C:** Hayır, sistem PostgreSQL kullanıyor. MySQL'e çevirmek çok zor ve zaman kaybı.

### S: Hostinger'da çalıştırabilir miyim?
**C:** Hayır, shared hosting'de Next.js çalışmaz. VPS gerekiyor (pahalı).

### S: Ücretsiz planlar yeterli mi?
**C:** Başlangıç için evet. 100-200 kullanıcıya kadar yeterli.

### S: Veritabanı nerede olacak?
**C:** Neon PostgreSQL bulutta (cloud). Ayrı bir sunucu gerekmez.

### S: Video dosyaları nerede saklanacak?
**C:** Uploadthing kullanıyorsunuz (zaten var). Alternatif: AWS S3, Cloudflare R2.

---

## 📞 YARDIM

Sorun yaşarsanız:
1. Vercel dokümantasyonu: https://vercel.com/docs
2. Neon dokümantasyonu: https://neon.tech/docs
3. Next.js deployment: https://nextjs.org/docs/deployment

---

## ✅ ÖZET

**EN İYİ SEÇENEK:**
- 🌐 **Vercel** (ücretsiz) - Web hosting
- 🗄️ **Neon PostgreSQL** (ücretsiz) - Veritabanı
- **Toplam:** $0/ay

**YAPMA:**
- ❌ Hostinger/GoDaddy (Next.js için uygun değil)
- ❌ MySQL (PostgreSQL kullanılıyor)
- ❌ Shared hosting (Node.js çalışmaz)

**YAP:**
- ✅ Vercel + Neon PostgreSQL
- ✅ GitHub'a push et
- ✅ Otomatik deploy

**5 dakikada hazır!** 🚀








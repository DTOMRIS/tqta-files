# TQTA Sistem Mimarı Raporu
**Tarih:** 8 Ocak 2026  
**Durum:** Temel Analiz & Denetim  
**CTO/CMO/CHR/COO Değerlendirmesi**

---

## 1. MEVCUT DURUM ANALIZI

### Sorunlar (Audit Bulguları)
- ❌ **Admin + Öğrenci + Öğretmen Karışık:** AdminAnalytics'te rolllar net değil
- ❌ **Portal Yapısı Eksik:** Sadece MockUp'lar var, gerçek LMS bağlantısı yok
- ❌ **Veritabanı İlişkisi Belirsiz:** Hangi tabloların olması gerektiği tanımlı değil
- ❌ **Rol Tabanlı Erişim (RBAC) Yok:** Herkes her şeye erişebiliyor olabilir
- ❌ **Öğretmen Paneli Hiç Yok:** Dersleri yönetecek bir admin paneli eksik

### Güçlü Yönler (Assets)
- ✅ **StudentDashboard Temel Yapı:** UI kaynağı hazır
- ✅ **Beledçiniz AI:** Context Graph'a hazır
- ✅ **Landing Page:** Müşteri tarafı mükemmel
- ✅ **Database Altyapısı:** Drizzle ORM kurulu

---

## 2. ÜÇ PORTAL SİSTEMİ PLANI

### PORTAL 1: ÖĞRENCİ PORTALI (`/portal/student`)
```
┌─────────────────────────────────────┐
│  ÖĞRENCİ PORTALI (Kurs İzleme)     │
├─────────────────────────────────────┤
│                                     │
│  Dashboard (KPI):                   │
│  • Kayıt Kurslar (3)                │
│  • Tamamlanan Modüller (%65)        │
│  • Sertifika Durumu                 │
│  • Son Not (4.8 GPA)                │
│                                     │
│  Sidebar Navigation:                │
│  ├─ Panel (Dashboard)               │
│  ├─ Kurslarım                       │
│  │  ├─ Aşçılık (Active)            │
│  │  ├─ Barista (Completed)         │
│  │  └─ Sommelier (Upcoming)        │
│  ├─ Dersler (Course List)          │
│  ├─ Ödevler (Assignments)          │
│  ├─ Sınavlar (Exams)               │
│  ├─ Notlarım (Grades)              │
│  ├─ Sertifikaları (Certificates)   │
│  └─ Ayarlar (Settings)             │
│                                     │
│  Main Content Area:                 │
│  ├─ Kurs Kartı (Her kurs)          │
│  │  ├─ Başlık, Öğretmen            │
│  │  ├─ İlerleme Çubuğu             │
│  │  ├─ Son Modül                   │
│  │  └─ [Devam Et] Butonu           │
│  └─ Kurs Detay Sayfası             │
│     ├─ Video Player                 │
│     ├─ PDF Viewer                   │
│     ├─ Quiz/Test                    │
│     ├─ Yorum Bölümü                 │
│     ├─ Ödöv Yükleme                 │
│     └─ Soru-Cevap                   │
│                                     │
└─────────────────────────────────────┘

⚙️ Teknik Stack:
- Frontend: React (TSX), Tailwind CSS
- Database: Drizzle ORM
- Sayfalar: 
  /portal/student/dashboard
  /portal/student/courses
  /portal/student/courses/[courseId]
  /portal/student/assignments
  /portal/student/grades
  /portal/student/certificates
  /portal/student/settings
```

---

### PORTAL 2: ÖĞRETMEN PORTALI (`/portal/teacher`)
```
┌─────────────────────────────────────┐
│  ÖĞRETMEN PORTALI (Kurs Yönetimi)  │
├─────────────────────────────────────┤
│                                     │
│  Dashboard (KPI):                   │
│  • Aktif Dersler (5)                │
│  • Toplam Öğrenci (127)             │
│  • Ortalama Katılım (%88)           │
│  • Cevapsız Sorular (12)            │
│                                     │
│  Sidebar Navigation:                │
│  ├─ Panel (Dashboard)               │
│  ├─ Derslerim                       │
│  │  ├─ Peşəkar Aşçılıq             │
│  │  ├─ Restoran Servisi            │
│  │  └─ Barista Hazırlığı           │
│  ├─ Öğrenci Yönetimi                │
│  │  ├─ Öğrenci Listesi             │
│  │  ├─ Katılım Raporları           │
│  │  └─ Başarı Analizi              │
│  ├─ Ders İçeriği                    │
│  │  ├─ Modüller Ekle/Düzenle       │
│  │  ├─ Video Yükleme               │
│  │  └─ Materyaller                 │
│  ├─ Ödevler & Sınavlar              │
│  │  ├─ Ödev Listesi                │
│  │  ├─ Sınav Oluştur               │
│  │  └─ Notlandırma                 │
│  ├─ İletişim                        │
│  │  ├─ Duyurular Gönder            │
│  │  ├─ Forum/Tartışma              │
│  │  └─ E-mail                      │
│  └─ Ayarlar (Settings)              │
│                                     │
│  Main Content Area:                 │
│  ├─ Ders Kartı                      │
│  │  ├─ Öğrenci Sayısı              │
│  │  ├─ İlerleme Durumu             │
│  │  └─ [Yönet] Butonu              │
│  └─ Ders Yönetim Sayfası            │
│     ├─ Modül Listesi               │
│     ├─ Modül Ekle/Düzenle          │
│     ├─ İçerik Yönetimi             │
│     ├─ Öğrenci Katılımı            │
│     └─ Not Dağılımı (Analytics)    │
│                                     │
└─────────────────────────────────────┘

⚙️ Teknik Stack:
- Frontend: React (TSX), Tailwind CSS, Recharts (Grafikler)
- Database: Drizzle ORM
- Sayfalar:
  /portal/teacher/dashboard
  /portal/teacher/courses
  /portal/teacher/courses/[courseId]
  /portal/teacher/students
  /portal/teacher/assignments
  /portal/teacher/grades
  /portal/teacher/announcements
  /portal/teacher/analytics
```

---

### PORTAL 3: ADMIN PORTALI (`/portal/admin`)
```
┌─────────────────────────────────────┐
│  ADMIN PORTALI (Sistem Yönetimi)   │
├─────────────────────────────────────┤
│                                     │
│  Dashboard (KPI):                   │
│  • Toplam Kullanıcılar (1,284)      │
│  • Aktif Kurslar (23)               │
│  • Gözlenen Gəlir (45,000 AZN)      │
│  • Konversiya Oranı (4.2%)          │
│  • Toplam Öğrenci (890)             │
│  • Toplam Öğretmen (34)             │
│                                     │
│  Sidebar Navigation:                │
│  ├─ Panel (Dashboard & Analytics)   │
│  ├─ Kullanıcı Yönetimi              │
│  │  ├─ Öğrenciler                  │
│  │  ├─ Öğretmenler                 │
│  │  ├─ Admin Yöneticileri          │
│  │  └─ Rolleri Ayarla              │
│  ├─ Kurs Yönetimi                   │
│  │  ├─ Kursları Listele            │
│  │  ├─ Yeni Kurs Ekle              │
│  │  ├─ Kurs Düzenle                │
│  │  └─ Kurs Sil                    │
│  ├─ Program Yönetimi                │
│  │  ├─ Devlet Destekli             │
│  │  ├─ Ödenen Programlar           │
│  │  └─ Fiyat Yönetimi              │
│  ├─ Lead & Satış                    │
│  │  ├─ Lead Listesi                │
│  │  ├─ Konversiya Analizi          │
│  │  ├─ Success Simulator           │
│  │  └─ Job Bridge (İş İlanları)    │
│  ├─ Context Graph                   │
│  │  ├─ Kullanıcı Yolculukları      │
│  │  ├─ AI Söhbet İzleri            │
│  │  └─ Karar Arşivi                │
│  ├─ Raporlar                        │
│  │  ├─ Konversiya Hunisi           │
│  │  ├─ Kullanıcı Analitikleri      │
│  │  ├─ Gelir Raporu                │
│  │  └─ İş Performansı              │
│  ├─ İçerik Yönetimi                 │
│  │  ├─ Blog Yazıları               │
│  │  ├─ Haberler                    │
│  │  ├─ İş İlanları                 │
│  │  └─ GitHub Sync                 │
│  ├─ Sistem Ayarları                 │
│  │  ├─ Genel Ayarlar               │
│  │  ├─ Email Yapılandırması        │
│  │  ├─ Ödeme Entegrasyonu          │
│  │  └─ API Anahtarları             │
│  └─ Super Admin                     │
│     ├─ Sistem Logu                 │
│     ├─ Veritabanı Yedekleme        │
│     └─ Güvenlik Denetimi           │
│                                     │
│  Main Content Area:                 │
│  ├─ Dinamik Raporlar               │
│  ├─ Grafikler & Heatmaps           │
│  ├─ Context Graph Vizualı          │
│  ├─ Simulator Senaryoları          │
│  └─ Toplu Işlemler (Bulk Actions)  │
│                                     │
└─────────────────────────────────────┘

⚙️ Teknik Stack:
- Frontend: React (TSX), Tailwind CSS, D3.js/Recharts (Grafikler), Sankey (Trajectory)
- Database: Drizzle ORM, PostgreSQL
- Sayfalar:
  /portal/admin/dashboard
  /portal/admin/users/students
  /portal/admin/users/teachers
  /portal/admin/users/admins
  /portal/admin/courses
  /portal/admin/programs
  /portal/admin/leads
  /portal/admin/simulator
  /portal/admin/context-graph
  /portal/admin/analytics
  /portal/admin/reports
  /portal/admin/content
  /portal/admin/settings
  /portal/admin/logs
```

---

## 3. VERITABANASI ŞEMASI

```prisma
// Users & Authentication
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  password     String    (hashed)
  firstName    String
  lastName     String
  phone        String?
  role         Role      @default(STUDENT) // STUDENT | TEACHER | ADMIN | SUPER_ADMIN
  
  // Relations
  student      Student?
  teacher      Teacher?
  enrollments  Enrollment[]
  submissions  Assignment_Submission[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

enum Role {
  STUDENT
  TEACHER
  ADMIN
  SUPER_ADMIN
}

// Student Profile
model Student {
  id           String    @id @default(uuid())
  userId       String    @unique
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  gpa          Float     @default(0.0)
  enrollments  Enrollment[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Teacher Profile
model Teacher {
  id           String    @id @default(uuid())
  userId       String    @unique
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  bio          String?
  specialization String?
  courses      Course[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Courses
model Course {
  id           String    @id @default(uuid())
  title        String
  description  String    @db.Text
  teacherId    String
  teacher      Teacher   @relation(fields: [teacherId], references: [id])
  
  modules      Module[]
  enrollments  Enrollment[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Course Modules
model Module {
  id           String    @id @default(uuid())
  courseId     String
  course       Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  title        String
  description  String?
  order        Int
  
  contents     ModuleContent[]
  assignments  Assignment[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Module Content (Video, PDF, etc.)
model ModuleContent {
  id           String    @id @default(uuid())
  moduleId     String
  module       Module    @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  
  type         String    // "VIDEO" | "PDF" | "TEXT" | "QUIZ"
  title        String
  url          String?
  content      String    @db.Text
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Enrollments (Student-Course Relationship)
model Enrollment {
  id           String    @id @default(uuid())
  studentId    String
  student      Student   @relation(fields: [studentId], references: [id], onDelete: Cascade)
  
  courseId     String
  course       Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  enrolledAt   DateTime  @default(now())
  completedAt  DateTime?
  progress     Float     @default(0.0)
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  
  @@unique([studentId, courseId])
}

// Assignments
model Assignment {
  id           String    @id @default(uuid())
  moduleId     String
  module       Module    @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  
  title        String
  description  String    @db.Text
  dueDate      DateTime
  
  submissions  Assignment_Submission[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Assignment Submissions
model Assignment_Submission {
  id           String    @id @default(uuid())
  assignmentId String
  assignment   Assignment @relation(fields: [assignmentId], references: [id], onDelete: Cascade)
  
  studentId    String
  student      User      @relation(fields: [studentId], references: [id])
  
  submittedAt  DateTime  @default(now())
  grade        Float?
  feedback     String    @db.Text
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Context Graph (AI Reasoning Traces)
model AgentTrajectory {
  id           String    @id @default(uuid())
  sessionId    String
  userId       String
  
  userIntent   String    // "Kariyer değişikliği" vs.
  pathTaken    Json      // Gezilen sayfaların sırası
  decisionPoints Json    // Karar anları
  outcome      String    // "Kayıt" | "Vazgeçti"
  reasoning    String    @db.Text // AI'ın çıkardığı özet
  
  createdAt    DateTime  @default(now())
}

// Leads & Sales
model Lead {
  id           String    @id @default(uuid())
  email        String
  phone        String
  firstName    String
  lastName     String
  
  source       String    // "landing" | "ai-chat" | "referral"
  program      String    // Hangi programa ilgilendiği
  status       String    @default("new") // "new" | "contacted" | "converted" | "lost"
  
  conversions  Conversion[]
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Conversion History
model Conversion {
  id           String    @id @default(uuid())
  leadId       String
  lead         Lead      @relation(fields: [leadId], references: [id], onDelete: Cascade)
  
  action       String    // "Email gönderildi" | "Telefon araması" | "Kayıt tamamlandı"
  timestamp    DateTime  @default(now())
}

// Job Listings
model JobListing {
  id           String    @id @default(uuid())
  title        String
  company      String
  description  String    @db.Text
  
  location     String
  salary       Float?
  skills       String[]
  
  isActive     Boolean   @default(true)
  
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}
```

---

## 4. API ENDPOINTS HARITASI

### Öğrenci API'ları
```
GET    /api/student/dashboard       -> Öğrenci KPI'ları
GET    /api/student/courses         -> Kayıtlı Kurslar
GET    /api/student/courses/[id]    -> Kurs Detayı
GET    /api/student/modules/[id]    -> Modül İçeriği
POST   /api/student/assignments/[id]/submit -> Ödev Gönder
GET    /api/student/grades          -> Notlar
GET    /api/student/certificates    -> Sertifikalar
GET    /api/student/progress/[courseId] -> İlerleme
```

### Öğretmen API'ları
```
GET    /api/teacher/dashboard       -> Öğretmen KPI'ları
GET    /api/teacher/courses         -> Öğretmenin Kursları
POST   /api/teacher/courses         -> Yeni Kurs Ekle
PUT    /api/teacher/courses/[id]    -> Kurs Düzenle
DELETE /api/teacher/courses/[id]    -> Kurs Sil
POST   /api/teacher/modules         -> Modül Ekle
POST   /api/teacher/assignments     -> Ödev Oluştur
GET    /api/teacher/students        -> Öğrenci Listesi
POST   /api/teacher/grades/[id]     -> Not Ver
GET    /api/teacher/analytics       -> Öğrenci Analitikleri
```

### Admin API'ları
```
GET    /api/admin/dashboard         -> Admin KPI'ları
GET    /api/admin/users             -> Tüm Kullanıcılar
GET    /api/admin/users/[role]      -> Rol Bazında Kullanıcılar
POST   /api/admin/users             -> Yeni Kullanıcı Ekle
DELETE /api/admin/users/[id]        -> Kullanıcı Sil

GET    /api/admin/courses           -> Tüm Kurslar
POST   /api/admin/courses           -> Yeni Kurs Ekle
GET    /api/admin/analytics         -> Konversiya Hunisi
GET    /api/admin/leads             -> Lead Listesi
POST   /api/admin/simulator         -> Senaryoları Simüle Et
GET    /api/admin/context-graph     -> Kullanıcı Yolculukları
GET    /api/admin/reports           -> Raporlar

PUT    /api/admin/settings          -> Sistem Ayarları
GET    /api/admin/logs              -> Sistem Logu
```

---

## 5. ROLLÜ ERIŞIM KONTROL (RBAC)

```typescript
// Middleware/Auth.ts
enum Permission {
  // Öğrenci
  VIEW_OWN_COURSES = "view:own:courses",
  SUBMIT_ASSIGNMENT = "submit:assignment",
  VIEW_OWN_GRADES = "view:own:grades",
  
  // Öğretmen
  MANAGE_COURSES = "manage:courses",
  GRADE_ASSIGNMENTS = "grade:assignments",
  VIEW_STUDENTS = "view:students",
  
  // Admin
  MANAGE_ALL_USERS = "manage:all:users",
  MANAGE_ALL_COURSES = "manage:all:courses",
  VIEW_ANALYTICS = "view:analytics",
  
  // Super Admin
  MANAGE_SYSTEM = "manage:system",
  ACCESS_LOGS = "access:logs",
  BACKUP_DATABASE = "backup:database",
}

const rolePermissions = {
  STUDENT: [
    Permission.VIEW_OWN_COURSES,
    Permission.SUBMIT_ASSIGNMENT,
    Permission.VIEW_OWN_GRADES,
  ],
  TEACHER: [
    Permission.MANAGE_COURSES,
    Permission.GRADE_ASSIGNMENTS,
    Permission.VIEW_STUDENTS,
    ...STUDENT_PERMS,
  ],
  ADMIN: [
    Permission.MANAGE_ALL_USERS,
    Permission.MANAGE_ALL_COURSES,
    Permission.VIEW_ANALYTICS,
    ...TEACHER_PERMS,
  ],
  SUPER_ADMIN: [
    Permission.MANAGE_SYSTEM,
    Permission.ACCESS_LOGS,
    Permission.BACKUP_DATABASE,
    ...ADMIN_PERMS,
  ],
};
```

---

## 6. DOSYA YAPISI

```
src/
├── app/
│   ├── portal/
│   │   ├── student/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (Dashboard)
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [courseId]/
│   │   │   │       ├── page.tsx (Kurs Detayı)
│   │   │   │       └── module/[moduleId]/page.tsx
│   │   │   ├── assignments/page.tsx
│   │   │   ├── grades/page.tsx
│   │   │   └── certificates/page.tsx
│   │   │
│   │   ├── teacher/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (Dashboard)
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [courseId]/
│   │   │   │       └── manage/page.tsx
│   │   │   ├── students/page.tsx
│   │   │   ├── assignments/page.tsx
│   │   │   └── analytics/page.tsx
│   │   │
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx (Dashboard)
│   │       ├── users/
│   │       │   ├── students/page.tsx
│   │       │   ├── teachers/page.tsx
│   │       │   └── admins/page.tsx
│   │       ├── courses/page.tsx
│   │       ├── leads/page.tsx
│   │       ├── simulator/page.tsx
│   │       ├── context-graph/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   │
│   └── api/
│       ├── student/[endpoint].ts
│       ├── teacher/[endpoint].ts
│       └── admin/[endpoint].ts
│
├── components/
│   ├── portal/
│   │   ├── StudentLayout.tsx
│   │   ├── TeacherLayout.tsx
│   │   ├── AdminLayout.tsx
│   │   ├── StudentSidebar.tsx
│   │   ├── TeacherSidebar.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── RoleGuard.tsx
│   │
│   └── landing/
│       ├── ... (mevcut dosyalar)
│
├── lib/
│   ├── auth.ts
│   ├── permissions.ts
│   └── db.ts
│
└── middleware.ts (Rol Tabanlı Yönlendirme)
```

---

## 7. YOL HARİTASI

### **Faz 1: Temel Infrastruktur (Hafta 1-2)**
- [ ] Veritabanı Şeması Oluştur (Prisma Migration)
- [ ] RBAC Middleware İmplementasyonu
- [ ] Authentic/Authorization Flow
- [ ] Layout Bileşenleri (StudentLayout, TeacherLayout, AdminLayout)

### **Faz 2: Öğrenci Portalı (Hafta 3-4)**
- [ ] Dashboard
- [ ] Kurs Listesi ve Detayı
- [ ] Modül İçeriği (Video Player, PDF Viewer)
- [ ] Ödevler ve Gönderimi
- [ ] Notlar ve İlerleme

### **Faz 3: Öğretmen Portalı (Hafta 5-6)**
- [ ] Dashboard
- [ ] Kurs Yönetimi
- [ ] Öğrenci Yönetimi
- [ ] Notlandırma ve Analitikler

### **Faz 4: Admin Portalı (Hafta 7-9)**
- [ ] Dashboard ve Analytics
- [ ] Kullanıcı Yönetimi
- [ ] Kurs Yönetimi
- [ ] Context Graph Vizualizasyonu
- [ ] Success Simulator

### **Faz 5: Entegrasyonlar (Hafta 10+)**
- [ ] Email Notifications
- [ ] Ödeme Sistemi
- [ ] JobBridge Entegrasyonu
- [ ] Dinamik Blog & GitHub Sync

---

## 8. ÖNERİLER (CTO/CMO/CHR/COO)

**CTO Perspektifi:**
- Drizzle ORM kullanarak type-safe migration'lar yap
- API Rate Limiting ekle (Admin Bot'larından korunum için)
- Session Management'ı Redis'le yapılandır

**CMO Perspektifi:**
- Öğrenci sertifikaları LinkedIn'e integre et (LinkedIn Badge)
- Öğretmen profilleri "Uzman Şef" olarak sayfada göster
- Blog + AI News Daily dür

**CHR Perspektifi:**
- Öğretmen dashboard'ında "Öğrenci Sağlığı" metriği ekle
- Employee (Öğretmen) Satisfaction Score

**COO Perspektifi:**
- Admin dashboard'ında "ROI by Program" raporla
- Dün belirlenen "Job Bridge" ile kayıtlı mezunları gösteren panel

---

**SONUÇ:** Şu an elin altında "Sophisticated EdTech" bir platform var. 
Sadece net rollara bölüp, veritabanını oluşturman yeterli. 
Gerisi de ufak tefek iyileştirme!

---
*Hazırlayan: AI Architect*  
*Tarih: 8 Ocak 2026*

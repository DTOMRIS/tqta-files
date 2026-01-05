# 🎨 TQTA Eğitim Sistemi - Tasarım Blueprint

## 📐 Genel Tasarım Felsefesi

**Modern, Minimal, Profesyonel** - Eğitim yönetim sistemine yakışır, kullanıcı dostu ve görsel olarak çekici bir tasarım dili.

---

## 🎨 Renk Paleti

### Ana Renkler

```css
/* Primary - Ana Marka Rengi */
--primary-50: #f0f9ff    /* Çok açık mavi */
--primary-100: #e0f2fe
--primary-200: #bae6fd
--primary-300: #7dd3fc
--primary-400: #38bdf8
--primary-500: #0ea5e9   /* Ana mavi */
--primary-600: #0284c7   /* Hover/Active */
--primary-700: #0369a1
--primary-800: #075985
--primary-900: #0c4a6e

/* Secondary - Destekleyici Renk */
--secondary-50: #faf5ff
--secondary-100: #f3e8ff
--secondary-500: #a855f7  /* Mor */
--secondary-600: #9333ea
--secondary-700: #7e22ce

/* Accent - Vurgu Renkleri */
--accent-success: #10b981   /* Yeşil - Başarı */
--accent-warning: #f59e0b   /* Turuncu - Uyarı */
--accent-error: #ef4444     /* Kırmızı - Hata */
--accent-info: #3b82f6      /* Mavi - Bilgi */
```

### Nötr Renkler (Güncellenmiş)

```css
/* Background */
--bg-primary: #ffffff        /* Ana arka plan */
--bg-secondary: #f8fafc      /* İkincil arka plan */
--bg-tertiary: #f1f5f9       /* Üçüncül arka plan */
--bg-elevated: #ffffff       /* Kartlar, modaller */

/* Text */
--text-primary: #0f172a      /* Ana metin */
--text-secondary: #475569    /* İkincil metin */
--text-tertiary: #94a3b8     /* Üçüncül metin */
--text-disabled: #cbd5e1     /* Devre dışı metin */

/* Border */
--border-light: #e2e8f0      /* Açık border */
--border-medium: #cbd5e1     /* Orta border */
--border-dark: #94a3b8       /* Koyu border */
```

### Dark Mode (Opsiyonel)

```css
.dark {
  --bg-primary: #0f172a
  --bg-secondary: #1e293b
  --bg-tertiary: #334155
  --text-primary: #f8fafc
  --text-secondary: #cbd5e1
  --border-light: #334155
}
```

---

## 📝 Tipografi Sistemi

### Font Ailesi

```css
/* Ana Font - Inter (Modern, Okunabilir) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Başlık Fontu - Geist (Opsiyonel, Modern) */
font-family: 'Geist', 'Inter', sans-serif;
```

### Tipografi Ölçekleri

```css
/* Display - Büyük Başlıklar */
.display-1: 3.5rem (56px) / 1.1 / 700
.display-2: 3rem (48px) / 1.2 / 700

/* Başlıklar */
.h1: 2.5rem (40px) / 1.2 / 700
.h2: 2rem (32px) / 1.3 / 600
.h3: 1.75rem (28px) / 1.4 / 600
.h4: 1.5rem (24px) / 1.4 / 600
.h5: 1.25rem (20px) / 1.5 / 600
.h6: 1.125rem (18px) / 1.5 / 600

/* Body */
.body-lg: 1.125rem (18px) / 1.6 / 400
.body: 1rem (16px) / 1.6 / 400
.body-sm: 0.875rem (14px) / 1.5 / 400
.body-xs: 0.75rem (12px) / 1.5 / 400

/* Özel */
.caption: 0.75rem (12px) / 1.4 / 400
.label: 0.875rem (14px) / 1.4 / 500
.button: 0.875rem (14px) / 1.2 / 600
```

---

## 📏 Spacing Sistemi

### Base Spacing (8px grid)

```css
--space-0: 0
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
--space-16: 4rem (64px)
--space-20: 5rem (80px)
--space-24: 6rem (96px)
```

### Container Genişlikleri

```css
--container-sm: 640px
--container-md: 768px
--container-lg: 1024px
--container-xl: 1280px
--container-2xl: 1536px
```

---

## 🧩 Component Library Yapısı

### 1. Butonlar (Buttons)

```tsx
// Variantlar
- primary: Mavi, solid
- secondary: Mor, solid
- outline: Border, transparent bg
- ghost: Sadece hover bg
- danger: Kırmızı, solid
- success: Yeşil, solid

// Boyutlar
- sm: h-8, px-3, text-sm
- md: h-10, px-4, text-sm (default)
- lg: h-12, px-6, text-base
- icon: h-10, w-10, square

// Özellikler
- Loading state (spinner)
- Disabled state
- Icon support (left/right)
- Full width option
```

### 2. Kartlar (Cards)

```tsx
// Variantlar
- default: Beyaz bg, shadow-sm
- elevated: Beyaz bg, shadow-md (hover: shadow-lg)
- outlined: Border, transparent bg
- filled: bg-secondary

// Özellikler
- Header (opsiyonel)
- Content
- Footer (opsiyonel)
- Hover effects (scale, shadow)
- Clickable variant
```

### 3. Input Alanları

```tsx
// Variantlar
- default: Border, beyaz bg
- filled: bg-secondary, border-none
- error: Kırmızı border
- success: Yeşil border

// Özellikler
- Label (floating veya üstte)
- Helper text
- Error message
- Icon support (left/right)
- Disabled state
```

### 4. Tablo (Table)

```tsx
// Özellikler
- Striped rows (alternatif renkler)
- Hover effect
- Sortable columns
- Responsive (mobilde kart görünümü)
- Pagination
- Selection (checkbox)
```

### 5. Badge/Etiket

```tsx
// Variantlar
- default: Gri
- primary: Mavi
- success: Yeşil
- warning: Turuncu
- error: Kırmızı
- info: Açık mavi

// Boyutlar
- sm: text-xs, px-2, py-0.5
- md: text-sm, px-2.5, py-1 (default)
- lg: text-base, px-3, py-1.5
```

### 6. Modal/Dialog

```tsx
// Özellikler
- Backdrop blur
- Smooth animation (fade + scale)
- Close button
- Footer actions
- Size variants (sm, md, lg, xl)
```

---

## 🏗️ Layout Yapısı

### Ana Layout

```
┌─────────────────────────────────────────┐
│  Header (64px)                          │
│  - Logo                                  │
│  - Search (opsiyonel)                    │
│  - User menu                             │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │  Main Content Area           │
│ (256px)  │  (flex-1)                    │
│          │                              │
│ - Nav    │  - Page Header               │
│ - Menu   │  - Content                   │
│          │  - Footer (opsiyonel)        │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Sidebar Özellikleri

```css
- Genişlik: 256px (desktop), 0 (mobil - drawer)
- Arka plan: --bg-elevated
- Border: sağda --border-light
- Sticky: fixed position
- Scroll: overflow-y-auto
- Logo alanı: 80px yükseklik
- Menu items: 48px yükseklik
- Active state: --primary-500 bg, beyaz text
- Hover: --bg-secondary
```

### Header Özellikleri

```css
- Yükseklik: 64px
- Arka plan: --bg-elevated
- Border: altta --border-light
- Sticky: fixed top
- Z-index: 50
- Padding: 0 24px
- Flex: space-between
```

---

## 🎭 UI Patterns

### 1. Dashboard Cards

```tsx
// İstatistik Kartları
- Büyük sayı (2xl font)
- Küçük label (text-sm, muted)
- Icon (sağ üst)
- Trend indicator (↑↓, renkli)
- Hover: subtle scale + shadow
```

### 2. Data Tables

```tsx
// Özellikler
- Header: sticky, bg-secondary
- Row hover: bg-secondary
- Alternatif renkler (zebra)
- Action buttons (sağda)
- Responsive: mobilde kart görünümü
```

### 3. Form Layouts

```tsx
// Grid System
- 1 kolon: mobil
- 2 kolon: tablet+
- 3 kolon: desktop (geniş formlar için)

// Form Groups
- Label + Input + Helper text
- Spacing: 16px between groups
```

### 4. Empty States

```tsx
// Özellikler
- Büyük icon (64px)
- Başlık (h3)
- Açıklama (body, muted)
- CTA button (opsiyonel)
```

### 5. Loading States

```tsx
// Skeleton Loaders
- Card skeleton
- Table skeleton
- Text skeleton

// Spinner
- Primary renk
- Centered
- Size variants
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px   /* Küçük tablet */
--breakpoint-md: 768px   /* Tablet */
--breakpoint-lg: 1024px  /* Desktop */
--breakpoint-xl: 1280px  /* Büyük desktop */
--breakpoint-2xl: 1536px /* Çok büyük ekran */

/* Kullanım */
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }
```

### Responsive Davranışlar

- **Mobil (< 768px)**
  - Sidebar: Drawer (hamburger menu)
  - Grid: 1 kolon
  - Table: Kart görünümü
  - Padding: 16px

- **Tablet (768px - 1024px)**
  - Sidebar: Collapsible
  - Grid: 2 kolon
  - Padding: 24px

- **Desktop (> 1024px)**
  - Sidebar: Her zaman görünür
  - Grid: 3-4 kolon
  - Padding: 32px

---

## ✨ Animasyonlar & Transitions

### Transition Süreleri

```css
--transition-fast: 150ms
--transition-base: 200ms
--transition-slow: 300ms
--transition-slower: 500ms
```

### Easing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Yaygın Animasyonlar

```css
/* Hover Effects */
.hover-lift {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 🎯 Shadow Sistemi

```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

---

## 🔲 Border Radius

```css
--radius-none: 0
--radius-sm: 0.25rem (4px)
--radius-md: 0.5rem (8px)
--radius-lg: 0.75rem (12px)
--radius-xl: 1rem (16px)
--radius-2xl: 1.5rem (24px)
--radius-full: 9999px
```

---

## 🎨 Özel UI Elementleri

### 1. Status Indicators

```tsx
// Renk Kodları
- Success: Yeşil dot + text
- Warning: Turuncu dot + text
- Error: Kırmızı dot + text
- Info: Mavi dot + text
- Neutral: Gri dot + text
```

### 2. Progress Bars

```tsx
// Variantlar
- Default: Mavi
- Success: Yeşil
- Warning: Turuncu
- Error: Kırmızı

// Özellikler
- Animated fill
- Label (opsiyonel)
- Percentage display
```

### 3. Tooltips

```tsx
// Özellikler
- Dark bg, beyaz text
- Arrow indicator
- Smooth fade in/out
- Position variants (top, bottom, left, right)
```

### 4. Dropdown Menus

```tsx
// Özellikler
- Shadow-lg
- Border radius: lg
- Hover states
- Divider support
- Icon + text items
```

---

## 📋 Sayfa Örnekleri

### Dashboard Sayfası

```
┌─────────────────────────────────────────┐
│  Page Header                            │
│  - Başlık                               │
│  - Action buttons                       │
├─────────────────────────────────────────┤
│  Stats Grid (4 kolon)                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │Stat1│ │Stat2│ │Stat3│ │Stat4│      │
│  └─────┘ └─────┘ └─────┘ └─────┘      │
├─────────────────────────────────────────┤
│  Quick Actions (4 kolon)                │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│  │Act1 │ │Act2 │ │Act3 │ │Act4 │      │
│  └─────┘ └─────┘ └─────┘ └─────┘      │
├──────────────────┬──────────────────────┤
│  Son Aktiviteler │  CTH Deadlines      │
│  (2/3 genişlik)  │  (1/3 genişlik)     │
└──────────────────┴──────────────────────┘
```

### Liste Sayfası (Öğrenciler)

```
┌─────────────────────────────────────────┐
│  Page Header                            │
│  - Başlık                               │
│  - Search + Filters                     │
│  - Export button                        │
├─────────────────────────────────────────┤
│  Table                                  │
│  ┌──────────────────────────────────┐  │
│  │ Header (sticky)                  │  │
│  ├──────────────────────────────────┤  │
│  │ Row 1                            │  │
│  │ Row 2                            │  │
│  │ ...                              │  │
│  └──────────────────────────────────┘  │
├─────────────────────────────────────────┤
│  Pagination                             │
└─────────────────────────────────────────┘
```

---

## 🚀 Uygulama Adımları

### 1. CSS Variables Güncellemesi

`src/app/globals.css` dosyasındaki CSS variables'ları yeni renk paletine göre güncelle.

### 2. Tailwind Config

`tailwind.config.mjs` dosyasına yeni renkleri ve spacing değerlerini ekle.

### 3. Component Güncellemeleri

- Button component: Yeni variantlar
- Card component: Yeni shadow ve hover effects
- Input component: Yeni border ve focus states
- Table component: Yeni row styles

### 4. Layout Güncellemeleri

- Sidebar: Yeni renkler ve spacing
- Header: Yeni yükseklik ve styling
- Main content: Yeni padding ve spacing

### 5. Sayfa Güncellemeleri

- Dashboard: Yeni card designs
- Liste sayfaları: Yeni table styling
- Form sayfaları: Yeni input styling

---

## 📝 Notlar

- **Tutarlılık**: Tüm sayfalarda aynı spacing ve renk sistemi kullanılmalı
- **Erişilebilirlik**: Kontrast oranları WCAG 2.1 AA standardına uygun olmalı
- **Performans**: Animasyonlar performansı etkilememeli (GPU accelerated)
- **Responsive**: Tüm componentler mobil-first yaklaşımıyla tasarlanmalı

---

## 🎯 Sonraki Adımlar

1. ✅ Blueprint hazırlandı
2. ⏳ CSS variables güncellemesi
3. ⏳ Component library güncellemesi
4. ⏳ Sayfa tasarımlarının uygulanması
5. ⏳ Test ve iyileştirmeler

---

**Hazırlayan:** AI Assistant  
**Tarih:** 2024  
**Versiyon:** 1.0






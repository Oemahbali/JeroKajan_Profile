# Jero Kajanan Profile (Astro + Framer Motion)

Halaman profil & tautan resmi Jero Kajanan yang telah dimigrasi ke **Astro**, **React**, dan **Framer Motion**.

## ✨ Fitur & Animasi

- **Astro v5**: Framework modern, performa tinggi, dan static site generation.
- **Framer Motion**:
  - Animasi pembuka (*entrance*) saat website dibuka:
    - **Icon Lokasi (Map)**: Efek pin drop bounce yang menarik saat halaman dimuat + radar wave pulse berkala.
    - **Icon TikTok**: Efek irama ketukan (*music beat & shake*) energik saat halaman dibuka.
    - **Icon Instagram**: Efek putaran kamera (*smooth pop & spin*) saat dibuka.
    - **Icon Menu**: Animasi kemiringan garpu & sendok (*tilt & clink*).
    - **Profile Picture**: Spring pop-in dengan hover scale interaktif.
    - **Stagger Links**: Tautan muncul berurutan dengan transisi halus.
    - **Interaksi Hover & Tap**: Setiap tombol link dan icon memiliki animasi mikro saat disentuh / kursor diarahkan.
    - **Popup Foto Profil**: Modal interaktif dengan `AnimatePresence` untuk transisi buka/tutup yang mulus.
- **Tailwind CSS & Custom Styling**: Palet warna hangat khas Jero Kajanan (`jk-deep`, `jk-gold`, dll.) dan tipografi Playfair Display & Outfit.

## 🚀 Perintah yang Tersedia

Jalankan perintah berikut di terminal:

```bash
# Menjalankan server pengembangan lokal (http://localhost:4321)
npm run dev

# Membangun project untuk produksi (ke folder dist/)
npm run build

# Meninjau hasil build secara lokal
npm run preview
```

## 📁 Struktur Project

```text
├── public/
│   └── photo/
│       └── logo.png
├── src/
│   ├── components/
│   │   └── ProfileCard.tsx    # Komponen React & animasi Framer Motion
│   ├── layouts/
│   │   └── Layout.astro       # Layout utama & metadata HTML
│   ├── pages/
│   │   └── index.astro        # Halaman utama Astro
│   └── styles/
│       └── style.css          # Styling global & efek atmosphere
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

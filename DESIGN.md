# DESIGN.md, Jero Kajanan

Arah desain untuk halaman profil dan tautan Jero Kajanan. Dokumen ini adalah sumber
keputusan visual. Aturan anti slop dipakai sebagai filter di atasnya, bukan sebagai
pengganti arah.

## Apa ini

Halaman satu layar untuk orang yang sudah tahu nama Jero Kajanan, biasanya dari
Instagram atau TikTok, lalu membuka tautan di bio. Tugas halaman ini sempit dan jelas:
membuat orang percaya ini tempat makan sungguhan, lalu mengantar ke menu, lokasi,
Instagram, atau TikTok. Tidak ada tujuan lain, jadi tidak ada section lain.

## Identitas

Jero Kajanan adalah masakan rumahan, bukan restoran korporat. Nada yang benar adalah
hangat, tenang, dan percaya diri, seperti meja makan kayu di rumah yang lampunya
kuning. Bukan mewah, bukan neon, bukan "startup".

Motif identitas yang dipegang di seluruh halaman: **krem di atas coklat tua**. Kartu
krem adalah piring, latar coklat adalah meja dan lampu ruang makan. Motif ini yang
membuat halaman tetap terasa milik Jero Kajanan kalau nama dan logonya ditukar.

## Palette

Maksimal tiga warna inti ditambah satu aksen, sesuai R-29.

| Peran | Nilai | Alasan |
| --- | --- | --- |
| Latar, coklat tua | `#140c08` | Meja kayu dan ruang makan malam. Gelap dipilih karena foto makanan dan kartu krem paling menonjol di atasnya. |
| Latar, coklat sedang | `#2a160f` | Gradasi dari latar gelap ke kartu, menjaga kartu tetap terikat ke latar. |
| Permukaan kartu | `#fff6ea` | Krem hangat seperti piring keramik. Bukan putih murni, karena putih murni terasa klinis. |
| Aksen | `#b45309` | Emas kunyit, satu-satunya warna yang dipakai untuk penekanan. |

Warna brand pihak ketiga (pink Instagram, hijau Maps, teal TikTok) **tidak** masuk
palette. Ikon brand boleh tetap memakai bentuk aslinya, tetapi warnanya mengikuti aksen
atau warna teks, supaya empat baris link tidak menjadi empat warna berbeda.

Teks: `#2a160f` untuk ink di atas krem, `#7a5b45` untuk teks sekunder. Pasangan ink di
krem 12.6:1, muted di krem 5.75:1, keduanya di atas ambang AA.

## Tipografi

- **Playfair Display** untuk nama dan judul. Serif bergaya papan nama warung lama,
  memberi kesan didirikan dan dirawat, bukan dibuat kemarin.
- **Outfit** untuk teks dan label. Sans geometris yang netral dan sangat terbaca di
  ukuran kecil, jadi tidak bersaing dengan serif.

Dua typeface, dua peran, tidak ada yang ketiga. Keduanya di-self-host supaya tidak ada
permintaan pihak ketiga yang memblokir render.

## Komposisi

Satu kartu di tengah, lebar maksimal 420px, di atas latar penuh. Di dalam kartu urutannya:
logo, nama usaha, satu baris tagline, lalu empat tautan. Tidak ada navbar, hero, kartu
fitur, statistik, atau testimoni, karena halaman ini tidak punya konten untuk itu.

Jarak vertikal dipakai untuk memisahkan tiga kelompok: identitas (logo dan nama),
penjelasan satu baris, lalu aksi (empat tautan). Bukan padding seragam di semua tempat.

## Dial

**ENERGY 2 / RHYTHM 1 / MOTION 1**

- **ENERGY 2**, bukan 3: usaha makanan kecil tidak perlu berteriak. Kartu krem di atas
  coklat sudah cukup untuk menyapa, dan aksen emas dipakai hemat.
- **RHYTHM 1**: hanya ada satu komposisi. Memvariasikan ritme di halaman satu kartu
  berarti menambah dekorasi, bukan informasi.
- **MOTION 1**: gerak hanya untuk umpan balik (hover, tekan, fokus) dan satu entrance
  singkat di bawah satu detik. Tidak ada animasi berulang, tidak ada gerak latar, tidak
  ada parallax. Pengunjung datang untuk membuka menu, bukan menonton animasi.

## Batasan konten

- Tautan yang tampil hanya yang benar-benar ada: Instagram, TikTok, menu, lokasi.
- Tidak ada angka, testimoni, atau klaim keamanan tanpa sumber nyata.
- Logo dan nama usaha adalah aset nyata pemilik, bukan buatan.
- Teks ditulis dalam bahasa Indonesia sehari hari, tanpa kata pemasaran.

## Keputusan dan alasannya

| Keputusan | Alasan satu baris |
| --- | --- |
| Tema gelap tetap, tanpa toggle | Ruang makan malam adalah identitas brand ini, bukan tren, jadi satu tema yang benar lebih baik daripada dua yang setengah jadi. |
| Satu kartu, bukan grid | Hanya ada satu konten, jadi satu kolom adalah bentuk paling jujur. |
| Empat tautan, bukan enam | Setiap tautan harus sesuatu yang dicari orang, sisanya hanya menambah pilihan. |
| Aksen emas hanya di penekanan | Aksen yang dipakai di mana mana berhenti menjadi aksen. |
| Radius 28px kartu, 16px baris, 12px ikon | Skala radius menunjukkan sarang elemen: makin kecil elemen, makin kecil radius. |
| Gerak hanya saat disentuh | Satu satunya hal yang perlu digerakkan adalah elemen yang sedang dipakai. |

## Larangan khusus proyek ini

- Tanpa glow dekoratif di latar, ikon, atau tombol.
- Tanpa animasi berulang tanpa akhir.
- Tanpa gradient biru ke ungu, tanpa orb, tanpa bintang berkelip.
- Tanpa stripe warna di tepi kartu atau baris.
- Tanpa ikon sparkle, bintang, atau robot.

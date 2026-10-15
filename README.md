# Website Bolang Computer — Servis Laptop & PC Gaming di Solo

Website satu halaman yang interaktif untuk **Bolang Computer**, Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta.
Isinya: servis laptop & PC gaming, rakit PC, upgrade, install ulang, recovery data, konsol, printer, jaringan & CCTV, serta home service.

Dibuat dengan **HTML, CSS, dan JavaScript murni** (tanpa framework), sehingga ringan dan bisa di-hosting gratis di **GitHub Pages**.

> ⚠️ **Masih berupa CONTOH. Ganti sebelum link website disebarkan:**
> - testimoni pelanggan, rating "4,9 dari 1.200+ ulasan", angka statistik (5.000+ perangkat, 8+ tahun);
> - harga layanan & paket, serta promo (diagnosa gratis, garansi 90 hari, antar-jemput gratis radius 5 km);
> - foto (masih ilustrasi);
> - link Instagram (masih kosong, jadi ikonnya disembunyikan).
>
> Semuanya bisa diubah di `assets/js/config.js`. Lihat [Checklist](#checklist-sebelum-link-disebarkan).

---

## Fitur

| Bagian | Isi |
|---|---|
| **Top bar** | Promo + status **Buka/Tutup real-time** (WIB) |
| **Navbar** | Menempel saat di-scroll, menu aktif otomatis, menu hamburger di HP |
| **Hero** | Judul, tombol Booking & Konsultasi WA, rating, angka statistik berjalan |
| **Layanan** | 16 layanan, **filter per kategori**, popup detail + rincian harga |
| **Harga** | Paket Basic / Gamer / Pro (**Laptop ↔ PC**), tabel harga dengan **pencarian** dan tombol **Pilih** (langsung masuk ke form booking) |
| **Proses & Keunggulan** | 5 langkah servis dan 6 alasan memilih Bolang Computer |
| **Banner Rakit PC** | Ajakan konsultasi rakit PC via WhatsApp |
| **Testimoni** | Carousel otomatis (bisa di-swipe di HP) |
| **FAQ** | Akordeon + pencarian pertanyaan |
| **Booking** | Form dengan validasi → **kode booking** → pesan otomatis terkirim ke **WhatsApp 0878-3536-9249** |
| **Kontak** | Alamat, peta, jam operasional (hari ini disorot) |
| **Lainnya** | Tombol WA melayang, kembali ke atas, animasi saat scroll, SEO dasar (data LocalBusiness untuk Google) |

---

## Struktur folder

```
├── index.html            ← halaman utama
├── .nojekyll             ← penanda untuk GitHub Pages (biarkan saja)
├── README.md             ← panduan ini
└── assets/
    ├── css/style.css     ← tampilan (warna, ukuran, layout)
    ├── js/config.js      ← ★ DATA USAHA, layanan, harga, testimoni, FAQ
    ├── js/app.js         ← logika interaktif (tidak perlu diubah)
    ├── fonts/plus-jakarta-sans-latin.woff2
    └── img/hero.jpg, workshop.jpg, rakit-pc.jpg
```

---

## Online-kan dengan GitHub Pages (gratis)

Lakukan dari **laptop/komputer**, karena mengunggah folder lewat HP cukup sulit.

### Langkah 1 — Siapkan file
Download **`bolang-computer-website.zip`**, lalu ekstrak (klik kanan → *Extract All*).
Anda akan mendapat folder berisi `index.html`, folder `assets`, dan `README.md`.

### Langkah 2 — Buat repository
1. Login di **github.com** (daftar gratis jika belum punya akun).
2. Klik tombol **+** di kanan atas → **New repository**.
3. Isi **Repository name**, misalnya `bolang-computer`. Alamat website nanti menjadi `https://USERNAME.github.io/bolang-computer/`.
   - 💡 Untuk alamat yang lebih pendek (`https://USERNAME.github.io/`), beri nama repository persis `USERNAME.github.io`. Ganti USERNAME dengan username GitHub Anda.
4. Pilih **Public**, karena GitHub Pages gratis hanya untuk repository publik.
5. Klik **Create repository**.

### Langkah 3 — Upload file
1. Di halaman repository yang baru, klik link **uploading an existing file** (atau menu **Add file → Upload files**).
2. Buka folder hasil ekstrak dan pilih **semua isinya** (`index.html`, folder `assets`, `README.md`). Lalu **seret (drag & drop)** ke halaman GitHub.
   - Seret **isi foldernya**, bukan foldernya, supaya `index.html` berada paling atas.
   - Gunakan drag & drop, bukan tombol *choose your files*, agar folder `assets` ikut terunggah lengkap.
3. Tunggu sampai semua file muncul di daftar, lalu klik **Commit changes**.
4. Cek halaman repository: harus terlihat `index.html` dan folder `assets` langsung di halaman utama repository.

### Langkah 4 — Aktifkan Pages
1. Buka tab **Settings** → menu kiri **Pages**.
2. Di bagian **Build and deployment**:
   - **Source:** *Deploy from a branch*
   - **Branch:** `main`, folder `/ (root)`
   - Klik **Save**.
3. Tunggu 1–3 menit, lalu refresh halaman. Akan muncul tulisan **"Your site is live at https://USERNAME.github.io/bolang-computer/"**. Website sudah online.

### Mengubah isi setelah online
- **Edit teks/harga/jam:** buka file di repository (misalnya `assets/js/config.js`), klik ikon **pensil (Edit)**, ubah isinya, lalu klik **Commit changes**. Website ter-update otomatis dalam ±1–10 menit. Tekan Ctrl+F5 di browser jika belum berubah.
- **Ganti foto:** buka folder `assets/img` → **Add file → Upload files** → unggah foto dengan **nama file yang sama** → **Commit changes**.
- **Domain sendiri** (opsional, misalnya `bolangcomputer.com`): Settings → Pages → *Custom domain*, lalu atur DNS di tempat Anda membeli domain.

Setelah online, cantumkan link website di **Google Business Profile** (Google Maps) dan bio Instagram agar mudah ditemukan pelanggan.

---

## Mengubah data (`assets/js/config.js`)

Ubah teks **di antara tanda kutip**, simpan, lalu refresh browser.

### Data usaha (sudah diisi)

```js
nama: "Bolang Computer",
whatsapp: "6287835369249",          // format 62 + nomor tanpa 0 di depan
teleponTampil: "0878-3536-9249",
email: "",                          // kosong = baris email disembunyikan
alamat: "Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah 57137",
```

### Jam buka
Saat ini **setiap hari 09.00–17.00 WIB**. Untuk hari libur, ubah barisnya menjadi `buka: null`. Contoh Minggu libur:

```js
{ hari: "Minggu", buka: null, tutup: null },
```

Jam buka otomatis dipakai untuk status buka/tutup, tabel jam, pilihan jam di form booking, dan ringkasan di footer.

### Instagram & media sosial
Isi **link lengkap** akun Anda. Ikonnya akan muncul otomatis:

```js
sosial: {
  instagram: "https://instagram.com/namaakunanda",
  tiktok: "",
  facebook: ""
},
```

### Peta
Saat ini peta mencari alamat toko. Kalau toko sudah terdaftar di Google Maps, hasilnya bisa lebih tepat:
1. Buka lokasi toko di Google Maps → **Bagikan → Salin link**, lalu tempel ke `mapsLink`.
2. **Bagikan → Sematkan peta** → salin isi `src="..."` saja, lalu tempel ke `mapsEmbed`.

### Konten lain

| Bagian | Fungsi |
|---|---|
| `pengumuman` | Teks promo di bar paling atas |
| `rating`, `statistik` | Rating & 4 angka di bawah hero ⚠️ contoh |
| `layanan`, `paket`, `daftarHarga` | Layanan, paket, dan tabel harga (`min: 0` = "Gratis") |
| `testimoni` | Ulasan pelanggan ⚠️ contoh |
| `faq` | Pertanyaan & jawaban |

Tips: jangan menghapus tanda koma `,`, kutip `"`, atau kurung `{ } [ ]`. Kalau website tampil kosong setelah diedit, biasanya ada salah satu tanda itu yang terhapus.

Teks yang ditulis langsung di `index.html`:
- judul hero;
- 5 langkah proses;
- 6 keunggulan;
- badge **"8+ tahun"** ⚠️ contoh;
- isi banner Rakit PC.

---

## Checklist sebelum link disebarkan

- [x] Nama usaha, WhatsApp, alamat, jam buka
- [ ] Link Instagram diisi
- [ ] **Testimoni diganti ulasan asli** (misalnya salin dari Google Maps)
- [ ] **Rating, statistik & "8+ tahun"** sesuai angka sebenarnya
- [ ] Harga, paket, garansi & promo sesuai tarif Bolang Computer
- [ ] Foto diganti foto asli toko/teknisi (disarankan)
- [ ] Coba isi form booking sampai pesan masuk ke WhatsApp 0878-3536-9249

---

## Catatan teknis

- Form booking **tidak menyimpan data di server**. Pesan disusun di browser pengunjung lalu dibuka di WhatsApp, jadi tanpa database dan tanpa biaya.
- Status buka/tutup dan tanggal booking selalu mengikuti **WIB**.
- Peta Google baru dimuat setelah tombol "Tampilkan peta" diklik, agar halaman tetap cepat.
- File `index-standalone.html` dan `build_standalone.py` di workspace hanya untuk pratinjau satu file, **tidak perlu** diunggah ke GitHub.

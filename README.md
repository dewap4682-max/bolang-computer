# Website Bolang Computer — Servis Laptop & PC Gaming di Solo

🌐 **Alamat website:** https://dewap4682-max.github.io/bolang-computer/

Website satu halaman yang interaktif untuk **Bolang Computer**, Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta.
Dibuat dengan **HTML, CSS, dan JavaScript murni** (tanpa framework) dan di-hosting gratis di **GitHub Pages**.

> ⚠️ **Masih berupa CONTOH. Sebaiknya diganti:**
> - testimoni pelanggan, rating "4,9 dari 1.200+ ulasan", angka statistik (5.000+ perangkat, 8+ tahun);
> - harga layanan & paket, serta promo (diagnosa gratis, garansi 90 hari, antar-jemput gratis radius 5 km);
> - foto (masih ilustrasi);
>
> Semuanya diubah di file `config.js`. Lihat [Checklist](#checklist).

---

## Daftar file

Semua file berada di **satu tempat (tanpa folder)**, jadi mudah diunggah ke GitHub, termasuk dari HP.

| File | Isi |
|---|---|
| `index.html` | Halaman utama (struktur & teks) |
| `config.js` | ★ **Data usaha, layanan, harga, testimoni, FAQ.** File yang paling sering diedit |
| `style.css` | Tampilan (warna, ukuran, layout) |
| `app.js` | Logika interaktif (tidak perlu diubah) |
| `hero.jpg`, `workshop.jpg`, `rakit-pc.jpg` | Foto di website |
| `og-image.jpg` | Gambar pratinjau saat link dibagikan di WhatsApp/Facebook |
| `sitemap.xml` | Daftar halaman untuk Google Search Console |
| `plus-jakarta-sans.woff2` | Font |
| `README.md` | Panduan ini |

---

## Cara upload / update ke GitHub

Website ini ada di repository **`bolang-computer`** milik akun **dewap4682-max**.

### Upload semua file (pertama kali, atau setelah perbaikan)
1. Download zip, lalu **ekstrak**:
   - HP Android: buka di aplikasi *Files*, ketuk zip, pilih *Ekstrak*.
   - iPhone: ketuk zip di aplikasi *Files*.
   - Komputer: klik kanan, pilih *Extract All*.
2. Buka repository di github.com → **Add file → Upload files**.
3. Ketuk/klik **choose your files**, lalu **pilih SEMUA file** hasil ekstrak (10 file). Bisa juga diseret ke halaman tersebut di komputer.
4. Tunggu sampai semua file muncul di daftar, lalu klik **Commit changes**.
   - File dengan nama yang sama otomatis **diganti** dengan versi baru.
5. Tunggu 1–3 menit, lalu buka website. Kalau tampilan belum berubah, tutup lalu buka lagi browsernya (di komputer: Ctrl+F5). GitHub menyimpan cache hingga ±10 menit.

### Edit langsung di GitHub (tanpa upload)
Cocok untuk mengubah harga, jam buka, testimoni, teks, dll.:
1. Login GitHub, lalu buka link edit langsung:
   - Data & konten: **https://github.com/dewap4682-max/bolang-computer/edit/main/config.js**
   - Judul hero & teks statis: **https://github.com/dewap4682-max/bolang-computer/edit/main/index.html**
2. Cari teks yang ingin diubah. Di komputer tekan Ctrl+F; di HP gunakan "Cari di halaman" pada menu browser.
3. Ubah **hanya teks di antara tanda kutip** `"..."` atau angkanya.
4. Klik **Commit changes...**, lalu klik **Commit changes** lagi di jendela yang muncul.
5. Tunggu 1–3 menit, lalu buka ulang website-nya.

### ⚠️ Aturan penting saat mengedit
- **Ubah teks/angka yang SUDAH ADA**, jangan menempel baris baru di sembarang tempat.
- Contoh di panduan ini hanya menunjukkan **format**, bukan untuk ditempel.
- Ubah hanya isi di dalam kutip `"..."` atau angkanya. Jangan menghapus koma `,`, kutip `"`, atau kurung `{ } [ ]`.
- Harga ditulis **tanpa titik**: `150000`, bukan `150.000`.
- Instagram ditulis dengan **link lengkap**: `"https://instagram.com/bolang_computer"`.
- Untuk hari libur, ubah **isinya**, bukan kata `buka`-nya: `{ hari: "Minggu", buka: null, tutup: null },`

### Kalau muncul peringatan kuning di atas website
Artinya `config.js` tidak bisa dibaca, biasanya karena salah ketik saat mengedit (koma, kutip, atau kurung terhapus). Peringatan itu menyebut **nomor barisnya**. Cara memperbaikinya:
- Buka link edit `config.js`, lihat baris tersebut **dan satu baris di atasnya**, lalu kembalikan tanda yang terhapus. **Commit** lagi.
- Atau unggah ulang `config.js` yang lama dari zip, sehingga website kembali seperti semula.

Website tetap tampil walaupun ada kesalahan, hanya bagian layanan, harga, testimoni, dan FAQ yang kosong sampai diperbaiki.

### Ganti foto
Upload foto baru dengan **nama file yang sama** (`hero.jpg`, `workshop.jpg`, `rakit-pc.jpg`) lewat **Add file → Upload files**, lalu klik Commit. Usahakan foto horizontal, lebar ±1200–1400 px, dan ukurannya di bawah 200 KB (kecilkan di squoosh.app atau tinyjpg.com).

---

## SEO Google: "servis laptop & PC gaming Solo Raya"

### Sudah dipasang di website
- **Judul di Google:** "Servis Laptop & PC Gaming Solo Raya | Bolang Computer", plus deskripsi singkat.
- **Judul utama (H1)** memuat "Solo Raya", dan ada bagian **Area Layanan Solo Raya** (Solo, Sukoharjo, Karanganyar, Boyolali, Klaten, Sragen, Wonogiri).
- **Data bisnis untuk Google** (alamat, jam buka, layanan, Instagram) di blok `application/ld+json` pada bagian atas `index.html`.
  - ⚠️ Jika jam buka, nomor, atau alamat berubah, ubah juga di blok ini.
- **`sitemap.xml`**: daftar halaman untuk Google.

### Langkah 1 — Google Search Console (agar website terdaftar di Google)
1. Buka **https://search.google.com/search-console**, lalu login dengan akun Google.
2. Pilih **Tambahkan properti → Awalan URL**, isi `https://dewap4682-max.github.io/bolang-computer/`, lalu klik **Lanjutkan**.
3. Verifikasi dengan **File HTML**:
   - Download file `google….html`.
   - Unggah file itu ke GitHub, di tempat yang sama dengan index.html.
   - Klik **Commit**, tunggu 1–2 menit, lalu klik **Verifikasi**.
4. Buka menu **Peta situs**, ketik `sitemap.xml`, lalu klik **Kirim**.
5. Buka menu **Inspeksi URL**, tempel alamat website, lalu klik **Minta pengindeksan**.

### Langkah 2 — Google Business Profile (paling berpengaruh untuk pencarian lokal & Google Maps)
1. Buka **https://business.google.com → Kelola sekarang**.
   - Jika toko sudah muncul di Google Maps, pilih **Klaim bisnis ini**.
2. Isi data berikut:
   - **Nama:** Bolang Computer
   - **Kategori:** *Layanan perbaikan komputer*
   - **Alamat:** Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta 57137. Pastikan pin peta tepat.
   - **Telepon:** 0878-3536-9249
   - **Situs web:** link website di atas
3. Lakukan verifikasi sesuai cara yang diminta Google.
4. Lengkapi profil:
   - jam buka (Senin–Sabtu 09.00–17.00, Minggu tutup);
   - foto asli toko & hasil servis;
   - daftar layanan.
5. Minta pelanggan memberi **ulasan di Google**. Ulasan asli adalah faktor terbesar untuk muncul di atas pencarian "servis laptop Solo".

### Tips lain
- Pakai nama, alamat, dan nomor yang **sama persis** di semua tempat (Google Maps, Instagram, marketplace).
- Pasang link website di bio Instagram @bolang_computer.
- Website baru biasanya mulai muncul di Google dalam beberapa hari sampai 2 minggu setelah didaftarkan. Naik ke posisi atas butuh waktu (minggu–bulan) dan tidak bisa dijamin.

---

## Mengubah data (`config.js`)

Ubah teks **di antara tanda kutip** saja.

### Data usaha (sudah diisi)

```js
nama: "Bolang Computer",
whatsapp: "6287835369249",          // format 62 + nomor tanpa 0 di depan
teleponTampil: "0878-3536-9249",
email: "",                          // kosong = baris email disembunyikan
alamat: "Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah 57137",
```

### Jam buka
Saat ini **Senin–Sabtu 09.00–17.00 WIB, Minggu libur**. Untuk hari libur, ubah barisnya menjadi `buka: null`. Contoh Minggu libur:

```js
{ hari: "Minggu", buka: null, tutup: null },
```

### Instagram & media sosial
Isi **link lengkap** akun Anda. Ikonnya akan muncul otomatis:

```js
instagram: "https://instagram.com/namaakunanda",
```

### Peta
Kalau toko sudah terdaftar di Google Maps:
1. Buka lokasi toko → **Bagikan → Salin link**, lalu tempel ke `mapsLink`.
2. **Bagikan → Sematkan peta** → salin isi `src="..."` saja, lalu tempel ke `mapsEmbed`.

### Konten lain

| Bagian | Fungsi |
|---|---|
| `pengumuman` | Teks promo di bar paling atas |
| `rating`, `statistik` | Rating & 4 angka di bawah hero ⚠️ contoh |
| `layanan`, `paket`, `daftarHarga` | Layanan, paket & tabel harga (`min: 0` = "Gratis") |
| `testimoni` | Ulasan pelanggan ⚠️ contoh |
| `faq` | Pertanyaan & jawaban |

Tips: jangan menghapus tanda koma `,`, kutip `"`, atau kurung `{ } [ ]`. Kalau website tampil kosong setelah diedit, biasanya ada salah satu tanda itu yang terhapus.

Teks yang ditulis langsung di `index.html`:
- judul hero;
- 5 langkah proses;
- 6 keunggulan;
- badge **"8+ tahun"** ⚠️ contoh;
- banner Rakit PC.

---

## Checklist

- [x] Nama usaha, WhatsApp, alamat, jam buka
- [x] Website online di GitHub Pages + gambar pratinjau link
- [x] SEO di website (judul, deskripsi, area Solo Raya, data bisnis, sitemap)
- [ ] Daftar Google Search Console + kirim sitemap.xml
- [ ] Buat/klaim Google Business Profile
- [x] Link Instagram diisi (@bolang_computer)
- [ ] **Testimoni diganti ulasan asli** (misalnya salin dari Google Maps)
- [ ] **Rating, statistik & "8+ tahun"** sesuai angka sebenarnya
- [ ] Harga, paket, garansi & promo sesuai tarif Bolang Computer
- [ ] Foto diganti foto asli toko/teknisi (disarankan)
- [ ] Coba isi form booking sampai pesan masuk ke WhatsApp 0878-3536-9249
- [ ] Cantumkan link website di Google Maps (Google Business Profile) & bio Instagram

---

## Catatan teknis

- Form booking **tidak menyimpan data di server**. Pesan disusun di browser pengunjung lalu dibuka di WhatsApp.
- Status buka/tutup dan tanggal booking selalu mengikuti **WIB**.
- Pratinjau link memakai alamat lengkap website di `index.html` (tag `og:`). Kalau alamat website berubah (misalnya pindah ke domain sendiri), ganti juga alamat tersebut.
- WhatsApp menyimpan pratinjau link lama. Jika gambar belum muncul, coba bagikan link dengan tambahan `?v=2` di belakangnya.
- `index-standalone.html` dan `build_standalone.py` di workspace hanya untuk pratinjau satu file, **tidak perlu** diunggah ke GitHub.

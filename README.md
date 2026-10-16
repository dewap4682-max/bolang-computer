# Website Bolang Computer — Servis Laptop & PC Gaming di Solo

🌐 **Alamat website:** https://dewap4682-max.github.io/bolang-computer/

Website satu halaman yang interaktif untuk **Bolang Computer**, Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta.
Dibuat dengan **HTML, CSS, dan JavaScript murni** (tanpa framework) dan di-hosting gratis di **GitHub Pages**.

> ⚠️ **Masih berupa CONTOH. Sebaiknya diganti:**
> - testimoni pelanggan, rating "4,9 dari 1.200+ ulasan", angka statistik (5.000+ perangkat, 8+ tahun);
> - harga layanan & paket, serta promo (diagnosa gratis, garansi 90 hari, antar-jemput gratis radius 5 km);
> - foto (masih ilustrasi);
> - link Instagram (masih kosong, jadi ikonnya disembunyikan).
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
Cocok untuk mengubah harga, jam buka, teks, dll.:
1. Buka repository dan klik file **`config.js`**.
2. Klik ikon **pensil ✏️ (Edit)**.
3. Ubah isinya, lalu klik **Commit changes**. Website ter-update otomatis dalam beberapa menit.

### Ganti foto
Upload foto baru dengan **nama file yang sama** (`hero.jpg`, `workshop.jpg`, `rakit-pc.jpg`) lewat **Add file → Upload files**, lalu klik Commit. Usahakan foto horizontal, lebar ±1200–1400 px, dan ukurannya di bawah 200 KB (kecilkan di squoosh.app atau tinyjpg.com).

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
Saat ini **setiap hari 09.00–17.00 WIB**. Untuk hari libur, ubah barisnya menjadi `buka: null`. Contoh Minggu libur:

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
- [ ] Link Instagram diisi
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

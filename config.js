/* ==========================================================================
   KONFIGURASI WEBSITE — UBAH DATA USAHA ANDA DI SINI
   --------------------------------------------------------------------------
   Nama usaha, kontak, jam buka, layanan, harga, testimoni & FAQ semuanya
   diambil dari file ini. Cukup edit teks di antara tanda kutip, simpan,
   lalu refresh browser. Tidak perlu menyentuh file lain.
   ========================================================================== */

window.SITE = {

  /* ------------------------------------------------------------------
     1. DATA USAHA
     ------------------------------------------------------------------ */
  bisnis: {
    nama: "Bolang Computer",                  // Nama usaha (tampil di logo & judul)
    subLogo: "Servis Laptop & PC Gaming",     // Teks kecil di bawah nama
    kota: "Solo",                             // Nama kota yang tampil di website
    kotaResmi: "Surakarta",                   // Nama kota resmi (dipakai untuk data Google)

    // Nomor WhatsApp format internasional: 62 + nomor TANPA angka 0 di depan
    // Contoh: 0878-3536-9249  ->  "6287835369249"
    whatsapp: "6287835369249",
    teleponTampil: "0878-3536-9249",          // Nomor yang ditampilkan di website
    email: "",                                // Kosongkan jika tidak ada — baris email otomatis disembunyikan
    alamat: "Jl. Bone Barat Utama No. 15B, Banyuanyar, Banjarsari, Surakarta, Jawa Tengah 57137",
    areaLayanan: "Kota Solo, Colomadu, Ngemplak, Kartasura, Gondangrejo & SoloRya",
    radiusGratisKm: 5,                        // Radius antar-jemput gratis (km)

    // Link Google Maps (buka Google Maps > Bagikan > Salin link)
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Jl.+Bone+Barat+Utama+No.+15B%2C+Banyuanyar%2C+Banjarsari%2C+Surakarta",
    // Link embed peta (Google Maps > Bagikan > Sematkan peta > ambil isi src="...")
    mapsEmbed: "https://www.google.com/maps?q=Jl.+Bone+Barat+Utama+No.+15B,+Banyuanyar,+Banjarsari,+Surakarta&output=embed",

    // Isi link lengkap akun Anda, mis. instagram: "https://instagram.com/bolang_computer"
    // Kosongkan ("") jika belum ada — ikonnya otomatis disembunyikan
    sosial: {
      instagram: "bolang_computer",
      tiktok: "",
      facebook: ""
    },

    // Jam buka WIB. Urutan WAJIB dimulai dari Minggu. Isi buka: null jika tutup/libur.
    // Contoh Minggu libur:  { hari: "Minggu", tutup: null, tutup: null }
    jamBuka: [
      { hari: "Minggu", tutup: "09:00", tutup: "17:00" },
      { hari: "Senin",  buka: "09:00", tutup: "17:00" },
      { hari: "Selasa", buka: "09:00", tutup: "17:00" },
      { hari: "Rabu",   buka: "09:00", tutup: "17:00" },
      { hari: "Kamis",  buka: "09:00", tutup: "17:00" },
      { hari: "Jumat",  buka: "09:00", tutup: "17:00" },
      { hari: "Sabtu",  buka: "09:00", tutup: "17:00" }
    ]
  },

  pengumuman: "Diagnosa GRATIS & garansi hingga 90 hari — antar-jemput gratis area Banjarsari & sekitarnya",

  // ⚠️ CONTOH — ganti dengan rating & jumlah ulasan asli (mis. dari Google Maps Anda)
  rating: { nilai: "4,9", jumlah: "1.200+", sumber: "Google" },

  /* ------------------------------------------------------------------
     2. ANGKA STATISTIK (bagian bawah hero)  ⚠️ CONTOH — sesuaikan dengan angka asli
     ------------------------------------------------------------------ */
  statistik: [
    { angka: 5000, akhiran: "+",     label: "Perangkat diservis" },
    { angka: 4.9,  desimal: 1, akhiran: "/5", label: "Rating pelanggan" },
    { angka: 90,   akhiran: " hari", label: "Garansi servis" },
    { angka: 8,    akhiran: "+ th",  label: "Pengalaman teknisi" }
  ],

  merek: [
    "ASUS ROG", "TUF Gaming", "MSI", "Lenovo Legion", "Acer Predator", "Acer Nitro",
    "HP Victus", "HP Omen", "Dell Alienware", "Axioo Pongo", "MacBook", "Gigabyte AORUS",
    "PlayStation", "Xbox", "Nintendo Switch", "Epson", "Canon"
  ],

  // Pilihan jenis perangkat di form booking
  perangkat: [
    "Laptop Gaming",
    "Laptop Kantor / Pelajar",
    "MacBook",
    "PC Gaming / Desktop",
    "Konsol Game (PS/Xbox/Switch)",
    "Printer",
    "Jaringan / CCTV",
    "Lainnya"
  ],

  /* ------------------------------------------------------------------
     3. KATEGORI LAYANAN
     warna: blue | violet | amber | teal | rose | green
     ------------------------------------------------------------------ */
  kategori: [
    { id: "laptop",   nama: "Laptop",                  warna: "blue" },
    { id: "pc",       nama: "PC Gaming",               warna: "violet" },
    { id: "upgrade",  nama: "Upgrade & Rakit",         warna: "amber" },
    { id: "software", nama: "Software & Data",         warna: "teal" },
    { id: "konsol",   nama: "Konsol & Printer",        warna: "rose" },
    { id: "jaringan", nama: "Jaringan & Home Service", warna: "green" }
  ],

  /* ------------------------------------------------------------------
     4. DAFTAR LAYANAN (kartu di bagian "Layanan")
     ikon: laptop | thermometer | monitor | keyboard | pc | gpu | wind | cpu |
           memory | refresh | database | gauge | gamepad | printer | wifi | truck
     harga: angka "mulai dari" (tanpa titik). Gunakan hargaLabel untuk teks bebas.
     terkait: kata kunci untuk menampilkan rincian harga di jendela detail.
     ------------------------------------------------------------------ */
  layanan: [harga: 150000
    {
      id: "servis-laptop", kategori: "laptop", ikon: "laptop", populer: true,
      nama: "Servis Laptop Gaming & Harian",
      ringkas: "Mati total, sering restart, no display, sampai kerusakan motherboard.",
      detail: "Pemeriksaan menyeluruh untuk laptop gaming maupun laptop kerja/kuliah. Kami cari sumber masalahnya sampai level komponen, lalu kirim estimasi biaya sebelum dikerjakan.",
      poin: ["Diagnosa gratis sebelum dikerjakan", "Perbaikan sampai level komponen", "Update progres via WhatsApp"],
      harga: 150000, durasi: "1–5 hari", garansi: "30 hari", perangkat: "Laptop Gaming",
      terkait: ["pengecekan kerusakan", "mati total", "port charger", "engsel"]
    },
    {
      id: "cleaning-laptop", kategori: "laptop", ikon: "thermometer", populer: true,
      nama: "Cleaning & Ganti Thermal Paste",
      ringkas: "Laptop panas, kipas berisik, FPS drop? Bersihkan & repaste agar adem lagi.",
      detail: "Pembersihan kipas & heatsink dari debu, penggantian thermal paste (tersedia paste premium & PTM7950), lalu uji suhu sebelum dan sesudah agar hasilnya terukur.",
      poin: ["Bersihkan kipas & heatsink", "Paste premium / PTM7950", "Uji suhu sebelum & sesudah"],
      harga: 100000, durasi: "1–3 jam", garansi: "14–90 hari", perangkat: "Laptop Gaming",
      terkait: ["thermal paste", "PTM7950"]
    },
    {
      id: "lcd-laptop", kategori: "laptop", ikon: "monitor",
      nama: "Ganti LCD & Layar Laptop",
      ringkas: "Layar bergaris, pecah, blank, atau upgrade ke panel 144Hz/165Hz.",
      detail: "Penggantian panel LCD dengan part original/OEM berkualitas. Bisa sekalian upgrade refresh rate bila laptop Anda kompatibel.",
      poin: ["Panel original / OEM berkualitas", "Upgrade 144Hz/165Hz (jika kompatibel)", "Dites dead pixel sebelum diserahkan"],
      harga: 150000, catatanHarga: "jasa, belum termasuk panel", durasi: "1–2 jam*", garansi: "30 hari", perangkat: "Laptop Gaming",
      terkait: ["LCD"]
    },
    {
      id: "keyboard-baterai", kategori: "laptop", ikon: "keyboard",
      nama: "Keyboard, Baterai & Engsel",
      ringkas: "Tombol mati, baterai drop/kembung, engsel patah, hingga port charger longgar.",
      detail: "Penggantian keyboard, baterai, perbaikan engsel & dudukan casing, serta penggantian port charger/USB-C dengan sparepart bergaransi.",
      poin: ["Sparepart original & bergaransi", "Perbaikan engsel & dudukan casing", "Kalibrasi baterai setelah penggantian"],
      harga: 150000, durasi: "1–3 hari", garansi: "30 hari", perangkat: "Laptop Kantor / Pelajar",
      terkait: ["keyboard", "baterai", "engsel", "port charger"]
    },
    {
      id: "servis-pc", kategori: "pc", ikon: "pc", populer: true,
      nama: "Servis PC Gaming & Desktop",
      ringkas: "PC tidak mau menyala, bunyi beep, sering BSOD, restart sendiri, atau no display.",
      detail: "Pengecekan PSU, RAM, motherboard, storage hingga VGA untuk menemukan penyebab masalah, ditutup dengan stress test agar PC benar-benar stabil.",
      poin: ["Cek PSU, RAM, motherboard & VGA", "Stress test stabilitas", "Bisa antar-jemput unit PC"],
      harga: 100000, durasi: "1–2 hari", garansi: "30 hari", perangkat: "PC Gaming / Desktop",
      terkait: ["pengecekan PC", "PC mati"]
    },
    {
      id: "servis-vga", kategori: "pc", ikon: "gpu",
      nama: "Servis VGA / Kartu Grafis",
      ringkas: "Artefak, layar bergaris, no display, atau VGA overheat saat main game.",
      detail: "Perbaikan VGA artefak/no display, repaste GPU, dan penggantian thermal pad VRAM agar suhu kembali normal dan performa stabil.",
      poin: ["Repaste GPU & ganti thermal pad", "Perbaikan artefak & no display", "Benchmark setelah servis"],
      harga: 250000, durasi: "1–7 hari", garansi: "30 hari", perangkat: "PC Gaming / Desktop",
      terkait: ["GPU", "VGA artefak"]
    },
    {
      id: "cleaning-pc", kategori: "pc", ikon: "wind",
      nama: "Cleaning & Cable Management",
      ringkas: "PC berdebu & panas? Dibersihkan menyeluruh, kabel dirapikan, airflow maksimal.",
      detail: "Pembersihan casing, fan, filter & radiator, repaste CPU, plus merapikan kabel dan mengatur kurva kipas serta RGB.",
      poin: ["Cleaning casing, fan & radiator", "Repaste CPU (opsional GPU)", "Setting kurva kipas & RGB"],
      harga: 100000, durasi: "2–4 jam", garansi: "14 hari", perangkat: "PC Gaming / Desktop",
      terkait: ["repaste CPU", "Cable management", "AIO"]
    },
    {
      id: "rakit-pc", kategori: "upgrade", ikon: "cpu", populer: true,
      nama: "Rakit PC Gaming Custom",
      ringkas: "Konsultasi sesuai budget & kebutuhan: gaming, streaming, editing, atau kerja.",
      detail: "Kami bantu memilih part paling worth it sesuai budget, merakit dengan cable management rapi, install Windows & driver, lalu stress test sebelum diserahkan.",
      poin: ["Rekomendasi part paling worth it", "Cable management rapi", "Install OS, driver & stress test"],
      harga: 200000, catatanHarga: "gratis jika beli part di kami", durasi: "1 hari", garansi: "Garansi resmi part", perangkat: "PC Gaming / Desktop",
      terkait: ["rakit"]
    },
    {
      id: "upgrade", kategori: "upgrade", ikon: "memory",
      nama: "Upgrade SSD, RAM & VGA",
      ringkas: "Bikin laptop/PC lebih ngebut tanpa beli baru. Data dipindah tanpa install ulang.",
      detail: "Kami cek kompatibilitas terlebih dahulu, pasang part baru, dan pindahkan (kloning) data lama Anda ke SSD baru tanpa perlu install ulang.",
      poin: ["Cek kompatibilitas sebelum beli", "Kloning data ke SSD baru", "Tersedia part bergaransi resmi"],
      harga: 50000, catatanHarga: "jasa, belum termasuk part", durasi: "30 menit–2 jam", garansi: "Sesuai garansi part",
      terkait: ["Upgrade SSD", "Upgrade RAM", "VGA, PSU"]
    },
    {
      id: "install-ulang", kategori: "software", ikon: "refresh",
      nama: "Install Ulang & Software",
      ringkas: "Windows lemot, error, kena virus? Install ulang bersih lengkap driver & aplikasi.",
      detail: "Install ulang Windows 11/10 yang bersih, lengkap dengan driver dan aplikasi kebutuhan Anda. Data penting di-backup terlebih dahulu.",
      poin: ["Windows 11 / 10 + driver lengkap", "Aplikasi kantor, desain & game", "Backup data sebelum install"],
      harga: 100000, durasi: "2–3 jam", garansi: "14 hari",
      terkait: ["Install ulang", "Backup data", "Install software"]
    },
    {
      id: "recovery-data", kategori: "software", ikon: "database",
      nama: "Recovery Data",
      ringkas: "File terhapus, terformat, atau storage rusak? Kami bantu selamatkan data penting.",
      detail: "Pemulihan data dari HDD, SSD, flashdisk & memory card. Pengecekan peluang data kembali gratis, dan Anda hanya membayar jika data berhasil diselamatkan.",
      poin: ["HDD, SSD, flashdisk & memory card", "Cek peluang data kembali gratis", "Kerahasiaan data terjamin"],
      harga: 250000, durasi: "1–10 hari", garansi: "Bayar jika berhasil",
      terkait: ["Recovery data"]
    },
    {
      id: "optimasi", kategori: "software", ikon: "gauge",
      nama: "Optimasi & Tuning Performa",
      ringkas: "Undervolt, update BIOS, setting game & Windows agar FPS stabil dan suhu terkendali.",
      detail: "Tuning yang aman untuk laptop & PC gaming: undervolt, update BIOS, aktivasi XMP/EXPO, hapus bloatware & malware, serta optimasi pengaturan game favorit Anda.",
      poin: ["Undervolt aman untuk laptop gaming", "Setting BIOS & XMP/EXPO", "Optimasi FPS game favorit"],
      harga: 75000, durasi: "1–3 jam", garansi: "14 hari", perangkat: "Laptop Gaming",
      terkait: ["undervolt", "virus"]
    },
    {
      id: "konsol", kategori: "konsol", ikon: "gamepad",
      nama: "Servis Konsol Game",
      ringkas: "PS4/PS5, Xbox & Switch: overheat, berisik, port HDMI rusak, atau stik drift.",
      detail: "Cleaning & repaste konsol, penggantian port HDMI, perbaikan masalah power, hingga perbaikan stik drift pada DualShock, DualSense, maupun Joy-Con.",
      poin: ["Cleaning & repaste / liquid metal", "Ganti port HDMI & perbaikan power", "Perbaikan stik drift"],
      harga: 100000, durasi: "1–3 hari", garansi: "30 hari", perangkat: "Konsol Game (PS/Xbox/Switch)",
      terkait: ["PS4", "stik"]
    },
    {
      id: "printer", kategori: "konsol", ikon: "printer",
      nama: "Servis Printer",
      ringkas: "Hasil cetak bergaris, kertas macet, lampu berkedip, atau perlu reset.",
      detail: "Servis printer Epson, Canon, HP & Brother: reset counter, head cleaning, penggantian part, serta pemasangan & perbaikan sistem infus.",
      poin: ["Epson, Canon, HP & Brother", "Reset, head cleaning & ganti part", "Pasang & perbaiki sistem infus"],
      harga: 75000, durasi: "1–2 hari", garansi: "14 hari", perangkat: "Printer",
      terkait: ["printer"]
    },
    {
      id: "jaringan-cctv", kategori: "jaringan", ikon: "wifi",
      nama: "Instalasi Jaringan & CCTV",
      ringkas: "Setting WiFi & mesh, instalasi LAN, serta pasang CCTV rumah, toko & kantor.",
      detail: "Perencanaan dan instalasi jaringan WiFi/LAN yang stabil, serta pemasangan CCTV online yang bisa dipantau dari HP. Survei lokasi gratis untuk area terdekat.",
      poin: ["Survei lokasi gratis (area terdekat)", "CCTV online, pantau dari HP", "Kabel rapi & bergaransi"],
      harga: 150000, durasi: "Sesuai survei", garansi: "30 hari", perangkat: "Jaringan / CCTV",
      terkait: ["router", "LAN", "CCTV"]
    },
    {
      id: "home-service", kategori: "jaringan", ikon: "truck",
      nama: "Home Service & Antar-Jemput",
      ringkas: "Tidak sempat ke toko? Teknisi datang ke lokasi atau unit kami jemput & antar kembali.",
      detail: "Layanan antar-jemput gratis dalam radius 5 km dari toko, atau teknisi datang langsung ke rumah/kantor untuk pengecekan & perbaikan di tempat.",
      poin: ["Gratis antar-jemput radius 5 km", "Teknisi datang ke rumah/kantor", "Cocok untuk servis rutin kantor"],
      hargaLabel: "Gratis*", catatanHarga: "radius 5 km dari toko", durasi: "Sesuai jadwal", garansi: "—",
      terkait: ["Antar-jemput", "Home service"]
    }
  ],

  /* ------------------------------------------------------------------
     5. PAKET PERAWATAN (kartu harga) — harga untuk laptop & PC
     ------------------------------------------------------------------ */
  paket: [
    {
      id: "basic", nama: "Basic Care", garansi: "14 hari",
      deskripsi: "Perawatan rutin agar perangkat tetap adem & awet.",
      harga: { laptop: 150000, pc: 100000 },
      fitur: {
        laptop: ["Cleaning kipas & heatsink", "Ganti thermal paste standar", "Cek kesehatan baterai & SSD", "Cek suhu & kipas"],
        pc: ["Cleaning casing, fan & filter debu", "Repaste CPU (paste standar)", "Cek kesehatan PSU & storage", "Cek suhu & kipas"]
      }
    },
    {
      id: "gamer", nama: "Gamer Care", garansi: "30 hari", populer: true,
      deskripsi: "Favorit gamer — suhu turun drastis, FPS lebih stabil.",
      harga: { laptop: 250000, pc: 300000 },
      fitur: {
        laptop: ["Semua di Basic Care", "Thermal paste premium high-performance", "Ganti thermal pad VRAM/VRM", "Update BIOS & driver terbaru", "Undervolt & setting mode performa", "Stress test 30 menit"],
        pc: ["Semua di Basic Care", "Repaste CPU & GPU (paste premium)", "Ganti thermal pad VGA", "Cable management & setting RGB", "Update BIOS, driver & XMP/EXPO", "Stress test 30 menit"]
      }
    },
    {
      id: "pro", nama: "Pro Care", garansi: "90 hari",
      deskripsi: "Perawatan total untuk performa maksimal jangka panjang.",
      harga: { laptop: 450000, pc: 500000 },
      fitur: {
        laptop: ["Semua di Gamer Care", "PTM7950 phase-change (awet bertahun-tahun)", "Optimasi Windows khusus gaming", "Laporan suhu & benchmark sebelum–sesudah", "Antar-jemput gratis area Kota Solo"],
        pc: ["Semua di Gamer Care", "Deep cleaning radiator/AIO & semua fan", "Kurva kipas custom & tuning BIOS", "Laporan suhu & benchmark sebelum–sesudah", "Antar-jemput gratis area Kota Solo"]
      }
    }
  ],

  /* ------------------------------------------------------------------
     6. DAFTAR HARGA LENGKAP (tabel)
     min: harga terendah (0 = Gratis) | max: harga tertinggi (opsional)
     mulai: true -> tampil "mulai Rp..." | satuan: mis. "/titik"
     ------------------------------------------------------------------ */
  daftarHarga: {{ item: "Ganti keyboard", min: 250000, durasi: "1 hari" },
    laptop: [
      { item: "Diagnosa & pengecekan kerusakan", min: 0, durasi: "15–60 menit" },
      { item: "Cleaning + thermal paste (laptop standar)", min: 100000, durasi: "1–2 jam" },
      { item: "Cleaning + thermal paste (laptop gaming)", min: 150000, durasi: "2–3 jam" },
      { item: "Upgrade PTM7950 / liquid metal", min: 300000, max: 450000, durasi: "1 hari" },
      { item: "Ganti LCD / layar laptop (jasa pasang)", min: 150000, catatan: "Belum termasuk panel", durasi: "1–2 jam*" },
      { item: "Ganti keyboard laptop", min: 250000, max: 650000, catatan: "Termasuk sparepart", durasi: "1–3 hari" },
      { item: "Ganti baterai laptop", min: 350000, max: 950000, catatan: "Termasuk sparepart", durasi: "1–3 hari" },
      { item: "Perbaikan engsel / casing", min: 150000, max: 450000, durasi: "1–2 hari" },
      { item: "Ganti port charger / DC jack / USB-C", min: 150000, max: 350000, durasi: "1–2 hari" },
      { item: "Perbaikan mati total / motherboard", min: 350000, mulai: true, durasi: "2–5 hari" }
    ],
    pc: [
      { item: "Diagnosa & pengecekan PC", min: 0, durasi: "30–60 menit" },
      { item: "Cleaning + repaste CPU", min: 100000, durasi: "1–2 jam" },
      { item: "Repaste GPU + ganti thermal pad", min: 250000, max: 400000, durasi: "1 hari" },
      { item: "Perbaikan PC mati / restart / BSOD", min: 100000, mulai: true, durasi: "1–2 hari" },
      { item: "Servis VGA artefak / no display", min: 400000, mulai: true, durasi: "3–7 hari" },
      { item: "Cable management & setting RGB", min: 100000, max: 200000, durasi: "2–4 jam" },
      { item: "Pasang / ganti AIO & water cooling", min: 150000, max: 250000, durasi: "2–4 jam" }
    ],
    upgrade: [
      { item: "Konsultasi spesifikasi rakit PC", min: 0, durasi: "—" },
      { item: "Jasa rakit PC + install OS + stress test", min: 200000, catatan: "Gratis jika beli part di toko kami", durasi: "1 hari" },
      { item: "Upgrade SSD + kloning data", min: 75000, catatan: "Belum termasuk SSD", durasi: "1–2 jam" },
      { item: "Upgrade RAM", min: 50000, catatan: "Belum termasuk RAM", durasi: "30 menit" },
      { item: "Pasang / ganti VGA, PSU, atau prosesor", min: 75000, max: 150000, durasi: "1–3 jam" }
    ],
    software: [
      { item: "Install ulang Windows + driver + aplikasi standar", min: 100000, durasi: "2–3 jam" },
      { item: "Backup data sebelum install ulang", min: 50000, durasi: "30–60 menit" },
      { item: "Install software / game / aplikasi desain", min: 50000, mulai: true, durasi: "1–2 jam" },
      { item: "Hapus virus & malware + optimasi", min: 75000, durasi: "1–2 jam" },
      { item: "Optimasi & undervolt laptop gaming", min: 100000, max: 150000, durasi: "2–3 jam" },
      { item: "Recovery data (terhapus / terformat)", min: 250000, max: 600000, catatan: "Bayar jika berhasil", durasi: "1–3 hari" },
      { item: "Recovery data (storage rusak fisik)", min: 800000, mulai: true, catatan: "Bayar jika berhasil", durasi: "3–10 hari" }
    ],
    konsol: [
      { item: "Cleaning + repaste PS4 / PS5", min: 150000, max: 250000, durasi: "1 hari" },
      { item: "Ganti port HDMI PS4 / PS5", min: 300000, max: 500000, durasi: "1–2 hari" },
      { item: "Perbaikan stik drift (DualSense / Joy-Con)", min: 100000, max: 175000, durasi: "1 hari" },
      { item: "Servis printer (reset & head cleaning)", min: 75000, max: 150000, durasi: "1 hari" },
      { item: "Pasang / perbaikan sistem infus printer", min: 100000, max: 250000, durasi: "1 hari" }
    ],
    jaringan: [
      { item: "Setting router, WiFi & mesh", min: 150000, durasi: "1–2 jam" },
      { item: "Instalasi jaringan LAN", min: 75000, satuan: "/titik", durasi: "Sesuai survei" },
      { item: "Paket CCTV 2 kamera (alat + pasang)", min: 1750000, mulai: true, durasi: "1 hari" },
      { item: "Paket CCTV 4 kamera (alat + pasang)", min: 3250000, mulai: true, durasi: "1 hari" },
      { item: "Antar-jemput (radius ≤ 5 km)", min: 0, durasi: "Sesuai jadwal" },
      { item: "Antar-jemput (di atas 5 km)", min: 25000, max: 50000, durasi: "Sesuai jadwal" },
      { item: "Home service / kunjungan teknisi", min: 75000, catatan: "Belum termasuk biaya perbaikan", durasi: "Sesuai jadwal" }
    ]
  },

  /* ------------------------------------------------------------------
     7. TESTIMONI (rating 1–5)  ⚠️ CONTOH — ganti dengan ulasan asli pelanggan Anda
     ------------------------------------------------------------------ */
  testimoni: [
    { nama: "Rizky Pratama", lokasi: "Banjarsari", perangkat: "ASUS ROG Strix G15", layanan: "Cleaning + PTM7950", rating: 5,
      teks: "Laptop sering mati sendiri pas main Valorant. Setelah cleaning & ganti PTM7950 suhunya turun dari 95°C ke 70-an. Dikirimi foto sebelum-sesudah juga. Mantap!" },
    { nama: "Dewi Lestari", lokasi: "Laweyan", perangkat: "Lenovo IdeaPad Slim 3", layanan: "Recovery Data", rating: 5,
      teks: "Data skripsi hilang karena SSD error, alhamdulillah berhasil diselamatkan semua. Pelayanannya ramah dan biayanya dijelaskan detail di awal." },
    { nama: "Bagas Setiawan", lokasi: "Colomadu", perangkat: "PC Ryzen 7 + RTX", layanan: "Rakit PC Gaming", rating: 5,
      teks: "Rakit PC budget 15 juta, dikasih rekomendasi part yang pas banget. Cable management rapi, langsung dites game berat. Recommended!" },
    { nama: "Andi Nugroho", lokasi: "Jebres", perangkat: "PlayStation 5", layanan: "Servis Konsol", rating: 5,
      teks: "PS5 berisik dan panas, setelah cleaning & repaste jadi adem dan senyap. Prosesnya cuma sehari, harga sesuai estimasi." },
    { nama: "Siti Rahmawati", lokasi: "Ngemplak", perangkat: "Epson L3210", layanan: "Servis Printer", rating: 4,
      teks: "Printer kantor hasil cetaknya bergaris, sekarang normal lagi. Bisa dijemput juga jadi praktis, tidak perlu bawa ke toko." },
    { nama: "Fajar Hidayat", lokasi: "Kartasura", perangkat: "MSI Katana 15", layanan: "Ganti Keyboard", rating: 5,
      teks: "Beberapa tombol keyboard mati, diganti original dan bergaransi. Tidak ada biaya tersembunyi, persis seperti yang dijelaskan di awal." },
    { nama: "Yoga Saputra", lokasi: "Gondangrejo", perangkat: "CCTV 4 kamera", layanan: "Instalasi CCTV", rating: 5,
      teks: "Pasang 4 CCTV di toko, kabelnya rapi dan bisa dipantau dari HP. Teknisi datang tepat waktu dan sabar menjelaskan." }
  ],

  /* ------------------------------------------------------------------
     8. FAQ
     ------------------------------------------------------------------ */
  faq: [
    { q: "Apakah diagnosa / pengecekan benar-benar gratis?",
      a: "Ya. Pengecekan kerusakan gratis tanpa syarat. Setelah diagnosa, kami kirim estimasi biaya & waktu pengerjaan via WhatsApp. Unit baru dikerjakan setelah Anda setuju — jika batal, tidak ada biaya apa pun." },
    { q: "Berapa lama proses servis?",
      a: "Servis ringan seperti cleaning, repaste, install ulang, atau upgrade SSD/RAM umumnya selesai 1–3 jam dan bisa ditunggu. Perbaikan hardware/motherboard butuh 1–5 hari tergantung ketersediaan sparepart. Estimasi waktu selalu kami informasikan di awal." },
    { q: "Garansinya berapa lama?",
      a: "Garansi servis 14–90 hari tergantung jenis layanan dan paket. Sparepart mengikuti garansi masing-masing (umumnya 1 bulan hingga 1 tahun). Untuk klaim, cukup tunjukkan nota atau kode booking." },
    { q: "Apakah data di laptop saya aman?",
      a: "Aman. Kami tidak membuka file pribadi tanpa izin. Untuk install ulang atau perbaikan storage, kami tawarkan backup data terlebih dahulu agar file penting Anda tetap terlindungi." },
    { q: "Apakah bisa antar-jemput atau home service?",
      a: "Bisa. Antar-jemput GRATIS untuk radius 5 km dari toko dan Rp25.000–50.000 untuk area Solo Raya lainnya. Teknisi juga bisa datang ke rumah/kantor untuk instalasi jaringan, CCTV, printer, atau pengecekan di tempat." },
    { q: "Apakah sparepart yang dipakai original?",
      a: "Kami menyediakan sparepart original dan OEM berkualitas. Pilihan part beserta harganya akan kami jelaskan, sehingga Anda bisa menentukan sesuai budget." },
    { q: "Metode pembayaran apa saja yang tersedia?",
      a: "Tunai, transfer bank, dan QRIS (bisa dari semua e-wallet & m-banking). Pembayaran dilakukan setelah servis selesai dan unit sudah Anda cek." },
    { q: "Bisa rakit PC gaming sesuai budget?",
      a: "Tentu. Ceritakan budget dan kebutuhan Anda (game, streaming, editing, kerja), kami buatkan rekomendasi part paling worth it. Jasa rakit gratis bila membeli part di toko kami." },
    { q: "Selain laptop & PC, apa lagi yang bisa diservis?",
      a: "Kami juga melayani servis konsol (PS4/PS5, Xbox, Nintendo Switch), printer (Epson, Canon, HP, Brother), instalasi jaringan WiFi/LAN, serta pemasangan & perawatan CCTV untuk rumah, toko, dan kantor." },
    { q: "Bagaimana jika biaya perbaikan terlalu mahal?",
      a: "Kami akan memberikan beberapa opsi, misalnya part alternatif atau perbaikan level komponen yang lebih hemat. Jika tetap tidak cocok, unit bisa diambil kembali tanpa biaya." }
  ]
};

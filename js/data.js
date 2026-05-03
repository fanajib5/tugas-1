const users = [
  { email: "admin@ut.ac.id", password: "admin123", nama: "Admin UT" },
  { email: "mahasiswa@ut.ac.id", password: "mahasiswa123", nama: "Mahasiswa UT" },
  { email: "faiq@ut.ac.id", password: "faiq123", nama: "Faiq Najib" },
];

const dataBahanAjar = [
  { kodeLokasi: "OTMP01", kodeBarang: "ASIP4301", namaBarang: "Pengantar Ilmu Komunikasi", jenisBarang: "BMP", edisi: 2, stok: 548 },
  { kodeLokasi: "OTMP01", kodeBarang: "SKOM4301", namaBarang: "Teori Komunikasi", jenisBarang: "BMP", edisi: 3, stok: 320 },
  { kodeLokasi: "OTMP02", kodeBarang: "MKDU4109", namaBarang: "Ilmu Sosial dan Budaya Dasar", jenisBarang: "BMP", edisi: 4, stok: 215 },
  { kodeLokasi: "OTMP02", kodeBarang: "MKDU4111", namaBarang: "Pendidikan Kewarganegaraan", jenisBarang: "BMP", edisi: 2, stok: 180 },
  { kodeLokasi: "OTMP03", kodeBarang: "EKMA4111", namaBarang: "Pengantar Bisnis", jenisBarang: "BMP", edisi: 3, stok: 95 },
  { kodeLokasi: "OTMP03", kodeBarang: "EKMA4115", namaBarang: "Pengantar Akuntansi", jenisBarang: "BMP", edisi: 2, stok: 150 },
  { kodeLokasi: "OTMP04", kodeBarang: "STAT4315", namaBarang: "Statistika Ekonomi", jenisBarang: "BMP", edisi: 1, stok: 75 },
  { kodeLokasi: "OTMP04", kodeBarang: "ESPA4111", namaBarang: "Pengantar Ekonomi Mikro", jenisBarang: "BMP", edisi: 5, stok: 200 },
  { kodeLokasi: "OTMP05", kodeBarang: "SOSI4301", namaBarang: "Sosiologi Pendidikan", jenisBarang: "BMP", edisi: 2, stok: 110 },
  { kodeLokasi: "OTMP05", kodeBarang: "PUST4301", namaBarang: "Pengantar Ilmu Perpustakaan", jenisBarang: "BMP", edisi: 3, stok: 430 },
];

const dataTracking = [
  {
    noDO: "DO-001",
    nama: "ROIKA HEPRIDA SITIO",
    nik: "18503964874",
    asal: "TANJUNGPANDAN",
    tujuan: "PEMATANGSIANTAR",
    status: "Sampai",
    tglKirim: "2021-03-31",
    ekspedisi: "JNE",
    jenisPaket: "Paket Lengkap",
    totalBayar: 450000,
    timeline: [
      { lokasi: "Sampai di Hub SPP MEDAN", waktu: "2021-03-31 14:30" },
      { lokasi: "Dalam perjalanan menuju Medan", waktu: "2021-03-31 08:00" },
      { lokasi: "Diterima di Hub Palembang", waktu: "2021-03-30 22:15" },
      { lokasi: "Dikirim dari TANJUNGPANDAN", waktu: "2021-03-30 14:00" },
    ]
  },
  {
    noDO: "DO-002",
    nama: "BUDI SANTOSO",
    nik: "18503964875",
    asal: "JAKARTA",
    tujuan: "BANDUNG",
    status: "Dikirim",
    tglKirim: "2026-04-20",
    ekspedisi: "SiCepat",
    jenisPaket: "Buku Modul",
    totalBayar: 250000,
    timeline: [
      { lokasi: "Dalam perjalanan menuju Bandung", waktu: "2026-04-21 10:00" },
      { lokasi: "Diterima di Hub Jakarta", waktu: "2026-04-20 20:30" },
      { lokasi: "Dikirim dari Jakarta", waktu: "2026-04-20 14:00" },
    ]
  },
  {
    noDO: "DO-003",
    nama: "SITI RAHAYU",
    nik: "18503964876",
    asal: "SURABAYA",
    tujuan: "MALANG",
    status: "Diproses",
    tglKirim: "2026-04-22",
    ekspedisi: "J&T",
    jenisPaket: "Modul + Kartu",
    totalBayar: 180000,
    timeline: [
      { lokasi: "Pengepakan di gudang Surabaya", waktu: "2026-04-22 15:00" },
      { lokasi: "Diterima di Pusat Distribusi Surabaya", waktu: "2026-04-22 09:00" },
    ]
  },
  {
    noDO: "DO-004",
    nama: "AHMAD FAUZI",
    nik: "18503964877",
    asal: "PADANG",
    tujuan: "BUKITTINGGI",
    status: "Sampai",
    tglKirim: "2026-04-18",
    ekspedisi: "Pos Indonesia",
    jenisPaket: "Buku Modul",
    totalBayar: 300000,
    timeline: [
      { lokasi: "Sampai di tujuan Bukittinggi", waktu: "2026-04-18 16:00" },
      { lokasi: "Dalam perjalanan menuju Bukittinggi", waktu: "2026-04-18 08:00" },
      { lokasi: "Diterima di Hub Padang", waktu: "2026-04-17 20:00" },
      { lokasi: "Dikirim dari PADANG", waktu: "2026-04-17 14:00" },
    ]
  },
  {
    noDO: "DO-005",
    nama: "DEWI LESTARI",
    nik: "18503964878",
    asal: "MAKASSAR",
    tujuan: "PALOPO",
    status: "Dikirim",
    tglKirim: "2026-04-21",
    ekspedisi: "JNE",
    jenisPaket: "Paket Lengkap",
    totalBayar: 500000,
    timeline: [
      { lokasi: "Dalam perjalanan menuju Palopo", waktu: "2026-04-22 14:00" },
      { lokasi: "Diterima di Hub Makassar", waktu: "2026-04-21 22:00" },
      { lokasi: "Dikirim dari MAKASSAR", waktu: "2026-04-21 15:00" },
    ]
  },
  {
    noDO: "DO-006",
    nama: "RUDI HERMAWAN",
    nik: "18503964879",
    asal: "YOGYAKARTA",
    tujuan: "SOLO",
    status: "Diproses",
    tglKirim: "2026-04-25",
    ekspedisi: "SiCepat",
    jenisPaket: "Modul + Kartu",
    totalBayar: 210000,
    timeline: [
      { lokasi: "Pengepakan di gudang Yogyakarta", waktu: "2026-04-25 11:00" },
    ]
  },
  {
    noDO: "DO-007",
    nama: "NINA KURNIAWATI",
    nik: "18503964880",
    asal: "BANJARMASIN",
    tujuan: "PALANGKARAYA",
    status: "Sampai",
    tglKirim: "2026-04-15",
    ekspedisi: "J&T",
    jenisPaket: "Buku Modul",
    totalBayar: 275000,
    timeline: [
      { lokasi: "Sampai di tujuan Palangkaraya", waktu: "2026-04-16 10:00" },
      { lokasi: "Dalam perjalanan menuju Palangkaraya", waktu: "2026-04-15 22:00" },
      { lokasi: "Diterima di Hub Banjarmasin", waktu: "2026-04-15 14:00" },
      { lokasi: "Dikirim dari BANJARMASIN", waktu: "2026-04-15 08:00" },
    ]
  },
];

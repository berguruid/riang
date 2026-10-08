# RIANG Rebuild

Rekonstruksi aplikasi RIANG berdasarkan versi `riang-v4` dan kode sumber yang diberikan.

## Struktur

- `index.html` — entry point GitHub Pages.
- `app.jsx` — UI + state + logic aplikasi.
- `styles.css` — animasi dan style tambahan.
- `config.js` — endpoint Apps Script, password admin, URL sosial, dan asset eksternal.

## Fitur yang direkonstruksi

- Beranda RIANG dengan CTA.
- Slider Materi Baru Diunggah.
- Slider Program Belajar Unggulan.
- Pencarian konten real-time.
- Program Belajar berdasarkan mata pelajaran.
- Filter kelas, jenis media, pencarian, dan pagination.
- Like dengan identitas pengguna.
- Report/laporan media.
- Peringkat kontributor dengan podium.
- Testimoni dan tambah ulasan publik.
- Admin panel: CRUD media, kontributor, testimoni, dan daftar laporan.
- Fullscreen mode.
- Responsive desktop/mobile navigation.
- Fallback data ketika Apps Script tidak dapat diakses.

## Backend contract

Aplikasi mengharapkan GET pada `API_URL` menghasilkan objek JSON:

```json
{
  "media": [],
  "contributors": [],
  "testimonials": [],
  "reports": []
}
```

POST dikirim sebagai JSON berikut:

```json
{
  "action": "ADD_MEDIA",
  "data": {}
}
```

Action yang dipakai:

- `ADD_MEDIA`
- `EDIT_MEDIA`
- `DELETE_MEDIA`
- `ADD_CONTRIB`
- `EDIT_CONTRIB`
- `DELETE_CONTRIB`
- `ADD_TESTI`
- `EDIT_TESTI`
- `DELETE_TESTI`
- `TOGGLE_LIKE`
- `REPORT_MEDIA`

## Menjalankan

Cara paling sederhana adalah membuka folder melalui server statis. Karena browser tertentu membatasi `fetch()` dari `file://`, gunakan salah satu:

```bash
python -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## Deploy ke GitHub Pages

Upload semua file dalam folder ini ke repository GitHub, lalu aktifkan GitHub Pages pada branch yang diinginkan. Tidak diperlukan npm atau proses build.

## Catatan keamanan

Password admin di versi asli berada di sisi frontend. Pada rebuild ini nilainya dipindah ke `config.js`, tetapi **tetap bukan autentikasi yang aman untuk produksi** karena file frontend dapat dibaca publik. Untuk produksi, autentikasi admin sebaiknya divalidasi di backend/Apps Script.

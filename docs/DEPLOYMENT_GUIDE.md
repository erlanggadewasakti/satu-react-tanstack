# Panduan Deployment Production (Docker & Nginx)

Dokumen ini menjelaskan tata cara deployment aplikasi **SATU / LENS** ke server production Linux menggunakan Docker dan Nginx Reverse Proxy, terutama ketika aplikasi dijalankan di bawah sub-path seperti `/lens`.

---

## 1. Penting: Build-Time vs Runtime Environment Variables

Variabel Vite yang berawalan `VITE_*` (seperti `VITE_APP_BASE_NAME`, `VITE_APP_VERSION`, dan `VITE_APP_API_URL`) dikompilasi ke dalam kode static JavaScript/HTML saat **proses build (`bun run build`)**.

> [!WARNING]
> Menetapkan `VITE_APP_BASE_NAME=/lens` pada runtime (misalnya lewat `docker run -e VITE_APP_BASE_NAME=/lens` atau blok `environment:` pada `docker-compose.yml`) **TIDAK AKAN BERPENGARUH** pada bundler Vite yang sudah selesai dikompilasi.
> Anda **wajib** mengirimkan variabel ini sebagai **build argument** (`--build-arg`) saat proses build image.

---

## 2. Membangun Docker Image

### Menggunakan Docker CLI
Untuk membangun image dengan subpath `/lens`:

```bash
docker build \
  --build-arg VITE_APP_BASE_NAME=/lens \
  --build-arg VITE_APP_API_URL=https://stg-service-satu.telkomuniversity.ac.id/system-information-academic-obe/ \
  -t satu-lens:latest .
```

### Menggunakan Docker Compose
Jika menggunakan `docker-compose.yml`, letakkan konfigurasi pada blok `build.args`:

```yaml
version: '3.8'

services:
  satu-lens:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_APP_BASE_NAME: /lens
        VITE_APP_API_URL: https://stg-service-satu.telkomuniversity.ac.id/system-information-academic-obe/
    image: satu-lens:latest
    container_name: satu-lens-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOST=0.0.0.0
```

Jalankan:
```bash
docker compose up -d --build
```

---

## 3. Konfigurasi Nginx Reverse Proxy (Sangat Penting)

Ketika aplikasi di-build dengan `VITE_APP_BASE_NAME=/lens`, Nitro server mendaftarkan seluruh asset dan rute di bawah prefix `/lens/`.

### ⚠️ Jebakan Trailing Slash di Nginx
```nginx
# ❌ SALAH BESAR (Terdapat "/" di akhir proxy_pass):
location /lens/ {
    proxy_pass http://127.0.0.1:3000/;
}
# Akibat: Nginx memotong /lens/ menjadi /, sehingga Nitro mengembalikan 404
# untuk semua file .js/.css, menyebabkan LAYAR PUTIH (blank screen).
```

### ✅ Konfigurasi Nginx yang Benar
Gunakan konfigurasi berikut tanpa tanda slash di akhir target `proxy_pass`:

```nginx
server {
    listen 80;
    server_name satu.telkomuniversity.ac.id;

    # Opsional: redirect otomatis root / ke /lens/
    location = / {
        return 301 /lens/;
    }

    # Konfigurasi reverse proxy aplikasi SATU / LENS
    location /lens {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        # Header WebSocket & Keep-Alive
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';

        # Header Proxy Standar
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Disable cache bypass untuk WebSocket
        proxy_cache_bypass $http_upgrade;

        # Timeout buffers untuk SPA
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Setelah memperbarui Nginx, lakukan uji konfigurasi dan reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 4. Checklist Verifikasi Setelah Deploy

1. **Akses URL Utama**: Buka `https://domain.com/lens/` di browser. Pastikan halaman login atau universal home muncul tanpa layar putih.
2. **Periksa Network Tab di DevTools**:
   - Pastikan file `index-*.js` dan `index-*.css` berstatus **200 OK** (bukan 404 atau 302).
   - Pastikan path asset berawalan `/lens/assets/...`.
3. **Coba Login**:
   - Masukkan username dan password.
   - Pastikan setelah klik login, halaman diarahkan langsung ke `/lens/home` tanpa stuck di loader dan tanpa error `Minified React error #185`.
4. **Cek Status Container**:
   ```bash
   docker ps
   ```
   Pastikan container berstatus `Up ... (healthy)`.

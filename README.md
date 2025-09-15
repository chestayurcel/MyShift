# MyShift - Aplikasi Manajemen Shift dan Absensi Karyawan

MyShift adalah aplikasi web full-stack yang dirancang untuk membantu perusahaan dalam mengelola data karyawan, absensi, dan pengajuan izin secara digital. Aplikasi ini dibangun menggunakan Node.js & Express untuk backend, React untuk frontend, dan MySQL sebagai database.

Sistem ini memiliki dua peran pengguna utama:
* **Admin**: Dapat mengelola semua data master, termasuk data karyawan, departemen, serta meninjau dan memvalidasi semua pengajuan izin yang masuk.
* **Pegawai**: Dapat melakukan absensi (check-in & check-out), mengajukan izin, dan melihat riwayat aktivitas mereka sendiri.

## Fitur Utama

-   👤 **Autentikasi & Otorisasi**: Sistem login berbasis peran (Admin & Pegawai) menggunakan JSON Web Token (JWT).
-   🏢 **Manajemen Departemen**: Admin dapat melakukan operasi CRUD (Create, Read, Update, Delete) pada data departemen.
-   👨‍💼 **Manajemen User**: Admin dapat melakukan operasi CRUD pada data pengguna/karyawan.
-   📄 **Manajemen Perizinan**: Pegawai dapat mengajukan izin dengan mengunggah file bukti, dan Admin dapat menyetujui atau menolaknya.
-   ⏰ **Manajemen Presensi**: Pegawai dapat mencatat waktu check-in dan check-out, serta melihat riwayat absensi mereka.
-   🔒 **API Terproteksi**: Sebagian besar endpoint API diamankan dan memerlukan token autentikasi yang valid.

## Teknologi yang Digunakan

**Backend:**
-   Node.js
-   Express.js
-   MySQL (dengan library `mysql2` atau Sequelize)
-   JSON Web Token (JWT) untuk autentikasi
-   Bcrypt.js untuk hashing password
-   Multer untuk menangani upload file

**Frontend:**
-   React
-   React Router
-   Axios

## Panduan Instalasi

Berikut adalah langkah-langkah untuk menjalankan proyek ini di lingkungan lokal Anda.

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/chestayurcel/MyShift.git](https://github.com/chestayurcel/MyShift.git)
    cd MyShift
    ```

2.  **Setup Backend Server:**
    ```bash
    # Dari direktori root proyek (MyShift), jalankan:
    cd server
    npm install
    ```

3.  **Setup Frontend Client:**
    ```bash
    # Dari direktori root proyek (MyShift), jalankan:
    cd client
    npm install
    ```

4.  **Konfigurasi Database & Environment Variables**
    * Buat sebuah database baru di MySQL (misalnya melalui phpMyAdmin) dengan nama `myshift_db`.
    * Impor file skema SQL (jika ada) untuk membuat tabel-tabel yang dibutuhkan.
    * Buat dan konfigurasikan file `.env` seperti yang dijelaskan di bawah.

## Daftar Environment Variables

Anda perlu membuat file `.env` di dalam folder `server` dan `client`.

#### 📄 `server/.env`
Buat file bernama `.env` di dalam folder `/server` dan isi dengan konfigurasi berikut. Sesuaikan dengan pengaturan database Anda.

```ini
# Konfigurasi Server
PORT=5000

# Konfigurasi Database MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_database_anda
DB_NAME=myshift_db

# Kunci Rahasia untuk JSON Web Token
JWT_SECRET=rahasiabanget123
```

#### 📄 `client/.env`
Buat file bernama `.env` di dalam folder `/client` dan isi dengan konfigurasi berikut:

```ini
# URL dasar dari server backend Anda
REACT_APP_API_URL=http://localhost:5000/api
```

## Menjalankan Proyek

Pastikan Anda menjalankan kedua server (backend dan frontend) secara bersamaan di terminal yang terpisah.

1.  **Jalankan Server Backend:**
    (Dari dalam folder `/server`)
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:5000`.

2.  **Jalankan Client Frontend:**
    (Dari dalam folder `/client`)
    ```bash
    npm start
    ```
    Aplikasi React akan otomatis terbuka di browser pada alamat `http://localhost:3000`.

## Dokumentasi API

Dokumentasi lengkap untuk semua endpoint API tersedia dalam bentuk koleksi Postman. Anda dapat mengimpor file koleksi yang tersedia di repository ini atau menghubungi developer untuk mendapatkannya. Koleksi ini mencakup semua endpoint untuk fitur Autentikasi, Departemen, Perizinan, Presensi, dan Manajemen User.

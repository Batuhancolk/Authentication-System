# Authentication System

## Proje Açıklaması
Bu proje, kullanıcı yönetimi ve kimlik doğrulama işlemleri gerçekleştiren bir Node.js tabanlı Authentication API'dir. Kullanıcı kayıt olma, giriş yapma, oturum yönetimi, şifre sıfırlama gibi işlemleri desteklemektedir. 
MySQL veritabanı ile çalışmaktadır.

Hazırlayan: Batuhan Çolak İletişim: batuhancolk@gmail.com || www.batuhancolk.com

## Kullanılan Teknolojiler
- **Node.js**
- **Express.js**
- **MySQL** (Veritabanı olarak kullanıldı)
- **bcryptjs** (Şifreleri hashlemek için kullanıldı)
- **express-session** (Oturum yönetimi için kullanıldı)
- **nodemailer** (E-posta gönderimi için kullanıldı)
- **dotenv** (Çevresel değişkenleri yönetmek için kullanıldı)

## Kurulum Adımları
1. **Depoyu Kopyalayın**


2. **Bağımlılıkları Yükleyin**
   ```sh
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın**
   `.env` dosyası oluşturup aşağıdaki değişkenleri ekleyin:
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   SESSION_SECRET=your_secret_key
   DB_EMAIL_USERNAME=your_email@example.com
   DB_EMAIL_PASSWORD=your_email_password
   PORT=3000
   ```

4. **Veritabanını Başlatın**
   MySQL üzerinde aşağıdaki komutları çalıştırarak `users` tablosunu oluşturun:
   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       reset_token VARCHAR(255),
       reset_token_expires DATETIME
   );
   ```

5. **Sunucuyu Başlatın**
   ```sh
   node server.js
   ```

## API Uç Noktaları
| Metot | URL | Açıklama |
|-------|-----|----------|
| `POST` | `/api/auth/register` | Kullanıcı kayıt işlemi |
| `POST` | `/api/auth/login` | Kullanıcı giriş işlemi |
| `POST` | `/api/auth/logout` | Kullanıcı çıkış işlemi |
| `GET` | `/api/auth/profile` | Kullanıcı profil bilgilerini getirir (Oturum açmış kullanıcı) |
| `POST` | `/api/auth/forgot-password` | Şifre sıfırlama bağlantısı gönderir |
| `POST` | `/api/auth/reset-password` | Şifre sıfırlama işlemi yapar |

## Proje Yapısı
```
Authentication System/
│
├── config/
│   └── db.js  # MySQL bağlantısı
│
├── controllers/
│   └── authController.js  # Kullanıcı işlemleri
│
├── middleware/
│   └── authentication.js  # Yetkilendirme kontrolü
│
├── routes/
│   └── authRoutes.js  # Kimlik doğrulama rotaları
│
├── emailService.js  # E-posta gönderme servisi
│
├── server.js  # Ana sunucu dosyası
│
├── .env  # Çevresel değişkenler
│
├── package.json  # Bağımlılıklar
│
└── README.md  # Proje dökümantasyonu
```

## 
Bu README dosyası, projenin kurulumunu, kullanımını ve kodun önemli kısımlarını ayrıntılı olarak açıklar. Umarım faydalı olur! 
Hazırlayan: Batuhan Çolak İletişim: batuhancolk@gmail.com || www.batuhancolk.com

## Lisans
Bu proje MIT lisansı altında lisanslanmıştır.


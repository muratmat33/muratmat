# Murat TAŞKIN Okul Takip & Proje Yönetim Sistemi

Öğretmen **Murat TAŞKIN** için özel olarak geliştirilmiş modern okul takip, öğrenci not & e-Okul entegrasyonu, Google Drive dosya & yıllık plan arşivi ile **TEKNOFEST** ve **TÜBİTAK** proje üretim platformudur.

---

## 🚀 Öne Çıkan Özellikler

### 1. 🎓 Öğrenci Takip Sistemi (Sol ve Ana Panel)
- **Sınıf Yönetimi:** 9-A, 10-A, 11-A, 8-B gibi sınıflar arası tek tıkla geçiş ve dinamik yeni sınıf/şube ekleme.
- **Detaylı Not Çizelgesi:** Öğrenci numarası, ad-soyad, özürsüz devamsızlık günü, 1. ve 2. yazılı sınavlar, sözlü/performans notları, proje notu ve otomatik ağırlıklı ortalama.
- **e-Okul / Not Linki Entegrasyonu:** Tablonun son sütunundaki *"Not Linki"* butonuna tıklandığında tanımladığınız e-Okul veya Google E-Tablo not çizelgeniz anında yeni sekmede açılır.
- **Öğrenci Gelişim & Veli Kartı:** Veli telefonu, rehberlik ve davranış gözlem notları.

### 2. 📁 Dosyalarım (Sağ Panel & Menü)
- **Google Drive Entegrasyonu:** Sağ paneldeki *"Google Drive'a Git"* butonu ile kişisel bulut klasörünüze doğrudan erişim.
- **Hazır Evrak Kategorileri:** Zümre Tutanakları, Yazılı Sınav Kağıtları, ŞÖK Kararları, Kulüp Belgeleri ve Rehberlik Formları için hızlı erişim kısayolları.
- **Kişiselleştirilebilir Bağlantılar:** Drive klasör adresinizi ayarlar menüsünden dilediğiniz zaman güncelleyebilirsiniz.

### 3. 📅 Yıllık Planlarım (Menü Sekmesi)
- **36 Haftalık Müfredat:** 1. ve 2. dönem haftalık MEB kazanımları, ders araç-gereçleri, yöntem ve teknikleri.
- **Aktif Hafta Vurgusu:** Bulunduğunuz eğitim-öğretim haftasının konusu ve hedeflenen kazanımları öne çıkarılır.
- **Drive Plan Klasörü:** Google Drive'daki resmi yıllık planlarınıza doğrudan link.

### 4. 💡 Proje Üretme Alanı (TEKNOFEST & TÜBİTAK)
- **🚀 TEKNOFEST 2026 Proje Sihirbazı:**
  - 2026 KYS Başvuru Kılavuzu ve Eğitim Teknolojileri Sunum Şablonuna birebir uyumlu.
  - Takım Kaptanı ve Takım Üyeleri (öğrencilerden hızlı seçim), Özet, Problem Tanımı, Çözüm, Yöntem, Prototip Geliştirme Durumu (Donanım/Yazılım/Hibrit), Yerlilik & Özgünlük, Ticarileşme, Hedef Kitle, İş Takvimi ve SWOT Analizi.
  - **Word (.docx) İndirme:** Projenizi resmi formatta tek tıkla Microsoft Word belgesi olarak bilgisayarınıza indirir.
- **🔬 TÜBİTAK 2204-B / 2204-A Proje Sihirbazı:**
  - 2026-2027 Proje Yazma Şablonu ve Ortaokul Proje Rehberine tam uyumlu.
  - 10 Ana Alan ve 43 Tematik Alan seçimi.
  - Zorunlu *Yapay Zeka Araçları Kullanım Beyanı* bölümü.
  - 150-250 kelimelik Özet, Amaç, Giriş, Yöntem, İş-Zaman Çizelgesi, Bulgular, Sonuç/Tartışma, APA formatında Kaynaklar.
  - **Word (.docx) İndirme:** 12 punto Times New Roman, 2.5 cm kenar boşlukları ile resmi TÜBİTAK Word belgesi olarak kaydeder.

---

## 🛠️ GitHub'a Yükleme Adımları (Nasıl Yüklenir?)

Bu klasör (`sunucu`), GitHub deponuza (`repository`) doğrudan yüklemek için gereken tüm dosyaları içermektedir.

### 1. Adım: Bilgisayarınızda Terminali / Komut Satırını Açın
Klasörün içine girin:
```bash
cd sunucu
```

### 2. Adım: Git Deposunu Başlatın
```bash
git init
```

### 3. Adım: Tüm Dosyaları Ekleyin ve Commit Yapın
```bash
git add .
git commit -m "Murat TASKIN Okul Takip ve Proje Sistemi ilk surum"
```

### 4. Adım: GitHub Deponuzu Bağlayın ve Yükleyin
GitHub hesabınızda yeni bir repo oluşturduktan sonra (örneğin: `okul-takip-sistemi`):
```bash
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/okul-takip-sistemi.git
git push -u origin main
```

---

## 💻 Bilgisayarınızda Çalıştırma (Lokal Kurulum)

Node.js (v18 veya üzeri) kurulu olduğundan emin olun.

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   Tarayıcınızda otomatik olarak `http://localhost:3000` adresinde açılacaktır.

3. Canlı / Dağıtım için derleyin (Build):
   ```bash
   npm run build
   ```

---

## 📦 Kullanılan Teknolojiler

- **React 19** & **TypeScript**
- **Tailwind CSS v4** (Modern tasarım)
- **Vite 8** (Ultra hızlı derleyici)
- **docx** & **file-saver** (Gerçek Microsoft Word .docx üretimi)
- **Lucide React** (İkon seti)
- **Motion** (Mikro animasyonlar)
- **LocalStorage API** (Tarayıcı içi kalıcı veri saklama)

---

© 2026-2027 **Murat TAŞKIN** · Tüm Hakları Saklıdır.

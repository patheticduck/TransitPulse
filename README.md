# TransitPulse  
## Toplu Taşıma Doluluk Geri Bildirim Uygulaması

TransitPulse, React Native (Expo) kullanılarak geliştirilmiş, Firebase tabanlı çok ekranlı bir Android mobil uygulamadır.

Bu uygulama, toplu taşıma kullanıcılarının otobüs, metro ve metrobüs hatlarının doluluk durumları hakkında bilgi alabilmesini ve aynı zamanda geri bildirimde bulunabilmesini amaçlamaktadır.  
Kullanıcılar tarafından gönderilen doluluk bildirimleri saat bazlı olarak analiz edilmekte ve istatistiksel grafikler ile görselleştirilmektedir.

Proje kapsamında; kullanıcı kimlik doğrulama, veritabanı entegrasyonu, bildirim sistemi, çok ekranlı navigasyon yapısı ve veri analizi gibi mobil uygulama geliştirme konularının tamamı uygulanmıştır.

---

## Öğrenci Bilgileri

- **Ad:** Mehmet Yiğit  
- **Soyad:** Polat  
- **Öğrenci Numarası:** 230404801  
- **Ders:** Android Cihazlarda Uygulama Geliştirme  

---

## Proje Amacı ve Çözülen Problem

Toplu taşıma araçlarının doluluk durumu kullanıcılar tarafından önceden bilinmemektedir.  
Bu durum; zaman kaybına, konforsuz yolculuklara ve yanlış ulaşım tercihlerine sebep olmaktadır.

TransitPulse uygulaması, kullanıcı geri bildirimlerine dayalı bir sistem kurarak:

- Hatların saat bazlı yoğunluk durumlarını göstermeyi  
- Kullanıcıların daha bilinçli ulaşım tercihleri yapmasını  
- Toplu taşıma kullanım verilerinin analiz edilmesini  
- Bellir bir son kullanıcı sayısına göre grafik gösterimini

amaçlamaktadır.

---

## Kullanılan Teknolojiler ve Kütüphaneler

- **React Native (Expo)**
- **JavaScript**
- **Firebase Authentication**
- **Firebase Firestore (NoSQL)**
- **React Navigation (Native Stack & Bottom Tab)**
- **Expo Notifications**
- **react-native-chart-kit**
- **dayjs / date-fns**

---

## Uygulama Özellikleri

- Email ve şifre ile kullanıcı kayıt ve giriş sistemi
- Firebase Authentication ile güvenli kimlik doğrulama
- Metro ve metrobüs hatları için doluluk bildirimi
- Doluluk seviyeleri (Az / Orta / Yoğun)
- Saat bazlı yoğunluk istatistikleri
- Grafiklerle veri görselleştirme
- Favori hatlar oluşturma
- Her sabah hatırlatma bildirim desteği
- Kullanıcı profil ekranı
- Çok ekranlı ve modüler navigasyon yapısı

---

## Uygulama Ekranları

- Giriş Ekranı
- Kayıt Ekranı
- Ana Sayfa
- Doluluk Bildirimi Ekranı
- İstatistikler Ekranı
- Favoriler Ekranı
- Profil Ekranı

---

## Uygulama Alt Ekranları

- Bildirim Yapma ekranı
- Sen ve Başka Kullanıcılar Tarafından Yapılan Bildirimleri Görme Ekranı
- Yaptığın Bildirimleri Görme Ekranı

---

## Navigasyon Yapısı

Uygulamada **React Navigation** kullanılarak aşağıdaki yapı oluşturulmuştur:

- **Auth Stack**
  - Login Screen
  - Register Screen

- **Main Bottom Tab Navigation**
  - Ana Sayfa
  - Doluluk Bildirimi
  - İstatistikler
  - Favoriler
  - Profil

- ## Profile Stack**
  - Bildirimlerim

- ## Uygulama Ekranları**
  - AddFeedback
  - FeedBackList


Kullanıcı giriş yapmadan ana uygulama ekranlarına erişemez.

---

## Veritabanı ve Veri Yönetimi

Uygulamada **Firebase Firestore (NoSQL)** veritabanı kullanılmıştır.

Firestore üzerinde aşağıdaki veriler tutulmaktadır:

- Kullanıcı bilgileri
- Doluluk geri bildirimleri
- Hat bilgileri
- Saat ve tarih bilgileri
- Favori hatlar
- Fire Rules lar yazılarak backend kısmı güvence altına alınmıştır.
- Maintenance koleksiyonu ve Rules bulunmaktasır.
- Firebase Authentication (e-mail - şifre) Kullanılmıştır.

Doluluk verileri saat bazlı olarak gruplanmakta ve istatistik ekranında analiz edilmektedir.


---

## LoginScreen ve RegisterScreen ekranları
- Kullanıcılar bu ekranlar üzerinden kayıt ve giriş işlemlerini yaparlar
- FireBase ile birlikte çalışır ve aynı mail - şifre kontrolleri vardır
- Boş input kontrolleri vardır
- Hata mesajları anlaşılır şekildedir
- Ekran dokunması - klavye bağlantısı vardır
- Enter tuşu - confirm ilişkisi bulunur

---

## HomeScreen ekranı

- Bu ekran karşılama ekranıdır
- Kullanıcıları bilgilendiren bir açılır kart bulunur.

---

## Doluluk Bildirimi ekranı

- Stack yapısı ile kurulmuş iki alt bileşen içerir
- Addfeedback Screen ve Feedbacklist Screen

---

## AddfeedBck ekranı

- Kullanıcılar bu ekran üzerinden seçtikleri hat özelinde doluluk bildiriminde bulunurlar
- İçerisinde Toplu Taşım , Hat ve Yoğunluk olarak 3 tane pickerekranını barındırır
- Gönder butonu ile seçtikleri hat üzerinde doluluk bildirimi yapabilirler

---

## FeedbackList Ekranı

- Kullanıcılar bu ekranda Doluluk Bildirimlerini görmektedirler
- Ekranda sadece yapılmış son 20 bildirim tutulmaktadır
- Veritabanında ise tüm bildirimler yer almaktadır
- Ekranın üst kısmındaki filtreleme seçeneği ile Taşıt ve Yoğunluk durumu filtrelenebilmektedir
- Tarih ve saat işlemleri için `dayjs / date-fns` tercih edilmiştir
- Pull to Refresh sistemi bu ekranda aktiftir

---

## İstatistikler ekranı

- Kullanıcı geri bildirimleri, son 10 kullanıcının yaptığı bildirimler olarak filtrelenir
- Doluluk oranları hesaplanır
- Grafikler ile görselleştirilir
- `react-native-chart-kit` kütüphanesi kullanılmıştır
- Tarih ve saat işlemleri için `dayjs / date-fns` tercih edilmiştir
- Kullanıcılar seçtikleri hattı favorilerine bu ekran üzerinden eklerler ve kaldırırlar
- Pull to Refresh sistemi bu ekranda aktiftir

---

## Favoriler ekranı

- Eklenen hat üzerinde, son 1 saat içerisinde yapılan verileri işler
- Kullanıcılar burada favori hatlarının son 1 saatlik (yoğun , orta , az) verilerini görebilirler
- Kullanıcılar isterlerse seçtikleri hattı bu ekran üzerinden de favorilerinden çıkartabilirler
- Veriler % şeklindeki barlar ile görselleştirilmiştir
- Pull to refresh mekanizması ekranda mevcuttur

---

## Profil Ekranı

- Kullanıcılar bu ekranda kayıtlı mail adreslerini görüntülerler
- Bildirimler izni toggle ile bu ekran üzerinden verilir
- Koyu mod izni toggle yardımı ile bu ekran üzerinden verilir
- Çıkış yap tuşu ile hesaptan çıkış yapılabilir
- Auth kontrolü olduğundan çıkış yapılmadığı sürece oturum açık kalır
- Bildirimlerim alt ekranı bu sayfada bulunur
- Bu ekran "Current SnapShot" kullanır
- Kullanıclar yaptıkları bildirim sayısını ve favori sayısını buradan görebilmektedirler.

---

## Bildirimlerim Ekranı

- Kullanıcılar kendı yaptıkları son 20 bildirimi bu ekranda görürler
- 30 dk önce yapılan bildirimler silinemez
- 30 dakikadan önce yaptıkları bildirimleri silebilirler
- Tarih ve saat işlemleri için `dayjs / date-fns` tercih edilmiştir
- Kart sistemi vardır
- Kullanıcılar bildirimlerini ne zaman yaptıklarını görebilirler
- Pull to Refresh sistemi bu ekranda aktiftir

---

## Bildirim Sistemi

- **Expo Notifications API** kullanılmıştır
- Hatırlatma için bildirim desteği bulunmaktadır
- Kullanıcı bildirim ayarlarını kontrol edebilir
- Bildirimler uygulama Türkiye yerel saatine göre her sabah saat 08:00 da tetiklenmektedir.

---

## İzin Yönetimi

Uygulama içerisinde:

- Bildirim izinleri kullanıcıdan güvenli şekilde alınır
- Firebase ve Expo API’leri asenkron olarak kullanılmıştır
- İzin reddi durumları kontrol altına alınmıştır

---

## Proje Klasör Yapısı ve Projeyi Klonlayın

```bash
├── assets              # Uygulama ikonları ve splash screen
├── navigation          # Stack ve Tab navigasyon dosyaları
├── screens             # Uygulama ekranları
├── styles              # Ekranlara özel stil dosyaları
├── theme               # Tema ve renk yönetimi
├── notifications       # Bildirim servisleri
├── firebaseConfig.js   # Firebase yapılandırması
├── App.js              # Uygulama giriş noktası
└── package.json


git clone https://github.com/Myp230404801/TransitPulse.git
cd TransitPulse
npm install
npx expo start

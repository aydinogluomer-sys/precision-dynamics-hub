export interface ServicePageData {
  slug: string;
  category: "hizmetler" | "kabiliyetler" | "endustriyel";
  categoryLabel: string;
  title: string;
  description: string;
  content: string[];
  features?: string[];
  technicalSpecs?: { label: string; value: string }[];
  heroImage?: string;
  processSteps?: string[];
  advantages?: string[];
}

export const servicePages: ServicePageData[] = [
  // ── Hizmetler > Talaşlı İmalat ──
  {
    slug: "cnc-frezeleme",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "CNC Frezeleme",
    description: "3, 4 ve 5 eksenli CNC freze tezgahlarıyla yüksek hassasiyetli frezeleme hizmeti.",
    content: [
      "Mas Technic olarak, 3 eksenli, 4 eksenli ve 5 eksenli CNC freze tezgahlarımızla karmaşık geometrilere sahip parçaların üretimini gerçekleştiriyoruz. DMG Mori, Mazak ve Okuma gibi dünya liderlerinin tezgahlarını kullanarak endüstri standartlarının üzerinde sonuçlar elde ediyoruz.",
      "Havacılık, otomotiv, medikal ve savunma sanayi gibi kritik sektörlere yönelik ±0.005mm hassasiyette frezeleme çözümleri sunuyoruz. Yüksek hızlı işleme (HSM) teknolojimiz ile yüzey kalitesini artırırken üretim süresini kısaltıyoruz.",
      "Büyük boyutlu parçalardan mikro bileşenlere kadar geniş bir işleme yelpazesinde hizmet veriyoruz. Her projede DFM analizi uygulayarak maliyetleri optimize ediyor ve tasarım geri bildirimi sağlıyoruz.",
    ],
    features: ["3-4-5 Eksen Frezeleme", "Yüksek Hız İşleme (HSM)", "Büyük Parça Kapasitesi", "Seri & Prototip Üretim"],
    technicalSpecs: [
      { label: "Tolerans", value: "±0.005mm" },
      { label: "Maks. Parça Boyutu", value: "2000×1000×800mm" },
      { label: "Yüzey Pürüzlülüğü", value: "Ra 0.4µm" },
      { label: "Eksen Sayısı", value: "3, 4, 5 eksen" },
    ],
    processSteps: ["CAD/CAM Programlama", "Fikstür Hazırlığı", "CNC İşleme", "CMM Ölçüm", "Kalite Raporu"],
    advantages: ["Karmaşık geometrilerde tek seferde işleme", "HSM ile %40 daha hızlı üretim", "Otomatik takım değiştirme sistemi", "Gerçek zamanlı süreç izleme"],
  },
  {
    slug: "cnc-tornalama",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "CNC Tornalama",
    description: "Hassas CNC torna tezgahlarıyla silindirik ve dönel parça üretimi.",
    content: [
      "CNC torna tezgahlarımız ile yüksek hassasiyetli silindirik parça üretimi gerçekleştiriyoruz. Canlı takım özellikli torna tezgahlarımız sayesinde tek bağlamada hem tornalama hem frezeleme işlemlerini tamamlıyoruz.",
      "Çift milli torna tezgahlarımız ile ön ve arka yüzey işleme operasyonlarını tek kurulumda gerçekleştirerek setup süresini minimuma indiriyoruz. Bu yaklaşım maliyetleri düşürürken kaliteyi artırıyor.",
      "Uzun parça işlemede özel destek aparatları ve karşı mil kullanarak titreşimsiz, yüksek hassasiyetli üretim sağlıyoruz.",
    ],
    features: ["Canlı Takımlı Tornalama", "Çift Milli Üretim", "Uzun Parça İşleme", "Mikro Tornalama"],
    technicalSpecs: [
      { label: "Tolerans", value: "±0.003mm" },
      { label: "Maks. Çap", value: "Ø650mm" },
      { label: "Maks. Uzunluk", value: "3000mm" },
      { label: "Yüzey Pürüzlülüğü", value: "Ra 0.2µm" },
    ],
    processSteps: ["Teknik Çizim İnceleme", "Malzeme Hazırlığı", "CNC Tornalama", "Ölçüm & Kontrol", "Paketleme"],
    advantages: ["Tek bağlamada komple işleme", "Çift milli üretimle %50 setup tasarrufu", "Mikro tornalama kabiliyeti", "Bar feeder ile otomasyon"],
  },
  {
    slug: "hassas-mikro-isleme",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "Hassas Mikro İşleme",
    description: "Mikron seviyesinde hassasiyet gerektiren küçük ve karmaşık parçaların üretimi.",
    content: [
      "Mikro işleme kabiliyetimiz ile medikal implantlar, elektronik bileşenler ve hassas mekanik parçalar üretiyoruz. ±0.001mm tolerans değerlerine ulaşabilen özel tezgahlarımız ile en zorlu uygulamaları karşılıyoruz.",
      "Temiz oda koşullarına uygun üretim ortamımızda kontaminasyon riski olmadan hassas mikro parçalar üretiyoruz.",
    ],
    features: ["Mikron Hassasiyet", "Küçük Parça Uzmanlığı", "Medikal Uygunluk", "Temiz Oda İşleme"],
    technicalSpecs: [
      { label: "Tolerans", value: "±0.001mm" },
      { label: "Min. Çap", value: "Ø0.3mm" },
      { label: "Yüzey Pürüzlülüğü", value: "Ra 0.1µm" },
      { label: "Büyütme Kontrolü", value: "200x optik" },
    ],
    processSteps: ["Mikro CAM Programlama", "Özel Takım Seçimi", "Mikro İşleme", "Optik Ölçüm", "Temizleme & Paketleme"],
    advantages: ["Mikron altı hassasiyet", "Özel mikro takım stoku", "Kontaminasyonsuz üretim", "Optik ölçüm sistemi"],
  },
  {
    slug: "derin-delik-raybalama",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "Derin Delik & Raybalama",
    description: "Derin delik delme ve hassas raybalama işlemleri.",
    content: [
      "Özel derin delik delme tezgahlarımız ile uzun ve dar çaplı deliklerin işlenmesini gerçekleştiriyoruz. Gun drill teknolojimiz ile L/D oranı 50:1'e kadar hassas delik delme imkanı sunuyoruz.",
      "Raybalama işlemleri ile delik yüzey kalitesini ve boyutsal doğruluğu en üst seviyeye taşıyoruz.",
    ],
    features: ["Derin Delik Delme", "Hassas Raybalama", "Gun Drill Teknolojisi", "Yüksek Yüzey Kalitesi"],
    technicalSpecs: [
      { label: "L/D Oranı", value: "50:1" },
      { label: "Delik Toleransı", value: "H6-H7" },
      { label: "Yüzey Kalitesi", value: "Ra 0.4µm" },
      { label: "Maks. Derinlik", value: "2500mm" },
    ],
  },

  // ── Hizmetler > Ön Üretim ──
  {
    slug: "enjeksiyon-kalibi",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Enjeksiyon Kalıbı",
    description: "Plastik enjeksiyon kalıp tasarımı ve üretimi.",
    content: [
      "Yüksek hassasiyetli plastik enjeksiyon kalıplarının tasarımını ve üretimini gerçekleştiriyoruz. Moldflow simülasyonu ile dolum optimizasyonu yaparak üretim kalitesini garanti altına alıyoruz.",
      "Prototip kalıplardan seri üretim kalıplarına kadar geniş bir yelpazede hizmet sunuyoruz. Kalıp ömrünü maksimize eden ısıl işlem ve kaplama süreçleri uyguluyoruz.",
    ],
    features: ["Kalıp Tasarımı", "Prototip Kalıp", "Seri Üretim Kalıbı", "Bakım & Revizyon"],
    technicalSpecs: [
      { label: "Kalıp Boyutu", value: "800×600×500mm" },
      { label: "Kavite Sayısı", value: "1-128 kavite" },
      { label: "Kalıp Ömrü", value: "500K+ çevrim" },
      { label: "Tolerans", value: "±0.01mm" },
    ],
    processSteps: ["Ürün Analizi", "Kalıp Tasarımı", "Moldflow Simülasyonu", "CNC İşleme", "Deneme Basımı", "Teslimat"],
    advantages: ["Moldflow simülasyonu dahil", "500K+ çevrim ömrü", "Hot runner sistemi desteği", "Bakım ve revizyon hizmeti"],
  },
  {
    slug: "basinçli-dokum",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Basınçlı Döküm",
    description: "Alüminyum ve zamak basınçlı döküm kalıp üretimi.",
    content: [
      "Basınçlı döküm kalıplarının tasarımı ve üretiminde uzmanlaşmış ekibimizle hizmetinizdeyiz. Akış simülasyonu ile kalıp tasarımını optimize ediyoruz.",
      "Alüminyum, zamak ve magnezyum döküm kalıpları için optimize edilmiş çözümler sunuyoruz.",
    ],
    features: ["Alüminyum Döküm", "Zamak Döküm", "Kalıp Optimizasyonu", "Simülasyon Destekli Tasarım"],
    technicalSpecs: [
      { label: "Malzemeler", value: "Al, Zamak, Mg" },
      { label: "Kalıp Ömrü", value: "100K+ çevrim" },
      { label: "Maks. Kapama Kuvveti", value: "2500 ton" },
      { label: "Tolerans", value: "±0.05mm" },
    ],
  },
  {
    slug: "silikon-kaliplama",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Silikon Kalıplama",
    description: "Silikon ve kauçuk kalıplama çözümleri.",
    content: [
      "Silikon ve kauçuk parçalar için hassas kalıp üretimi gerçekleştiriyoruz.",
      "Medikal, otomotiv ve endüstriyel uygulamalar için özel silikon kalıplama çözümleri sunuyoruz.",
    ],
    features: ["Silikon Kalıp", "Kauçuk Kalıp", "Medikal Sınıf", "Seri Üretim"],
    technicalSpecs: [
      { label: "Shore Sertlik", value: "20A-80A" },
      { label: "Tolerans", value: "±0.05mm" },
      { label: "Malzeme", value: "LSR, HTV, EPDM" },
      { label: "Sıcaklık Dayanımı", value: "-60°C / +300°C" },
    ],
  },
  {
    slug: "fikstur-aparat-tasarimi",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Fikstür & Aparat Tasarımı",
    description: "Özel fikstür ve aparat tasarımı ile üretimi.",
    content: [
      "Üretim süreçlerinizi hızlandıracak ve hassasiyeti artıracak özel fikstür ve aparatlar tasarlıyoruz.",
      "Montaj, kaynak, ölçüm ve işleme fikstürleri ile üretim verimliliğinizi artırıyoruz.",
    ],
    features: ["Özel Fikstür", "Montaj Aparatı", "Kaynak Fikstürü", "Ölçüm Aparatı"],
    technicalSpecs: [
      { label: "Tekrarlanabilirlik", value: "±0.01mm" },
      { label: "Malzeme", value: "Çelik, Al, Kompozit" },
      { label: "Tasarım Süresi", value: "3-5 iş günü" },
      { label: "Üretim Süresi", value: "5-10 iş günü" },
    ],
  },

  // ── Hizmetler > Yüzey İşlemleri ──
  {
    slug: "mekanik-yuzey-islemleri",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Mekanik Yüzey İşlemleri",
    description: "Kumlama, polisaj ve taşlama ile yüzey iyileştirme.",
    content: [
      "Mekanik yüzey işlemleri ile parçalarınızın yüzey kalitesini istenen seviyeye getiriyoruz.",
      "Kumlama, vibrasyon, polisaj ve hassas taşlama işlemleri gerçekleştiriyoruz.",
    ],
    features: ["Kumlama", "Polisaj", "Taşlama", "Vibrasyon Finishing"],
    technicalSpecs: [
      { label: "Yüzey Kalitesi", value: "Ra 0.05µm'e kadar" },
      { label: "Kumlama Basıncı", value: "2-8 bar" },
      { label: "Parlatma Seviyesi", value: "Ayna parlaklığı" },
      { label: "Maks. Parça Boyutu", value: "1500×800mm" },
    ],
  },
  {
    slug: "anodizasyon",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Anodizasyon",
    description: "Alüminyum parçalar için anodizasyon ve sert anodizasyon.",
    content: [
      "Alüminyum parçalarınız için standart ve sert anodizasyon işlemleri sunuyoruz.",
      "Renkli anodizasyon seçenekleri ile estetik ve fonksiyonel koruma sağlıyoruz. MIL-A-8625 standardına tam uyum garanti ediyoruz.",
    ],
    features: ["Standart Anodizasyon", "Sert Anodizasyon", "Renkli Anodizasyon", "MIL-A-8625 Uyumu"],
    technicalSpecs: [
      { label: "Kaplama Kalınlığı", value: "5-80µm" },
      { label: "Sertlik", value: "60-70 HRC (sert)" },
      { label: "Renk Seçeneği", value: "12+ renk" },
      { label: "Standart", value: "MIL-A-8625" },
    ],
  },
  {
    slug: "kimyasal-islemler",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Kimyasal İşlemler",
    description: "Pasivasyon, fosfatlama ve kimyasal kaplama işlemleri.",
    content: [
      "Kimyasal yüzey işlemleri ile parçalarınızın korozyon direncini artırıyoruz.",
      "Pasivasyon, fosfatlama, kromatik kaplama ve elektropolisaj hizmetleri sunuyoruz.",
    ],
    features: ["Pasivasyon", "Fosfatlama", "Kromatik Kaplama", "Elektropolisaj"],
    technicalSpecs: [
      { label: "Tuz Testi", value: "500+ saat" },
      { label: "Kaplama Kalınlığı", value: "1-25µm" },
      { label: "Standartlar", value: "ASTM B117" },
      { label: "Pasivasyon", value: "ASTM A967" },
    ],
  },
  {
    slug: "boya-koruyucu-kaplamalar",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Boya & Koruyucu Kaplamalar",
    description: "Endüstriyel boya ve özel koruyucu kaplama uygulamaları.",
    content: [
      "Endüstriyel boya ve koruyucu kaplama çözümleri ile parçalarınızı koruma altına alıyoruz.",
      "Toz boya, sıvı boya, PTFE kaplama ve seramik kaplama uygulamaları gerçekleştiriyoruz.",
    ],
    features: ["Toz Boya", "Sıvı Boya", "PTFE Kaplama", "Seramik Kaplama"],
    technicalSpecs: [
      { label: "Kaplama Kalınlığı", value: "25-150µm" },
      { label: "Sıcaklık Dayanımı", value: "260°C (PTFE)" },
      { label: "Sürtünme Katsayısı", value: "0.05 (PTFE)" },
      { label: "Tuz Testi", value: "1000+ saat" },
    ],
  },

  // ── Hizmetler > İşaretleme & Tanımlama ──
  {
    slug: "lazer-kazima",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "Lazer Kazıma",
    description: "Kalıcı ve hassas lazer kazıma ile parça işaretleme.",
    content: [
      "Fiber ve CO2 lazer sistemlerimiz ile metal, plastik ve seramik yüzeylere kalıcı işaretleme yapıyoruz.",
      "Seri numarası, logo, barkod ve teknik bilgi işaretleme hizmeti sunuyoruz.",
    ],
    features: ["Fiber Lazer", "CO2 Lazer", "Metal İşaretleme", "Plastik İşaretleme"],
    technicalSpecs: [
      { label: "İşaretleme Alanı", value: "300×300mm" },
      { label: "Çözünürlük", value: "0.01mm" },
      { label: "Hız", value: "7000mm/s" },
      { label: "Lazer Gücü", value: "20-50W" },
    ],
  },
  {
    slug: "tavlama",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "Tavlama",
    description: "Lazer tavlama ile yüzey renk değişimi ile işaretleme.",
    content: [
      "Lazer tavlama teknolojisi ile yüzeyde malzeme çıkarmadan renk değişimi yaparak işaretleme gerçekleştiriyoruz.",
      "Özellikle paslanmaz çelik ve titanyum parçalarda tercih edilen bu yöntem, yüzey bütünlüğünü korur.",
    ],
    features: ["Yüzey Bütünlüğü", "Renk Değişimi", "Paslanmaz Çelik", "Titanyum"],
    technicalSpecs: [
      { label: "Yüzey Etkisi", value: "Sıfır derinlik" },
      { label: "Renk Aralığı", value: "Altın-Mavi-Siyah" },
      { label: "Uygunluk", value: "Medikal parça" },
      { label: "Dayanıklılık", value: "Kalıcı" },
    ],
  },
  {
    slug: "qr-datamatrix-kodlari",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "QR & DataMatrix Kodları",
    description: "Endüstriyel izlenebilirlik için QR ve DataMatrix kod işaretleme.",
    content: [
      "Endüstriyel izlenebilirlik gereksinimleri için QR kod ve DataMatrix kod işaretleme hizmeti sunuyoruz.",
      "Parça takibi, kalite kontrol ve envanter yönetimi için kalıcı kod işaretleme çözümleri sağlıyoruz.",
    ],
    features: ["QR Kod", "DataMatrix", "İzlenebilirlik", "Otomatik Okuma"],
    technicalSpecs: [
      { label: "Min. Modül Boyutu", value: "0.1mm" },
      { label: "Okuma Oranı", value: "%99.9+" },
      { label: "Standart", value: "ISO/IEC 16022" },
      { label: "Doğrulama", value: "ISO 15415" },
    ],
  },
  {
    slug: "logo-markalama",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "Logo & Markalama",
    description: "Ürünlerinize profesyonel logo ve marka işaretleme.",
    content: [
      "Lazer kazıma teknolojimiz ile ürünlerinize yüksek çözünürlüklü logo ve marka işaretleme yapıyoruz.",
      "Farklı malzeme türlerinde tutarlı ve profesyonel markalama sonuçları elde ediyoruz.",
    ],
    features: ["Yüksek Çözünürlük", "Çoklu Malzeme", "Dayanıklı İşaretleme", "Seri Üretim Uyumu"],
    technicalSpecs: [
      { label: "Çözünürlük", value: "1200 DPI" },
      { label: "Tekrarlanabilirlik", value: "±0.005mm" },
      { label: "Maks. Alan", value: "300×300mm" },
      { label: "Hız", value: "1000+ parça/saat" },
    ],
  },

  // ── Hizmetler > Montaj & Birleştirme ──
  {
    slug: "insert-uygulama",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Insert Uygulama",
    description: "Isıl ve ultrasonik insert uygulama hizmetleri.",
    content: [
      "Plastik ve kompozit parçalara ısıl veya ultrasonik yöntemlerle metal insert uygulama hizmeti sunuyoruz.",
      "Güçlü ve dayanıklı bağlantı noktaları oluşturarak montaj kalitesini artırıyoruz.",
    ],
    features: ["Isıl Insert", "Ultrasonik Insert", "Plastik Parçalar", "Güçlü Bağlantı"],
    technicalSpecs: [
      { label: "Yöntem", value: "Isıl / Ultrasonik" },
      { label: "Çekme Kuvveti", value: "2000N+" },
      { label: "Insert Çapı", value: "M2-M12" },
      { label: "Çevrim Süresi", value: "<3 saniye" },
    ],
  },
  {
    slug: "mekanik-montaj",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Mekanik Montaj",
    description: "Alt montaj ve komple ürün montaj hizmetleri.",
    content: [
      "Ürettiğimiz parçaların alt montajını ve komple ürün montajını gerçekleştiriyoruz.",
      "Montaj öncesi ve sonrası kalite kontrol ile hatasız teslimat sağlıyoruz.",
    ],
    features: ["Alt Montaj", "Komple Montaj", "Kalite Kontrol", "Tork Kontrolü"],
    technicalSpecs: [
      { label: "Tork Kontrolü", value: "±2% hassasiyet" },
      { label: "Test", value: "Fonksiyon testi" },
      { label: "Kapasite", value: "1000+ ünite/gün" },
      { label: "Takip", value: "Seri no bazlı" },
    ],
  },
  {
    slug: "kitting-paketleme",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Kitting & Paketleme",
    description: "Parça kitleme ve özel paketleme çözümleri.",
    content: [
      "Ürettiğimiz parçaları müşteri ihtiyaçlarına göre kitleme ve özel paketleme ile teslim ediyoruz.",
      "ESD koruma, özel kutulama ve etiketleme dahil kapsamlı paketleme çözümleri sunuyoruz.",
    ],
    features: ["Kit Hazırlama", "Özel Paketleme", "ESD Koruma", "Etiketleme"],
    technicalSpecs: [
      { label: "ESD Koruma", value: "MIL-PRF-81705" },
      { label: "Etiketleme", value: "Barkod + QR" },
      { label: "Koruma", value: "VCI, Desiccant" },
      { label: "Teslimat", value: "DDP / FCA" },
    ],
  },
  {
    slug: "kaynakli-imalat",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Kaynaklı İmalat",
    description: "TIG, MIG/MAG ve lazer kaynak ile birleştirme çözümleri.",
    content: [
      "TIG, MIG/MAG ve lazer kaynak teknolojilerimiz ile yüksek kaliteli kaynaklı imalat gerçekleştiriyoruz.",
      "Alüminyum, paslanmaz çelik ve özel alaşım kaynak işlemlerinde uzmanlaşmış ekibimizle hizmetinizdeyiz.",
    ],
    features: ["TIG Kaynak", "MIG/MAG Kaynak", "Lazer Kaynak", "Sertifikalı Kaynakçılar"],
    technicalSpecs: [
      { label: "Standart", value: "EN ISO 3834-2" },
      { label: "Sertifika", value: "EN 1090" },
      { label: "NDT", value: "RT, UT, PT, MT" },
      { label: "Malzemeler", value: "Al, SS, Ti, Ni" },
    ],
  },

  // ── Kabiliyetler > Üretim Altyapısı ──
  {
    slug: "makine-parkuru",
    category: "kabiliyetler",
    categoryLabel: "Üretim Altyapısı",
    title: "Makine Parkuru",
    description: "Son teknoloji CNC tezgahları ve üretim ekipmanlarımız.",
    content: [
      "40'dan fazla CNC tezgah ile donatılmış modern üretim tesisimizde kesintisiz üretim yapıyoruz. DMG Mori, Mazak ve Okuma gibi dünya liderlerinin tezgahlarını kullanarak endüstrinin en yüksek standartlarını karşılıyoruz.",
      "5 eksenli işleme merkezleri, çift milli CNC tornalar, wire EDM ve CMM ölçüm cihazlarımız ile her türlü karmaşık parçayı üretme kapasitesine sahibiz.",
    ],
    features: ["5 Eksen CNC", "CNC Torna", "Wire EDM", "CMM Ölçüm"],
    technicalSpecs: [
      { label: "Toplam Tezgah", value: "40+" },
      { label: "5 Eksen CNC", value: "8 adet" },
      { label: "CNC Torna", value: "12 adet" },
      { label: "CMM Cihazı", value: "3 adet" },
    ],
    advantages: ["7/24 kesintisiz üretim kapasitesi", "Dünya lideri tezgah markaları", "Yıllık bakım programı", "Gerçek zamanlı tezgah izleme"],
  },
  {
    slug: "malzeme-kutuphanesi",
    category: "kabiliyetler",
    categoryLabel: "Üretim Altyapısı",
    title: "Malzeme Kütüphanesi",
    description: "Geniş malzeme seçeneği ile her ihtiyaca uygun çözüm.",
    content: [
      "Alüminyum, paslanmaz çelik, titanyum, pirinç, bakır ve mühendislik plastikleri dahil 200'den fazla malzeme ile çalışıyoruz.",
      "Havacılık ve medikal sınıf malzemeler dahil sertifikalı malzeme tedariği sağlıyoruz. Her malzeme 3.1 sertifika ile tedarik edilir.",
    ],
    features: ["200+ Malzeme", "Sertifikalı Tedarik", "Havacılık Sınıf", "Malzeme Testi"],
    technicalSpecs: [
      { label: "Malzeme Sayısı", value: "200+" },
      { label: "Sertifika", value: "EN 10204 3.1" },
      { label: "Stok Malzeme", value: "50+ çeşit" },
      { label: "Tedarik Süresi", value: "1-5 iş günü" },
    ],
  },

  // ── Kabiliyetler > Kalite & Standartlar ──
  {
    slug: "kalite-kontrol",
    category: "kabiliyetler",
    categoryLabel: "Kalite & Standartlar",
    title: "Kalite Kontrol",
    description: "CMM ölçüm ve kapsamlı kalite kontrol süreçleri.",
    content: [
      "Zeiss ve Mitutoyo CMM cihazları ile boyutsal doğrulamadan yüzey pürüzlülüğü ölçümüne kadar kapsamlı kalite kontrol uyguluyoruz.",
      "FAIR (İlk Madde Onay Raporu), PPAP ve SPC süreçleri ile kaliteyi garanti altına alıyoruz.",
    ],
    features: ["CMM Ölçüm", "FAIR Raporu", "PPAP", "SPC Kontrol"],
    technicalSpecs: [
      { label: "CMM Hassasiyet", value: "±0.001mm" },
      { label: "Cihazlar", value: "Zeiss, Mitutoyo" },
      { label: "Ölçüm Alanı", value: "1200×900×700mm" },
      { label: "Yüzey Ölçüm", value: "Ra, Rz, Rmax" },
    ],
    processSteps: ["Giriş Kalite Kontrol", "Proses İçi Kontrol", "Final Kontrol", "CMM Ölçüm", "Kalite Raporu"],
  },
  {
    slug: "tolerans-hassasiyet",
    category: "kabiliyetler",
    categoryLabel: "Kalite & Standartlar",
    title: "Tolerans & Hassasiyet",
    description: "Mikron seviyesinde tolerans değerlerine ulaşma kapasitemiz.",
    content: [
      "±0.005mm genel tolerans ve ±0.001mm hassas tolerans değerlerine ulaşma kapasitemiz bulunmaktadır.",
      "Yüzey pürüzlülüğünde Ra 0.2µm'ye kadar işleme kabiliyetimiz mevcuttur. ISO 2768 standardına tam uyum sağlıyoruz.",
    ],
    features: ["±0.005mm Genel", "±0.001mm Hassas", "Ra 0.2µm Yüzey", "ISO 2768 Uyumu"],
    technicalSpecs: [
      { label: "Genel Tolerans", value: "±0.005mm" },
      { label: "Hassas Tolerans", value: "±0.001mm" },
      { label: "Yüzey Kalitesi", value: "Ra 0.2µm" },
      { label: "Standart", value: "ISO 2768-f/mK" },
    ],
  },

  // ── Kabiliyetler > Mühendislik Desteği ──
  {
    slug: "tasarim-rehberi-dfm",
    category: "kabiliyetler",
    categoryLabel: "Mühendislik Desteği",
    title: "Tasarım Rehberi (DFM)",
    description: "Üretilebilirlik için tasarım desteği ve optimizasyon.",
    content: [
      "Design for Manufacturing (DFM) analizi ile tasarımlarınızı üretilebilirlik açısından optimize ediyoruz.",
      "Maliyet düşürme, tolerans optimizasyonu ve malzeme seçimi konusunda mühendislik desteği sağlıyoruz.",
    ],
    features: ["DFM Analizi", "Maliyet Optimizasyonu", "Tolerans Önerisi", "Malzeme Seçimi"],
    technicalSpecs: [
      { label: "Analiz Süresi", value: "24-48 saat" },
      { label: "Format", value: "PDF rapor" },
      { label: "İçerik", value: "Maliyet + kalite" },
      { label: "Revizyon", value: "2 tur dahil" },
    ],
  },
  {
    slug: "yuzey-islemleri-muhendislik",
    category: "kabiliyetler",
    categoryLabel: "Mühendislik Desteği",
    title: "Yüzey İşlemleri",
    description: "Yüzey işlem seçimi ve mühendislik desteği.",
    content: [
      "Uygulamanıza en uygun yüzey işlem yöntemini belirlemenize yardımcı oluyoruz.",
      "Korozyon direnci, aşınma dayanımı ve estetik gereksinimlere göre optimum çözüm öneriyoruz.",
    ],
    features: ["İşlem Seçimi", "Korozyon Analizi", "Aşınma Testi", "Estetik Çözümler"],
  },

  // ── Kabiliyetler > Prototipten Seri Üretime ──
  {
    slug: "dusuk-hacimli-uretim",
    category: "kabiliyetler",
    categoryLabel: "Prototipten Seri Üretime",
    title: "Düşük Hacimli Üretim",
    description: "1-1000 adet arası küçük parti üretim çözümleri.",
    content: [
      "Prototipten başlayarak 1-1000 adet arası düşük hacimli üretim hizmeti sunuyoruz.",
      "Hızlı teslim süreleri ve esnek üretim planlaması ile küçük partilerinizi karşılıyoruz.",
    ],
    features: ["1-1000 Adet", "Hızlı Teslim", "Esnek Planlama", "Prototip Geçişi"],
    technicalSpecs: [
      { label: "Min. Adet", value: "1 adet" },
      { label: "Teslim Süresi", value: "3-10 iş günü" },
      { label: "Setup Maliyeti", value: "Minimize edilmiş" },
      { label: "Kalite", value: "Seri üretim eşdeğeri" },
    ],
  },
  {
    slug: "seri-imalat",
    category: "kabiliyetler",
    categoryLabel: "Prototipten Seri Üretime",
    title: "Seri İmalat",
    description: "Yüksek hacimli seri üretim çözümleri.",
    content: [
      "Otomatik besleme sistemleri ve robot entegrasyonu ile yüksek hacimli seri üretim gerçekleştiriyoruz.",
      "Tutarlı kalite, rekabetçi fiyat ve zamanında teslimat garantisi sunuyoruz.",
    ],
    features: ["Yüksek Hacim", "Robot Entegrasyonu", "Otomatik Besleme", "Tutarlı Kalite"],
    technicalSpecs: [
      { label: "Kapasite", value: "100K+ adet/ay" },
      { label: "OEE", value: "%85+" },
      { label: "Cpk", value: "≥1.67" },
      { label: "Teslim", value: "JIT uyumlu" },
    ],
  },

  // ── Kabiliyetler > Süreç & Operasyon ──
  {
    slug: "proje-yonetimi",
    category: "kabiliyetler",
    categoryLabel: "Süreç & Operasyon",
    title: "Proje Yönetimi",
    description: "Baştan sona proje yönetimi ve koordinasyon.",
    content: [
      "Tekliften teslimata kadar tüm süreçleri yöneten deneyimli proje yöneticilerimiz bulunmaktadır.",
      "Haftalık ilerleme raporları, milestone takibi ve proaktif iletişim ile projelerinizi güvende tutuyoruz.",
    ],
    features: ["Proje Yöneticisi", "İlerleme Raporu", "Milestone Takibi", "Risk Yönetimi"],
  },
  {
    slug: "tedarik-zinciri",
    category: "kabiliyetler",
    categoryLabel: "Süreç & Operasyon",
    title: "Tedarik Zinciri",
    description: "Malzeme tedarikinden lojistiğe uçtan uca tedarik zinciri yönetimi.",
    content: [
      "Sertifikalı malzeme tedarikinden nihai ürün lojistiğine kadar tedarik zinciri yönetimi sağlıyoruz.",
      "JIT (Just-in-Time) teslimat, kanban sistemi ve güvenli stok yönetimi çözümleri sunuyoruz.",
    ],
    features: ["JIT Teslimat", "Kanban Sistemi", "Stok Yönetimi", "Lojistik Çözüm"],
  },
  {
    slug: "operasyonel-verimlilik",
    category: "kabiliyetler",
    categoryLabel: "Süreç & Operasyon",
    title: "Operasyonel Verimlilik",
    description: "Yalın üretim ve sürekli iyileştirme yaklaşımı.",
    content: [
      "Yalın üretim prensipleri ve sürekli iyileştirme (Kaizen) yaklaşımı ile operasyonel verimliliği maksimize ediyoruz.",
      "OEE takibi, setup süresi optimizasyonu ve atık azaltma programları uyguluyoruz.",
    ],
    features: ["Yalın Üretim", "Kaizen", "OEE Takibi", "Atık Azaltma"],
  },

  // ── Endüstriyel > Yüksek Teknoloji ──
  {
    slug: "havacilik-uzay",
    category: "endustriyel",
    categoryLabel: "Yüksek Teknoloji",
    title: "Havacılık & Uzay",
    description: "AS9100D sertifikalı havacılık ve uzay sanayi parça üretimi.",
    content: [
      "AS9100D sertifikalı üretim tesisimizde havacılık ve uzay sanayi için kritik parçalar üretiyoruz. Titanyum, Inconel ve havacılık alüminyum alaşımlarında uzmanlaşmış ekibimizle hizmetinizdeyiz.",
      "NADCAP akreditasyonlu özel proses kabiliyetlerimiz ile havacılık endüstrisinin en katı gereksinimlerini karşılıyoruz. %100 izlenebilirlik ve tam dokümantasyon sağlıyoruz.",
    ],
    features: ["AS9100D Sertifikalı", "Titanyum İşleme", "Inconel İşleme", "NADCAP Uyumu"],
    technicalSpecs: [
      { label: "Sertifika", value: "AS9100D" },
      { label: "İzlenebilirlik", value: "%100" },
      { label: "Malzemeler", value: "Ti-6Al-4V, Inconel 718" },
      { label: "Tolerans", value: "±0.005mm" },
    ],
    advantages: ["AS9100D tam uyum", "%100 izlenebilirlik sistemi", "NADCAP akreditasyonlu prosesler", "Kritik uçuş parçası deneyimi"],
  },
  {
    slug: "savunma-sanayi",
    category: "endustriyel",
    categoryLabel: "Yüksek Teknoloji",
    title: "Savunma Sanayi",
    description: "Savunma sanayi standartlarında hassas parça üretimi.",
    content: [
      "Savunma sanayi projelerinde yüksek güvenlik standartlarında üretim gerçekleştiriyoruz.",
      "MIL-SPEC gereksinimlerine uygun malzeme ve işleme süreçleri uyguluyoruz.",
    ],
    features: ["MIL-SPEC Uyumu", "Gizlilik Protokolü", "İzlenebilirlik", "Sertifikalı Üretim"],
    technicalSpecs: [
      { label: "Standart", value: "MIL-SPEC" },
      { label: "Güvenlik", value: "NATO seviyesi" },
      { label: "Malzemeler", value: "Çelik, Al, Ti" },
      { label: "NDT", value: "Zorunlu" },
    ],
  },
  {
    slug: "robotik",
    category: "endustriyel",
    categoryLabel: "Yüksek Teknoloji",
    title: "Robotik",
    description: "Robot bileşenleri ve otomasyon parçaları üretimi.",
    content: [
      "Endüstriyel robotlar, cobot'lar ve otomasyon sistemleri için hassas mekanik bileşenler üretiyoruz.",
      "Aktüatör gövdeleri, eklem parçaları ve gripper bileşenlerinde uzmanlaşmış çözümler sunuyoruz.",
    ],
    features: ["Robot Bileşenleri", "Aktüatör Gövdesi", "Eklem Parçaları", "Gripper Bileşenleri"],
    technicalSpecs: [
      { label: "Tolerans", value: "±0.005mm" },
      { label: "Malzeme", value: "7075-T6, SS316" },
      { label: "Yüzey", value: "Ra 0.4µm" },
      { label: "Seri Üretim", value: "100-10K adet" },
    ],
  },

  // ── Endüstriyel > Seri Üretim ──
  {
    slug: "otomotiv",
    category: "endustriyel",
    categoryLabel: "Seri Üretim",
    title: "Otomotiv",
    description: "IATF 16949 sertifikalı otomotiv parça üretimi.",
    content: [
      "IATF 16949 sertifikalı üretim süreçlerimiz ile otomotiv sektörüne yüksek hacimli parça üretimi yapıyoruz.",
      "Motor bileşenleri, şanzıman parçaları ve fren sistemi komponentleri üretiyoruz.",
    ],
    features: ["IATF 16949", "Motor Bileşenleri", "Şanzıman Parçaları", "Fren Sistemi"],
    technicalSpecs: [
      { label: "Sertifika", value: "IATF 16949" },
      { label: "PPAP Seviyesi", value: "Level 3-5" },
      { label: "Cpk", value: "≥1.67" },
      { label: "Kapasite", value: "50K+ adet/ay" },
    ],
  },
  {
    slug: "medikal",
    category: "endustriyel",
    categoryLabel: "Seri Üretim",
    title: "Medikal",
    description: "ISO 13485 uyumlu medikal cihaz ve implant parça üretimi.",
    content: [
      "Medikal cihaz bileşenleri, cerrahi aletler ve implant parçaları üretiminde uzmanlaşmış çözümler sunuyoruz.",
      "ISO 13485 ve FDA gereksinimlerine uygun üretim süreçleri uyguluyoruz.",
    ],
    features: ["ISO 13485", "Cerrahi Aletler", "İmplant Parçaları", "FDA Uyumu"],
    technicalSpecs: [
      { label: "Sertifika", value: "ISO 13485" },
      { label: "FDA", value: "Uyumlu" },
      { label: "Malzeme", value: "Ti Gr5, SS 316L" },
      { label: "Temiz Oda", value: "Class 7" },
    ],
  },
  {
    slug: "yelken-yat-sistemleri",
    category: "endustriyel",
    categoryLabel: "Seri Üretim",
    title: "Yelken & Yat Sistemleri",
    description: "Denizcilik sektörü için korozyona dayanıklı parça üretimi.",
    content: [
      "Yelken ve yat sistemleri için korozyona dayanıklı, deniz suyu uyumlu parçalar üretiyoruz.",
      "Paslanmaz çelik, bronz ve özel alaşımlarla denizcilik bileşenleri imal ediyoruz.",
    ],
    features: ["Korozyon Direnci", "Deniz Suyu Uyumu", "Paslanmaz Çelik", "Bronz İşleme"],
    technicalSpecs: [
      { label: "Malzeme", value: "SS 316L, Bronz" },
      { label: "Tuz Testi", value: "1000+ saat" },
      { label: "Yüzey", value: "Elektropolisaj" },
      { label: "Standart", value: "DNV-GL" },
    ],
  },

  // ── Endüstriyel > Endüstriyel Sistemler ──
  {
    slug: "hidrolik-pnomatik",
    category: "endustriyel",
    categoryLabel: "Endüstriyel Sistemler",
    title: "Hidrolik & Pnömatik",
    description: "Hidrolik ve pnömatik sistem bileşenleri üretimi.",
    content: [
      "Hidrolik ve pnömatik sistemler için yüksek basınç dayanımlı bileşenler üretiyoruz.",
      "Valf gövdeleri, silindir parçaları ve manifold blokları imal ediyoruz.",
    ],
    features: ["Valf Gövdesi", "Silindir Parçası", "Manifold Blok", "Yüksek Basınç"],
    technicalSpecs: [
      { label: "Basınç", value: "350 bar" },
      { label: "Sızdırmazlık", value: "O-ring yüzey Ra 0.4" },
      { label: "Malzeme", value: "C45, 42CrMo4" },
      { label: "Test", value: "Basınç testi" },
    ],
  },
  {
    slug: "boru-baglanti-parcalari",
    category: "endustriyel",
    categoryLabel: "Endüstriyel Sistemler",
    title: "Boru & Bağlantı Parçaları",
    description: "Endüstriyel boru ve bağlantı elemanları üretimi.",
    content: [
      "Endüstriyel boru sistemleri için özel bağlantı parçaları, flanşlar ve adaptörler üretiyoruz.",
      "Farklı standartlara (ANSI, DIN, JIS) uygun bağlantı elemanları imal ediyoruz.",
    ],
    features: ["Flanş", "Adaptör", "Bağlantı Parçası", "Çoklu Standart"],
    technicalSpecs: [
      { label: "Standartlar", value: "ANSI, DIN, JIS" },
      { label: "Basınç Sınıfı", value: "PN6-PN40" },
      { label: "Çap Aralığı", value: "DN15-DN600" },
      { label: "Malzeme", value: "SS, CS, Duplex" },
    ],
  },
  {
    slug: "iklim-teknolojileri",
    category: "endustriyel",
    categoryLabel: "Endüstriyel Sistemler",
    title: "İklim Teknolojileri",
    description: "HVAC ve soğutma sistemleri için parça üretimi.",
    content: [
      "HVAC, soğutma ve havalandırma sistemleri için hassas mekanik bileşenler üretiyoruz.",
      "Kompresör parçaları, valf bileşenleri ve ısı eşanjör parçaları imal ediyoruz.",
    ],
    features: ["Kompresör Parçası", "Valf Bileşeni", "Isı Eşanjör", "HVAC Sistemleri"],
    technicalSpecs: [
      { label: "Sıcaklık", value: "-40°C / +200°C" },
      { label: "Basınç", value: "100 bar" },
      { label: "Sızdırmazlık", value: "Helyum test" },
      { label: "Malzeme", value: "Al, Cu, SS" },
    ],
  },

  // ── Endüstriyel > Üretim Çözümleri ──
  {
    slug: "prototip-uretim",
    category: "endustriyel",
    categoryLabel: "Üretim Çözümleri",
    title: "Prototip Üretim",
    description: "Hızlı prototipleme ve konsept doğrulama hizmetleri.",
    content: [
      "Tasarım konseptlerinizi hızla fiziksel ürünlere dönüştürüyoruz. 3-5 iş günü içinde prototip teslimatı ile geliştirme sürecinizi hızlandırıyoruz.",
      "Farklı malzeme ve yüzey işlemi seçenekleri ile nihai ürüne en yakın prototipler üretiyoruz.",
    ],
    features: ["Hızlı Teslim", "Konsept Doğrulama", "Tekrar Üretim", "Maliyet Etkin"],
    technicalSpecs: [
      { label: "Teslim Süresi", value: "3-5 iş günü" },
      { label: "Min. Adet", value: "1 adet" },
      { label: "Tolerans", value: "Seri üretim eşdeğer" },
      { label: "Malzeme", value: "Gerçek malzeme" },
    ],
  },
  {
    slug: "kucuk-seri",
    category: "endustriyel",
    categoryLabel: "Üretim Çözümleri",
    title: "Küçük Seri",
    description: "10-500 adet küçük seri üretim çözümleri.",
    content: [
      "Küçük seri üretim ihtiyaçlarınızı esnek ve maliyet etkin bir şekilde karşılıyoruz.",
      "Prototipten küçük seriye sorunsuz geçiş sağlıyoruz.",
    ],
    features: ["10-500 Adet", "Esnek Üretim", "Hızlı Geçiş", "Maliyet Optimizasyonu"],
    technicalSpecs: [
      { label: "Adet Aralığı", value: "10-500" },
      { label: "Teslim", value: "1-3 hafta" },
      { label: "Kalite", value: "PPAP Level 3" },
      { label: "Fiyat", value: "Hacim indirimi" },
    ],
  },
  {
    slug: "seri-uretim",
    category: "endustriyel",
    categoryLabel: "Üretim Çözümleri",
    title: "Seri Üretim",
    description: "Yüksek hacimli seri üretim kapasitesi.",
    content: [
      "Otomatik üretim hatlarımız ile yüksek hacimli seri üretim gerçekleştiriyoruz.",
      "Robotik otomasyon ve palet sistemleri ile 7/24 kesintisiz üretim kapasitemiz bulunmaktadır.",
    ],
    features: ["7/24 Üretim", "Robot Otomasyon", "Palet Sistemi", "Yüksek Kapasite"],
    technicalSpecs: [
      { label: "Kapasite", value: "100K+ adet/ay" },
      { label: "Otomasyon", value: "Robot + Palet" },
      { label: "OEE", value: "%85+" },
      { label: "Teslim", value: "JIT / Kanban" },
    ],
  },
  {
    slug: "ozel-projeler",
    category: "endustriyel",
    categoryLabel: "Üretim Çözümleri",
    title: "Özel Projeler",
    description: "Standart dışı özel mühendislik projeleri.",
    content: [
      "Standart çözümlerin yetersiz kaldığı özel mühendislik projeleri için anahtar teslim çözümler sunuyoruz.",
      "Tasarımdan üretime, montajdan teste kadar tüm süreçleri yönetiyoruz.",
    ],
    features: ["Anahtar Teslim", "Özel Tasarım", "Komple Çözüm", "Danışmanlık"],
  },

  // ── Endüstriyel > Enerji & Altyapı ──
  {
    slug: "yenilenebilir-enerji",
    category: "endustriyel",
    categoryLabel: "Enerji & Altyapı",
    title: "Yenilenebilir Enerji",
    description: "Rüzgar ve güneş enerjisi sistemleri için parça üretimi.",
    content: [
      "Rüzgar türbini bileşenleri, güneş paneli montaj sistemleri ve enerji depolama parçaları üretiyoruz.",
      "Yenilenebilir enerji sektörünün büyümesine katkı sağlayan hassas mühendislik çözümleri sunuyoruz.",
    ],
    features: ["Rüzgar Türbini", "Güneş Paneli", "Montaj Sistemi", "Enerji Depolama"],
    technicalSpecs: [
      { label: "Malzeme", value: "SS, GGG-40, Al" },
      { label: "Koruma", value: "Hot-dip galvaniz" },
      { label: "Dayanım", value: "25+ yıl ömür" },
      { label: "Standart", value: "IEC 61400" },
    ],
  },
  {
    slug: "petrol-gaz",
    category: "endustriyel",
    categoryLabel: "Enerji & Altyapı",
    title: "Petrol & Gaz",
    description: "Petrol ve gaz sektörü için yüksek dayanımlı parça üretimi.",
    content: [
      "Petrol ve gaz sektörünün zorlu çalışma koşullarına uygun yüksek dayanımlı parçalar üretiyoruz.",
      "API standartlarına uygun boru bağlantıları, valf bileşenleri ve kuyu ekipmanları imal ediyoruz.",
    ],
    features: ["API Uyumu", "Yüksek Basınç", "Korozyon Direnci", "Kuyu Ekipmanı"],
    technicalSpecs: [
      { label: "Standart", value: "API 6A, 6D" },
      { label: "Basınç", value: "15000 PSI" },
      { label: "Sıcaklık", value: "-46°C / +343°C" },
      { label: "NDT", value: "RT, UT, MPI" },
    ],
  },
  {
    slug: "guc-dagitim-sistemleri",
    category: "endustriyel",
    categoryLabel: "Enerji & Altyapı",
    title: "Güç Dağıtım Sistemleri",
    description: "Elektrik dağıtım ve güç sistemleri bileşenleri.",
    content: [
      "Elektrik dağıtım panoları, transformatör bileşenleri ve güç dağıtım sistemi parçaları üretiyoruz.",
      "Bakır ve alüminyum iletken bileşenler ile enerji altyapısına katkı sağlıyoruz.",
    ],
    features: ["Pano Bileşeni", "Transformatör", "İletken Parça", "Güç Sistemleri"],
    technicalSpecs: [
      { label: "Malzeme", value: "Cu, Al, SS" },
      { label: "İletkenlik", value: "IACS %99+" },
      { label: "Gerilim", value: "36kV'a kadar" },
      { label: "Standart", value: "IEC 62271" },
    ],
  },
  {
    slug: "madencilik-ekipmanlari",
    category: "endustriyel",
    categoryLabel: "Enerji & Altyapı",
    title: "Madencilik Ekipmanları",
    description: "Madencilik makineleri için aşınmaya dayanıklı parça üretimi.",
    content: [
      "Madencilik sektörünün ağır çalışma koşullarına uygun, aşınmaya dayanıklı parçalar üretiyoruz.",
      "Kırıcı bileşenleri, konveyör parçaları ve delici ekipman komponentleri imal ediyoruz.",
    ],
    features: ["Aşınma Direnci", "Kırıcı Bileşeni", "Konveyör Parçası", "Ağır İş"],
    technicalSpecs: [
      { label: "Sertlik", value: "55-65 HRC" },
      { label: "Malzeme", value: "Hardox, Manganez" },
      { label: "Ağırlık", value: "500kg'a kadar" },
      { label: "Isıl İşlem", value: "İndüksiyon sert." },
    ],
  },
];

export const getPageBySlug = (slug: string): ServicePageData | undefined =>
  servicePages.find((p) => p.slug === slug);

export const getPagesByCategory = (category: string): ServicePageData[] =>
  servicePages.filter((p) => p.category === category);

export interface ServicePageData {
  slug: string;
  category: "hizmetler" | "kabiliyetler" | "endustriyel";
  categoryLabel: string;
  title: string;
  description: string;
  content: string[];
  features?: string[];
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
      "Mas Technic olarak, 3 eksenli, 4 eksenli ve 5 eksenli CNC freze tezgahlarımızla karmaşık geometrilere sahip parçaların üretimini gerçekleştiriyoruz.",
      "Havacılık, otomotiv, medikal ve savunma sanayi gibi kritik sektörlere yönelik ±0.005mm hassasiyette frezeleme çözümleri sunuyoruz.",
    ],
    features: ["3-4-5 Eksen Frezeleme", "Yüksek Hız İşleme (HSM)", "Büyük Parça Kapasitesi", "Seri & Prototip Üretim"],
  },
  {
    slug: "cnc-tornalama",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "CNC Tornalama",
    description: "Hassas CNC torna tezgahlarıyla silindirik ve dönel parça üretimi.",
    content: [
      "CNC torna tezgahlarımız ile yüksek hassasiyetli silindirik parça üretimi gerçekleştiriyoruz.",
      "Canlı takım özellikli torna tezgahlarımız sayesinde tek bağlamada hem tornalama hem frezeleme işlemlerini tamamlıyoruz.",
    ],
    features: ["Canlı Takımlı Tornalama", "Çift Milli Üretim", "Uzun Parça İşleme", "Mikro Tornalama"],
  },
  {
    slug: "hassas-mikro-isleme",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "Hassas Mikro İşleme",
    description: "Mikron seviyesinde hassasiyet gerektiren küçük ve karmaşık parçaların üretimi.",
    content: [
      "Mikro işleme kabiliyetimiz ile medikal implantlar, elektronik bileşenler ve hassas mekanik parçalar üretiyoruz.",
      "±0.001mm tolerans değerlerine ulaşabilen özel tezgahlarımız ile en zorlu uygulamaları karşılıyoruz.",
    ],
    features: ["Mikron Hassasiyet", "Küçük Parça Uzmanlığı", "Medikal Uygunluk", "Temiz Oda İşleme"],
  },
  {
    slug: "derin-delik-raybalama",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "Derin Delik & Raybalama",
    description: "Derin delik delme ve hassas raybalama işlemleri.",
    content: [
      "Özel derin delik delme tezgahlarımız ile uzun ve dar çaplı deliklerin işlenmesini gerçekleştiriyoruz.",
      "Raybalama işlemleri ile delik yüzey kalitesini ve boyutsal doğruluğu en üst seviyeye taşıyoruz.",
    ],
    features: ["Derin Delik Delme", "Hassas Raybalama", "Gun Drill Teknolojisi", "Yüksek Yüzey Kalitesi"],
  },

  // ── Hizmetler > Ön Üretim ──
  {
    slug: "enjeksiyon-kalibi",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Enjeksiyon Kalıbı",
    description: "Plastik enjeksiyon kalıp tasarımı ve üretimi.",
    content: [
      "Yüksek hassasiyetli plastik enjeksiyon kalıplarının tasarımını ve üretimini gerçekleştiriyoruz.",
      "Prototip kalıplardan seri üretim kalıplarına kadar geniş bir yelpazede hizmet sunuyoruz.",
    ],
    features: ["Kalıp Tasarımı", "Prototip Kalıp", "Seri Üretim Kalıbı", "Bakım & Revizyon"],
  },
  {
    slug: "basinçli-dokum",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Basınçlı Döküm",
    description: "Alüminyum ve zamak basınçlı döküm kalıp üretimi.",
    content: [
      "Basınçlı döküm kalıplarının tasarımı ve üretiminde uzmanlaşmış ekibimizle hizmetinizdeyiz.",
      "Alüminyum, zamak ve magnezyum döküm kalıpları için optimize edilmiş çözümler sunuyoruz.",
    ],
    features: ["Alüminyum Döküm", "Zamak Döküm", "Kalıp Optimizasyonu", "Simülasyon Destekli Tasarım"],
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
  },
  {
    slug: "anodizasyon",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Anodizasyon",
    description: "Alüminyum parçalar için anodizasyon ve sert anodizasyon.",
    content: [
      "Alüminyum parçalarınız için standart ve sert anodizasyon işlemleri sunuyoruz.",
      "Renkli anodizasyon seçenekleri ile estetik ve fonksiyonel koruma sağlıyoruz.",
    ],
    features: ["Standart Anodizasyon", "Sert Anodizasyon", "Renkli Anodizasyon", "MIL-A-8625 Uyumu"],
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
  },

  // ── Kabiliyetler > Üretim Altyapısı ──
  {
    slug: "makine-parkuru",
    category: "kabiliyetler",
    categoryLabel: "Üretim Altyapısı",
    title: "Makine Parkuru",
    description: "Son teknoloji CNC tezgahları ve üretim ekipmanlarımız.",
    content: [
      "40'dan fazla CNC tezgah ile donatılmış modern üretim tesisimizde kesintisiz üretim yapıyoruz.",
      "DMG Mori, Mazak ve Okuma gibi dünya liderlerinin tezgahlarını kullanıyoruz.",
    ],
    features: ["5 Eksen CNC", "CNC Torna", "Wire EDM", "CMM Ölçüm"],
  },
  {
    slug: "malzeme-kutuphanesi",
    category: "kabiliyetler",
    categoryLabel: "Üretim Altyapısı",
    title: "Malzeme Kütüphanesi",
    description: "Geniş malzeme seçeneği ile her ihtiyaca uygun çözüm.",
    content: [
      "Alüminyum, paslanmaz çelik, titanyum, pirinç, bakır ve mühendislik plastikleri dahil 200'den fazla malzeme ile çalışıyoruz.",
      "Havacılık ve medikal sınıf malzemeler dahil sertifikalı malzeme tedariği sağlıyoruz.",
    ],
    features: ["200+ Malzeme", "Sertifikalı Tedarik", "Havacılık Sınıf", "Malzeme Testi"],
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
  },
  {
    slug: "tolerans-hassasiyet",
    category: "kabiliyetler",
    categoryLabel: "Kalite & Standartlar",
    title: "Tolerans & Hassasiyet",
    description: "Mikron seviyesinde tolerans değerlerine ulaşma kapasitemiz.",
    content: [
      "±0.005mm genel tolerans ve ±0.001mm hassas tolerans değerlerine ulaşma kapasitemiz bulunmaktadır.",
      "Yüzey pürüzlülüğünde Ra 0.2µm'ye kadar işleme kabiliyetimiz mevcuttur.",
    ],
    features: ["±0.005mm Genel", "±0.001mm Hassas", "Ra 0.2µm Yüzey", "ISO 2768 Uyumu"],
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
      "AS9100D sertifikalı üretim tesisimizde havacılık ve uzay sanayi için kritik parçalar üretiyoruz.",
      "Titanyum, Inconel ve havacılık alüminyum alaşımlarında uzmanlaşmış ekibimizle hizmetinizdeyiz.",
    ],
    features: ["AS9100D Sertifikalı", "Titanyum İşleme", "Inconel İşleme", "NADCAP Uyumu"],
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
  },

  // ── Endüstriyel > Üretim Çözümleri ──
  {
    slug: "prototip-uretim",
    category: "endustriyel",
    categoryLabel: "Üretim Çözümleri",
    title: "Prototip Üretim",
    description: "Hızlı prototipleme ve konsept doğrulama hizmetleri.",
    content: [
      "Tasarım konseptlerinizi hızla fiziksel ürünlere dönüştürüyoruz.",
      "3-5 iş günü içinde prototip teslimatı ile geliştirme sürecinizi hızlandırıyoruz.",
    ],
    features: ["Hızlı Teslim", "Konsept Doğrulama", "Tekrar Üretim", "Maliyet Etkin"],
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
  },
];

export const getPageBySlug = (slug: string): ServicePageData | undefined =>
  servicePages.find((p) => p.slug === slug);

export const getPagesByCategory = (category: string): ServicePageData[] =>
  servicePages.filter((p) => p.category === category);

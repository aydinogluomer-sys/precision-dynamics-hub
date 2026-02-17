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
  machines?: { name: string; brand: string; specs: string }[];
  materials?: { name: string; grade: string; properties: string }[];
  faq?: { question: string; answer: string }[];
}

export const servicePages: ServicePageData[] = [
  // ── Hizmetler > Talaşlı İmalat ──
  {
    slug: "cnc-frezeleme",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "CNC Frezeleme",
    description:
      "5 eksenli CNC frezeleme merkezlerimiz ile karmaşık geometrileri yüksek hassasiyetle işliyoruz. Alüminyumdan titanyuma, plastikten kompozitlere kadar geniş malzeme yelpazesi.",
    content: [
      "Mas Technic olarak, DMG MORI DMU 65 monoBLOCK ve Mazak Variaxis i-700 gibi 5 eksenli CNC freze tezgahlarımızla karmaşık geometrilere sahip parçaları tek kurulumda tamamlıyoruz. 60 adet CAT 40 takım kapasiteli otomatik takım değiştirme sistemi sayesinde kesintisiz ve yüksek verimli üretim gerçekleştiriyoruz.",
      "Havacılık, otomotiv, medikal ve savunma sanayi gibi kritik sektörlere yönelik ±0.005mm konumlandırma hassasiyeti ve ±0.003mm tekrarlanabilirlik ile endüstrinin en yüksek standartlarını karşılıyoruz. 18.000 RPM mil hızı ve 36 m/dak ilerleme kapasitemiz ile yüzey kalitesini artırırken üretim sürelerini minimuma indiriyoruz.",
      "Alüminyum (6061, 7075), paslanmaz çelik (304, 316), karbon çelik, titanyum ve POM/Delrin gibi mühendislik malzemelerinde uzmanlaşmış ekibimizle hizmetinizdeyiz. Her projede DFM analizi uygulayarak maliyetleri optimize ediyor, STEP, IGES, SolidWorks, CATIA ve NX formatlarını doğrudan işleyebiliyoruz.",
    ],
    features: [
      "5 Eksenli İşleme — Karmaşık geometriler tek kurulumda",
      "±0.005mm Tolerans — Mikron seviyesinde tekrarlanabilirlik",
      "24 Saat Kesintisiz Üretim — Otomatik palet değiştirme sistemi",
      "CAD/CAM Entegrasyonu — Doğrudan dosya aktarımı ve simülasyon",
    ],
    technicalSpecs: [
      { label: "Çalışma Alanı (X/Y/Z)", value: "650×500×450mm" },
      { label: "Maks. Mil Hızı", value: "18.000 RPM" },
      { label: "Takım Kapasitesi", value: "60 adet (CAT 40)" },
      { label: "Konumlandırma Hassasiyeti", value: "±0.005mm" },
      { label: "Tekrarlanabilirlik", value: "±0.003mm" },
      { label: "En Hızlı İlerleme", value: "36 m/dak" },
    ],
    processSteps: [
      "CAD/CAM Programlama",
      "Fikstür Hazırlığı",
      "CNC İşleme",
      "CMM Ölçüm",
      "Kalite Raporu",
    ],
    advantages: [
      "Karmaşık geometrilerde tek seferde işleme",
      "HSM ile %40 daha hızlı üretim",
      "Otomatik takım değiştirme sistemi",
      "Gerçek zamanlı süreç izleme",
      "Prototipten seri üretime esnek çözümler (min. 1 adet)",
      "3-5 iş günü prototip, 7-15 iş günü seri üretim teslimatı",
    ],
    machines: [
      { name: "DMG MORI DMU 65 monoBLOCK", brand: "DMG MORI", specs: "5 eksen, 650×500×450mm, 18.000 RPM" },
      { name: "Mazak Variaxis i-700", brand: "Mazak", specs: "5 eksen, 730×460×460mm, 12.000 RPM" },
      { name: "Haas VF-4SS", brand: "Haas", specs: "3+2 eksen, 1270×508×635mm, 12.000 RPM" },
    ],
    materials: [
      { name: "Alüminyum", grade: "6061-T6 / 7075-T6", properties: "Hafif, korozyona dayanıklı, iyi işlenebilirlik" },
      { name: "Paslanmaz Çelik", grade: "304 / 316L", properties: "Yüksek korozyon direnci, hijyenik" },
      { name: "Karbon Çelik", grade: "1045 / 4140", properties: "Yüksek mukavemet, ısıl işleme uygun" },
      { name: "Titanyum", grade: "Ti6Al4V (Grade 5)", properties: "Hafif, biyouyumlu, yüksek mukavemet" },
      { name: "POM (Delrin)", grade: "Delrin 150 / 500", properties: "Düşük sürtünme, boyutsal kararlılık" },
    ],
    faq: [
      { question: "CNC frezeleme tolerans değerleriniz nedir?", answer: "Standart ±0.01mm, hassas işlemede ±0.005mm ve mikro işlemede ±0.001mm tolerans değerlerine ulaşabiliyoruz." },
      { question: "Hangi dosya formatlarını kabul ediyorsunuz?", answer: "STEP, IGES, SolidWorks (.sldprt), CATIA (.catpart), NX (.prt), Parasolid (.x_t) ve PDF/DWG teknik çizim formatlarını destekliyoruz." },
      { question: "Minimum sipariş adedi var mı?", answer: "Minimum 1 adet prototipten başlayarak seri üretime kadar her hacimde sipariş kabul ediyoruz." },
      { question: "Teslimat süreniz ne kadar?", answer: "Prototip için 3-5 iş günü, küçük seri için 7-10 iş günü, seri üretim için 15-20 iş günü teslimat süresi sunuyoruz." },
    ],
  },
  {
    slug: "cnc-tornalama",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "CNC Tornalama",
    description:
      "Çok eksenli torna merkezlerimiz ile mil, somun, gövde ve karmaşık döner parçaları tek kurulumda tamamlayabilme kapasitesi.",
    content: [
      "C eksenli ve Y eksenli CNC torna tezgahlarımız sayesinde frezeleme operasyonlarını entegre ediyor, off-center delik ve kanal açma işlemlerini tek bağlamada gerçekleştiriyoruz. DMG MORI NLX 2500, Mazak Quick Turn Smart 350 ve Doosan Puma TT 1800SY çift milli torna tezgahlarımız ile ön ve arka yüzey işleme operasyonlarını tek kurulumda tamamlıyoruz.",
      "Star SR-38 Swiss tip torna tezgahımız ile 0.5-38mm çap aralığında hassas mikro tornalama gerçekleştiriyoruz. 3m çapa kadar otomatik bar feeder sistemi ile sürekli üretim kapasitemiz mevcuttur. Canlı takım ölçer sayesinde takım kırılması kontrolü ve otomatik değişim sağlıyoruz.",
      "380mm maksimum torna çapı, 1000mm torna boyu ve 65mm mil deliği kapasitemiz ile geniş bir parça yelpazesine hizmet veriyoruz. C ekseni 0.001 derece hassasiyet ve 12 adet takım istasyonu ile yüksek hassasiyetli üretim gerçekleştiriyoruz.",
    ],
    features: [
      "C Eksenli Torna — Frezeleme operasyonları entegrasyonu",
      "Y Eksenli Torna — Off-center delik ve kanal açma",
      "Otomatik Bar Feeder — Sürekli üretim için 3m çapa kadar",
      "Canlı Takım Ölçer — Takım kırılması kontrolü ve otomatik değişim",
    ],
    technicalSpecs: [
      { label: "Maks. Torna Çapı", value: "380mm" },
      { label: "Maks. Torna Boyu", value: "1000mm" },
      { label: "Mil Deliği", value: "65mm" },
      { label: "Mil Hızı", value: "4.000 RPM" },
      { label: "C Ekseni Hassasiyeti", value: "0.001°" },
      { label: "Takım İstasyonu", value: "12 adet" },
    ],
    processSteps: [
      "Teknik Çizim İnceleme",
      "Malzeme Hazırlığı",
      "CNC Tornalama",
      "Ölçüm & Kontrol",
      "Paketleme",
    ],
    advantages: [
      "Tek bağlamada komple işleme",
      "Çift milli üretimle %50 setup tasarrufu",
      "Swiss tip mikro tornalama kabiliyeti (0.5-38mm)",
      "Bar feeder ile otomasyon",
    ],
    machines: [
      { name: "DMG MORI NLX 2500", brand: "DMG MORI", specs: "C/Y eksen, 380mm çap, 4.000 RPM" },
      { name: "Mazak Quick Turn Smart 350", brand: "Mazak", specs: "C eksen, 350mm çap, 3.500 RPM" },
      { name: "Doosan Puma TT 1800SY", brand: "Doosan", specs: "Çift mil, Y eksen, 1800mm boy" },
      { name: "Star SR-38 Swiss Tip", brand: "Star", specs: "0.5-38mm çap, 10.000 RPM" },
    ],
    materials: [
      { name: "Alüminyum", grade: "2011 / 6061 / 7075", properties: "Otomat kalite, serbest kesim" },
      { name: "Pirinç", grade: "CuZn39Pb3 (CW614N)", properties: "Mükemmel işlenebilirlik, dekoratif" },
      { name: "Paslanmaz Çelik", grade: "303 / 304 / 316", properties: "Korozyon direnci, hijyenik" },
      { name: "Çelik", grade: "1215 / 1045 / 4140", properties: "Yüksek mukavemet, ısıl işleme uygun" },
    ],
    faq: [
      { question: "CNC tornalama ile frezeleme arasındaki fark nedir?", answer: "CNC tornalama döner parçalar (mil, somun, gövde) için idealdir; iş parçası döner, takım sabit kalır. Frezeleme ise düz ve karmaşık geometriler için uygundur; takım döner, iş parçası sabit kalır." },
      { question: "Hangi çap aralığında tornalama yapabiliyorsunuz?", answer: "Swiss tip torna ile 0.5mm'den başlayarak konvansiyonel torna ile 380mm çapa kadar geniş bir aralıkta tornalama yapabiliyoruz." },
      { question: "Çift milli torna avantajı nedir?", answer: "Çift milli torna ile ön ve arka yüzey işlemeleri tek kurulumda tamamlanır, setup süresinden %50 tasarruf sağlanır ve merkezleme hataları ortadan kalkar." },
    ],
  },
  {
    slug: "hassas-mikro-isleme",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "Hassas Mikro İşleme",
    description:
      "0.01mm çapa kadar mikro parça üretimi. Medikal, elektronik ve optik sektörlerine özel ultra-hassas işleme çözümleri.",
    content: [
      "Mikro işleme kabiliyetimiz ile 0.01mm çapa kadar mikro mil, pim ve bağlantı elemanları üretiyoruz. ±0.001mm tolerans değerlerine ulaşabilen özel tezgahlarımız ile en zorlu uygulamaları karşılıyoruz. 60.000 RPM mil hızı kapasitemiz ile ultra-hassas yüzey kalitesi elde ediyoruz.",
      "Medikal sektöründe kateter, implant ve cerrahi aletler; elektronik sektöründe konnektör pimleri ve spacer'lar; optik sektöründe lens tutucular ve hizalama parçaları; saat sektöründe kadran, ibre ve mekanizma parçaları üretiyoruz.",
      "0.05mm çapa kadar mikro delme ve Ra 0.1 mikron altı yüzey pürüzlülüğü elde edebilen özel tezgahlarımız ile kontaminasyonsuz üretim ortamında hassas mikro parçalar üretiyoruz.",
    ],
    features: [
      "0.01mm Min Çap — Mikro mil, pim ve bağlantı elemanları",
      "±0.001mm Tolerans — Ultra-hassas toleranslar",
      "Mikro Delme — 0.05mm çapa kadar delik delme",
      "Yüzey Pürüzlülüğü — Ra 0.1 mikron ve altı",
    ],
    technicalSpecs: [
      { label: "Min. Parça Çapı", value: "0.01mm" },
      { label: "Maks. Parça Boyu", value: "150mm" },
      { label: "Tolerans", value: "±0.001mm" },
      { label: "Yüzey Pürüzlülüğü", value: "Ra 0.1µm" },
      { label: "Mil Hızı", value: "60.000 RPM" },
    ],
    processSteps: [
      "Mikro CAM Programlama",
      "Özel Takım Seçimi",
      "Mikro İşleme",
      "Optik Ölçüm",
      "Temizleme & Paketleme",
    ],
    advantages: [
      "Mikron altı hassasiyet",
      "Özel mikro takım stoku",
      "Kontaminasyonsuz üretim ortamı",
      "200x optik büyütme kontrolü",
    ],
  },
  {
    slug: "derin-delik-raybalama",
    category: "hizmetler",
    categoryLabel: "Talaşlı İmalat",
    title: "Derin Delik & Raybalama",
    description:
      "L/D oranı 100:1'e kadar derin delik delme ve honlama. Silindir gövdesi, hidrolik manifolt ve krank milleri için uzman çözümler.",
    content: [
      "Özel derin delik delme tezgahlarımız ile 3-50mm çap aralığında ve 2000mm derinliğe kadar hassas delik delme imkânı sunuyoruz. L/D oranı 100:1'e kadar (10mm çapta 1000mm derinlik) ulaşabilen kapasitemiz ile sektörün en zorlu gereksinimlerini karşılıyoruz.",
      "Gun drilling teknolojimiz ile tek kanallı derin delik delme, BTA delme ile yüksek hacimli üretim ve honing/raybalama ile yüzey kalitesi ve tolerans iyileştirme işlemleri gerçekleştiriyoruz. IT8-IT9 tolerans sınıfında ve Ra 1.6-3.2 yüzey pürüzlülüğünde sonuçlar elde ediyoruz.",
      "Hidrolik/pnömatik sektöründe silindir gövdesi ve piston kolu, enerji sektöründe türbin milleri ve krank gövdesi, savunma sektöründe namlu ve barut deposu, petrol & gaz sektöründe dırlon gövdesi ve valf gövdesi üretiminde uzmanlaşmış çözümler sunuyoruz.",
    ],
    features: [
      "100:1 L/D Oranı — 10mm çapta 1000mm derinlik",
      "Gun Drilling — Tek kanallı derin delik delme",
      "BTA Delme — Yüksek hacimli üretim için",
      "Honing/Raybalama — Yüzey kalitesi ve tolerans iyileştirme",
    ],
    technicalSpecs: [
      { label: "Delik Çap Aralığı", value: "3-50mm" },
      { label: "Maks. Delik Derinliği", value: "2000mm" },
      { label: "L/D Oranı", value: "100:1" },
      { label: "Tolerans", value: "IT8-IT9" },
      { label: "Yüzey Pürüzlülüğü", value: "Ra 1.6-3.2" },
    ],
    processSteps: [
      "Teknik Analiz",
      "Delme Yöntemi Seçimi",
      "Derin Delik İşleme",
      "Honing/Raybalama",
      "Ölçüm & Rapor",
    ],
    advantages: [
      "100:1 L/D oranı kapasitesi",
      "Gun drill ve BTA teknolojileri",
      "Honlama ile yüzey iyileştirme",
      "Hidrolik, enerji ve savunma sektörü deneyimi",
    ],
  },

  // ── Hizmetler > Ön Üretim ──
  {
    slug: "enjeksiyon-kalibi",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Enjeksiyon Kalıbı",
    description:
      "Alüminyum ve çelik kalıp imalatı. Hızlı prototip kalıplarından yüksek hacimli seri üretim kalıplarına kadar tüm ihtiyaçlarınıza çözüm.",
    content: [
      "Yüksek hassasiyetli plastik enjeksiyon kalıplarının tasarımını ve üretimini gerçekleştiriyoruz. Moldflow simülasyonu ile dolum optimizasyonu yaparak üretim kalitesini garanti altına alıyoruz. Çekme payı optimizasyonu ve gate/vent konumlandırma dahil kapsamlı DFM analizi sunuyoruz.",
      "Al 7075 ile 150 HB sertlikte prototip kalıplar (10.000+ parça ömrü), P20 ile 280-320 HB orta hacim kalıplar, H13 ile 45-52 HRC yüksek hacim kalıplar ve S136 ile 48-52 HRC korozyon dirençli kalıplar üretiyoruz. Sıcak yolluk sistemi desteği ile malzeme tasarrufu ve döngü süresi iyileştirmesi sağlıyoruz.",
      "Hızlı alüminyum kalıplar 2-3 hafta teslimat ile 10.000+ parça ömrü sunarken, çelik kalıplar 1.000.000+ parça ömrü ile yüksek hacimli üretim ihtiyaçlarınızı karşılıyor. Çok boşluklu tasarım ile verimlilik artışı sağlıyoruz.",
    ],
    features: [
      "Hızlı Alüminyum Kalıp — 2-3 hafta teslimat, 10.000+ parça ömrü",
      "Çelik Kalıp — 1.000.000+ parça ömrü, yüksek hacim",
      "Çok Boşluklu Tasarım — Verimlilik artışı",
      "Sıcak Yolluk Sistemi — Malzeme tasarrufu ve döngü iyileştirmesi",
    ],
    technicalSpecs: [
      { label: "Kalıp Boyutu (min)", value: "100×100×100mm" },
      { label: "Kavite Sayısı", value: "1-128 kavite" },
      { label: "Kalıp Ömrü", value: "1.000.000+ çevrim" },
      { label: "Tolerans", value: "±0.01mm" },
    ],
    processSteps: [
      "Ürün Analizi",
      "Kalıp Tasarımı",
      "Moldflow Simülasyonu",
      "CNC İşleme",
      "Deneme Basımı",
      "Teslimat",
    ],
    advantages: [
      "Moldflow akış simülasyonu dahil",
      "DFM analizi ve çekme payı optimizasyonu",
      "Hot runner sistemi desteği",
      "4 farklı kalıp malzemesi seçeneği (Al 7075, P20, H13, S136)",
    ],
  },
  {
    slug: "basinçli-dokum",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Basınçlı Döküm",
    description:
      "Alüminyum ve çinko alaşımları ile karmaşık geometrileri tek parça olarak döküm. Yüksek üretim hızı ve düşük birim maliyet avantajı.",
    content: [
      "120-1200 ton kilitleme kuvveti kapasitemiz ile geniş parça yelpazesinde basınçlı döküm kalıpları tasarlıyor ve üretiyoruz. 0.5mm minimum duvar kalınlığı ile ince duvarlı parçalar, ±0.05mm tolerans ile CT4-CT6 kalite sınıfında ve Ra 1.6-3.2 mikron yüzey pürüzlülüğünde sonuçlar elde ediyoruz.",
      "ADC12 (Al-Si) 280 MPa genel amaçlı, A380 320 MPa yüksek dayanımlı, ZA-8 (Zn-Al) 350 MPa döküm somun ve ZA-27 420 MPa ağır yük uygulamaları için optimize edilmiş döküm alaşımları ile çalışıyoruz.",
      "Akış simülasyonu ile kalıp tasarımını optimize ediyor, alüminyum, zamak ve magnezyum döküm kalıpları için en uygun çözümü sunuyoruz.",
    ],
    features: [
      "120-1200 Ton Kilitleme Kuvveti — Geniş parça yelpazesi",
      "0.5mm Min Duvar Kalınlığı — İnce duvarlı parçalar",
      "±0.05mm Tolerans — CT4-CT6 kalite sınıfı",
      "Yüzey Pürüzlülüğü — Ra 1.6-3.2 mikron",
    ],
    technicalSpecs: [
      { label: "Kilitleme Kuvveti", value: "120-1200 ton" },
      { label: "Min. Duvar Kalınlığı", value: "0.5mm" },
      { label: "Malzemeler", value: "ADC12, A380, ZA-8, ZA-27" },
      { label: "Kalıp Ömrü", value: "100K+ çevrim" },
      { label: "Tolerans", value: "±0.05mm (CT4-CT6)" },
      { label: "Yüzey Kalitesi", value: "Ra 1.6-3.2µm" },
    ],
    processSteps: [
      "Parça Analizi",
      "Kalıp Tasarımı",
      "Akış Simülasyonu",
      "Kalıp Üretimi",
      "Deneme Döküm",
      "Seri Üretim",
    ],
    advantages: [
      "Geniş alaşım seçeneği (Al, Zn, Mg)",
      "Akış simülasyonu ile optimize tasarım",
      "İnce duvarlı parça kapasitesi",
      "Yüksek üretim hızı ve düşük birim maliyet",
    ],
  },
  {
    slug: "silikon-kaliplama",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Silikon Kalıplama",
    description:
      "Vakumlu silikon kalıplama ile 1-100 adet arası kısa seri üretim. Master modelden 24 saatte ilk parçalar.",
    content: [
      "Vakumlu döküm teknolojimiz ile hava hapsiz, yüksek kaliteli yüzey elde ediyoruz. PU, silikon, polyester ve epoksi gibi çeşitli malzemelerle üretim gerçekleştiriyoruz. Pigment ile istenilen renk seçeneği sunuyoruz.",
      "PU 60A (60 Shore A, esnek ve yırtılmaz), PU 80A (80 Shore A, orta sertlik), PU 90A (90 Shore A, yüksek dayanım) ve Silikon 40A (40 Shore A, yüksek sıcaklık dayanımlı) malzeme seçenekleri ile geniş uygulama yelpazesine hizmet veriyoruz.",
      "Overmolding ile farklı sertlikte malzemeleri birlikte kullanabiliyoruz. Medikal, otomotiv ve endüstriyel uygulamalar için özel silikon kalıplama çözümleri sunuyoruz. Master modelden 24 saatte ilk parçalar teslim ediyoruz.",
    ],
    features: [
      "Vakumlu Döküm — Hava hapsiz, yüksek kaliteli yüzey",
      "Çeşitli Malzemeler — PU, silikon, polyester, epoksi",
      "Renk Seçenekleri — Pigment ile istenilen renk",
      "Overmolding — Farklı sertlikte malzemeler birlikte",
    ],
    technicalSpecs: [
      { label: "Shore Sertlik", value: "40A-90A" },
      { label: "Tolerans", value: "±0.05mm" },
      { label: "Malzeme", value: "PU, LSR, HTV, EPDM" },
      { label: "Sıcaklık Dayanımı", value: "-60°C / +300°C" },
      { label: "Lot Büyüklüğü", value: "1-100 adet" },
    ],
    processSteps: [
      "Master Model Hazırlığı",
      "Silikon Kalıp Dökümü",
      "Vakumlu Döküm",
      "Kürleme",
      "Kalıptan Çıkarma",
      "Kalite Kontrol",
    ],
    advantages: [
      "24 saatte ilk parça teslimatı",
      "1-100 adet kısa seri üretim",
      "4 farklı sertlik seçeneği",
      "Overmolding kapasitesi",
    ],
  },
  {
    slug: "fikstur-aparat-tasarimi",
    category: "hizmetler",
    categoryLabel: "Ön Üretim",
    title: "Fikstür & Aparat Tasarımı",
    description:
      "CNC işleme, montaj, kaynak ve kontrol operasyonları için özel tasarım fikstür ve aparat çözümleri. Tekrarlanabilirlik ve operatör bağımsızlığı.",
    content: [
      "Üretim süreçlerinizi hızlandıracak ve hassasiyeti artıracak özel fikstür ve aparatlar tasarlıyoruz. Torna fikstürü (milliyelti ve milliyetsiz), freze fikstürü (vise, vakumlu ve hidrolik), montaj fikstürü (operatör hatalarını önleme), kontrol fikstürü (ölçüm tekrarlanabilirliği) ve kaynak fikstürü (hizalama ve sabitleme) dahil geniş yelpazede çözümler sunuyoruz.",
      "CATIA ve SolidWorks ile 3D modelleme, kuvvet ve tolerans analizi simülasyonu, 3D baskı veya hızlı imalat ile prototip üretimi ve üretim ortamında doğrulama test & onay süreçleri ile profesyonel tasarım hizmeti veriyoruz.",
      "Çelik, alüminyum ve kompozit malzemelerle ±0.01mm tekrarlanabilirlik sağlayan fikstürler üretiyoruz. 3-5 iş günü tasarım, 5-10 iş günü üretim süresi ile hızlı teslimat garanti ediyoruz.",
    ],
    features: [
      "Torna Fikstürü — Milliyelti ve milliyetsiz",
      "Freze Fikstürü — Vise, vakumlu ve hidrolik",
      "Montaj Fikstürü — Operatör hatalarını önleme",
      "Kontrol Fikstürü — Ölçüm tekrarlanabilirliği",
      "Kaynak Fikstürü — Hizalama ve sabitleme",
    ],
    technicalSpecs: [
      { label: "Tekrarlanabilirlik", value: "±0.01mm" },
      { label: "Malzeme", value: "Çelik, Al, Kompozit" },
      { label: "Tasarım Süresi", value: "3-5 iş günü" },
      { label: "Üretim Süresi", value: "5-10 iş günü" },
    ],
    processSteps: [
      "İhtiyaç Analizi",
      "3D Modelleme (CATIA/SolidWorks)",
      "Simülasyon (Kuvvet & Tolerans)",
      "Prototip (3D Baskı / Hızlı İmalat)",
      "CNC İşleme & Montaj",
      "Test & Onay",
    ],
    advantages: [
      "CATIA/SolidWorks ile profesyonel tasarım",
      "Kuvvet ve tolerans simülasyonu",
      "3D baskı ile hızlı prototipleme",
      "Üretim ortamında doğrulama testi",
    ],
  },

  // ── Hizmetler > Yüzey İşlemleri ──
  {
    slug: "mekanik-yuzey-islemleri",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Mekanik Yüzey İşlemleri",
    description:
      "Kumlama, vibrasyonlu yüzme, parlatma ve pasivasyon ile yüzey kalitesini iyileştirme ve montaja hazır hale getirme.",
    content: [
      "Mekanik yüzey işlemleri ile parçalarınızın yüzey kalitesini istenen seviyeye getiriyoruz. Kumlama (shot blasting) ile temizleme ve yüzey pürüzlendirme, vibrasyonlu yüzme (tumbling) ile köşeli kısımları kırma, merkezsiz parlatma ile yuvarlak parçalar için yüzey iyileştirme, yüzey parlatma ile ayna parlaklığı ve fırçalama ile satine yüzey efekti elde ediyoruz.",
      "Cam kumu (0.1-0.5mm) ile hassas temizlik, alüminyum oksit (0.2-1.0mm) ile yüzey hazırlık, çelik grit (0.2-2.0mm) ile ağır temizlik ve soda (0.1-0.3mm) ile yumuşak temizlik gibi farklı abrasive malzemelerle çalışıyoruz.",
      "Ra 0.05µm'e kadar yüzey kalitesi, 2-8 bar kumlama basıncı ve 1500×800mm'ye kadar parça boyutu kapasitemiz ile geniş bir hizmet yelpazesi sunuyoruz.",
    ],
    features: [
      "Kumlama (Shot Blasting) — Temizleme ve yüzey pürüzlendirme",
      "Vibrasyonlu Yüzme (Tumbling) — Köşeli kısımları kırma",
      "Merkezsiz Parlatma — Yuvarlak parçalar için",
      "Yüzey Parlatma — Ayna parlaklığı",
      "Fırçalama — Satine yüzey efekti",
    ],
    technicalSpecs: [
      { label: "Yüzey Kalitesi", value: "Ra 0.05µm'e kadar" },
      { label: "Kumlama Basıncı", value: "2-8 bar" },
      { label: "Parlatma Seviyesi", value: "Ayna parlaklığı" },
      { label: "Maks. Parça Boyutu", value: "1500×800mm" },
    ],
    processSteps: [
      "Yüzey Analizi",
      "İşlem Yöntemi Seçimi",
      "Abrasive / Medya Seçimi",
      "Yüzey İşleme",
      "Kalite Kontrol",
    ],
    advantages: [
      "4 farklı abrasive malzeme seçeneği",
      "Ayna parlaklığına kadar parlatma",
      "Montaja hazır yüzey teslimatı",
      "Geniş parça boyutu kapasitesi",
    ],
  },
  {
    slug: "anodizasyon",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Anodizasyon",
    description:
      "Tip I, II ve III anodizasyon ile korozyon direnci, aşınma dayanımı ve elektriksel yalıtım. 20+ renk seçeneği ile dekoratif kaplama.",
    content: [
      "Alüminyum parçalarınız için Tip I (5-15µm, korozyon koruması), Tip II (10-25µm, korozyon + boya uyumu), Tip III (25-100µm, aşınma direnci) ve sert anodizasyon (25-75µm, elektriksel yalıtım) olmak üzere 4 farklı anodizasyon türü sunuyoruz.",
      "Siyah, sarı, kırmızı, mavi, yeşil, turuncu, mor, altın, bronz, füme ve naturel (renksiz) dahil 11+ renk seçeneği ile hem fonksiyonel hem dekoratif kaplama çözümleri sağlıyoruz. MIL-A-8625 standardına tam uyum garanti ediyoruz.",
      "2000×1000×800mm tank boyutları, 50 kg/parça maksimum ağırlık ve 5-50 mikron kaplama kalınlığı kapasitemiz ile geniş yelpazede anodizasyon hizmeti veriyoruz.",
    ],
    features: [
      "Tip I Anodizasyon — 5-15µm, korozyon koruması",
      "Tip II Anodizasyon — 10-25µm, korozyon + renkli kaplama",
      "Tip III (Sert) Anodizasyon — 25-100µm, aşınma direnci",
      "20+ Renk Seçeneği — Dekoratif kaplama",
    ],
    technicalSpecs: [
      { label: "Kaplama Kalınlığı", value: "5-100µm" },
      { label: "Sertlik (Sert Anod.)", value: "60-70 HRC" },
      { label: "Renk Seçeneği", value: "11+ renk" },
      { label: "Standart", value: "MIL-A-8625" },
      { label: "Tank Boyutu", value: "2000×1000×800mm" },
      { label: "Maks. Ağırlık", value: "50 kg/parça" },
    ],
    processSteps: [
      "Yüzey Temizliği",
      "Anodizasyon Banyosu",
      "Renklendirme",
      "Sızdırmazlık (Sealing)",
      "Kalite Kontrol",
    ],
    advantages: [
      "4 farklı anodizasyon tipi",
      "MIL-A-8625 tam uyum",
      "11+ renk seçeneği",
      "50 kg/parça kapasiteye kadar",
    ],
    faq: [
      { question: "Anodizasyon hangi metallere uygulanabilir?", answer: "Anodizasyon temel olarak alüminyum ve alaşımlarına uygulanır. Titanyum ve magnezyum da anodize edilebilir ancak en yaygın uygulama alüminyumdur." },
      { question: "Sert anodizasyon ile normal anodizasyon farkı nedir?", answer: "Sert anodizasyon (Tip III) 25-100µm kalınlıkta olup 60-70 HRC sertlik sağlar, aşınma direnci gerektiğinde tercih edilir. Normal anodizasyon (Tip II) 10-25µm olup genel korozyon koruması sağlar." },
      { question: "Hangi renklerde anodizasyon yapabiliyorsunuz?", answer: "Siyah, sarı, kırmızı, mavi, yeşil, turuncu, mor, altın, bronz, füme ve naturel (renksiz) dahil 11+ renk seçeneği sunuyoruz." },
      { question: "Anodizasyon kaplama ne kadar dayanıklıdır?", answer: "MIL-A-8625 standardına uygun kaplamalarımız ASTM B117 tuz testi ile 500+ saat korozyon direnci sağlar. Sert anodizasyon ile aşınma direnci önemli ölçüde artar." },
    ],
  },
  {
    slug: "kimyasal-islemler",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Kimyasal İşlemler",
    description:
      "Yağ giderme, pasivasyon, fosfatlama ve elektropolish ile yüzey temizliği ve sonraki işlemlere hazırlık.",
    content: [
      "Kimyasal yüzey işlemleri ile parçalarınızın korozyon direncini artırıyoruz. Endüstriyel yıkama ve ultrasonik yağ giderme, paslanmaz çelik korozyon koruması için pasivasyon, boya tutunması için fosfatlama yüzey hazırlığı, paslanmaz çelik parlatma için elektropolish ve köşeli kısımları yumuşatma için deburring işlemleri gerçekleştiriyoruz.",
      "ASTM B117 tuz testi standardına uygun 500+ saat korozyon direnci, 1-25µm kaplama kalınlığı ve ASTM A967 pasivasyon standardına tam uyum sağlıyoruz.",
    ],
    features: [
      "Yağ Giderme — Endüstriyel yıkama, ultrasonik",
      "Pasivasyon — Paslanmaz çelik korozyon koruması",
      "Fosfatlama — Boya tutunması için yüzey hazırlığı",
      "Elektropolish — Paslanmaz çelik parlatma",
      "Deburring — Köşeli kısımları yumuşatma",
    ],
    technicalSpecs: [
      { label: "Tuz Testi", value: "500+ saat" },
      { label: "Kaplama Kalınlığı", value: "1-25µm" },
      { label: "Standartlar", value: "ASTM B117" },
      { label: "Pasivasyon", value: "ASTM A967" },
    ],
    processSteps: [
      "Yüzey Analizi",
      "Ön Temizlik",
      "Kimyasal İşlem",
      "Durulama",
      "Kurutma & Kontrol",
    ],
    advantages: [
      "500+ saat tuz testi dayanımı",
      "ASTM standartlarına tam uyum",
      "Ultrasonik temizlik kapasitesi",
      "Sonraki işlemlere hazır yüzey",
    ],
  },
  {
    slug: "boya-koruyucu-kaplamalar",
    category: "hizmetler",
    categoryLabel: "Yüzey İşlemleri",
    title: "Boya & Koruyucu Kaplamalar",
    description:
      "Toz boya, ıslak boya, seramik kaplama ve özel koruyucu kaplamalar. Endüstriyel uygulamalardan dekoratif yüzeylere kadar.",
    content: [
      "Toz boya (60-120µm, çevre dostu ve dayanıklı), ıslak boya (25-50µm, düzgün yüzey), seramik kaplama (50-100µm, yüksek sıcaklık dayanımı) ve E-kap (20-40µm, elektriksel yalıtım) olmak üzere 4 farklı boya türü ile hizmet veriyoruz.",
      "RAL 9005 (Siyah), 9010 (Beyaz), 9006 (Gri), 3000 (Kırmızı), 5015 (Mavi), 6018 (Yeşil), 1003 (Sarı), 2004 (Turuncu) ve özel RAL renkleri dahil geniş renk yelpazesi sunuyoruz. 1000+ saat tuz testi dayanımı ve 260°C PTFE sıcaklık dayanımı ile üstün koruma sağlıyoruz.",
    ],
    features: [
      "Toz Boya — 60-120µm, çevre dostu ve dayanıklı",
      "Islak Boya — 25-50µm, düzgün yüzey",
      "Seramik Kaplama — 50-100µm, yüksek sıcaklık",
      "E-Kap — 20-40µm, elektriksel yalıtım",
    ],
    technicalSpecs: [
      { label: "Kaplama Kalınlığı", value: "20-120µm" },
      { label: "Sıcaklık Dayanımı", value: "260°C (PTFE)" },
      { label: "Sürtünme Katsayısı", value: "0.05 (PTFE)" },
      { label: "Tuz Testi", value: "1000+ saat" },
    ],
    processSteps: [
      "Yüzey Hazırlığı",
      "Astar Uygulama",
      "Boya / Kaplama",
      "Fırınlama / Kürleme",
      "Kalite Kontrol",
    ],
    advantages: [
      "4 farklı boya/kaplama türü",
      "RAL standart ve özel renkler",
      "1000+ saat tuz testi dayanımı",
      "260°C sıcaklık dayanımlı PTFE kaplama",
    ],
  },

  // ── Hizmetler > İşaretleme & Tanımlama ──
  {
    slug: "lazer-kazima",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "Lazer Kazıma",
    description:
      "Fiber lazer teknolojisi ile metal, plastik ve kompozit malzemelere yüksek kontrastlı, aşınmaz işaretleme. Barkod, QR kod ve seri numarası.",
    content: [
      "20W-100W güç aralığında fiber lazer sistemlerimiz ile 100×100mm işaretleme alanında, 0.1mm minimum karakter boyutunda ve 10.000 mm/s hızda yüksek performanslı işaretleme yapıyoruz. 0.01-0.5mm kazıma derinliği kontrolü ile hassas sonuçlar elde ediyoruz.",
      "100.000 saat fiber lazer ömrü ile uzun vadeli güvenilirlik sağlıyoruz. Çelik, alüminyum, plastik ve ahşap dahil çok malzemeli işaretleme kapasitemiz ve dinamik işaretleme özelliğimiz ile yuvarlak parçalarda da mükemmel sonuçlar elde ediyoruz.",
      "Seri numarası ve parti kodu, barkod ve QR kod, logo ve marka, teknik özellikler ve standartlar ile tarih ve üretim kodu işaretleme hizmetleri sunuyoruz.",
    ],
    features: [
      "0.01mm Kazıma Derinliği — Hassas kontrol",
      "100.000 Saat Lazer Ömrü — Fiber kaynak",
      "Çok Malzeme — Çelik, alüminyum, plastik, ahşap",
      "Dinamik İşaretleme — Yuvarlak parçalar için",
    ],
    technicalSpecs: [
      { label: "Lazer Gücü", value: "20W-100W" },
      { label: "İşaretleme Alanı", value: "100×100mm" },
      { label: "Min. Karakter", value: "0.1mm" },
      { label: "Hız", value: "10.000 mm/s" },
      { label: "Kazıma Derinliği", value: "0.01-0.5mm" },
    ],
    processSteps: [
      "Tasarım & Programlama",
      "Malzeme Analizi",
      "Parametre Ayarlama",
      "Lazer İşaretleme",
      "Okuma Doğrulama",
    ],
    advantages: [
      "100.000 saat fiber lazer ömrü",
      "10.000 mm/s işaretleme hızı",
      "Çoklu malzeme desteği",
      "Dinamik (yuvarlak parça) işaretleme",
    ],
  },
  {
    slug: "tavlama",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "Tavlama",
    description:
      "Stress giderme, yumuşatma, sertleştirme ve normalizasyon tavlama işlemleri ile malzeme mekanik özelliklerinin optimize edilmesi.",
    content: [
      "Stress giderme tavlaması (550-650°C, gerilme giderme), yumuşatma tavlaması (680-720°C, işlenebilirlik artırma), sertleştirme tavlaması (800-900°C, sertlik artışı) ve normalizasyon tavlaması (850-950°C, tane inceltme) olmak üzere 4 farklı tavlama türü sunuyoruz.",
      "Özellikle paslanmaz çelik ve titanyum parçalarda tercih edilen lazer tavlama yöntemimiz ile yüzeyde malzeme çıkarmadan renk değişimi yaparak işaretleme gerçekleştiriyoruz. Yüzey bütünlüğü korunarak altın, mavi ve siyah tonlarında renk değişimi sağlıyoruz.",
    ],
    features: [
      "Stress Giderme — 550-650°C, gerilme giderme",
      "Yumuşatma — 680-720°C, işlenebilirlik artırma",
      "Sertleştirme — 800-900°C, sertlik artışı",
      "Normalizasyon — 850-950°C, tane inceltme",
    ],
    technicalSpecs: [
      { label: "Yüzey Etkisi", value: "Sıfır derinlik" },
      { label: "Renk Aralığı", value: "Altın-Mavi-Siyah" },
      { label: "Uygunluk", value: "Medikal parça" },
      { label: "Dayanıklılık", value: "Kalıcı" },
    ],
    processSteps: [
      "Malzeme Analizi",
      "Tavlama Türü Seçimi",
      "Fırın / Lazer İşlemi",
      "Soğutma Kontrolü",
      "Sertlik & Mikro Yapı Testi",
    ],
    advantages: [
      "4 farklı tavlama türü",
      "Lazer tavlama ile yüzey bütünlüğü koruması",
      "Medikal parça uygunluğu",
      "Kalıcı ve aşınmaz renk değişimi",
    ],
  },
  {
    slug: "qr-datamatrix-kodlari",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "QR & DataMatrix Kodları",
    description:
      "ISO/IEC 16022 ve ISO/IEC 18004 standartlarına uygun DataMatrix ve QR kod işaretleme. Küçük alanda yüksek veri kapasitesi.",
    content: [
      "DataMatrix (2.5×2.5mm alanda 50 karakter), QR Code (5×5mm alanda 500 karakter) ve GS1-128 barkod formatlarında endüstriyel izlenebilirlik için kalıcı kod işaretleme hizmeti sunuyoruz.",
      "UID (Unique Identifier), GS1-128 Barkod, HIBC (Health Industry Bar Code) ve DoD IUID (Item Unique Identification) kodlama seçenekleri ile parça takibi, kalite kontrol ve envanter yönetimi çözümleri sağlıyoruz. ISO/IEC 16022 ve ISO 15415 doğrulama standartlarına tam uyum garanti ediyoruz.",
    ],
    features: [
      "DataMatrix — 2.5×2.5mm'de 50 karakter",
      "QR Code — 5×5mm'de 500 karakter",
      "GS1-128 Barkod — Standart barkod",
      "IUID Uyumu — Savunma sanayi izlenebilirlik",
    ],
    technicalSpecs: [
      { label: "Min. Modül Boyutu", value: "0.1mm" },
      { label: "Okuma Oranı", value: "%99.9+" },
      { label: "Standart", value: "ISO/IEC 16022" },
      { label: "Doğrulama", value: "ISO 15415" },
    ],
    processSteps: [
      "Kod Türü Seçimi",
      "Veri Girişi & Format",
      "Lazer İşaretleme",
      "Okuma Doğrulama",
      "ISO Uyum Raporu",
    ],
    advantages: [
      "Küçük alanda yüksek veri kapasitesi",
      "%99.9+ okuma oranı",
      "ISO/IEC standartlarına tam uyum",
      "Savunma sanayi IUID desteği",
    ],
  },
  {
    slug: "logo-markalama",
    category: "hizmetler",
    categoryLabel: "İşaretleme & Tanımlama",
    title: "Logo & Markalama",
    description:
      "Lazer, pad printing ve serigrafi ile ürünlerinize marka kimliği kazandırın. Kalıcı ve profesyonel görünüm.",
    content: [
      "Lazer işaretleme (kalıcı, yüksek kontrast, metal ve plastik), pad printing (kavisli yüzeyler, çok renkli), serigrafi (büyük yüzeyler, yüksek hacim) ve etiket (geçici, değiştirilebilir) olmak üzere 4 farklı markalama yöntemi sunuyoruz.",
      "Farklı malzeme türlerinde tutarlı ve profesyonel markalama sonuçları elde ediyoruz. 1200 DPI çözünürlük, ±0.005mm tekrarlanabilirlik ve 300×300mm'ye kadar işaretleme alanı ile yüksek kaliteli logo ve marka işaretleme yapıyoruz.",
    ],
    features: [
      "Lazer — Kalıcı, yüksek kontrast, metal/plastik",
      "Pad Printing — Kavisli yüzeyler, çok renkli",
      "Serigrafi — Büyük yüzeyler, yüksek hacim",
      "Etiket — Geçici, değiştirilebilir",
    ],
    technicalSpecs: [
      { label: "Çözünürlük", value: "1200 DPI" },
      { label: "Tekrarlanabilirlik", value: "±0.005mm" },
      { label: "Maks. Alan", value: "300×300mm" },
      { label: "Hız", value: "1000+ parça/saat" },
    ],
    processSteps: [
      "Tasarım İnceleme",
      "Yöntem Seçimi",
      "Numune Çalışması",
      "Seri İşaretleme",
      "Kalite Kontrol",
    ],
    advantages: [
      "4 farklı markalama yöntemi",
      "1200 DPI yüksek çözünürlük",
      "Kavisli yüzeylerde pad printing",
      "1000+ parça/saat seri üretim hızı",
    ],
  },

  // ── Hizmetler > Montaj & Birleştirme ──
  {
    slug: "insert-uygulama",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Insert Uygulama",
    description:
      "Metal insertlerin plastik ve metal parçalara ultrasonik, ısıl veya presle montajı. Somun, perçin ve pim uygulama.",
    content: [
      "Ultrasonik insert (plastik için, hızlı ve temiz), ısıl insert (yüksek çekme direnci), pres insert / self-tapping (ekonomik çözüm) ve mold-in insert (en yüksek dayanım) olmak üzere 4 farklı insert uygulama yöntemi sunuyoruz.",
      "Pirinç (nikel kaplamalı, genel amaçlı), çelik (çinko kaplamalı, yüksek dayanım) ve paslanmaz (kaplamasız, korozyon direnci) insert malzemeleri ile M2-M12 çap aralığında, 2000N+ çekme kuvveti ve 3 saniyenin altında çevrim süresi ile hızlı ve güçlü bağlantılar oluşturuyoruz.",
    ],
    features: [
      "Ultrasonik Insert — Plastik için, hızlı ve temiz",
      "Isıl Insert — Yüksek çekme direnci",
      "Pres Insert (Self-tapping) — Ekonomik çözüm",
      "Mold-in Insert — En yüksek dayanım",
    ],
    technicalSpecs: [
      { label: "Yöntem", value: "Ultrasonik / Isıl / Pres" },
      { label: "Çekme Kuvveti", value: "2000N+" },
      { label: "Insert Çapı", value: "M2-M12" },
      { label: "Çevrim Süresi", value: "<3 saniye" },
    ],
    processSteps: [
      "Insert Türü Seçimi",
      "Delik Hazırlığı",
      "Insert Yerleştirme",
      "Çekme Testi",
      "Kalite Kontrol",
    ],
    advantages: [
      "4 farklı insert uygulama yöntemi",
      "3 farklı insert malzemesi seçeneği",
      "2000N+ çekme kuvveti garantisi",
      "<3 saniye çevrim süresi",
    ],
  },
  {
    slug: "mekanik-montaj",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Mekanik Montaj",
    description:
      "Vida, somun, perçin ve klips montajı. Tork kontrollü sıkma ve otomatik besleme sistemleri ile yüksek verimlilik.",
    content: [
      "Vida ve somun montajı (tork kontrollü), pervane/pernos montajı (hidrolik presle), klips ve segman montajı (otomatik besleme), bearing montajı (özel fikstürlerle) ve O-ring/conta montajı (yağ ve toz korumalı) hizmetleri sunuyoruz.",
      "M3 (1.5-2.0 Nm), M4 (3.0-4.0 Nm), M5 (6.0-8.0 Nm) ve M6 (10.0-12.0 Nm) vida boyutlarında ±5% toleransla tork kontrollü sıkma gerçekleştiriyoruz. Fonksiyon testi, 1000+ ünite/gün kapasite ve seri numarası bazlı takip sistemi ile kaliteli montaj hizmeti sağlıyoruz.",
    ],
    features: [
      "Vida & Somun Montajı — Tork kontrollü",
      "Pervane/Pernos Montajı — Hidrolik presle",
      "Klips & Segman Montajı — Otomatik besleme",
      "Bearing & O-ring Montajı — Özel fikstürlerle",
    ],
    technicalSpecs: [
      { label: "Tork Kontrolü", value: "±5% hassasiyet" },
      { label: "Test", value: "Fonksiyon testi" },
      { label: "Kapasite", value: "1000+ ünite/gün" },
      { label: "Takip", value: "Seri no bazlı" },
    ],
    processSteps: [
      "Montaj Planı Hazırlama",
      "Bileşen Kontrolü",
      "Tork Kontrollü Montaj",
      "Fonksiyon Testi",
      "Paketleme & Etiketleme",
    ],
    advantages: [
      "Tork kontrollü hassas sıkma (±5%)",
      "Otomatik besleme sistemi ile yüksek verimlilik",
      "1000+ ünite/gün kapasite",
      "Seri numarası bazlı izlenebilirlik",
    ],
  },
  {
    slug: "kitting-paketleme",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Kitting & Paketleme",
    description:
      "Müşteriye özel kit oluşturma, etiketleme ve koruyucu ambalajlama. Tedarik zinciri verimliliğini artırın.",
    content: [
      "Vakumlu (nem ve toz koruması), ESD/antistatik (elektronik parçalar), köpük (kırılabilir parçalar) ve ahşap kasa (ağır ve değerli parçalar) paketleme seçenekleri ile ürünlerinizi güvenle teslim ediyoruz.",
      "Barkodlu etiket, RFID etiket, müşteriye özel etiket tasarımı ve çoklu dil desteği ile kapsamlı etiketleme çözümleri sunuyoruz. MIL-PRF-81705 ESD koruma standardına uygun, VCI ve desiccant koruma dahil ve DDP/FCA teslimat seçenekleri ile profesyonel paketleme hizmeti veriyoruz.",
    ],
    features: [
      "Vakumlu Paketleme — Nem ve toz koruması",
      "ESD (Antistatik) — Elektronik parçalar için",
      "Köpük Koruma — Kırılabilir parçalar için",
      "Ahşap Kasa — Ağır ve değerli parçalar için",
    ],
    technicalSpecs: [
      { label: "ESD Koruma", value: "MIL-PRF-81705" },
      { label: "Etiketleme", value: "Barkod + QR + RFID" },
      { label: "Koruma", value: "VCI, Desiccant" },
      { label: "Teslimat", value: "DDP / FCA" },
    ],
    processSteps: [
      "Kit Listesi Hazırlama",
      "Bileşen Toplama & Sayım",
      "Koruyucu Ambalajlama",
      "Etiketleme",
      "Sevkiyat",
    ],
    advantages: [
      "MIL-PRF-81705 ESD koruma standardı",
      "RFID dahil çoklu etiketleme",
      "VCI ve desiccant koruma",
      "DDP/FCA esnek teslimat seçenekleri",
    ],
  },
  {
    slug: "kaynakli-imalat",
    category: "hizmetler",
    categoryLabel: "Montaj & Birleştirme",
    title: "Kaynaklı İmalat",
    description:
      "TIG, MIG/MAG ve direnç kaynağı ile metal parçaların birleştirilmesi. Sertifikalı kaynakçılar ve kalite kontrol.",
    content: [
      "TIG kaynak (Al, çelik, Ti; 0.5-10mm; hassas uygulamalar), MIG/MAG kaynak (çelik, Al; 1-20mm; hızlı üretim) ve direnç kaynağı (çelik; 0.2-3mm; nokta kaynak) yöntemleri ile metal parçaların birleştirilmesini gerçekleştiriyoruz.",
      "ISO 9606-1 (çelik kaynağı), ISO 9606-2 (alüminyum kaynağı), ISO 15614-1 (kaynak prosedürü) ve AWS D1.1 (yapısal çelik) sertifikalı kaynakçılarımız ile EN ISO 3834-2 standardında üretim yapıyoruz. RT, UT, PT ve MT tahribatsız muayene yöntemleri ile kaynak kalitesini garanti ediyoruz.",
    ],
    features: [
      "TIG Kaynak — Al, çelik, Ti; 0.5-10mm; hassas",
      "MIG/MAG Kaynak — Çelik, Al; 1-20mm; hızlı üretim",
      "Direnç Kaynağı — Çelik; 0.2-3mm; nokta kaynak",
      "Sertifikalı Kaynakçılar — ISO 9606 ve AWS D1.1",
    ],
    technicalSpecs: [
      { label: "Standart", value: "EN ISO 3834-2" },
      { label: "Sertifika", value: "EN 1090" },
      { label: "NDT", value: "RT, UT, PT, MT" },
      { label: "Malzemeler", value: "Al, SS, Ti, Ni" },
    ],
    processSteps: [
      "Kaynak Prosedürü (WPS)",
      "Malzeme & Ekipman Hazırlık",
      "Kaynak İşlemi",
      "NDT Muayene",
      "Kalite Raporu",
    ],
    advantages: [
      "ISO 9606 sertifikalı kaynakçılar",
      "4 farklı NDT muayene yöntemi",
      "EN ISO 3834-2 kalite standardı",
      "TIG, MIG/MAG ve direnç kaynağı kapasitesi",
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
    advantages: [
      "7/24 kesintisiz üretim kapasitesi",
      "Dünya lideri tezgah markaları",
      "Yıllık bakım programı",
      "Gerçek zamanlı tezgah izleme",
    ],
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
    advantages: [
      "AS9100D tam uyum",
      "%100 izlenebilirlik sistemi",
      "NADCAP akreditasyonlu prosesler",
      "Kritik uçuş parçası deneyimi",
    ],
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

import { servicePages } from "./servicePages";

export interface FaqEntry {
  question: string;
  answer: string;
  keywords: string[];
}

// ── Sabit şablon yanıtlar ──
const staticEntries: FaqEntry[] = [
  {
    question: "Teklif nasıl alabilirim?",
    answer: "Teklif almak için [Teklif Al](/teklif-al) sayfamızı ziyaret edebilirsiniz. CAD dosyanızı yükleyerek hızlı teklif alabilirsiniz. Alternatif olarak info@mastechnic.com adresine mail atabilirsiniz.",
    keywords: ["teklif", "fiyat", "maliyet", "ücret", "para", "ne kadar", "kaç tl", "bütçe", "hesap"],
  },
  {
    question: "İletişim bilgileriniz nelerdir?",
    answer: "📞 Telefon: +90 (212) 555 0000\n📧 E-posta: info@mastechnic.com\n📍 Adres: İstanbul, Türkiye\n\nDetaylı bilgi için [İletişim](/iletisim) sayfamızı ziyaret edin.",
    keywords: ["iletişim", "telefon", "adres", "email", "mail", "nerede", "konum", "ulaşım", "numara"],
  },
  {
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer: "Havacılık & uzay, savunma sanayi, otomotiv, medikal, robotik, enerji, denizcilik, hidrolik ve daha birçok sektöre hizmet veriyoruz. Detaylar için [Endüstriyel Çözümler](/endustriyel) sayfamıza bakabilirsiniz.",
    keywords: ["sektör", "endüstri", "havacılık", "otomotiv", "medikal", "savunma", "hangi sektör"],
  },
  {
    question: "Prototip üretimi yapıyor musunuz?",
    answer: "Evet! Tek parçadan başlayarak prototip üretimi yapıyoruz. 3-5 iş günü içinde prototip teslimatı mümkündür. Detaylar için [Prototip Üretim](/endustriyel/prototip-uretim) sayfamıza bakın.",
    keywords: ["prototip", "numune", "tek parça", "deneme", "örnek", "sample"],
  },
  {
    question: "Hangi CNC hizmetleri sunuyorsunuz?",
    answer: "CNC frezeleme (3-4-5 eksen), CNC tornalama, hassas mikro işleme, derin delik & raybalama, lazer kazıma, yüzey işlemleri, montaj ve daha fazlası. Tüm hizmetlerimiz için [Hizmetler](/hizmetler) sayfamızı inceleyin.",
    keywords: ["cnc", "hizmet", "servis", "ne yapıyorsunuz", "neler sunuyorsunuz", "frezeleme", "tornalama"],
  },
  {
    question: "Teslimat süreniz ne kadar?",
    answer: "Prototip siparişlerde 3-5 iş günü, seri üretimde 7-15 iş günü teslimat sürelerimiz bulunmaktadır. Acil siparişler için özel planlama yapılabilir.",
    keywords: ["teslimat", "süre", "zaman", "ne zaman", "kaç gün", "hızlı", "acil", "termin"],
  },
  {
    question: "Hangi malzemelerle çalışıyorsunuz?",
    answer: "Alüminyum (6061, 7075), paslanmaz çelik (304, 316), karbon çelik, titanyum, pirinç, bakır, PEEK, POM/Delrin ve daha 50+ malzeme ile çalışıyoruz. [Malzeme Kütüphanesi](/malzemeler) sayfamızda detayları bulabilirsiniz.",
    keywords: ["malzeme", "metal", "alüminyum", "çelik", "titanyum", "plastik", "pirinç", "bakır", "paslanmaz"],
  },
  {
    question: "Minimum sipariş adedi var mı?",
    answer: "Minimum sipariş adedi 1 (tek parça) olarak belirlenmiştir. Prototipten seri üretime (1000+ adet) kadar esnek üretim kapasitemiz mevcuttur.",
    keywords: ["minimum", "adet", "sipariş", "kaç adet", "en az", "miktar"],
  },
  {
    question: "Kalite sertifikalarınız nelerdir?",
    answer: "ISO 9001:2015, AS9100D (havacılık), ISO 13485 (medikal) sertifikalarına sahibiz. CMM ölçüm raporları ve EN 10204 3.1 malzeme sertifikaları sunuyoruz.",
    keywords: ["kalite", "sertifika", "iso", "as9100", "standart", "belge", "rapor"],
  },
  {
    question: "Tolerans değerleriniz nedir?",
    answer: "Standart ±0.01mm, hassas işlemede ±0.005mm, mikro işlemede ±0.001mm tolerans değerlerine ulaşabiliyoruz. Detaylar için [Tolerans & Hassasiyet](/kabiliyetler/tolerans-hassasiyet) sayfamızı inceleyin.",
    keywords: ["tolerans", "hassasiyet", "doğruluk", "precision", "accuracy"],
  },
];

// ── servicePages FAQ'larından otomatik toplama ──
function collectServiceFaqs(): FaqEntry[] {
  const entries: FaqEntry[] = [];
  for (const page of servicePages) {
    if (!page.faq) continue;
    for (const f of page.faq) {
      // Soru ve cevaptan otomatik keyword çıkar
      const combined = `${f.question} ${f.answer}`.toLowerCase();
      const words = combined
        .replace(/[^\wğüşöçıİĞÜŞÖÇ]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3);
      const uniqueWords = [...new Set(words)];
      entries.push({
        question: f.question,
        answer: f.answer,
        keywords: uniqueWords,
      });
    }
  }
  return entries;
}

export const allFaqEntries: FaqEntry[] = [
  ...staticEntries,
  ...collectServiceFaqs(),
];

// ── Basit TF-IDF benzeri skor hesaplama ──
function normalize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\wğüşöçıİĞÜŞÖÇ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export interface MatchResult {
  entry: FaqEntry;
  score: number;
}

export function findBestFaqMatch(userInput: string): MatchResult | null {
  const inputWords = normalize(userInput);
  if (inputWords.length === 0) return null;

  let bestMatch: MatchResult | null = null;

  for (const entry of allFaqEntries) {
    // Hem keywords hem de soru metninde arama yap
    const questionWords = normalize(entry.question);
    const allTargetWords = [...entry.keywords, ...questionWords];

    let matchCount = 0;
    for (const iw of inputWords) {
      if (allTargetWords.some((tw) => tw.includes(iw) || iw.includes(tw))) {
        matchCount++;
      }
    }

    const score = matchCount / inputWords.length;

    if (score > (bestMatch?.score ?? 0)) {
      bestMatch = { entry, score };
    }
  }

  return bestMatch && bestMatch.score >= 0.5 ? bestMatch : null;
}

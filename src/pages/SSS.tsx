import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const allFaqs = [
  { question: "Minimum sipariş adedi nedir?", answer: "Minimum sipariş adedi bulunmamaktadır. Tek parça prototipten seri üretime kadar her ölçekte hizmet veriyoruz." },
  { question: "Hangi dosya formatlarını kabul ediyorsunuz?", answer: "STEP, IGES, DXF, DWG, SOLIDWORKS (.sldprt, .sldasm), Autodesk Inventor (.ipt), PDF ve 2D teknik çizim formatlarını kabul ediyoruz." },
  { question: "Teslim süresi ne kadardır?", answer: "Prototip üretimde 3-5 iş günü, küçük serilerde 1-2 hafta, seri üretimde proje bazlı planlama yapılır. Acil üretim seçeneğimiz de mevcuttur." },
  { question: "Kalite belgeniz var mı?", answer: "ISO 9001:2015, AS9100D, IATF 16949 ve ISO 14001 belgelerine sahibiz. Havacılık, otomotiv ve medikal sektörlerine uygun üretim yapıyoruz." },
  { question: "Yüzey işleme hizmetiniz var mı?", answer: "Anodizasyon, kaplama, boyama, kumlama, parlatma ve ısıl işlem gibi yüzey işleme hizmetlerini de sunuyoruz veya koordine ediyoruz." },
  { question: "Hangi sektörlere hizmet veriyorsunuz?", answer: "Havacılık & uzay, otomotiv, medikal, robotik, savunma sanayi, enerji ve genel endüstriyel üretim sektörlerine hizmet veriyoruz." },
  { question: "Teklifinizi ne kadar sürede alırım?", answer: "Teknik çizimlerinizi gönderdikten sonra genellikle 24-48 saat içinde detaylı fiyat teklifimizi iletiyoruz." },
  { question: "Hangi malzemelerle çalışıyorsunuz?", answer: "Alüminyum, çelik, paslanmaz çelik, pirinç, bakır, titanyum, plastik (Delrin, PEEK, Nylon) ve daha birçok malzeme ile çalışıyoruz." },
  { question: "Ücretsiz DFM analizi yapıyor musunuz?", answer: "Evet, tüm projelerimiz için ücretsiz Design for Manufacturing (DFM) analizi sunuyoruz." },
  { question: "Sevkiyat nasıl yapılıyor?", answer: "Yurt içi ve yurt dışı sevkiyat seçeneklerimiz mevcuttur. Ürünleriniz özenle paketlenir ve anlaşmalı kargo firmalarıyla güvenli şekilde teslim edilir." },
];

const SSS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-industrial">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">SSS</span>
              <h1 className="heading-industrial text-3xl md:text-4xl mb-4">Sıkça Sorulan Sorular</h1>
              <p className="subheading-industrial text-lg">Merak ettiğiniz tüm soruların cevapları</p>
            </div>
            <div className="space-y-2">
              {allFaqs.map((faq, index) => (
                <div key={index} className="border border-border bg-card">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SSS;

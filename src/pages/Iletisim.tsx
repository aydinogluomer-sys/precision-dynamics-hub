import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Iletisim = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-industrial">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.4em] mb-3 block text-primary">İletişim</span>
          <h1 className="heading-industrial text-3xl md:text-4xl mb-4">Bize Ulaşın</h1>
          <p className="subheading-industrial text-lg mb-12">Projeleriniz hakkında konuşmak için bize ulaşın</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Telefon", value: "+90 (536) 564 51 94" },
                { icon: Mail, label: "E-posta", value: "info@mastechnic.com" },
                { icon: MapPin, label: "Adres", value: "İzmir, Türkiye" },
                { icon: Clock, label: "Çalışma Saatleri", value: "Pzt-Cum: 08:00-18:00" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 border border-border bg-card p-5">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-border bg-card p-8">
              <h2 className="font-bold text-lg mb-6">Hızlı Mesaj</h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input type="text" placeholder="Adınız" className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                <input type="email" placeholder="E-posta" className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary" />
                <textarea placeholder="Mesajınız" rows={4} className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" />
                <button type="submit" className="btn-industrial-primary w-full">Gönder</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Iletisim;

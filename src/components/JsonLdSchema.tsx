import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceSchemaProps {
  type: "service";
  name: string;
  description: string;
  category?: string;
  faq?: FAQItem[];
}

interface OrganizationSchemaProps {
  type: "organization";
}

type JsonLdSchemaProps = ServiceSchemaProps | OrganizationSchemaProps;

const JsonLdSchema = (props: JsonLdSchemaProps) => {
  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-jsonld]');
    existingScripts.forEach((s) => s.remove());

    const schemas: object[] = [];

    if (props.type === "organization") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Mas Technic",
        url: window.location.origin,
        description: "CNC Freze, Torna ve Talaşlı İmalatta yüksek hassasiyet, proses kontrollü üretim ve zamanında teslimat.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "İzmir",
          addressCountry: "TR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-536-564-51-94",
          contactType: "sales",
          availableLanguage: ["Turkish", "English"],
        },
        sameAs: [],
      });
    }

    if (props.type === "service") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Service",
        name: props.name,
        provider: {
          "@type": "Organization",
          name: "Mas Technic",
        },
        description: props.description,
        areaServed: {
          "@type": "Country",
          name: "Turkey",
        },
        serviceType: props.category || "Manufacturing",
      });

      if (props.faq && props.faq.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: props.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        });
      }
    }

    schemas.forEach((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-jsonld", `schema-${i}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-jsonld]');
      scripts.forEach((s) => s.remove());
    };
  }, [props]);

  return null;
};

export default JsonLdSchema;

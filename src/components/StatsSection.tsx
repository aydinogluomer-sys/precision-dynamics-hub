import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 35, suffix: "+", label: "CNC Tezgâh", description: "Modern makine parkuru" },
  { value: 0.01, suffix: "mm", label: "Tolerans", description: "Hassasiyet standardı", isDecimal: true },
  { value: 2000, suffix: "mm", label: "Max Parça", description: "İşleme kapasitesi" },
  { value: 15, suffix: "+", label: "Yıl Tecrübe", description: "Endüstri deneyimi" },
];

const useCountUp = (end: number, duration: number = 2000, isDecimal: boolean = false) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const step = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(easeOut * end);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return { count: isDecimal ? count.toFixed(2) : Math.floor(count), ref };
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-foreground text-background">
      <div className="container-industrial">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-industrial text-3xl md:text-4xl mb-4 text-background">
            Rakamlarla Mas Technic
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const { count, ref } = useCountUp(stat.value, 2000, stat.isDecimal);
            return (
              <div key={index} ref={ref} className="text-center">
                <div className="text-technical text-5xl md:text-6xl font-bold text-primary mb-2">
                  {count}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
                <div className="font-semibold text-lg mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

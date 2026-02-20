"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".feature-card");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Precision Engineering",
      description:
        "Every component meticulously designed and tested to deliver unmatched performance on the road.",
      icon: "⚡",
    },
    {
      title: "Aerodynamic Design",
      description:
        "Wind-tunnel tested bodywork that cuts through air with minimal drag and maximum downforce.",
      icon: "💨",
    },
    {
      title: "Raw Power",
      description:
        "Twin-turbo V8 engine delivering breathtaking acceleration and top speed capability.",
      icon: "🔥",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] py-16 sm:py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 tracking-wide">
          BUILT FOR PERFORMANCE
        </h2>
        <p className="text-gray-400 text-center text-sm sm:text-base mb-10 max-w-xl mx-auto">
          Where innovation meets the thrill of the open road
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="feature-card group relative p-8 rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-transparent hover:border-gray-600 transition-all duration-500"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

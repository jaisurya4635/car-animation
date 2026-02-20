"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { percentage: "58%", description: "Increase in pick up point use" },
  { percentage: "23%", description: "Decreased in customer phone calls" },
  { percentage: "27%", description: "Increase in pick up point use" },
  { percentage: "40%", description: "Decreased in customer phone calls" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const counters = containerRef.current.querySelectorAll(".stat-counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0", 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        delay: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          counter.textContent = Math.round(obj.val) + "%";
        },
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16"
    >
      {stats.map((stat, i) => (
        <div key={i} className="stat-item flex flex-col items-center text-center px-3 sm:px-6 opacity-0">
          <span
            className="stat-counter text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"
            data-target={parseInt(stat.percentage)}
          >
            0%
          </span>
          <span className="text-xs sm:text-sm text-gray-400 max-w-[140px] leading-relaxed">
            {stat.description}
          </span>
        </div>
      ))}
    </div>
  );
}

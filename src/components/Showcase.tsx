"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -100, rotation: -5 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Parallax effect on the car image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -50,
          rotation: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060608] py-16 sm:py-20 px-6 flex items-center"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Car image */}
        <div className="flex justify-center">
          <img
            ref={imageRef}
            src="/car-animation/car.png"
            alt="McLaren 720S Showcase"
            className="w-[300px] sm:w-[400px] md:w-[500px] object-contain drop-shadow-[0_0_80px_rgba(80,80,200,0.1)] will-change-transform"
            draggable={false}
          />
        </div>

        {/* Description */}
        <div ref={textRef}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">
            THE ULTIMATE DRIVING MACHINE
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
            Experience the perfect fusion of cutting-edge technology and raw
            automotive passion. Every curve, every line, every detail has been
            crafted to deliver an unparalleled driving experience that pushes
            the boundaries of what&apos;s possible.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-3xl font-bold text-white">710</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Horsepower
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">2.9s</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                0-60 mph
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">212</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Top Speed mph
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

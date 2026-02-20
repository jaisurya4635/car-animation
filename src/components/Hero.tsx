"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "./Stats";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Intro Animations ---

      // Headline: staggered letter fade-in
      const headlineEl = headlineRef.current;
      if (headlineEl) {
        const letters = headlineEl.querySelectorAll(".letter");
        gsap.fromTo(
          letters,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      // Car: fade in + scale up
      if (carRef.current) {
        gsap.fromTo(
          carRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      }

      // Stats: staggered fade in
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".stat-item");
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            delay: 1.2,
          }
        );
      }

      // --- Scroll-Based Car Animation ---
      if (carRef.current && sectionRef.current) {
        // Car moves & rotates based on scroll
        gsap.to(carRef.current, {
          y: -150,
          rotation: 15,
          scale: 0.7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Overlay fades in on scroll
      if (overlayRef.current && sectionRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "30% top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Headline parallax
      if (headlineRef.current && sectionRef.current) {
        gsap.to(headlineRef.current, {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "10% top",
            end: "50% top",
            scrub: 1,
          },
        });
      }

      // Stats parallax
      if (statsRef.current && sectionRef.current) {
        gsap.to(statsRef.current, {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end: "60% top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Build the letter-spaced headline
  const headlineText = "WELCOME ITZFIZZ";
  const letters = headlineText.split("").map((char, i) => (
    <span
      key={i}
      className="letter inline-block"
      style={{ marginRight: char === " " ? "1.2rem" : "0" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative h-[140vh]"
    >
      {/* Sticky hero viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Dark overlay for scroll */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black opacity-0 z-10 pointer-events-none"
        />

        {/* Radial gradient background glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#1a1a2e]/40 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="relative z-20 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.3em] sm:tracking-[0.4em] text-white mb-8 sm:mb-12 text-center px-4"
          style={{ letterSpacing: "0.4em" }}
        >
          {letters}
        </h1>

        {/* Car Image */}
        <div className="relative z-20 w-full flex justify-center px-4">
          <img
            ref={carRef}
            src="/car.png"
            alt="McLaren 720S Top View"
            className="w-[300px] sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[750px] object-contain drop-shadow-[0_0_60px_rgba(100,100,255,0.15)] will-change-transform"
            draggable={false}
          />
        </div>

        {/* Stats */}
        <div ref={statsRef} className="relative z-20 mt-6 sm:mt-8">
          <Stats />
        </div>
      </div>
    </section>
  );
}

"use client";

export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-gray-800/50 py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-4">
          Car Scroll Animation
        </p>
        <p className="text-gray-600 text-xs">
          Built with Next.js &middot; GSAP &middot; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 sm:px-8 sm:py-32 overflow-hidden border-t border-neutral-700 bg-gradient-to-b from-[#0a0a0a] to-black text-white text-center"
    >
      {/* Circles Animation */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="cta-circle top-1/2 left-1/2"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="cta-circle top-1/2 left-1/2"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="cta-circle top-1/2 left-1/2"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4 mx-auto">
        <h2 className="text-4xl sm:text-8xl font-extrabold tracking-tight mb-8 relative">
          Ready to Scale Your Brand?
          <span className="block absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-emerald-400 rounded-md shadow-[0_0_20px_#00ff88]"></span>
        </h2>

        <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-2">
          I craft websites that speak for your brand—fast, modern, and
          unforgettable.
        </p>
        <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6">
          Better Call Mo before your next big idea goes unnoticed.
        </p>

        <button className="inline-block px-8 py-4 sm:px-12 sm:py-5 border border-emerald-400 text-emerald-400 font-bold text-sm sm:text-base uppercase tracking-wider rounded-xl relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[0px_5px_50px_rgba(0,255,136,0.4)] active:scale-95">
          Let&apos;s chat now!
        </button>
      </div>

      {/* Spot Left */}
      <div className="flex items-center justify-center gap-2 mt-6 text-sm font-medium text-white/80">
        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
        <span>1 spot left</span>
      </div>
    </section>
  );
}

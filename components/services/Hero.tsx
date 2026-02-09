import type { Service } from "@/lib/services";
import Link from "next/link";

export default function Hero({ service }: { service: Service }) {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-black to-black pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          {service.title}
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto italic">
          &quot;Just like Saul Goodman fights for his clients, I fight for your code excellence.&quot;
        </p>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
          {service.shortDesc}
        </p>
        <Link
          href="#contact"
          className="inline-block px-10 py-5 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
        >
          {service.ctaText}
        </Link>
      </div>
    </section>
  )
}
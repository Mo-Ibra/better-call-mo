import Link from "next/link";
import type { Location } from "@/lib/locations";

interface HeroProps {
  location: Location;
}

export default function Hero({ location }: HeroProps) {
  return (
    <section className="relative py-20 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-black to-black pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/20 border border-primary-500/30 text-primary text-sm mb-6">
          <span className="text-xl">{location.flag}</span>
          <span>Serving Clients in {location.city}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          Expert Web Developer <br />
          <span className="text-white">in {location.city}</span>
        </h1>

        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          I help ambitious businesses in {location.city} and {location.region} build
          world-class web applications tailored to the {location.timezone} working hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
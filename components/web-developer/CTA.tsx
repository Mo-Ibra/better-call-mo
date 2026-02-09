import Link from "next/link";
import type { Location } from "@/lib/locations";

export default function CTA({ location }: { location: Location }) {
  return (
    <section className="py-24 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Ready to dominate the market in {location.city}?</h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto">
        Stop losing customers to competitors with better websites. Let's build something extraordinary together.
      </p>
      <Link
        href="#contact"
        className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20"
      >
        Get Started Today
      </Link>
    </section>
  )
}
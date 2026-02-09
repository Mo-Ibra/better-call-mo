import type { Location } from "@/lib/locations";

export default function Localized({ location }: { location: Location }) {
  return (
    <section className="py-20 px-6 bg-zinc-950/50">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why hire a developer for {location.city}?</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              As a {location.region}-focused developer, I understand the unique needs of the {location.city} market.
              Whether you need a high-performance marketing site or a complex SaaS platform, I deliver code that scales and converts.
            </p>
            <ul className="space-y-4 mt-6">
              <li className="flex items-start gap-3">
                <span className="p-1 bg-green-500/10 text-green-400 rounded-md mt-1">✓</span>
                <div>
                  <p className="font-semibold text-white">Local Performance</p>
                  <p className="text-sm text-gray-400 font-normal">Optimized delivery for users in {location.country}.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 bg-green-500/10 text-green-400 rounded-md mt-1">✓</span>
                <div>
                  <p className="font-semibold text-white">Timezone Friendly</p>
                  <p className="text-sm text-gray-400 font-normal">Aligned with {location.timezone} working hours.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 bg-green-500/10 text-green-400 rounded-md mt-1">✓</span>
                <div>
                  <p className="font-semibold text-white">Global Standards</p>
                  <p className="text-sm text-gray-400 font-normal">Security and performance that beats competitors.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl relative shadow-2xl shadow-primary/10">
          <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">
            Starting from {location.currencySymbol}{location.minRate}
          </div>
          <h3 className="text-xl font-bold mb-4">Core Tech Stack</h3>
          <p className="text-gray-400 mb-6 text-sm">I use the most modern technologies to ensure your project in {location.city} is fast and future-proof.</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Frontend</p>
              <p className="font-bold text-sm">Next.js / React</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Styling</p>
              <p className="font-bold text-sm">Tailwind CSS</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Animation</p>
              <p className="font-bold text-sm">Framer Motion</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Backend</p>
              <p className="font-bold text-sm">Node.js / SQL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import type { Location } from "@/lib/locations";

export default function Process({ location }: { location: Location }) {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">How I build for {location.city} brands</h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { title: "Discovery", desc: "Understanding your local market and goals." },
            { title: "Strategy", desc: "Mapping out the technical architecture." },
            { title: "Development", desc: "Building your app with high-clean code." },
            { title: "Launch", desc: "Deploying and optimizing for performance." }
          ].map((item, idx) => (
            <div key={idx} className="relative p-6 bg-zinc-900 border border-white/5 rounded-xl hover:border-primary/50 transition-colors">
              <span className="text-5xl font-black text-white/5 absolute top-2 right-4">0{idx + 1}</span>
              <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
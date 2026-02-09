import type { Location } from "@/lib/locations";

export default function CaseStudies({ location }: { location: Location }) {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Proven Results in {location.region}</h2>
          <p className="text-gray-400">Winning solutions for businesses just like yours in {location.city}.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "E-Commerce Platform",
              desc: "Built a complete e-commerce platform with Stripe integration.",
              tags: ["Next.js", "Stripe", "PostgreSQL"],
              image: "/images/modern-ecommerce-dark.png"
            },
            {
              title: "SaaS Dashboard",
              desc: "Enterprise-grade analytics platform with real-time data.",
              tags: ["React", "D3.js", "Node.js"],
              image: "/images/analytics-dashboard-dark-theme-green-accents.jpg"
            },
            {
              title: "Crypto Tracker",
              desc: "Real-time tracking for hundreds of cryptocurrencies.",
              tags: ["React", "Chart.js", "WebSockets"],
              image: "/images/cryptocurrency-tracker-app-dark-theme-charts.jpg"
            }
          ].map((project, idx) => (
            <div key={idx} className="group bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-white/5 rounded text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
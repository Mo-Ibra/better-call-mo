import type { Service } from "@/lib/services";

export default function FeatureBreakdown({ service }: { service: Service }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 italic">&quot;You don&apos;t just need a website, you need a high-conversion machine.&quot;</h2>
            <div className="space-y-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl relative">
            <div className="absolute -top-4 -left-4 bg-primary text-white p-3 rotate-[-5deg] font-bold text-sm shadow-lg">
              PREMIUM QUALITY
            </div>
            <h3 className="text-xl font-bold mb-6">Expert Stack for {service.slug.replace(/-/g, ' ')}</h3>
            <div className="flex flex-wrap gap-3">
              {service.techStack.map(tech => (
                <span key={tech} className="px-4 py-2 bg-white/10 rounded-lg text-sm font-mono text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
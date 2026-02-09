import type { Service } from "@/lib/services";

export default function Benefits({ service }: { service: Service }) {
  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary uppercase tracking-widest">Core Benefits</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {service.benefits.map((benefit, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
              <span className="text-primary text-2xl font-bold">0{idx + 1}</span>
              <p className="text-lg text-gray-200">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
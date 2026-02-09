import { testimonials, aggregateRating } from "@/lib/testimonials";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-sm mb-6">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </span>
            <span className="font-bold">{aggregateRating.ratingValue}/5 Average Rating</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Clients Who <span className="text-primary">Win</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here is what business leaders say about their experience in the courtroom of code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col p-8 bg-zinc-900 border border-white/5 rounded-2xl hover:border-primary/30 transition-all group">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 text-sm italic mb-6 flex-grow leading-relaxed">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                {t.image && (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border border-white/10 grayscale group-hover:grayscale-0 transition-all"
                  />
                )}
                <div>
                  <p className="font-bold text-sm text-white">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Location } from "@/lib/locations";

export default function TrustStats({ location }: { location: Location }) {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">Personalized Service for <span className="text-primary">{location.city}</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I believe that great software starts with a strong partnership. When you hire me, you&apos;re not getting a faceless agency—you&apos;re getting a dedicated developer focused on your success in {location.city}.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-primary mb-1">5+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Years Experience</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-primary mb-1">50+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Projects Delivered</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-primary mb-1">100%</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Client Satisfaction</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-3xl font-bold text-primary mb-1">24/7</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Aligned with {location.timezone}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
            <div className="relative bg-zinc-900 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/mo-ibra.jpg"
                alt="Mo - Your Web Developer"
                className="w-full h-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="p-6">
                <p className="font-bold text-xl mb-1">Mo Ibra</p>
                <p className="text-primary text-sm font-medium">Head Web Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
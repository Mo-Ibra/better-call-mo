import type { Location } from "@/lib/locations";

export default function ComparisonTable({ location }: { location?: Location }) {
  return (
    <section className="py-24 px-6 bg-zinc-950/50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">Better Call Mo <span className="text-primary">vs.</span> The Rest</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-sm uppercase tracking-widest text-gray-500 font-semibold">Feature</th>
                <th className="py-6 px-4 text-primary font-bold text-xl">Better Call Mo</th>
                <th className="py-6 px-4 text-gray-400 font-medium">Generic Agencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { feature: "Speed & Performance", mo: "optimized for Core Web Vitals", others: "Heavy, bloated templates" },
                { feature: "Communication", mo: "Direct access to your developer", others: "Account managers & tickets" },
                { feature: "Project Ownership", mo: "100% full ownership of your code", others: "Locked into proprietary systems" },
                { feature: "Post-Launch Support", mo: "1 year of premium support included", others: "Pay-per-fix or high hourly rates" },
                { feature: "Strategy", mo: "Built to convert {City} customers", others: "Build-and-forget approach" },
                { feature: "Hosting Costs", mo: "Expert advice on $0/month options", others: "Mandatory expensive hosting" },
                { feature: "Managed Hosting", mo: "Full management for a symbolic fee", others: "Zero support / Hidden fees" },
                { feature: "Timezone", mo: "Aligned with {timezone}", others: "12-hour delays from offshore" },
                { feature: "Code Quality", mo: "Custom React/Next.js code", others: "WordPress/Drag-and-drop" },
              ].map((row, idx) => (
                <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4 font-medium text-gray-300">{row.feature}</td>
                  <td className="py-6 px-4 font-bold text-white">
                    <span className="flex items-center gap-2">
                      <span className="text-green-400">✓</span> {row.mo.replace("{City}", location?.city || "WorldWide").replace("{timezone}", location?.timezone || "WorldWide")}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-gray-500">
                    <span className="flex items-center gap-2">
                      <span className="text-red-900">✕</span> {row.others}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
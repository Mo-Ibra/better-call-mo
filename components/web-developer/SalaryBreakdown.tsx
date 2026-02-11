"use client";

import type { Location } from "@/lib/locations";
import { MoveRight, TrendingDown, Clock, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function SalaryBreakdown({ location }: { location: Location }) {
  const totalLocalCost = location.avgSalary + location.overheadCost;
  const moEstimate = totalLocalCost * 0.45; // Placeholder for logic: Mo is roughly 45% of total cost
  const savings = totalLocalCost - moEstimate;

  const formattedAvgSalary = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: location.currency,
    maximumFractionDigits: 0,
  }).format(location.avgSalary);

  const formattedOverhead = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: location.currency,
    maximumFractionDigits: 0,
  }).format(location.overheadCost);

  const formattedTotal = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: location.currency,
    maximumFractionDigits: 0,
  }).format(totalLocalCost);

  const formattedSavings = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: location.currency,
    maximumFractionDigits: 0,
  }).format(savings);

  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: The "Painful" Reality */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-400">The Local Hiring Reality in {location.city}</h2>
            <div className="space-y-6">
              <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Average Senior Salary</span>
                  <span className="text-2xl font-bold">{formattedAvgSalary}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500/50 h-full w-[70%]" />
                </div>
              </div>

              <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Taxes, Benefits & Overhead</span>
                  <span className="text-2xl font-bold">{formattedOverhead}</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500/30 h-full w-[30%]" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xl text-gray-300">Total Employer Cost</span>
                  <span className="text-3xl font-black text-red-500">{formattedTotal}</span>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">
                  *Excludes recruitment fees, training time, and management overhead. Hiring difficulty: <span className="text-gray-300">{location.hiringDifficulty}</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Smart Alternative */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900 border border-primary-500/20 rounded-3xl p-10 space-y-8">
              <div className="flex justify-between items-center">
                <div className="bg-primary/20 text-primary-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">
                  Smart Alternative
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-bold underline">Save {formattedSavings}</span>
                </div>
              </div>

              <h2 className="text-4xl font-black">Better Call Mo</h2>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-xl h-fit">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Zero Overhead</h3>
                    <p className="text-gray-400 text-sm">No taxes, no desk space, no benefits. You only pay for high-end code.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-xl h-fit">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Instant Seniority</h3>
                    <p className="text-gray-400 text-sm">Skip the 6-month hiring cycle. Start building your MVP next week.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-white/5 p-3 rounded-xl h-fit">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Full Ownership</h3>
                    <p className="text-gray-400 text-sm">You own 100% of the IP from day one. No agency lock-in.</p>
                  </div>
                </li>
              </ul>

              <div className="pt-8">
                <Link
                  href="/#contact"
                  className="flex items-center justify-center gap-3 w-full py-6 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all text-xl"
                >
                  Start Saving Now <MoveRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

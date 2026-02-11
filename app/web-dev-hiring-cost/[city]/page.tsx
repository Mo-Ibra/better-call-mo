import { locations } from "@/lib/locations";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Testimonials from "@/components/web-developer/Testimonials";
import SalaryBreakdown from "@/components/web-developer/SalaryBreakdown";
import ComparisonTable from "@/components/web-developer/ComparisonTable";
import TrustStats from "@/components/web-developer/TrustStats";
import type { Metadata } from "next";
import ClientContactModal from "@/components/ClientContactModal";

export async function generateStaticParams() {
  return locations.map((location) => ({
    city: location.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) return {};

  return {
    title: `Cost of Hiring a Web Developer in ${location.city} (2026) | Full Breakdown`,
    description: `Detailed analysis of web developer salaries and total employment costs in ${location.city}. Discover why outsourcing to Better Call Mo is the smarter financial choice for startups.`,
    alternates: {
      canonical: `https://bettercallmo.dev/web-dev-hiring-cost/${location.slug}`,
    }
  };
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const location = locations.find((l) => l.slug === city);

  if (!location) {
    notFound();
  }

  return (

    <>
      <main className="bg-black min-h-screen">
        <Navigation />

        {/* Informational Hero Section */}
        <section className="relative pt-32 pb-20 px-6 text-center border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-red-500/10 text-red-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
              2026 Market Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              How much does it <span className="text-red-500">really cost</span> to hire a Senior Web Developer in {location.city}?
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              The sticker price of a salary is only the beginning. Between social security, insurance, desk space, and recruitment fees, the true cost can be staggering. Here is the full breakdown.
            </p>
          </div>
        </section>

        {/* The Breakdown Component */}
        <SalaryBreakdown location={location} />

        {/* Trust & Social Proof Pivot */}
        <section className="py-20 px-6 bg-zinc-950 border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold italic text-gray-500">&quot;Why hire local when you can hire a battle-tested expert for half the cost?&quot;</h2>
            <TrustStats location={location} />
          </div>
        </section>

        <div id="compare">
          <ComparisonTable location={location} />
        </div>

        <Testimonials />

      </main>
      <ClientContactModal />
      <Footer />
    </>
  );
}

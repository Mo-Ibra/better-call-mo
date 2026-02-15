import { getAllQnAs, QNA_CATEGORIES } from "@/lib/qna";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QnACard from "@/components/qna/QnACard";
import ClientContactModal from "@/components/ClientContactModal";
import Link from "next/link";
import { MessageSquare, Search, Plus } from "lucide-react";
import { LanguageCode } from "@/lib/i18n.config";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const metadata = {
  title: "Ask Mo | Community Q&A for Web Developers & SaaS Founders",
  description: "Bettle-tested technical answers about SEO, Next.js, Performance, and Business strategy. Ask Mo your toughest coding questions.",
  alternates: {
    canonical: "/ask-mo",
  },
};

export default async function AskMoPage() {
  const qnas = await getAllQnAs("en");

  return (
    <main className="bg-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 px-6 border-b border-white/5 bg-zinc-900/10 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                <MessageSquare className="w-3.5 h-3.5" /> Community Discussion
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                  Ask <span className="text-primary-400">Mo</span>
                </h1>
                <LanguageSwitcher currentLang={"en" as LanguageCode} />
              </div>
              <p className="text-xl text-gray-500 italic max-w-xl leading-relaxed">
                The technical community board where "Mo" of code answers your toughest SaaS and SEO production questions.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/ask-mo/ask"
                  className="inline-flex items-center gap-3 bg-primary text-black font-black px-8 py-4 rounded-2xl hover:bg-white transition-all shadow-xl shadow-primary/20 group uppercase tracking-widest text-[11px]"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  Ask a Question
                </Link>

                <div className="w-full md:w-80 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                  <input
                    placeholder="Search community posts..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-12 py-4 focus:outline-none focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16">
          {/* Main Content: Q&A List */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Trending Topics</h2>
              <div className="flex gap-2">
                {QNA_CATEGORIES.map(cat => (
                  <button key={cat} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-black hover:bg-primary/20 hover:text-primary transition-all uppercase tracking-widest">
                    r/{cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {qnas.map(qna => (
                <QnACard key={qna.slug} qna={qna} lang="en" />
              ))}

              {qnas.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-dashed border-white/10">
                  <p className="text-gray-500 uppercase font-black tracking-widest">No answers yet. Be the first to ask!</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-8 h-fit sticky top-32">
            {/* New Premium Sidebar CTA */}
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Plus className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 leading-none">Got a Doubt?</h3>
                <p className="text-gray-400 mb-8 text-xs leading-relaxed">Mo Ibrahim reviews and provides verified answers to the community's toughest challenges.</p>
                <Link
                  href="/ask-mo/ask"
                  className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all text-[11px] tracking-[0.1em] uppercase shadow-lg shadow-primary/10"
                >
                  <Plus className="w-4 h-4" /> Start New Discussion
                </Link>
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" /> Community Rules
              </h3>
              <ul className="space-y-4">
                <li className="text-[11px] text-gray-400 flex gap-3 leading-relaxed">
                  <span className="text-primary font-black">01.</span> Be technical and specific with your queries.
                </li>
                <li className="text-[11px] text-gray-400 flex gap-3 leading-relaxed">
                  <span className="text-primary font-black">02.</span> No SEO spam or self-promotion. Value only.
                </li>
                <li className="text-[11px] text-gray-400 flex gap-3 leading-relaxed">
                  <span className="text-primary font-black">03.</span> Respect the direct, "no-fluff" code attitude.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <ClientContactModal />
      <Footer />
    </main>
  );
}

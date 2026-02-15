import { getAllQnAs, QNA_CATEGORIES } from "@/lib/qna";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QnACard from "@/components/qna/QnACard";
import QuestionForm from "@/components/qna/QuestionForm";
import ClientContactModal from "@/components/ClientContactModal";
import { MessageSquare, Search } from "lucide-react";

export const metadata = {
  title: "Ask Mo | Community Q&A for Web Developers & SaaS Founders",
  description: "Bettle-tested technical answers about SEO, Next.js, Performance, and Business strategy. Ask Mo your toughest coding questions.",
};

export default async function AskMoPage() {
  const qnas = await getAllQnAs();

  return (
    <main className="bg-black min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary-400 text-xs font-black uppercase tracking-widest rounded-full">
            <MessageSquare className="w-4 h-4" /> Community Q&A
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            Better Call <span className="text-primary">Mo</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto italic">
            &quot;You have questions. I have the technical answers you need to win.&quot;
          </p>

          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
            <input
              placeholder="Search community questions..."
              className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-14 py-5 focus:outline-none focus:border-primary transition-all text-lg"
            />
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
                  <button key={cat} className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors uppercase">
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {qnas.map(qna => (
                <QnACard key={qna.slug} qna={qna} />
              ))}

              {qnas.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-dashed border-white/10">
                  <p className="text-gray-500 uppercase font-black tracking-widest">No answers yet. Be the first to ask!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Ask Form & Stats */}
          <div className="space-y-10 h-sticky top-32">
            <QuestionForm />

            <div className="bg-gradient-to-br from-primary-900/20 to-black border border-primary-500/10 p-8 rounded-3xl">
              <h3 className="font-bold text-xl mb-4 text-primary">Why ask Mo?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  Answers based on real-world production data.
                </li>
                <li className="flex gap-3 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  Performance-first mindset (Core Web Vitals).
                </li>
                <li className="flex gap-3 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                  SEO-driven architectural advice.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ClientContactModal />
    </main>
  );
}

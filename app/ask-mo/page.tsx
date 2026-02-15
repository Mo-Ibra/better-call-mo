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
                  <button key={cat} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-black hover:bg-primary/20 hover:text-primary transition-all uppercase tracking-widest">
                    r/{cat}
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

          {/* Sidebar: Forum Rules & Community Info */}
          <div className="space-y-8 h-fit sticky top-32">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-12 bg-primary/20 flex items-center px-6">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-primary-400">About r/AskMo</h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  A technical space for founders and devs. Mo (Senior Web Architect) provides verified solutions to your toughest production bottlenecks.
                </p>
                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                  <div>
                    <p className="text-lg font-black">1.2k</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Members</p>
                  </div>
                  <div>
                    <p className="text-lg font-black">24</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Online</p>
                  </div>
                </div>
                <QuestionForm />
              </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
              <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-500 mb-4">Community Rules</h3>
              <ul className="space-y-3">
                <li className="text-[11px] text-gray-400 flex gap-2">
                  <span className="text-gray-600">1.</span> Be technical and specific.
                </li>
                <li className="text-[11px] text-gray-400 flex gap-2">
                  <span className="text-gray-600">2.</span> No SEO spam, only value.
                </li>
                <li className="text-[11px] text-gray-400 flex gap-2">
                  <span className="text-gray-600">3.</span> Respect the "Saul Goodman" attitude.
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

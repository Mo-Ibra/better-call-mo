import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuestionForm from "@/components/qna/QuestionForm";
import ClientContactModal from "@/components/ClientContactModal";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Post a Question | Ask Mo Community",
  description: "Submit your technical doubt, SaaS challenge, or SEO production bottleneck to Mo Ibrahim for a verified expert answer.",
};

export default function AskQuestionPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navigation />

      <div className="py-12 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Back link */}
          <Link
            href="/ask-mo"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Community Board
          </Link>

          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> New Discussion
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Post your <span className="text-primary-400">Technical Doubt</span>
            </h1>
            <p className="text-lg text-gray-500 italic leading-relaxed">
              Be specific. Mo Ibrahim manually reviews and answers the toughest technical challenges from the community.
            </p>
          </header>

          <section className="bg-zinc-900/50 p-1 md:p-2 rounded-[3rem] border border-white/5">
            <QuestionForm />
          </section>

          <footer className="pt-10 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600 italic">
              "I don't just write code. I fight for your production excellence." — Mo Ibrahim
            </p>
          </footer>
        </div>
      </div>

      <ClientContactModal />
      <Footer />
    </main>
  );
}

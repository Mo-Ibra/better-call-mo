import { notFound } from "next/navigation";
import { getQnABySlug, getAllQnAs } from "@/lib/qna";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientContactModal from "@/components/ClientContactModal";
import QuestionForm from "@/components/qna/QuestionForm";
import AnswerReplyForm from "@/components/qna/AnswerReplyForm";
import FormattedMarkdown from "@/components/FormattedMarkdown";
import { ArrowLeft, MessageCircle, Share2, ThumbsUp, ArrowBigUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const qnas = await getAllQnAs();
  return qnas.map((qna) => ({
    slug: qna.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const qna = await getQnABySlug(slug);

  if (!qna) return {};

  return {
    title: `${qna.question} | Ask Mo Community`,
    description: qna.answerBody.substring(0, 160).replace(/[#*]/g, ""),
  };
}

export default async function QnADetailPage({ params }: Props) {
  const { slug } = await params;
  const qna = await getQnABySlug(slug);

  if (!qna) {
    notFound();
  }

  // QAPage Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": qna.question,
      "text": qna.question,
      "answerCount": 1 + (qna.communityAnswers?.length || 0),
      "upvoteCount": qna.upvotes,
      "datePublished": qna.date,
      "author": {
        "@type": "Person",
        "name": qna.askedBy
      },
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qna.answerBody,
        "datePublished": qna.date,
        "upvoteCount": qna.upvotes,
        "url": `https://bettercallmo.dev/ask-mo/${qna.slug}`,
        "author": {
          "@type": "Person",
          "name": "Mo Ibrahim (Better Call Mo)"
        }
      }
    }
  };

  return (
    <main className="bg-black min-h-screen">
      <Navigation />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Reddit-style Breadcrumbs */}
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
            <Link href="/ask-mo" className="hover:text-primary transition-colors">Ask Mo</Link>
            <span>/</span>
            <span className="text-primary/70">r/{qna.category}</span>
            <span>/</span>
            <span className="text-gray-700 italic">thread_{qna.slug.substring(0, 8)}</span>
          </div>

          {/* Original Post (The Question) */}
          <section className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex">
              {/* Vote Bar */}
              <div className="w-12 bg-white/[0.02] flex flex-col items-center py-6 gap-2 border-r border-white/5">
                <ArrowBigUp className="w-6 h-6 text-gray-500 hover:text-primary cursor-pointer transition-colors" />
                <span className="font-black text-sm">{qna.upvotes}</span>
                <ArrowBigUp className="w-6 h-6 rotate-180 text-gray-500 hover:text-red-500 cursor-pointer transition-colors" />
              </div>

              <div className="flex-1 p-6 md:p-10 space-y-6">
                <div className="flex items-center gap-3 mb-2 text-xs font-bold text-gray-500">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] font-black border border-white/10 uppercase">
                    {qna.askedByAvatar || qna.askedBy.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-gray-300">u/{qna.askedBy}</p>
                    <p className="text-[9px] text-gray-600 uppercase tracking-widest">{qna.date}</p>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
                  {qna.question}
                </h1>

                <div className="flex flex-wrap gap-2 pt-4">
                  {qna.relatedServices?.map(s => (
                    <span key={s} className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-white/5 text-gray-500 rounded border border-white/5">
                      #{s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Comments/Replies Area */}
          <div className="pt-10 space-y-8 relative">
            {/* Visual Thread Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/10 via-white/5 to-transparent -z-10" />

            {/* Mo's Verified Answer (TOP REPLY) */}
            <section className="group">
              <div className="relative">
                <div className="bg-zinc-900/80 border-2 border-primary/20 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                  {/* Verified Expert Banner */}
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary text-black font-black uppercase text-[9px] tracking-[0.2em] rounded-bl-xl flex items-center gap-1.5 shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Official Expert Answer
                  </div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-tr from-primary to-primary-400 p-0.5 rounded-2xl rotate-3 shadow-xl">
                      <div className="w-full h-full bg-black rounded-[0.9rem] flex items-center justify-center font-black text-primary text-xl">
                        MO
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-lg text-white">Mo Ibrahim (Better Call Mo)</p>
                      <p className="text-[10px] text-primary-400 uppercase font-black tracking-widest flex items-center gap-1.5">
                        Senior Architect <span className="text-gray-700">•</span> Verified Professional
                      </p>
                    </div>
                  </div>

                  <article className="prose prose-invert prose-primary max-w-none prose-lg leading-relaxed">
                    <FormattedMarkdown content={qna.answerBody} />
                  </article>

                  <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-black text-gray-500 italic">
                      Was this helpful?
                      <div className="flex gap-2">
                        <ArrowBigUp className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
                        <ArrowBigUp className="w-5 h-5 rotate-180 hover:text-red-500 transition-colors cursor-pointer" />
                      </div>
                    </div>
                    <Link href="/contact" className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest border border-primary/20 px-3 py-1.5 rounded-lg bg-primary/5">
                      Get Custom Solution →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Community Replies List (if any) */}
            {qna.communityAnswers?.map((ans, i) => (
              <section key={i} className="ml-4 md:ml-12 group">
                <div className="relative">
                  <div className="absolute -left-8 md:-left-12 top-6 w-8 md:w-12 h-0.5 bg-white/5" />
                  <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center font-black text-gray-500 text-[10px]">
                        {ans.avatar || ans.author.substring(0, 2)}
                      </div>
                      <p className="font-bold text-gray-400">u/{ans.author}</p>
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-600 font-bold">{ans.date}</span>
                    </div>
                    <div className="text-gray-300 text-sm leading-relaxed">
                      {ans.body}
                    </div>
                  </div>
                </div>
              </section>
            ))}

            {/* Add Your Reply Section */}
            <div className="ml-4 md:ml-12 pt-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">Contribute to the conversation</h3>
              <AnswerReplyForm questionSlug={qna.slug} />
            </div>
            {/* Related / Bottom Section */}
            <div className="mt-20 pt-20 border-t border-white/5 grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <h4 className="text-xl font-black uppercase tracking-tighter">Explore Technical Stacks</h4>
                <div className="flex flex-wrap gap-3">
                  {qna.relatedServices?.map(s => (
                    <Link
                      key={s}
                      href={`/services/${s}`}
                      className="group flex flex-col p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-primary/30 transition-all w-full md:w-auto min-w-[200px]"
                    >
                      <span className="text-[10px] text-primary/60 font-black uppercase tracking-[0.2em] mb-1">Service</span>
                      <span className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors">{s.replace(/-/g, ' ')}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 rounded-3xl shadow-xl h-fit">
                <h4 className="font-black text-lg mb-2">Wrong stack?</h4>
                <p className="text-xs text-gray-400 mb-6 italic leading-relaxed">If this thread doesn't cover your specific technical debt, ask a new question to the board.</p>
                <Link href="/ask-mo" className="block text-center bg-primary text-black font-black text-xs py-4 rounded-xl hover:bg-white transition-all tracking-widest uppercase">
                  New Discussion
                </Link>
              </div>
            </div>
          </div> {/* Closing pt-10 */}
        </div> {/* Closing max-w-4xl */}
      </div> {/* Closing pt-32 */}

      <Footer />
      <ClientContactModal />
    </main>
  );
}

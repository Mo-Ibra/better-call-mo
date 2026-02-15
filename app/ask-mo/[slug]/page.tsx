import { notFound } from "next/navigation";
import { getQnABySlug, getAllQnAs } from "@/lib/qna";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientContactModal from "@/components/ClientContactModal";
import QuestionForm from "@/components/qna/QuestionForm";
import FormattedMarkdown from "@/components/FormattedMarkdown";
import { ArrowLeft, MessageCircle, Share2, ThumbsUp } from "lucide-react";
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
      "answerCount": 1,
      "upvoteCount": qna.upvotes,
      "datePublished": qna.date,
      "author": {
        "@type": "Person",
        "name": "Community Member"
      },
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qna.answerBody,
        "datePublished": qna.date,
        "upvoteCount": qna.upvotes,
        "url": `https://bettercallmo.dev/ask-mo/${qna.slug}`,
        "author": {
          "@type": "Person",
          "name": "Mohamed (Mo)"
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

      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Back link */}
          <Link href="/ask-mo" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Community
          </Link>

          {/* Question Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary">
              <span className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">{qna.category}</span>
              <span className="text-gray-600 italic">Discussion #{qna.slug.substring(0, 5)}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {qna.question}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-white/5 pb-8">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" /> {qna.upvotes} Upvotes
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> 1 Expert Answer
              </div>
            </div>
          </section>

          {/* Answer Section */}
          <section className="bg-zinc-900/30 border border-white/5 p-8 md:p-12 rounded-[2rem] relative">
            <div className="absolute -top-6 left-12 px-6 py-2 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-full shadow-xl shadow-primary/20">
              Expert Answer (Mo)
            </div>

            <article className="prose prose-invert prose-primary max-w-none prose-lg">
              <FormattedMarkdown content={qna.answerBody} />
            </article>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center font-black text-primary">MO</div>
                <div>
                  <p className="font-bold">Mohamed &qupt;Mo&qupt;</p>
                  <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Senior Web Architect</p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-bold text-sm">
                <Share2 className="w-4 h-4" /> Share Answer
              </button>
            </div>
          </section>

          {/* Related Section */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Related Services</h3>
              <div className="flex flex-wrap gap-2">
                {qna.relatedServices?.map(s => (
                  <Link
                    key={s}
                    href={`/services/${s}`}
                    className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl hover:border-primary/30 transition-all font-bold text-sm"
                  >
                    {s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>

            <QuestionForm />
          </div>
        </div>
      </div>

      <Footer />
      <ClientContactModal />
    </main>
  );
}

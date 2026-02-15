// app/[lang]/ask-mo/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getQnABySlug, getAllQnAs } from "@/lib/qna";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientContactModal from "@/components/ClientContactModal";
import AnswerReplyForm from "@/components/qna/AnswerReplyForm";
import FormattedMarkdown from "@/components/FormattedMarkdown";
import { ArrowBigUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { LanguageCode, availableLanguages } from "@/lib/i18n.config";

interface Props {
  params: Promise<{ slug: string; lang: string }>;
}

export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];

  for (const lang of availableLanguages) {
    if (lang === "en") continue;
    const qnas = await getAllQnAs(lang);
    qnas.forEach((qna) => {
      paths.push({ lang, slug: qna.slug });
    });
  }

  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { slug, lang } = await params;
  const qna = await getQnABySlug(slug, lang as LanguageCode);

  if (!qna) return {};

  return {
    title: `${qna.question} | Ask Mo Community`,
    description: qna.answerBody.substring(0, 160).replace(/[#*]/g, ""),
    alternates: {
      canonical: `/${lang}/ask-mo/${qna.slug}`,
    },
  };
}

export default async function TranslatedQnADetailPage({ params }: Props) {
  const { slug, lang } = await params;

  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") {
    notFound();
  }

  const qna = await getQnABySlug(slug, lang as LanguageCode);

  if (!qna) {
    notFound();
  }

  const t = {
    back: { es: "Atrás", it: "Indietro", de: "Zurück", pt: "Voltar" },
    official: { es: "Respuesta Oficial del Experto", it: "Risposta Ufficiale dell'Esperto", de: "Offizielle Expertenantwort", pt: "Resposta Oficial do Especialista" },
    helpful: { es: "¿Fue útil?", it: "È stato utile?", de: "War das hilfreich?", pt: "Isso foi útil?" },
    solution: { es: "Obtener Solución Personalizada", it: "Ottieni una Soluzione Personalizzata", de: "Individuelle Lösung erhalten", pt: "Obter Solução Personalizada" },
    contribute: { es: "Contribuir a la conversación", it: "Contribuisci alla conversazione", de: "Tragen Sie zur Diskussion bei", pt: "Contribua para a conversa" },
  };

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
      "author": { "@type": "Person", "name": qna.askedBy },
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qna.answerBody,
        "datePublished": qna.date,
        "upvoteCount": qna.upvotes,
        "url": `https://bettercallmo.dev/${lang}/ask-mo/${qna.slug}`,
        "author": { "@type": "Person", "name": "Mo Ibrahim (Better Call Mo)" }
      }
    }
  };

  return (
    <main className="bg-black min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
            <Link href={`/${lang}/ask-mo`} className="hover:text-primary transition-colors">Ask Mo</Link>
            <span>/</span>
            <span className="text-primary/70">r/{qna.category}</span>
          </div>

          <section className="bg-zinc-900/40 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex">
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
                <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">{qna.question}</h1>
              </div>
            </div>
          </section>

          <div className="pt-10 space-y-8 relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/10 via-white/5 to-transparent -z-10" />
            <section className="group">
              <div className="bg-zinc-900/80 border-2 border-primary/20 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-primary text-black font-black uppercase text-[9px] tracking-[0.2em] rounded-bl-xl flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {t.official[lang as keyof typeof t.official]}
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-tr from-primary to-primary-400 p-0.5 rounded-2xl rotate-3 shadow-xl">
                    <div className="w-full h-full bg-black rounded-[0.9rem] flex items-center justify-center font-black text-primary text-xl">MO</div>
                  </div>
                  <div>
                    <p className="font-black text-lg text-white">Mo Ibrahim (Better Call Mo)</p>
                  </div>
                </div>
                <article className="prose prose-invert prose-primary max-w-none prose-lg leading-relaxed">
                  <FormattedMarkdown content={qna.answerBody} />
                </article>
              </div>
            </section>

            <div className="ml-4 md:ml-12 pt-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 ml-1">{t.contribute[lang as keyof typeof t.contribute]}</h3>
              <AnswerReplyForm questionSlug={qna.slug} questionTitle={qna.question} />
            </div>
          </div>
        </div>
      </div>
      <ClientContactModal />
      <Footer />
    </main>
  );
}

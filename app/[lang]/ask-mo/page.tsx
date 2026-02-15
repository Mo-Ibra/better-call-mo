// app/[lang]/ask-mo/page.tsx
import { getAllQnAs, QNA_CATEGORIES } from "@/lib/qna";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QnACard from "@/components/qna/QnACard";
import ClientContactModal from "@/components/ClientContactModal";
import Link from "next/link";
import { MessageSquare, Search, Plus } from "lucide-react";
import { LanguageCode, availableLanguages, getLanguageConfig } from "@/lib/i18n.config";
import { notFound } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface TranslatedAskMoPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return availableLanguages
    .filter((lang) => lang !== "en")
    .map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: TranslatedAskMoPageProps) {
  const { lang } = await params;
  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") return {};

  const titles: Record<string, string> = {
    es: "Pregunta a Mo | Comunidad Q&A para Desarrolladores",
    it: "Chiedi a Mo | Community Q&A per Sviluppatori",
    de: "Frag Mo | Community Q&A für Webentwickler",
    pt: "Pergunte ao Mo | Comunidade Q&A para Desenvolvedores",
  };

  const desc: Record<string, string> = {
    es: "Respuestas técnicas sobre SEO, Next.js y estrategia. Pregunta a Mo tus dudas de programación.",
    it: "Risposte tecniche su SEO, Next.js e strategia. Chiedi a Mo i tuoi dubbi di programmazione.",
    de: "Technische Antworten zu SEO, Next.js und Strategie. Frag Mo deine Programmierfragen.",
    pt: "Respostas técnicas sobre SEO, Next.js e estratégia. Pergunte ao Mo suas dúvidas de programação.",
  };

  return {
    title: titles[lang as keyof typeof titles] || "Ask Mo Community",
    description: desc[lang as keyof typeof desc] || "Community Q&A",
    alternates: {
      canonical: `/${lang}/ask-mo`,
    },
  };
}

export default async function TranslatedAskMoPage({ params }: TranslatedAskMoPageProps) {
  const { lang } = await params;

  if (!availableLanguages.includes(lang as LanguageCode) || lang === "en") {
    notFound();
  }

  const qnas = await getAllQnAs(lang as LanguageCode);
  const langConfig = getLanguageConfig(lang);

  const t = {
    community: { es: "Discusión Comunitaria", it: "Discussione della Community", de: "Community-Diskussion", pt: "Discussão da Comunidade" },
    title: { es: "Pregunta a", it: "Chiedi a", de: "Frag", pt: "Pergunte ao" },
    desc: { es: "El foro técnico donde 'Mo' responde tus dudas más difíciles de SaaS y SEO.", it: "Il forum tecnico dove 'Mo' risponde ai tuoi dubbi più difficili su SaaS e SEO.", de: "Das technische Forum, in dem 'Mo' Ihre schwierigsten SaaS- und SEO-Fragen beantwortet.", pt: "O fórum técnico onde 'Mo' responde às suas dúvidas mais difíceis de SaaS e SEO." },
    askBtn: { es: "Hacer una Pregunta", it: "Fai una Domanda", de: "Frage stellen", pt: "Fazer uma Pergunta" },
    search: { es: "Buscar publicaciones...", it: "Cerca post...", de: "Beiträge suchen...", pt: "Pesquisar postagens..." },
    trending: { es: "Temas Tendencia", it: "Argomenti di Tendenza", de: "Trendthemen", pt: "Tópicos de Tendência" },
    empty: { es: "Aún no hay respuestas. ¡Sé el primero!", it: "Ancora nessuna risposta. Sii il primo!", de: "Noch keine Antworten. Sei der Erste!", pt: "Ainda não há respostas. Seja o primeiro!" },
  };

  return (
    <main className="bg-black min-h-screen" dir={langConfig.dir}>
      <Navigation />

      <section className="py-12 px-6 border-b border-white/5 bg-zinc-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                <MessageSquare className="w-3.5 h-3.5" /> {t.community[lang as keyof typeof t.community]}
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                  {t.title[lang as keyof typeof t.title]} <span className="text-primary-400">Mo</span>
                </h1>
                <LanguageSwitcher currentLang={lang as LanguageCode} />
              </div>
              <p className="text-xl text-gray-500 italic max-w-xl leading-relaxed">
                {t.desc[lang as keyof typeof t.desc]}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/${lang}/ask-mo/ask`}
                  className="inline-flex items-center gap-3 bg-primary text-black font-black px-8 py-4 rounded-2xl hover:bg-white transition-all shadow-xl shadow-primary/20 group uppercase tracking-widest text-[11px]"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  {t.askBtn[lang as keyof typeof t.askBtn]}
                </Link>

                <div className="w-full md:w-80 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
                  <input
                    placeholder={t.search[lang as keyof typeof t.search]}
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
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{t.trending[lang as keyof typeof t.trending]}</h2>
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
                <QnACard key={qna.slug} qna={qna} lang={lang as LanguageCode} />
              ))}

              {qnas.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-dashed border-white/10">
                  <p className="text-gray-500 uppercase font-black tracking-widest">{t.empty[lang as keyof typeof t.empty]}</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-8 h-fit sticky top-32">
            <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Plus className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2 leading-none">{lang === 'es' ? '¿Tienes una duda?' : lang === 'it' ? 'Hai un dubbio?' : 'Ask Mo'}</h3>
                <p className="text-gray-400 mb-8 text-xs leading-relaxed">{lang === 'es' ? 'Mo responde a tus dudas.' : 'Mo risponde ai tuoi dubbi.'}</p>
                <Link
                  href={`/${lang}/ask-mo/ask`}
                  className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all text-[11px] tracking-[0.1em] uppercase shadow-lg shadow-primary/10"
                >
                  <Plus className="w-4 h-4" /> {t.askBtn[lang as keyof typeof t.askBtn]}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ClientContactModal />
      <Footer />
    </main>
  );
}

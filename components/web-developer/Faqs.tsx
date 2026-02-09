import type { Location } from "@/lib/locations";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQs({
  location,
  items
}: {
  location?: Location;
  items?: FAQItem[]
}) {
  const defaultFaqs = location ? [
    {
      question: `Why hire a developer for ${location.city} specifically?`,
      answer: `Having a developer who understands the ${location.region} market means your site will be built with the right cultural nuances, performance optimizations for local networks, and compliance with regional standards.`
    },
    {
      question: `How long does a project in ${location.city} usually take?`,
      answer: `Most MVP (Minimum Viable Product) projects are completed within 4-6 weeks depending on complexity. My process is designed for speed without compromising quality.`
    },
    {
      question: `What is the price of web development in ${location.city}?`,
      answer: `Prices start from ${location.currencySymbol}${location.minRate} for standard packages. Every project is unique, so I recommend booking a free session to get an exact quote for your needs in ${location.city}.`
    }
  ] : [];

  const faqsToDisplay = items || defaultFaqs;

  if (faqsToDisplay.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqsToDisplay.map((faq, index) => (
            <details key={index} className="group p-6 bg-zinc-900 border border-white/5 rounded-xl cursor-pointer">
              <summary className="font-bold text-lg list-none flex justify-between items-center group-open:text-primary transition-colors">
                {faq.question}
                <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

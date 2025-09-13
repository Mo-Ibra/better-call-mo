"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Timeline depends on complexity. A simple landing page takes 1-2 weeks, while a full e-commerce site or web app can take 4-8 weeks. I'll provide a detailed timeline after understanding your specific requirements.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "I offer maintenance packages that include security updates, content changes, performance monitoring, and technical support. Most clients choose ongoing support to keep their sites running smoothly.",
  },
  {
    question: "Can you work with my existing brand and design?",
    answer:
      "Yes! I can work with your existing brand guidelines, logos, and design preferences. If you don't have established branding, I can also help create a cohesive visual identity for your project.",
  },
  {
    question: "What's included in your web development service?",
    answer:
      "My service includes responsive design, SEO optimization, performance optimization, mobile-first development, content management setup, and basic analytics integration. I also provide training on how to manage your new site.",
  },
  {
    question: "Do you handle hosting and domain setup?",
    answer:
      "Yes! I can help you choose the right hosting solution and handle domain setup. I typically recommend Vercel for modern web apps, but I can work with any hosting provider that fits your needs and budget.",
  },
  {
    question: "What if I need changes after the site is launched?",
    answer:
      "I include 30 days of free minor revisions after launch. For larger changes or ongoing updates, I offer flexible hourly rates or monthly maintenance packages depending on your needs.",
  },
  {
    question: "Can you help with SEO and digital marketing?",
    answer:
      "I build all sites with SEO best practices from the ground up, including proper meta tags, structured data, and performance optimization. For advanced SEO and marketing campaigns, I can connect you with trusted partners.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "I specialize in modern web technologies including Next.js, React, TypeScript, Tailwind CSS, and various headless CMS solutions. I choose the best tech stack based on your project's specific requirements and goals.",
  },
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-background relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-emerald-500 relative">
              Questions
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/50 to-emerald-400/50 rounded-full"></div>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? I've got answers. Here are the most common questions clients ask about my web development
            services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 hover:border-emerald-500/30"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-emerald-500/20 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <div className="h-px bg-gradient-to-r from-emerald-500/20 to-transparent mb-4"></div>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">Still have questions? Don't hesitate to reach out!</p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200 hover:shadow-lg hover:shadow-emerald-500/25"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}

"use client";

import { useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";

export default function QuestionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to /api/ask
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl text-center">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Question Submitted!</h3>
        <p className="text-gray-400">Mo will review your question and it might appear on the community board soon. Check your inbox for a private reply.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/5 p-10 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles className="w-32 h-32 text-primary" />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-black mb-2">Have a technical doubt?</h2>
        <p className="text-gray-400 mb-8">Ask Mo directly. Whether it is SEO, Next.js, or SaaS strategy, I fight for your code excellence.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Your Name</label>
            <input
              required
              placeholder="e.g. Saul Goodman"
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Work Email</label>
            <input
              required
              type="email"
              placeholder="saul@lalo-law.com"
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">The Question</label>
            <textarea
              required
              rows={4}
              placeholder="Be as specific as possible..."
              className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-primary text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary-400 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            SUBMIT QUESTION
          </button>
        </form>
      </div>
    </div>
  );
}

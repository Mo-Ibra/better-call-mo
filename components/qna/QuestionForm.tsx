"use client";

import { useState } from "react";
import { Send, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { QNA_CATEGORIES } from "@/lib/qna-shared";

export default function QuestionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Technical",
    content: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch("/api/ask-mo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "question"
        }),
      });

      if (resp.ok) {
        setSuccess(true);
      } else {
        alert("Something went wrong. Please try again or contact Mo directly.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl text-center">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Question Submitted!</h3>
        <p className="text-gray-400">Mo will review your question and it might appear on the community board soon. Check your inbox for a private reply.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
        >
          Ask another question
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/5 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles className="w-32 h-32 text-primary" />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-black mb-2">Technical Doubt?</h2>
        <p className="text-gray-400 mb-8 text-sm leading-relaxed">Post your question to the community. Mo reviews and answers the toughest technical challenges.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Username</label>
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. CodeFighter99"
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Work Email</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@company.com"
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">Topic Category</label>
            <div className="relative">
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-black border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/50 transition-colors text-sm appearance-none cursor-pointer"
              >
                {QNA_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">The Question</label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="What's killing your code right now?"
              className="w-full bg-black border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-colors resize-none text-sm"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 text-xs tracking-widest uppercase"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            POST TO COMMUNITY
          </button>
        </form>
      </div>
    </div>
  );
}

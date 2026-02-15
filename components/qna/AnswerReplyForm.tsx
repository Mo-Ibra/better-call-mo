"use client";

import { useState } from "react";
import { Send, Loader2, User } from "lucide-react";

export default function AnswerReplyForm({
  questionSlug,
  questionTitle
}: {
  questionSlug: string;
  questionTitle?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
    website: "" // Honeypot field
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
          type: "reply",
          questionSlug,
          questionTitle
        }),
      });

      if (resp.ok) {
        setSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
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
      <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl text-center italic">
        <p className="text-sm text-gray-400">Thanks for your contribution! Mo will review your answer and add it to the thread shortly. <span className="text-primary font-bold">Community power!</span></p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-4 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
        >
          Post another reply
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:flex w-10 h-10 bg-zinc-800 rounded-full items-center justify-center shrink-0 border border-white/5">
          <User className="w-5 h-5 text-gray-500" />
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Display Name"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/30 transition-all text-xs"
            />
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Your Email"
              className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2 focus:outline-none focus:border-primary/30 transition-all text-xs"
            />
          </div>

          {/* Honeypot field - Hidden from users */}
          <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
            <input
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="Your website URL"
            />
          </div>

          <textarea
            required
            rows={2}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Add your answer or reply to this thread..."
            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/30 transition-all text-sm resize-none"
          />

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-400 italic">Your email will not be published.</p>
            <button
              disabled={loading}
              className="bg-primary hover:bg-white text-black font-black text-[10px] px-6 py-2 rounded-lg transition-all flex items-center gap-2 uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
              Post Answer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

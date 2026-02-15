"use client";

import { useState } from "react";
import { Send, Loader2, User } from "lucide-react";

export default function AnswerReplyForm({ questionSlug }: { questionSlug: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending to email/manual queue
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl text-center italic">
        <p className="text-sm text-gray-400">Thanks for your contribution! Mo will review your answer and add it to the thread shortly. <span className="text-primary font-bold">Community power!</span></p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center shrink-0 border border-white/5">
          <User className="w-5 h-5 text-gray-500" />
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <textarea
            required
            rows={2}
            placeholder="Add your answer or reply to this thread..."
            className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/30 transition-all text-sm resize-none"
          />

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Logged in as Guest</p>
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

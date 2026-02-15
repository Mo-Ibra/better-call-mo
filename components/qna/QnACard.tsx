"use client";

import type { QnA } from "@/lib/qna";
import { ArrowBigUp, MessageSquare, Tag, Calendar, User } from "lucide-react";
import Link from "next/link";

export default function QnACard({ qna }: { qna: QnA }) {
  return (
    <div className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all hover:bg-zinc-900">
      <div className="p-8">
        <div className="flex gap-6">
          {/* Voting Box */}
          <div className="flex flex-col items-center gap-1 h-fit py-3 px-2 bg-white/5 rounded-xl border border-white/5">
            <ArrowBigUp className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors cursor-pointer" />
            <span className="font-bold text-lg">{qna.upvotes}</span>
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="px-3 py-1 bg-primary/10 text-primary-400 font-bold rounded-full uppercase tracking-widest border border-primary/20">
                {qna.category}
              </span>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{qna.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <User className="w-3.5 h-3.5" />
                <span>{qna.author}</span>
              </div>
            </div>

            <Link href={`/ask-mo/${qna.slug}`} className="block">
              <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                {qna.question}
              </h3>
            </Link>

            <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed">
              {qna.answerBody.substring(0, 150)}...
            </p>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex gap-2">
                {qna.relatedServices?.map(service => (
                  <span key={service} className="text-[10px] uppercase font-black text-gray-600 border border-white/5 px-2 py-0.5 rounded">
                    #{service}
                  </span>
                ))}
              </div>

              <Link
                href={`/ask-mo/${qna.slug}`}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                Read Expert Answer <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

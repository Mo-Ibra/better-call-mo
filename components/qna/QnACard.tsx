"use client";

import type { QnA } from "@/lib/qna-shared";
import { ArrowBigUp, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function QnACard({ qna }: { qna: QnA }) {
  return (
    <div className="group bg-zinc-900/40 border border-white/5 rounded-xl hover:border-white/10 transition-all">
      <div className="flex">
        {/* Reddit-style Upvote Barre */}
        <div className="w-12 bg-white/[0.02] flex flex-col items-center py-4 gap-1 rounded-l-xl">
          <ArrowBigUp className="w-6 h-6 text-gray-500 hover:text-primary transition-colors cursor-pointer" />
          <span className="font-black text-xs">{qna.upvotes}</span>
        </div>

        <div className="flex-1 p-6 space-y-3">
          {/* Metadata Header */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-2 py-0.5 rounded">
              r/{qna.category}
            </div>
            <span>•</span>
            <span className="text-gray-400">u/{qna.askedBy}</span>
            <span>•</span>
            <span>{qna.date}</span>
          </div>

          <Link href={`/ask-mo/${qna.slug}`} className="block">
            <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
              {qna.question}
            </h3>
          </Link>

          <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed italic">
            &quot;{qna.answerBody.substring(0, 150).replace(/[#*]/g, "")}...&quot;
          </p>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/ask-mo/${qna.slug}`}
                className="flex items-center gap-1.5 text-xs font-black text-gray-500 hover:bg-white/5 px-2 py-1 rounded transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> 1 Answer
              </Link>
            </div>

            <div className="flex gap-2">
              {qna.relatedServices?.map(service => (
                <span key={service} className="text-[9px] uppercase font-black text-gray-700 bg-white/5 px-1.5 py-0.5 rounded">
                  #{service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

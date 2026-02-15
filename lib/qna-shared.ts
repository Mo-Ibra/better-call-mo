import { LanguageCode } from "./i18n.config";

export type { LanguageCode };

export interface QnA {
  slug: string;
  question: string;
  answerBody: string;
  category: "Technical" | "SEO" | "Business" | "SaaS" | "Performance";
  author: string;
  askedBy: string;
  askedByAvatar?: string;
  date: string;
  upvotes: number;
  keywords?: string[];
  relatedServices?: string[]; // slugs
  communityAnswers?: {
    author: string;
    avatar?: string;
    date: string;
    body: string;
    upvotes: number;
    isVerified?: boolean;
  }[];
}

export type Category = QnA["category"];

export const QNA_CATEGORIES: Category[] = ["Technical", "SEO", "Business", "SaaS", "Performance"];

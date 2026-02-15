import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { QnA, Category, QNA_CATEGORIES, LanguageCode } from "./qna-shared";

export type { QnA, Category };
export { QNA_CATEGORIES };

const QNA_BASE_DIR = path.join(process.cwd(), "content/qna");

export async function getAllQnAs(lang: LanguageCode = "en"): Promise<QnA[]> {
  const qnaDir = lang === "en" ? QNA_BASE_DIR : path.join(QNA_BASE_DIR, lang);

  if (!fs.existsSync(qnaDir)) return [];

  const files = fs.readdirSync(qnaDir);
  const allQnAs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const fullPath = path.join(qnaDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        question: data.question,
        answerBody: content,
        category: data.category,
        author: data.author,
        askedBy: data.askedBy || "Community Member",
        askedByAvatar: data.askedByAvatar || "",
        date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : data.date,
        upvotes: data.upvotes || 0,
        relatedServices: data.relatedServices || [],
        communityAnswers: data.communityAnswers || [],
      } as QnA;
    });

  return allQnAs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getQnABySlug(slug: string, lang: LanguageCode = "en"): Promise<QnA | null> {
  const qnaDir = lang === "en" ? QNA_BASE_DIR : path.join(QNA_BASE_DIR, lang);
  const fullPath = path.join(qnaDir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    question: data.question,
    answerBody: content,
    category: data.category,
    author: data.author,
    askedBy: data.askedBy || "Community Member",
    askedByAvatar: data.askedByAvatar || "",
    date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : data.date,
    upvotes: data.upvotes || 0,
    relatedServices: data.relatedServices || [],
    communityAnswers: data.communityAnswers || [],
  } as QnA;
}

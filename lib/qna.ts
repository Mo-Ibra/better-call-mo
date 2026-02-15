import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { QnA, Category, QNA_CATEGORIES } from "./qna-shared";

export type { QnA, Category };
export { QNA_CATEGORIES };

const QNA_DIR = path.join(process.cwd(), "content/qna");

export async function getAllQnAs(): Promise<QnA[]> {
  if (!fs.existsSync(QNA_DIR)) return [];

  const files = fs.readdirSync(QNA_DIR);
  const allQnAs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const fullPath = path.join(QNA_DIR, file);
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
        date: data.date,
        upvotes: data.upvotes || 0,
        relatedServices: data.relatedServices || [],
        communityAnswers: data.communityAnswers || [],
      } as QnA;
    });

  return allQnAs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getQnABySlug(slug: string): Promise<QnA | null> {
  const fullPath = path.join(QNA_DIR, `${slug}.md`);
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
    date: data.date,
    upvotes: data.upvotes || 0,
    relatedServices: data.relatedServices || [],
    communityAnswers: data.communityAnswers || [],
  } as QnA;
}

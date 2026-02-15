import { BlogPost } from "@/lib/blog";
import FormattedMarkdown from "./FormattedMarkdown";

export default function ClientArticle({ post }: { post: BlogPost }) {
  return (
    <article className="w-full sm:max-w-4xl md:max-w-5xl mx-auto overflow-x-hidden px-2 md:px-2">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 break-words">
          {post.frontmatter.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-gray-400 mb-4 text-sm sm:text-base">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.frontmatter.readingTime && (
            <span>• {post.frontmatter.readingTime} min read</span>
          )}
        </div>

        {post.frontmatter.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/30 text-white rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="article-content">
        <FormattedMarkdown content={post.content} />
      </div>
    </article>
  );
}

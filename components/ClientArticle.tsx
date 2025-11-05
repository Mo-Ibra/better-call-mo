import { BlogPost } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function ClientArticle({ post }: { post: BlogPost}) {
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.frontmatter.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-400 mb-4">
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, children, ...props }) => {
              const text = String(children);
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <h1
                  id={id}
                  className="text-4xl font-bold mt-8 mb-4 tracking-tight scroll-mt-20"
                  {...props}
                >
                  {children}
                </h1>
              );
            },
            h2: ({ node, children, ...props }) => {
              const text = String(children);
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <h2
                  id={id}
                  className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-800 scroll-mt-20"
                  {...props}
                >
                  {children}
                </h2>
              );
            },
            h3: ({ node, children, ...props }) => {
              const text = String(children);
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <h3
                  id={id}
                  className="text-2xl font-bold mt-6 mb-3 scroll-mt-20"
                  {...props}
                >
                  {children}
                </h3>
              );
            },
            h4: ({ node, children, ...props }) => {
              const text = String(children);
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <h4
                  id={id}
                  className="text-xl font-bold mt-4 mb-2 scroll-mt-20"
                  {...props}
                >
                  {children}
                </h4>
              );
            },
            p: ({ node, ...props }) => (
              <p
                className="text-gray-300 leading-relaxed mb-4 text-lg"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a className="text-blue-400 hover:underline" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-gray-100" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-gray-200" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-gray-300 leading-relaxed" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-400 bg-gray-900"
                {...props}
              />
            ),
            hr: ({ node, ...props }) => (
              <hr className="border-gray-700 my-8" {...props} />
            ),
            img: ({ node, ...props }) => (
              <img className="rounded-lg shadow-lg my-6 w-full" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border-collapse" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => (
              <thead className="border-b-2 border-gray-700" {...props} />
            ),
            th: ({ node, ...props }) => (
              <th
                className="px-4 py-2 text-left font-semibold text-gray-100"
                {...props}
              />
            ),
            td: ({ node, ...props }) => (
              <td
                className="px-4 py-2 border-t border-gray-800 text-gray-300"
                {...props}
              />
            ),
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: "1.5rem 0",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    padding: "1rem",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}

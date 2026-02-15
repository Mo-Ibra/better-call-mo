import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface FormattedMarkdownProps {
  content: string;
}

export const markdownComponents: Components = {
  h1: ({ children, ...props }) => {
    const text = String(children);
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      <h1
        id={id}
        className="text-3xl sm:text-4xl font-bold mt-6 mb-4 tracking-tight scroll-mt-20 break-words"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const text = String(children);
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold mt-6 mb-3 pb-2 border-b border-gray-800 scroll-mt-20 break-words"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = String(children);
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      <h3
        id={id}
        className="text-xl sm:text-2xl font-bold mt-5 mb-2 scroll-mt-20 break-words"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const text = String(children);
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      <h4
        id={id}
        className="text-lg sm:text-xl font-bold mt-4 mb-2 scroll-mt-20 break-words"
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: (props) => (
    <p
      className="text-gray-300 leading-relaxed mb-4 text-base sm:text-lg break-words"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-blue-400 hover:underline break-all"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-gray-100" {...props} />
  ),
  em: (props) => <em className="italic text-gray-200" {...props} />,
  ul: (props) => (
    <ul
      className="list-disc pl-5 sm:pl-6 my-4 space-y-2 break-words"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-5 sm:pl-6 my-4 space-y-2 break-words"
      {...props}
    />
  ),
  li: (props) => (
    <li className="text-gray-300 leading-relaxed break-words" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-400 bg-gray-900 rounded-md break-words"
      {...props}
    />
  ),
  hr: (props) => <hr className="border-gray-700 my-8" {...props} />,
  img: (props) => (
    <img
      className="rounded-lg shadow-lg w-full h-auto max-h-[500px] object-contain"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-6 w-full">
      <table
        className="min-w-full border-collapse text-sm sm:text-base"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="border-b-2 border-gray-700" {...props} />
  ),
  th: (props) => (
    <th
      className="px-3 sm:px-4 py-2 text-left font-semibold text-gray-100 whitespace-nowrap"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-3 sm:px-4 py-2 border-t border-gray-800 text-gray-300 whitespace-pre-wrap"
      {...props}
    />
  ),
  code({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="overflow-x-auto my-4 rounded-lg">
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: "0.5rem",
            fontSize: "0.85rem",
            padding: "1rem",
            minWidth: "100%",
          }}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code
        className="text-pink-400 bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono break-words"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export default function FormattedMarkdown({ content }: FormattedMarkdownProps) {
  return (
    <div className="formatted-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

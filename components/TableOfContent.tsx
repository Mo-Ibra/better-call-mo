import { Heading } from "@/lib/blog";

export default function TableOfContents({ headings }: { headings: Heading[] }) {

  if (headings.length === 0) return null;

  return (
    <nav className="border border-primary/30 rounded-lg p-6 mb-8 sticky top-4">
      <h2 className="text-xl font-bold mb-4 text-gray-100">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-gray-400 hover:hover:text-blue-400 transition-colors ${
                heading.level === 2 ? "font-semibold" : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
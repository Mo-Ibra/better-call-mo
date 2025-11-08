import { Heading } from "@/lib/blog";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  const visibleHeadings = headings.slice(0, 13);
  const hasMore = headings.length > 13;

  return (
    <nav className="border border-primary/30 rounded-lg p-6 mb-8 sticky top-4">
      <h2 className="text-xl font-bold mb-4 text-gray-100">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {visibleHeadings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              title={heading.id.replaceAll("-", " ")}
              className={`block text-gray-400 hover:text-blue-400 transition-colors ${
                heading.level === 2 ? "font-semibold" : ""
              }`}
            >
              {heading.text.split(" ").slice(0, 7).join(" ") +
                (heading.text.split(" ").length > 7 ? "..." : "")}
            </a>
          </li>
        ))}

        {hasMore && (
          <li className="text-gray-500 italic text-sm pt-2 text-center">And more...</li>
        )}
      </ul>
    </nav>
  );
}
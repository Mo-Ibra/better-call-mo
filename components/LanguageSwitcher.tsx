// components/LanguageSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { languages, LanguageCode } from "@/lib/i18n.config";
import { useState, useRef, useEffect } from "react";

interface LanguageSwitcherProps {
  currentLang?: LanguageCode;
  availableTranslations?: LanguageCode[];
}

export default function LanguageSwitcher({
  currentLang = "en",
  availableTranslations,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate the URL for a different language
  const getLanguageUrl = (langCode: LanguageCode): string => {
    // If switching to English, remove language prefix
    if (langCode === "en") {
      // Remove /[lang]/ from the path
      const pathWithoutLang = pathname.replace(/^\/[a-z]{2}\//, "/");
      return pathWithoutLang || "/blog";
    }

    // If current is English, add language prefix
    if (currentLang === "en") {
      return `/${langCode}${pathname}`;
    }

    // Replace current language with new language
    return pathname.replace(`/${currentLang}/`, `/${langCode}/`);
  };

  // Determine which languages to show
  const languagesToShow = availableTranslations
    ? Object.entries(languages).filter(([code]) =>
        availableTranslations.includes(code as LanguageCode)
      )
    : Object.entries(languages);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
        aria-label="Change language"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-sm font-medium">
          {languages[currentLang].code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-700 bg-gray-900 shadow-xl z-50">
          <div className="py-1">
            {languagesToShow.map(([code, lang]) => {
              const isActive = code === currentLang;
              const langCode = code as LanguageCode;

              return (
                <Link
                  key={code}
                  href={getLanguageUrl(langCode)}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                    isActive ? "bg-gray-800 text-primary" : "text-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{lang.name}</span>
                    {isActive && (
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

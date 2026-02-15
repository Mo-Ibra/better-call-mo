# Better Call Mo: AI Content Factory 🚀

These scripts are the "secret sauce" of your technical authority. Powered by **Ollama** and **DeepSeek-V3.1**, they help you generate expert-level content and translate it to multiple languages in seconds. 

Don't just write code – dominate the search rankings.

## Prerequisites

1.  **Ollama:** Ensure [Ollama](https://ollama.com/) is installed and running locally.
2.  **Model:** Pull the required model (recommended: DeepSeek-V3 or similar):
    ```bash
    ollama pull deepseek-v3.1:671b-cloud
    ```

---

## 1. Blog Article Generator
Generates a 1500+ word, SEO-optimized article with internal links to your services and city pages.

**Usage:**
```bash
node scripts/generate-blog.mjs "Your Article Topic"
```

**What it does:**
-   **Mo's Persona:** Expert, slightly aggressive, and authoritative.
-   **Smart Linking:** Finding conversion goals in every paragraph.
-   **Output:** Saves to `content/blog/[slug].md`.

---

## 2. Blog Translator
Translates an existing English blog post into Spanish, Italian, German, and Portuguese.

**Usage:**
```bash
node scripts/translate-blog.mjs my-article-slug
```

---

## 3. Community Q&A Generator
Generates expert-level technical answers for the "Ask Mo" Q&A system. These are designed to trigger Google's **Q&A Rich Snippets**.

**Usage:**
```bash
node scripts/generate-qna.mjs "Your Technical Question" "Category"
```
**Categories:** `Technical`, `SEO`, `Business`, `SaaS`, `Performance`.

---

## 4. Community Q&A Translator 🌍
Translates all English Q&A posts into our 4 target languages (ES, IT, DE, PT) while keeping the technical tone intact.

**Usage:**
-   **Translate everything:**
    ```bash
    node scripts/translate-qna.mjs
    ```
-   **Translate a specific file:**
    ```bash
    node scripts/translate-qna.mjs "my-file.md"
    ```

**What it does:**
-   **Localized Directories:** Places files in `content/qna/es/`, `content/qna/it/`, etc.
-   **Frontmatter Aware:** Translates the question title while keeping IDs and meta-data consistent.

---

## Strategy: The Content Cluster
These tools are built to support a **Global Authority** strategy: 
-   **Blog:** Top-of-funnel awareness and depth.
-   **Q&A:** Captures long-tail "How to" intent and builds direct trust.
-   **Multi-lingual:** Reaches markets your competitors are ignoring.
-   **Sitemap:** Automatically pushes all new dynamic content to search engines.

**Better call Mo, and let the AI do the heavy lifting.** ✍️⚖️

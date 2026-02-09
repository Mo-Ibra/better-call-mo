# Better Call Mo: Blog Tools 🚀

These scripts are designed to automate your content strategy using **Ollama** and **DeepSeek-V3**. They help you generate high-quality, long-form SEO articles and translate them into multiple languages in seconds.

## Prerequisites

1.  **Ollama:** Ensure [Ollama](https://ollama.com/) is installed and running locally.
2.  **Model:** Pull the required model:
    ```bash
    ollama pull deepseek-v3.1:671b-cloud
    ```
    *(Note: You can change the `MODEL` constant in the scripts to use `llama3` or `mistral` if preferred.)*

---

## 1. Blog Article Generator
Generates a 1500+ word, SEO-optimized article with internal links to your services and city pages.

**Usage:**
```bash
node scripts/generate-blog.mjs "Your Article Topic"
```

**What it does:**
-   **Human Tone:** Uses storytelling and professional anecdotes.
-   **Smart Linking:** Automatically finds opportunities to link to your `/services/` and `/web-developer/[city]` pages.
-   **Saves:** Creates a new `.md` file in `content/blog/`.

---

## 2. Blog Translator
Translates an existing English blog post into Spanish, Italian, German, and Portuguese.

**Usage:**
-   **Translate to all 5 languages:**
    ```bash
    node scripts/translate-blog.mjs my-article-slug
    ```
-   **Translate to a specific language (e.g., Spanish):**
    ```bash
    node scripts/translate-blog.mjs my-article-slug es
    ```

**What it does:**
-   **Preserves Structure:** Translates text but keeps all Markdown syntax, images, and links intact.
-   **Frontmatter Aware:** Translates SEO titles and descriptions while keeping JSON metadata keys untouched.
-   **Fast:** Leverages local GPU acceleration via Ollama.

---

## Strategy: The Content Cluster
These tools are built to support a **Topic Cluster** SEO strategy. 
-   **Generation** creates the "Informational" content.
-   **Internal Linking** passes authority to your "Transactional" service pages.
-   **Translation** expands your reach to global markets (Germany, Spain, Brazil, Italy).

**Happy Writing!** ✍️

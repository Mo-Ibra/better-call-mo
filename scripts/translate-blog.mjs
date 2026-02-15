import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- CONFIGURATION ---
const OLLAMA_API = 'http://localhost:11434/api/chat';
const MODEL = 'deepseek-v3.1:671b-cloud'; // or 'mistral', 'qwen2', etc.
const TARGET_LANGS = ['es', 'it', 'de', 'pt']; // 'en' is source
const BLOG_DIR = path.join(process.cwd(), '/content/blog');

// Language Names
const LANG_NAMES = {
  es: 'Spanish',
  it: 'Italian',
  de: 'German',
  pt: 'Portuguese'
};

async function translateText(text, targetLangName, isFrontmatter = false) {
  const systemPrompt = isFrontmatter
    ? `You are a professional translator and SEO expert. Translate the following metadata (title, description, and keywords) into ${targetLangName}. 
       Keep the formatting as a JSON object if provided. Do NOT translate the keys, only the values. 
       Ensure titles are catchy and descriptions are SEO-optimized.`
    : `You are a professional blog translator. Translate the following markdown content into ${targetLangName}. 
       CRITICAL: Preserve all markdown syntax, images, links, and code blocks EXACTLY as they are. 
       Do NOT translate code inside code blocks. 
       Maintain the tone and storytelling style of the original author.`;

  try {
    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text }
        ],
        stream: false
      })
    });

    const data = await response.json();
    return data.message.content.trim();
  } catch (error) {
    console.error(`Error translating to ${targetLangName}:`, error.message);
    return null;
  }
}

async function main() {
  const slug = process.argv[2];
  const requestedLang = process.argv[3]; // Optional target language

  if (!slug) {
    console.error('Usage: node scripts/translate-blog.mjs <slug> [lang]');
    process.exit(1);
  }

  const sourcePath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  // Filter target languages if one is specified
  const langsToProcess = requestedLang
    ? TARGET_LANGS.filter(l => l === requestedLang)
    : TARGET_LANGS;

  if (requestedLang && langsToProcess.length === 0) {
    console.error(`❌ Language "${requestedLang}" is not supported or is the source language.`);
    console.log(`Available: ${TARGET_LANGS.join(', ')}`);
    process.exit(1);
  }

  console.log(`🚀 Starting translation for: ${slug} (${requestedLang ? `Target: ${requestedLang}` : 'All languages'})`);
  const fileContent = fs.readFileSync(sourcePath, 'utf8');
  const { data: frontmatter, content: body } = matter(fileContent);

  for (const lang of langsToProcess) {
    console.log(`\nTranslating to [${lang}] (${LANG_NAMES[lang]})...`);

    // 1. Translate Frontmatter
    const metaToTranslate = {
      title: frontmatter.title,
      description: frontmatter.description,
      keywords: frontmatter.keywords || []
    };

    const translatedMetaRaw = await translateText(JSON.stringify(metaToTranslate, null, 2), LANG_NAMES[lang], true);
    let translatedMeta = metaToTranslate;
    try {
      // Small cleanup in case Ollama wraps in markdown block
      const jsonMatch = translatedMetaRaw.match(/\{[\s\S]*\}/);
      translatedMeta = JSON.parse(jsonMatch ? jsonMatch[0] : translatedMetaRaw);
    } catch (e) {
      console.warn(`⚠️ Failed to parse translated JSON for ${lang}, using raw content.`);
    }

    // 2. Translate Body Content
    const translatedBody = await translateText(body, LANG_NAMES[lang], false);

    if (!translatedBody) {
      console.error(`❌ Skipped ${lang} due to translation error.`);
      continue;
    }

    // 3. Construct Final File
    const newFrontmatter = {
      ...frontmatter,
      title: translatedMeta.title,
      description: translatedMeta.description,
      keywords: translatedMeta.keywords,
      // Update reading time placeholder if needed, or leave to lib
    };

    const outputDir = path.join(BLOG_DIR, lang);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${slug}.md`);
    const finalContent = matter.stringify(translatedBody, newFrontmatter);

    fs.writeFileSync(outputPath, finalContent);
    console.log(`✅ Saved to: content/blog/${lang}/${slug}.md`);
  }

  console.log('\n✨ All translations complete!');
}

main();

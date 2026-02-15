import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const QNA_BASE_DIR = path.join(process.cwd(), 'content', 'qna');
const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'deepseek-v3.1:671b-cloud'; // or your preferred model

const targetLanguages = ['es', 'it', 'de', 'pt'];

async function translateContent(content, targetLang, question) {
  const langNames = {
    es: 'Spanish',
    it: 'Italian',
    de: 'German',
    pt: 'Portuguese'
  };

  const systemPrompt = `
    You are an expert translator specializing in technical web development content.
    Target Language: ${langNames[targetLang]}
    
    TONE: Maintain the "Better Call Mo" persona - professional, expert, but approachable and authoritative.
    
    TASK: Translate the following technical Q&A response.
    - Translate the QUESTION accurately.
    - Translate the BODY content, maintaining all Markdown formatting and code blocks.
    - Do NOT translate technical terms that are standard in the industry (e.g., "Next.js", "Hydration", "SEO").
    - Ensure the tone remains consistent with a senior developer giving advice.
    
    QUESTION TO TRANSLATE: ${question}
  `;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: content }
        ],
        stream: false,
      }),
    });

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error(`Error translating to ${targetLang}:`, error);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const specificFile = args[0];

  let filesToProcess = [];
  if (specificFile) {
    filesToProcess = [specificFile];
  } else {
    filesToProcess = fs.readdirSync(QNA_BASE_DIR).filter(f => f.endsWith('.md'));
  }

  for (const file of filesToProcess) {
    const filePath = path.join(QNA_BASE_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    console.log(`\n📄 Processing: ${file}`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(fileContents);

    for (const lang of targetLanguages) {
      const langDir = path.join(QNA_BASE_DIR, lang);
      if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });

      const outputPath = path.join(langDir, file);
      if (fs.existsSync(outputPath)) {
        console.log(`   ⏭️ Skipping ${lang} (already exists)`);
        continue;
      }

      console.log(`   🌍 Translating to ${lang}...`);
      const translatedBody = await translateContent(body, lang, frontmatter.question);

      if (translatedBody) {
        // We might also want to translate the question in frontmatter
        const translatedQuestion = await translateContent('', lang, `JUST TRANSLATE THIS TITLE: ${frontmatter.question}`);

        const newFrontmatter = {
          ...frontmatter,
          question: translatedQuestion?.replace(/^"|"$/g, '') || frontmatter.question,
          date: new Date().toISOString().split('T')[0]
        };

        const newFileContent = matter.stringify(translatedBody, newFrontmatter);
        fs.writeFileSync(outputPath, newFileContent);
        console.log(`   ✅ Saved ${lang} version.`);
      }
    }
  }
}

main();

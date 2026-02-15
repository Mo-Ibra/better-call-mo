import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const QNA_DIR = path.join(process.cwd(), 'content', 'qna');
const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'deepseek-v3.1:671b-cloud'; // or your preferred model

async function generateQnA(topic, category) {
  const systemPrompt = `
    You are Mohamed (Mo), a professional web developer and SEO expert. 
    You are answering a question from a member of your community. 
    
    TONE: Helpful, expert, approachable, and slightly "Saul Goodman" (fights for the client's code).
    
    FORMAT: 
    Return a Markdown file with frontmatter:
    ---
    question: "The user's question"
    category: "${category}"
    askedByAvatar: A 2-letter string (e.g., "TF").
    date: Current date in YYYY-MM-DD format.
    upvotes: A random number between 1 and 10.
    keywords: An array of 3-5 technical SEO keywords related to the question.
    relatedServices: An array of 1-2 related service slugs from this list: ${SERVICES.map(s => s.slug).join(', ')}.
    ---
    # H1 Title (Professional & Catchy)
    Intro text...
    
    The body should be the detailed answer (minimum 300 words). 
    Use subheadings, code examples (if relevant), and clear advice.
  `;

  const userPrompt = `Write a professional Q&A thread about "${topic}" in the category "${category}". 
    Format your response EXACTLY like the structure above with the frontmatter.`;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: systemPrompt }],
        stream: false,
      }),
    });

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error('Error calling Ollama:', error);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const topic = args[0];
  const category = args[1] || "Technical";

  if (!topic) {
    console.error('Usage: node scripts/generate-qna.mjs "The Question or Topic" "Category"');
    process.exit(1);
  }

  console.log(`🤔 Answering question about: "${topic}"...`);
  const content = await generateQnA(topic, category);

  if (!content) {
    console.error('❌ Failed to generate Q&A.');
    process.exit(1);
  }

  // Create slug from first part of content or topic
  const slug = topic.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const outputPath = path.join(QNA_DIR, `${slug}.md`);
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Q&A generated and saved to: content/qna/${slug}.md`);
}

main();

import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const OLLAMA_API = 'http://localhost:11434/api/chat';
const MODEL = 'glm-4.6:cloud'; // you can use gpt-oss:120b-cloud or anything
const BLOG_DIR = path.join(process.cwd(), '../content/blog');

// --- CONTEXT DATA (extracted from lib/) ---
const SERVICES = [
  { slug: 'nextjs-development', title: 'Next.js Development' },
  { slug: 'shopify-to-nextjs', title: 'Shopify to Headless Next.js' },
  { slug: 'saas-mvp-development', title: 'SaaS MVP Development' },
  { slug: 'mobile-app-development', title: 'Mobile App Development' },
  { slug: 'web-performance-optimization', title: 'Web Performance & SEO Speed Optimization' }
];

const LOCATIONS = [
  { slug: 'berlin', city: 'Berlin' },
  { slug: 'london', city: 'London' },
  { slug: 'new-york', city: 'New York' },
  { slug: 'toronto', city: 'Toronto' },
  { slug: 'sydney', city: 'Sydney' },
  { slug: 'amsterdam', city: 'Amsterdam' },
  { slug: 'dubai', city: 'Dubai' },
  { slug: 'frankfurt', city: 'Frankfurt' },
  { slug: 'san-francisco', city: 'San Francisco' },
  { slug: 'melbourne', city: 'Melbourne' }
];

async function generateArticle(topic) {
  const contextPrompt = `
    You are Mohamed (Mo), a professional web developer and SEO expert at "Better Call Mo".
    Your writing style MUST feel human, authentic, and authoritative. 
    
    GOAL: Write a high-quality, long-form SEO blog post (1500+ words).
    
    CONTENT REQUIREMENTS:
    1. **Storytelling:** Start with a hook. Tell a personal story or a specific "Case Study" about a project you worked on related to ${topic}. 
    2. **Real Experience:** Mention specific technical challenges you faced (e.g., "I once had a client whose site took 10 seconds to load...") and exactly how you solved them.
    3. **Long-Tail Keywords:** Naturally integrate highly specific, low-competition keywords (e.g., instead of "SEO", use "Next.js performance optimization for local business").
    4. **In-Depth Coverage:** Don't just scratch the surface. Explain the "Why" and "How" in detail. 
    5. **Internal Linking (CRITICAL):** Naturally weave in 3-5 links to your services and 2-3 links to your location pages.
    
    AVAILABLE SERVICES:
    ${SERVICES.map(s => `- [${s.title}](/services/${s.slug})`).join('\n')}
    
    AVAILABLE CITIES:
    ${LOCATIONS.map(l => `- [Web Developer in ${l.city}](/web-developer/${l.slug})`).join('\n')}
    
    STRUCTURE:
    - Catchy H1 Title (Frontmatter)
    - Engaging Intro with a Hook
    - Multiple H2 and H3 subheadings
    - Bullet points and numbered lists for readability
    - A technical deep-dive section
    - A "Lessons Learned" or "Expert Tip" section
    - Bold, contextual CTA at the end.
  `;

  const userPrompt = `Write a comprehensive blog post about "${topic}". 
    Format your response EXACTLY like this:
    ---
    title: "The Title"
    description: "SEO description"
    date: "${new Date().toISOString().split('T')[0]}"
    author: "Better Call Mo"
    keywords: ["word1", "word2"]
    tags: ["Tag1", "Tag2"]
    image: "/images/blog/placeholder.jpg"
    ---
    ## The Content Starts Here...
  `;

  try {
    const response = await fetch(OLLAMA_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: contextPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false
      })
    });

    const data = await response.json();
    return data.message.content.trim();
  } catch (error) {
    console.error(`Error generating article:`, error.message);
    return null;
  }
}

async function main() {
  const topic = process.argv.slice(2).join(' ');

  if (!topic) {
    console.error('Usage: node scripts/generate-blog.mjs "Your Article Topic"');
    process.exit(1);
  }

  console.log(`🧠 Thinking about: "${topic}"...`);
  const generatedContent = await generateArticle(topic);

  if (!generatedContent) {
    console.error('❌ Failed to generate content.');
    process.exit(1);
  }

  // Create a slug from the topic or generated title
  const slug = topic.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const outputPath = path.join(BLOG_DIR, `${slug}.md`);

  // Basic check for frontmatter structure
  if (!generatedContent.startsWith('---')) {
    console.warn('⚠️ Content might be missing proper frontmatter. Saving anyway...');
  }

  fs.writeFileSync(outputPath, generatedContent);
  console.log(`\n✅ Article generated and saved to: content/blog/${slug}.md`);
  console.log(`👉 Now you can run: node scripts/translate-blog.mjs ${slug}`);
}

main();

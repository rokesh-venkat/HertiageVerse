import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenerativeAI } from '@google/generative-ai'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const knowledgeBase = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/knowledgeBase.json'), 'utf-8')
)

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null

/**
 * Retrieve the most relevant knowledge base chunks for a user query & site
 */
function retrieveRelevantChunks(query, siteSlug, maxChunks = 4) {
  const lowerQuery = query.toLowerCase()
  const scored = knowledgeBase.map((chunk) => {
    let score = 0
    // Site matching bonus
    if (siteSlug && chunk.site === siteSlug) {
      score += 2
    }
    // Keyword scoring
    chunk.keywords.forEach((kw) => {
      if (lowerQuery.includes(kw.toLowerCase())) {
        score += 1
      }
    })
    return { chunk, score }
  })

  const matches = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks)
    .map((s) => s.chunk)

  return matches
}

function buildSystemPrompt({ siteName, hotspotName, chunks }) {
  const context = chunks.length
    ? chunks.map((c) => `- ${c.content} (Source: ${c.source})`).join('\n')
    : 'No specific matching verified knowledge base entries were found.'

  return `You are the HeritageVerse AI Heritage Guide, an expert on Tamil Nadu's UNESCO World Heritage sites.

Current context:
- Site: ${siteName || 'Tamil Nadu Heritage Location'}
${hotspotName ? `- User is currently viewing: ${hotspotName}` : ''}

Verified Heritage Knowledge:
${context}

Rules:
1. Provide accurate, clear, and engaging responses about Tamil Nadu's UNESCO heritage.
2. Rely primarily on verified heritage knowledge when available.
3. Keep tone respectful, authoritative, and educational.
4. Keep responses concise (under 160 words).
5. Highlight historical significance and architectural beauty.`
}

function toGeminiHistory(history) {
  return history.map((turn) => ({
    role: turn.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: turn.content }],
  }))
}

export async function generateGuideResponse({ message, siteSlug, siteName, hotspotName, history = [] }) {
  const chunks = retrieveRelevantChunks(message, siteSlug)
  const systemPrompt = buildSystemPrompt({ siteName, hotspotName, chunks })

  if (!genAI) {
    // Fallback response if API key is not configured
    const firstChunk = chunks[0]
    return {
      text: firstChunk
        ? `${firstChunk.content}\n\n(Source: ${firstChunk.source})`
        : `HeritageVerse Guide: ${siteName || 'This site'} is an outstanding UNESCO World Heritage location in Tamil Nadu. How can I assist your exploration today?`,
      sourcesUsed: chunks.map((c) => c.source),
    }
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: 400,
      },
    })

    const chat = model.startChat({ history: toGeminiHistory(history) })
    const result = await chat.sendMessage(message)
    const text = result.response.text()

    return { text, sourcesUsed: chunks.map((c) => c.source) }
  } catch (err) {
    console.error('Gemini API Error:', err.message)
    const firstChunk = chunks[0]
    return {
      text: firstChunk
        ? `${firstChunk.content}\n\n(Source: ${firstChunk.source})`
        : `HeritageVerse AI Guide is here to help you discover ${siteName || 'Tamil Nadu heritage'}. Ask any question about its history, architecture, or visit planning!`,
      sourcesUsed: chunks.map((c) => c.source),
    }
  }
}

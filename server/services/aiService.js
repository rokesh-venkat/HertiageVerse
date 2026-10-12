import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenerativeAI } from '@google/generative-ai'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const knowledgeBase = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/knowledgeBase.json'), 'utf-8')
)

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null
const UNKNOWN_ANSWER = 'I do not have enough verified HeritageVerse information to answer that accurately.'

const SITE_ALIASES = {
  'brihadeeswarar-temple': ['big temple', 'brihadisvara', 'brihadeeswaram', 'peruvudaiyar kovil', 'rajarajeswaram', 'thanjavur temple', 'tanjore temple'],
  'pancha-rathas': ['five rathas', 'five chariots', 'pancha ratha', 'pancha rathas'],
  'airavatesvara-darasuram': ['darasuram temple', 'airavateswarar', 'airavatesvara temple'],
  'nilgiri-mountain-railway': ['ooty train', 'toy train', 'nilgiri railway', 'nmr', 'udagamandalam railway'],
  'arjunas-penance': ["arjuna's penance", 'arjunas penance', 'descent of the ganges'],
  'shore-temple': ['shore temple', 'mahabalipuram', 'mamallapuram'],
  'gangaikonda-cholapuram': ['gangaikondacholapuram', 'gangaikonda temple'],
}

function normalize(value = '') {
  return value.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
}

function words(value) {
  return new Set(normalize(value).split(' ').filter((word) => word.length > 2))
}

function hasPhrase(query, phrase) {
  return normalize(query).includes(normalize(phrase))
}

/** Retrieve the best source records, prioritizing the current site and exact aliases. */
function retrieveRelevantChunks(query, siteSlug, maxChunks = 5) {
  const queryWords = words(query)
  const aliases = SITE_ALIASES[siteSlug] || []
  const scored = knowledgeBase.map((chunk) => {
    const siteMatch = Boolean(siteSlug && chunk.site === siteSlug)
    const keywordMatches = chunk.keywords.filter((keyword) => hasPhrase(query, keyword))
    const aliasMatches = (SITE_ALIASES[chunk.site] || []).filter((alias) => hasPhrase(query, alias))
    const topicWords = words(chunk.topic.replace(/_/g, ' '))
    const keywordWords = new Set(chunk.keywords.flatMap((keyword) => [...words(keyword)]))
    const partialMatches = [...queryWords].filter((word) => keywordWords.has(word))
    const siteAliasMatch = aliases.some((alias) => hasPhrase(query, alias)) && siteMatch
    const topicMatch = [...queryWords].some((word) => topicWords.has(word))

    // The weights preserve the requested priority: site, exact phrase, topic, partial word.
    const score =
      (siteMatch ? 100 : 0) +
      (keywordMatches.length + aliasMatches.length + (siteAliasMatch ? 1 : 0)) * 20 +
      (topicMatch ? 8 : 0) +
      partialMatches.length * 2

    return { chunk, score }
  })

  const siteScoped = siteSlug && knowledgeBase.some((chunk) => chunk.site === siteSlug)
    ? scored.filter(({ chunk }) => chunk.site === siteSlug)
    : scored

  return siteScoped
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.chunk.id.localeCompare(b.chunk.id))
    .reduce((matches, { chunk }) => {
      if (!matches.some((match) => match.id === chunk.id)) matches.push(chunk)
      return matches
    }, [])
    .slice(0, maxChunks)
}

function sourcesFor(chunks) {
  return chunks.reduce((sources, chunk) => {
    const source = { name: chunk.source, url: chunk.sourceUrl }
    if (!sources.some((item) => item.name === source.name && item.url === source.url)) {
      sources.push(source)
    }
    return sources
  }, [])
}

function buildSystemPrompt({ siteName, hotspotName, chunks }) {
  const context = chunks.length
    ? chunks.map((chunk) => `- ${chunk.content} (Source: ${chunk.source}, ${chunk.sourceUrl})`).join('\n')
    : 'No specific matching verified knowledge-base entries were found.'

  return `You are the HeritageVerse AI Heritage Guide, an expert on Tamil Nadu heritage.

Current context:
- Site: ${siteName || 'Tamil Nadu heritage'}
${hotspotName ? `- User is viewing: ${hotspotName}` : ''}

Retrieved verified HeritageVerse context:
${context}

Rules:
1. Answer primarily from the retrieved verified context.
2. Do not invent facts, dates, sources, ticket prices, opening hours, or restoration details.
3. If the answer is not in the supplied context, say exactly: "${UNKNOWN_ANSWER}"
4. Use clear, engaging, concise language and stay under 160 words.
5. Never present an unsupported comparison or popular claim as established fact.`
}

function toGeminiHistory(history) {
  return Array.isArray(history)
    ? history
        .filter((turn) => turn && typeof turn.content === 'string')
        .map((turn) => ({
          role: turn.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: turn.content }],
        }))
    : []
}

function localFallback(chunks) {
  return chunks.length
    ? chunks.map((chunk) => chunk.content).join('\n\n')
    : UNKNOWN_ANSWER
}

export async function generateGuideResponse({ message, siteSlug, siteName, hotspotName, history = [] }) {
  const chunks = retrieveRelevantChunks(message, siteSlug)
  const sourcesUsed = sourcesFor(chunks)

  if (!genAI) {
    return {
      text: localFallback(chunks),
      sourcesUsed,
      mode: chunks.length ? 'local_verified_fallback' : 'unavailable',
    }
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: buildSystemPrompt({ siteName, hotspotName, chunks }),
      generationConfig: { maxOutputTokens: 400 },
    })
    const chat = model.startChat({ history: toGeminiHistory(history) })
    const result = await chat.sendMessage(message)
    const text = result.response.text().trim()

    if (!text || text === UNKNOWN_ANSWER) {
      return {
        text: text || UNKNOWN_ANSWER,
        sourcesUsed,
        mode: chunks.length ? 'local_verified_fallback' : 'unavailable',
      }
    }

    return { text, sourcesUsed, mode: 'gemini' }
  } catch (err) {
    console.error('Gemini API error:', err)
    return {
      text: localFallback(chunks),
      sourcesUsed,
      mode: chunks.length ? 'local_verified_fallback' : 'unavailable',
    }
  }
}

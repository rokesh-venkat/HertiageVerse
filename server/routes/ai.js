import { Router } from 'express'
import { generateGuideResponse } from '../services/aiService.js'
import { rateLimit } from '../middleware/rateLimit.js'

const router = Router()
const chatRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Too many chat requests. Please wait a moment and try again.',
})

// POST /api/chat
// Body: { message: string, siteSlug?: string, siteName?: string, hotspotName?: string, history?: [] }
router.post('/chat', chatRateLimit, async (req, res) => {
  const { message, siteSlug, siteName, hotspotName, history } = req.body || {}

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({
      error: 'Invalid request. A non-empty "message" string is required.',
    })
  }

  try {
    const safeHistory = Array.isArray(history)
      ? history
          .filter((turn) => turn && ['user', 'assistant'].includes(turn.role) && typeof turn.content === 'string')
          .slice(-6)
          .map((turn) => ({ role: turn.role, content: turn.content.slice(0, 1200) }))
      : []
    const result = await generateGuideResponse({
      message: message.trim().slice(0, 2000),
      siteSlug: typeof siteSlug === 'string' ? siteSlug.slice(0, 100) : undefined,
      siteName: typeof siteName === 'string' ? siteName.slice(0, 200) : undefined,
      hotspotName: typeof hotspotName === 'string' ? hotspotName.slice(0, 200) : undefined,
      history: safeHistory,
    })
    res.json(result)
  } catch (err) {
    console.error('AI Guide error:', err)
    res.status(500).json({
      error: 'The AI Heritage Guide is temporarily unavailable. Please try again shortly.',
    })
  }
})

export default router

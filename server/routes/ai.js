import { Router } from 'express'
import { generateGuideResponse } from '../services/aiService.js'

const router = Router()

// POST /api/chat
// Body: { message: string, siteId?: string, siteName?: string, hotspotName?: string, history?: [] }
router.post('/chat', async (req, res) => {
  const { message, siteName, hotspotName, history } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'A "message" string is required.' })
  }

  try {
    const result = await generateGuideResponse({ message, siteName, hotspotName, history })
    res.json(result)
  } catch (err) {
    console.error('AI Guide error:', err.message)
    res.status(500).json({
      error: 'The AI Heritage Guide is temporarily unavailable. Please try again shortly.',
    })
  }
})

export default router

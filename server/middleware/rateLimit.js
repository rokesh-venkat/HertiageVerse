const windows = new Map()

export function rateLimit({ windowMs, max, message }) {
  return (req, res, next) => {
    const key = req.ip || 'unknown'
    const now = Date.now()
    const current = windows.get(key)

    if (!current && windows.size >= 10000) {
      for (const [storedKey, entry] of windows) {
        if (now - entry.startedAt >= windowMs) windows.delete(storedKey)
      }
      if (windows.size >= 10000) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' })
      }
    }

    if (!current || now - current.startedAt >= windowMs) {
      windows.set(key, { startedAt: now, count: 1 })
      return next()
    }

    if (current.count >= max) {
      return res.status(429).json({ error: message })
    }

    current.count += 1
    return next()
  }
}

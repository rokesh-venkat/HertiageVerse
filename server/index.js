import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import aiRoutes from './routes/ai.js'
import siteRoutes from './routes/sites.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'HeritageVerse API' })
})

app.use('/api', aiRoutes)
app.use('/api/sites', siteRoutes)

app.listen(PORT, () => {
  console.log(`HeritageVerse API running on port ${PORT}`)
})

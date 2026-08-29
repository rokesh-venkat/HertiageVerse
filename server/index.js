import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import aiRoutes from './routes/ai.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'HeritageVerse API' })
})

app.use('/api', aiRoutes)

app.listen(PORT, () => {
  console.log(`HeritageVerse API running on port ${PORT}`)
})

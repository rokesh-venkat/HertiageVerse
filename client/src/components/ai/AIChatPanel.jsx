import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from 'lucide-react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function AIChatPanel({ site }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Greetings! I am the HeritageVerse AI Guide. Ask me anything about ${
        site?.name || 'Tamil Nadu heritage'
      } — its history, architecture, builder, or cultural significance!`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('online')
  const [retryQuestion, setRetryQuestion] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e, question = input) => {
    e?.preventDefault()
    if (!question.trim() || loading) return

    const userMsg = question.trim()
    setInput('')
    setRetryQuestion('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    setStatus('loading')

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          siteSlug: site?.slug,
          siteName: site?.name,
          history: messages.slice(-6),
        }),
      })

      if (!res.ok) throw new Error('API server error')
      const data = await res.json()
      const responseMode = data.mode || (data.isFallback ? 'local_verified_fallback' : 'gemini')
      const isUnavailable = responseMode === 'unavailable'

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.text,
          sources: data.sourcesUsed,
          mode: responseMode,
        },
      ])
      setStatus(isUnavailable ? 'offline' : responseMode === 'local_verified_fallback' ? 'fallback' : 'online')
      if (isUnavailable) setRetryQuestion(userMsg)
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'The Heritage Guide is temporarily unavailable. Please try again shortly.',
          mode: 'unavailable',
        },
      ])
      setStatus('offline')
      setRetryQuestion(userMsg)
    } finally {
      setLoading(false)
    }
  }

  const suggestedQuestions = [
    `Who built ${site?.name || 'this site'}?`,
    `What is the architectural style?`,
    `Why is it UNESCO recognized?`,
  ]

  const statusText = {
    online: 'AI Heritage Guide',
    loading: 'Consulting heritage archive...',
    fallback: 'Showing verified local heritage information',
    offline: 'Guide temporarily unavailable',
  }

  return (
    <div className="rounded-2xl border border-basalt-700 bg-basalt-900 overflow-hidden flex flex-col h-140">
      {/* Header */}
      <div className="p-4 border-b border-basalt-800 bg-basalt-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
            <Bot size={16} className="text-gold-400" />
          </div>
          <div>
            <h3 className="font-display text-sm text-sand-100">{statusText[status]}</h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-gold-500">
              Grounded on Verified Knowledge · {site?.name}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400">
          Gemini 2.5
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 mt-1">
                <Sparkles size={12} className="text-gold-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gold-500 text-basalt-950 font-medium rounded-tr-none'
                  : 'bg-basalt-800 text-sand-100 rounded-tl-none border border-basalt-700'
              }`}
            >
              {msg.mode === 'local_verified_fallback' && (
                <div className="mb-3 flex items-center gap-2 text-xs text-gold-400" role="status">
                  <AlertCircle size={14} /> Showing verified local heritage information
                </div>
              )}
              {msg.mode === 'unavailable' && (
                <div className="mb-3 flex items-center gap-2 text-xs text-red-300" role="status">
                  <AlertCircle size={14} /> Guide temporarily unavailable
                </div>
              )}
              <p>{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-basalt-700/50 font-mono text-[10px] text-gold-400/80">
                  Sources used:{' '}
                  {msg.sources.map((source, sourceIndex) => (
                    <span key={`${source.name}-${sourceIndex}`}>
                      {sourceIndex > 0 && ', '}
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noreferrer" className="hover:text-gold-300 underline">
                          {source.name}
                        </a>
                      ) : source.name}
                    </span>
                  ))}
                </div>
              )}
              {msg.mode === 'unavailable' && msg === messages[messages.length - 1] && retryQuestion && (
                <button
                  type="button"
                  onClick={() => handleSend(undefined, retryQuestion)}
                  className="mt-3 inline-flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300"
                >
                  <RefreshCw size={13} /> Retry
                </button>
              )}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-basalt-800 border border-basalt-700 flex items-center justify-center shrink-0 mt-1">
                <User size={12} className="text-sand-300" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
              <Sparkles size={12} className="text-gold-400 animate-pulse" />
            </div>
            <div className="bg-basalt-800 rounded-2xl rounded-tl-none p-4 border border-basalt-700 text-sand-500 text-sm animate-pulse">
              Consulting heritage archive...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      <div className="px-4 py-2 bg-basalt-950/40 border-t border-basalt-800/60 flex flex-wrap gap-2">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(q)
            }}
            className="text-xs font-mono px-3 py-1 rounded-full bg-basalt-800 text-sand-300 hover:bg-gold-500/10 hover:text-gold-400 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-basalt-800 bg-basalt-950 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${site?.name || 'this heritage site'}...`}
          className="flex-1 px-4 py-2.5 rounded-xl bg-basalt-900 border border-basalt-700 text-sand-100 placeholder:text-sand-500 text-sm focus:outline-none focus:border-gold-600 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-xl bg-gold-500 text-basalt-950 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}

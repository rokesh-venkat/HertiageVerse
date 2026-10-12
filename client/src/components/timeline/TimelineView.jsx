import { useState } from 'react'
import { Calendar } from 'lucide-react'

export default function TimelineView({ events = [], siteName }) {
  const [selectedEvent, setSelectedEvent] = useState(0)

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12 text-sand-500 italic">
        Historical timeline for {siteName || 'this site'} is currently being compiled.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-sand-100 mb-2">Historical Timeline</h2>
        <p className="text-sand-500 text-sm">
          Key milestones and historical events in the history of {siteName}.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* Timeline list */}
        <div className="relative border-l border-basalt-800 ml-4 space-y-6">
          {events.map((evt, i) => {
            const isSelected = i === selectedEvent
            return (
              <button
                key={i}
                onClick={() => setSelectedEvent(i)}
                className={`w-full text-left relative pl-6 transition-all group ${isSelected ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 transition-colors ${isSelected
                      ? 'bg-gold-500 border-basalt-950 scale-125'
                      : 'bg-basalt-800 border-basalt-700 group-hover:border-gold-500'
                    }`}
                />
                <span className="font-mono text-xs text-gold-500 tracking-wider uppercase block mb-1">
                  {evt.year}
                </span>
                <p className="font-display text-lg text-sand-100 group-hover:text-gold-400 transition-colors">
                  {evt.title}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected event detail card */}
        {events[selectedEvent] && (
          <div className="rounded-2xl border border-basalt-700 bg-basalt-900 p-6 sticky top-24 slide-up">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={14} className="text-gold-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold-500">
                {events[selectedEvent].year}
              </span>
            </div>
            <h3 className="font-display text-2xl text-sand-100 mb-3">
              {events[selectedEvent].title}
            </h3>
            <p className="text-sand-300 leading-relaxed text-sm">
              {events[selectedEvent].description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

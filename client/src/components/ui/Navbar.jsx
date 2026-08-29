import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/map', label: 'Heritage Map' },
    { to: '/heritage/shore-temple', label: 'Shore Temple', accent: true },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-basalt-950/80 border-b border-basalt-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-gold-500 group-hover:scale-125 transition-transform" />
          <span className="font-display text-lg tracking-wide text-sand-100">
            Heritage<span className="text-gold-500">Verse</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-sand-500">
          {navLinks.map((link) =>
            link.accent ? (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  isActive(link.to)
                    ? 'border-gold-500 bg-gold-500 text-basalt-950'
                    : 'border-gold-600/50 text-gold-400 hover:bg-gold-500 hover:text-basalt-950 hover:border-gold-500'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-gold-400 transition-colors ${
                  isActive(link.to) ? 'text-gold-400' : ''
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full border border-basalt-700 hover:border-gold-600 text-sand-500 hover:text-gold-400 transition-all duration-300"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>

        {/* Mobile: Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-basalt-700 text-sand-500 hover:text-gold-400 transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-sand-300 hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-basalt-800 bg-basalt-950/95 backdrop-blur-md fade-in">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-sand-500">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`py-2 transition-colors ${
                  isActive(link.to) ? 'text-gold-400' : 'hover:text-gold-400'
                } ${link.accent ? 'text-gold-400 font-medium' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

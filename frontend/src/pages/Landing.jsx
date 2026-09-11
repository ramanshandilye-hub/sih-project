import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const COLORS = {
  bg: '#0a0a0f',
  surface: '#14141c',
  border: '#23232f',
  text: '#e4e4e7',
  textDim: '#8b8b96',
  accent: '#6366f1',
  accent2: '#22d3ee',
}

const TERMINAL_LINES = [
  'visualize(recursion)',
  'visualize(sorting)',
  'visualize(linked_list)',
  'visualize(loops)',
  'visualize(stack, queue)',
]

function TerminalWindow() {
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const current = TERMINAL_LINES[lineIndex]
    let i = 0
    const typeInterval = setInterval(() => {
      i++
      setTyped(current.slice(0, i))
      if (i >= current.length) {
        clearInterval(typeInterval)
        setTimeout(() => {
          setLineIndex((prev) => (prev + 1) % TERMINAL_LINES.length)
          setTyped('')
        }, 1200)
      }
    }, 55)
    return () => clearInterval(typeInterval)
  }, [lineIndex])

  return (
    <div style={{
      width: '100%',
      maxWidth: '560px',
      backgroundColor: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 25px 70px -25px rgba(99, 102, 241, 0.35)',
      textAlign: 'left'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{
          marginLeft: '10px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: COLORS.textDim
        }}>
          codevision — engine.py
        </span>
      </div>
      <div style={{ padding: '22px 18px', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', lineHeight: '1.7', minHeight: '26px' }}>
        <div style={{ color: COLORS.textDim }}>
          <span style={{ color: COLORS.accent2 }}>$</span>{' '}
          <span style={{ color: COLORS.text }}>{typed}</span>
          <span style={{
            display: 'inline-block',
            width: '7px',
            height: '15px',
            backgroundColor: COLORS.accent2,
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite'
          }} />
        </div>
      </div>
    </div>
  )
}

function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 40px',
      borderBottom: `1px solid ${COLORS.border}`,
      backgroundColor: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(8px)',
    }}>
      <Link to="/" style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '17px',
        fontWeight: 700,
        color: COLORS.text,
        textDecoration: 'none',
        letterSpacing: '-0.3px'
      }}>
        {'<'}CodeVision{'/>'}
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link to="/topics" style={{ color: COLORS.textDim, textDecoration: 'none', fontSize: '15px' }}>
          Topics
        </Link>
        <Link to="/topics" className="cta-btn" style={{
          padding: '9px 18px',
          backgroundColor: COLORS.accent,
          color: 'white',
          borderRadius: '7px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500
        }}>
          Try Visualizer
        </Link>
      </div>
    </nav>
  )
}

const ICONS = {
  eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  cursor: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4l7 17 2.5-7.5L21 11 4 4z" />
    </svg>
  ),
  layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
}

const FEATURES = [
  {
    icon: ICONS.eye,
    title: 'See it visually',
    desc: 'Watch recursion, loops, and data structures execute step by step, instead of imagining them in your head.'
  },
  {
    icon: ICONS.cursor,
    title: 'Predict the logic',
    desc: 'Move the pieces yourself before the algorithm shows you the answer — learning by doing, not by copying.'
  },
  {
    icon: ICONS.layers,
    title: 'Understand deeply',
    desc: 'Every step comes with a plain-language explanation of why it happened — no jargon, no memorizing.'
  },
]

function Landing() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Inter', sans-serif",
    }}>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-fade { animation: fadeUp 0.6s ease-out both; }
        .hero-fade-1 { animation-delay: 0.05s; }
        .hero-fade-2 { animation-delay: 0.15s; }
        .hero-fade-3 { animation-delay: 0.25s; }
        .cta-btn { transition: opacity 0.15s ease, transform 0.15s ease; }
        .cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .feature-card { transition: border-color 0.2s ease; }
        .feature-card:hover { border-color: ${COLORS.accent}; }
      `}</style>

      <Navbar />

      <section style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '90px 24px 70px',
        backgroundImage: `radial-gradient(circle, ${COLORS.border} 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
               backgroundPosition: 'center top',
      }}>
        <div className="hero-fade hero-fade-1">
          <TerminalWindow />
        </div>

        <h1 className="hero-fade hero-fade-2" style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '44px',
          fontWeight: 700,
          margin: '36px 0 14px',
          color: COLORS.text,
          letterSpacing: '-1px'
        }}>
          CodeVision
        </h1>
        <p className="hero-fade hero-fade-2" style={{
          fontSize: '18px',
          color: COLORS.textDim,
          maxWidth: '480px',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          Don't memorize the logic. See it, change it, predict it, and understand it.
        </p>
        <div className="hero-fade hero-fade-3">
          <Link to="/topics" className="cta-btn" style={{
            padding: '14px 28px',
            backgroundColor: COLORS.accent,
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 500
          }}>
            Try Visualizer →
          </Link>
        </div>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 24px 110px',
      }}>
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card" style={{
            backgroundColor: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '10px',
            padding: '24px',
            textAlign: 'left'
          }}>
            <div style={{ color: COLORS.accent2, marginBottom: '14px' }}>
              {f.icon}
            </div>
            <h3 style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px',
              color: COLORS.text,
              margin: '0 0 10px'
            }}>
              {f.title}
            </h3>
            <p style={{ fontSize: '14px', color: COLORS.textDim, lineHeight: '1.6', margin: 0 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      <footer style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: '22px',
        textAlign: 'center',
        fontSize: '13px',
        color: COLORS.textDim,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        {'<'}CodeVision{'/>'} — see the code, don't memorize it.
      </footer>
    </div>
  )
}

export default Landing
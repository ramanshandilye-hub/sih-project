import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>
        CodeVision
      </h1>
      <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '30px' }}>
        Don't memorize the logic. See it, change it, predict it, and understand it.
      </p>
      <Link to="/topics" style={{
        padding: '12px 24px',
        backgroundColor: '#6366f1',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '16px'
      }}>
        Try Visualizer →
      </Link>
    </div>
  )
}

export default Landing
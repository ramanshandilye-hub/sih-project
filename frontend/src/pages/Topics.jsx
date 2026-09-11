import { Link } from 'react-router-dom'
import { topics } from '../data/topics'

function Topics() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '60px 20px'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Choose a Topic
      </h1>
      <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '50px' }}>
        Select a concept to explore its questions
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '12px',
              padding: '24px',
              textDecoration: 'none',
              color: 'white'
            }}
          >
            <h3 style={{ marginBottom: '8px' }}>{topic.title}</h3>
            <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '10px' }}>
              {topic.description}
            </p>
            <span style={{ color: '#6366f1', fontSize: '13px' }}>
              {topic.questions.length} questions
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Topics
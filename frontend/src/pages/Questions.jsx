import { useParams, Link } from 'react-router-dom'
import { getTopicById } from '../data/topics'

function Questions() {
  const { topicId } = useParams()
  const topic = getTopicById(topicId)

  if (!topic) {
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
        <h2>Topic not found</h2>
        <Link to="/topics" style={{ color: '#6366f1' }}>← Back to Topics</Link>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/topics" style={{ color: '#6366f1', textDecoration: 'none' }}>
          ← Back to Topics
        </Link>

        <h1 style={{ marginTop: '20px', marginBottom: '4px' }}>{topic.title}</h1>
        <p style={{ color: '#aaa', marginBottom: '40px' }}>{topic.description}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {topic.questions.map((question) => (
            <Link
              key={question.id}
              to={`/visualizer/${topicId}/${question.id}`}
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '10px',
                padding: '20px',
                textDecoration: 'none',
                color: 'white',
                position: 'relative'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '16px' }}>{question.title}</h3>
              {!question.hasVisualization && (
                <span style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  fontSize: '11px',
                  color: '#f59e0b',
                  backgroundColor: '#422006',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  Coming Soon
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Questions
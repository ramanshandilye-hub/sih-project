import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getQuestionById } from '../data/topics'
import HanoiPuzzle from '../components/HanoiPuzzle'

// Har question ke apne rules - abhi sirf hanoi ke hain, baaki baad mein add karenge
const questionRules = {
  hanoi: [
    'You can move only one disk at a time',
    'Only the top disk of a rod can be moved',
    'A larger disk can never be placed on top of a smaller disk',
    'Goal: move all disks from Rod A to Rod C, keeping the same order'
  ]
}
const questionCode = {
  hanoi: `def hanoi(n, source, auxiliary, target):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    hanoi(n - 1, source, target, auxiliary)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n - 1, auxiliary, source, target)

hanoi(3, 'A', 'B', 'C')`
}
// Kaunsa question ka apna visualization component hai
const visualizationComponents = {
  hanoi: HanoiPuzzle
}

function Visualizer() {
  const { topicId, questionId } = useParams()
  const question = getQuestionById(topicId, questionId)

  if (!question) {
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
        <h2>Question not found</h2>
        <Link to="/topics" style={{ color: '#6366f1' }}>← Back to Topics</Link>
      </div>
    )
  }

  const rules = questionRules[questionId] || []
  const code = questionCode[questionId]
  const [showCode, setShowCode] = useState(false)
  const [traceData, setTraceData] = useState({ log: [], currentIndex: -1, total: 0, callStack: [] })
  const VisualizationComponent = visualizationComponents[questionId]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f0f0f',
      color: 'white',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {/* TOP BAR */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #333'
      }}>
        <Link to={`/topics/${topicId}`} style={{ color: '#6366f1', textDecoration: 'none' }}>
          ← Back to {question.topicTitle}
        </Link>
        <h2 style={{ margin: 0 }}>{question.title}</h2>
        <span style={{ color: '#aaa', fontSize: '14px' }}>Level: Beginner</span>
      </div>

      {/* RULES CARD */}
      {rules.length > 0 && (
        <div style={{
          margin: '16px 16px 0',
          backgroundColor: '#1e1b4b',
          border: '1px solid #4338ca',
          borderRadius: '8px',
          padding: '16px 20px'
        }}>
          <h4 style={{ margin: '0 0 10px', color: '#a5b4fc' }}>
            📋 Rules & How to Play
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#ddd', fontSize: '14px', lineHeight: '1.8' }}>
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* MAIN CONTENT: Code + Visualization side by side */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '16px',
        padding: '16px'
      }}>
        {/* CODE PANEL */}
        <div style={{
          flex: 1,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <h4 style={{ marginTop: 0, color: '#aaa' }}>CODE</h4>
          {!code ? (
            <p style={{ color: '#555' }}>// code will appear here</p>
          ) : !showCode ? (
            <div style={{ textAlign: 'center', paddingTop: '40px' }}>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                Try solving it yourself first using the visualization →
              </p>
              <button
                onClick={() => setShowCode(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🔓 Show Code
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowCode(false)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginBottom: '12px',
                  fontSize: '12px'
                }}
              >
                Hide Code
              </button>
              <pre style={{
                backgroundColor: '#0a0a0a',
                padding: '12px',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#e5e7eb'
              }}>
                {code}
              </pre>
            </div>
          )}
        </div>

        {/* VISUALIZATION PANEL */}
        <div style={{
          flex: 1,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <h4 style={{ marginTop: 0, color: '#aaa' }}>VISUALIZATION</h4>
          {VisualizationComponent ? (
          <VisualizationComponent onTraceUpdate={setTraceData} />
          ) : (
            <p style={{ color: '#555' }}>// This question is coming soon</p>
          )}
        </div>
      </div>

      {/* BOTTOM: Call Stack + Explanation */}
      <div style={{
        display: 'flex',
        gap: '16px',
        padding: '0 16px 16px'
      }}>
        <div style={{
          flex: 1,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '16px',
          maxHeight: '260px',
          overflowY: 'auto'
        }}>
          <h4 style={{ marginTop: 0, color: '#aaa' }}>WHY THIS HAPPENED</h4>
          {traceData.log.length === 0 ? (
            <p style={{ color: '#555' }}>
              Click "Start Guided Walkthrough" in the visualization, then use Next/Prev
              to see a step-by-step explanation here.
            </p>
          ) : (
            traceData.log.map((step, index) => {
              const isCurrent = index === traceData.currentIndex
              return (
                <div
                  key={index}
                  style={{
                    padding: '8px 10px',
                    marginBottom: '6px',
                    borderRadius: '6px',
                    backgroundColor: isCurrent ? '#1e1b4b' : 'transparent',
                    border: isCurrent ? '1px solid #6366f1' : '1px solid transparent',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: isCurrent ? '#e5e7eb' : '#9ca3af'
                  }}
                >
                  <strong style={{ color: isCurrent ? '#a5b4fc' : '#6b7280' }}>
                    Step {index + 1}:
                  </strong>{' '}
                  {step.explanation}
                </div>
              )
            })
          )}
        </div>

        <div style={{
          flex: 1,
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '16px',
          maxHeight: '260px',
          overflowY: 'auto'
        }}>
          <h4 style={{ marginTop: 0, color: '#aaa' }}>CALL STACK</h4>
          {(!traceData.callStack || traceData.callStack.length === 0) ? (
            <p style={{ color: '#555' }}>
              Start the guided walkthrough to see how recursive calls stack up.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '6px' }}>
              {traceData.callStack.map((frame, index) => {
                const isTopOfStack = index === traceData.callStack.length - 1
                return (
                  <div
                    key={index}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      backgroundColor: isTopOfStack ? '#1e1b4b' : '#111827',
                      border: isTopOfStack ? '1px solid #6366f1' : '1px solid #333',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      color: isTopOfStack ? '#e5e7eb' : '#9ca3af'
                    }}
                  >
                  hanoi(n={frame.n}, {frame.source}→{frame.target}, via {frame.auxiliary})
                    {isTopOfStack && (
                      <span style={{ color: '#a5b4fc', marginLeft: '8px', fontSize: '11px' }}>
                      {'\u2190'} currently executing 
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

          </div>
  )
}

export default Visualizer
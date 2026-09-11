import { useState, useRef } from 'react'

function HanoiPuzzle({ onTraceUpdate }) {
  const initialRods = { A: [3, 2, 1], B: [], C: [] }
  const [rods, setRods] = useState(initialRods)
  const [selectedRod, setSelectedRod] = useState(null)
  const [moveCount, setMoveCount] = useState(0)
  const [message, setMessage] = useState('')

  // Guided walkthrough (backend-driven dry run) state
  const [steps, setSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1) // -1 = not started
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [isLoadingTrace, setIsLoadingTrace] = useState(false)
  const autoPlayTimeoutRef = useRef(null)

  const rodNames = ['A', 'B', 'C']
  const diskColors = { 1: '#22c55e', 2: '#f59e0b', 3: '#e5e7eb' }
  const diskWidths = { 1: '80px', 2: '120px', 3: '160px' }
  const diskWidthsNum = { 1: 80, 2: 120, 3: 160 }
  const rodPercent = { A: 16.6667, B: 50, C: 83.3333 }
  const diskHeight = 30
  const diskGap = 4
  const baseBottom = 40

  const findDiskPosition = (diskId) => {
    for (const rodName of rodNames) {
      const idx = rods[rodName].indexOf(diskId)
      if (idx !== -1) return { rod: rodName, idx }
    }
    return null
  }
  const optimalMoves = Math.pow(2, 3) - 1
  const guidedModeActive = steps.length > 0

  const isWon = rods.C.length === 3

  // ---------- Free exploration (manual click-to-move) ----------
  const handleRodClick = (rodName) => {
    if (isWon || guidedModeActive) return

    if (selectedRod === null) {
      if (rods[rodName].length === 0) {
        showMessage("This rod is empty, no disk to move!")
        return
      }
      setSelectedRod(rodName)
      setMessage('')
    } else if (selectedRod === rodName) {
      setSelectedRod(null)
    } else {
      const fromDisk = rods[selectedRod][rods[selectedRod].length - 1]
      const toDisk = rods[rodName][rods[rodName].length - 1]

      if (toDisk !== undefined && fromDisk > toDisk) {
        showMessage("Invalid move! A larger disk cannot go on a smaller disk.")
        setSelectedRod(null)
        return
      }

      const newRods = { ...rods }
      newRods[selectedRod] = newRods[selectedRod].slice(0, -1)
      newRods[rodName] = [...newRods[rodName], fromDisk]
      setRods(newRods)
      setSelectedRod(null)
      setMoveCount(moveCount + 1)
      setMessage('')
    }
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  // ---------- Helper: rebuild rod state by replaying steps 0..index ----------
  const buildRodsUpTo = (allSteps, index) => {
    const newRods = { A: [3, 2, 1], B: [], C: [] }
    for (let i = 0; i <= index; i++) {
      const step = allSteps[i]
      newRods[step.from] = newRods[step.from].slice(0, -1)
      newRods[step.to] = [...newRods[step.to], step.disk]
    }
    return newRods
  }

  const sendTraceUpdate = (allSteps, index) => {
    if (onTraceUpdate) {
      onTraceUpdate({
        log: allSteps.slice(0, index + 1),
        currentIndex: index,
        total: allSteps.length,
        callStack: index === -1 ? [] : allSteps[index].call_stack
      })
    }
  }

  // ---------- Guided walkthrough controls ----------
  const startGuidedWalkthrough = async () => {
    setIsLoadingTrace(true)
    setMessage('')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/trace/hanoi?n=3')
      const data = await response.json()
      setSteps(data.steps)
      setCurrentStepIndex(-1)
      setRods(initialRods)
      setMoveCount(0)
      if (onTraceUpdate) {
        onTraceUpdate({ log: [], currentIndex: -1, total: data.steps.length, callStack: [] })
      }
    } catch (error) {
      setMessage('Could not connect to backend. Is the server running?')
    }
    setIsLoadingTrace(false)
  }

  const goToStep = (index) => {
    if (index < -1 || index >= steps.length) return
    if (index === -1) {
      setRods(initialRods)
      setMoveCount(0)
      sendTraceUpdate(steps, -1)
    } else {
      setRods(buildRodsUpTo(steps, index))
      setMoveCount(index + 1)
      sendTraceUpdate(steps, index)
    }
    setCurrentStepIndex(index)
  }

  const nextStep = () => {
    if (steps.length === 0) return
    if (currentStepIndex + 1 < steps.length) {
      goToStep(currentStepIndex + 1)
    }
  }

  const prevStep = () => {
    if (steps.length === 0) return
    goToStep(currentStepIndex - 1)
  }

  const startAutoPlay = () => {
    if (steps.length === 0) return
    setIsAutoPlaying(true)

    const playFrom = (index) => {
      if (index >= steps.length) {
        setIsAutoPlaying(false)
        return
      }
      goToStep(index)
      autoPlayTimeoutRef.current = setTimeout(() => playFrom(index + 1), 2000)
    }

    playFrom(currentStepIndex + 1)
  }

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
  }

  const handleReset = () => {
    pauseAutoPlay()
    setRods(initialRods)
    setSelectedRod(null)
    setMoveCount(0)
    setMessage('')
    setSteps([])
    setCurrentStepIndex(-1)
    if (onTraceUpdate) {
      onTraceUpdate({ log: [], currentIndex: -1, total: 0, callStack: [] })
    }
  }

  return (
    <div>
      {/* Top control bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <button onClick={handleReset} style={{
          padding: '6px 16px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Reset
        </button>

        {!guidedModeActive && (
          <button
            onClick={startGuidedWalkthrough}
            disabled={isLoadingTrace}
            style={{
              padding: '6px 16px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isLoadingTrace ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoadingTrace ? 'Loading...' : '▶ Start Guided Walkthrough'}
          </button>
        )}

        {guidedModeActive && (
          <>
            <button
              onClick={prevStep}
              disabled={currentStepIndex <= -1 || isAutoPlaying}
              style={{
                padding: '6px 14px',
                backgroundColor: '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: (currentStepIndex <= -1 || isAutoPlaying) ? 'not-allowed' : 'pointer'
              }}
            >
              ⏮ Prev
            </button>

            <button
              onClick={nextStep}
              disabled={currentStepIndex >= steps.length - 1 || isAutoPlaying}
              style={{
                padding: '6px 14px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: (currentStepIndex >= steps.length - 1 || isAutoPlaying) ? 'not-allowed' : 'pointer'
              }}
            >
              Next ⏭
            </button>

            {!isAutoPlaying ? (
              <button
                onClick={startAutoPlay}
                disabled={currentStepIndex >= steps.length - 1}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: currentStepIndex >= steps.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ▶ Auto Play
              </button>
            ) : (
              <button
                onClick={pauseAutoPlay}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ⏸ Pause
              </button>
            )}

            <span style={{ color: '#aaa', fontSize: '13px' }}>
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </>
        )}

        <span style={{ color: '#aaa', fontSize: '14px' }}>
          Moves: <strong style={{ color: 'white' }}>{moveCount}</strong> · Optimal: {optimalMoves}
        </span>
      </div>

      <div style={{ textAlign: 'center', height: '24px', color: '#f59e0b', fontSize: '14px' }}>
        {message}
      </div>

      {!guidedModeActive && (
        <div style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginBottom: '6px' }}>
          Try moving the disks yourself first, or click "Start Guided Walkthrough" to see the real solution step by step.
        </div>
      )}

      {isWon && !guidedModeActive && (
        <div style={{
          textAlign: 'center',
          color: '#22c55e',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          🎉 Solved in {moveCount} moves! {moveCount === optimalMoves ? '(Optimal!)' : `(Optimal was ${optimalMoves})`}
        </div>
      )}

          <div style={{ position: 'relative', height: '280px', padding: '20px 0' }}>
        {/* Rod poles (clickable) */}
        {rodNames.map((rodName) => (
          <div
            key={rodName + '-pole'}
            onClick={() => handleRodClick(rodName)}
            style={{
              position: 'absolute',
              left: `${rodPercent[rodName]}%`,
              transform: 'translateX(-50%)',
              bottom: `${baseBottom - 4}px`,
              width: '6px',
              height: '220px',
              backgroundColor: '#888',
              zIndex: 0
            }}
          />
        ))}

        {/* Base lines */}
        {rodNames.map((rodName) => (
          <div
            key={rodName + '-base'}
            style={{
              position: 'absolute',
              left: `${rodPercent[rodName]}%`,
              transform: 'translateX(-50%)',
              bottom: `${baseBottom - 8}px`,
              width: '180px',
              height: '4px',
              backgroundColor: selectedRod === rodName ? '#6366f1' : '#666',
              transition: 'background-color 0.15s'
            }}
          />
        ))}

        {/* Rod labels */}
        {rodNames.map((rodName) => (
          <p
            key={rodName + '-label'}
            style={{
              position: 'absolute',
              left: `${rodPercent[rodName]}%`,
              transform: 'translateX(-50%)',
              bottom: '0px',
              margin: 0,
              color: selectedRod === rodName ? '#6366f1' : '#aaa',
              fontWeight: selectedRod === rodName ? 'bold' : 'normal'
            }}
          >
            {rodName}
          </p>
        ))}

        {/* Clickable columns (wide click target for each rod) */}
        {rodNames.map((rodName) => (
          <div
            key={rodName + '-click'}
            onClick={() => handleRodClick(rodName)}
            style={{
              position: 'absolute',
              left: `${rodPercent[rodName]}%`,
              transform: 'translateX(-50%)',
              bottom: 0,
              width: '180px',
              height: '260px',
              cursor: guidedModeActive ? 'default' : 'pointer',
              zIndex: 0
            }}
          />
        ))}

        {/* Disks — absolutely positioned, animate between rods */}
        {[3, 2, 1].map((diskId) => {
          const pos = findDiskPosition(diskId)
          if (!pos) return null
          const { rod, idx } = pos
          const isTopDisk = idx === rods[rod].length - 1
          const isSelected = selectedRod === rod && isTopDisk
          const bottomPx = baseBottom + idx * (diskHeight + diskGap)

          return (
            <div
              key={diskId}
              style={{
                position: 'absolute',
                left: `${rodPercent[rod]}%`,
                bottom: `${bottomPx}px`,
                width: diskWidths[diskId],
                height: `${diskHeight}px`,
                backgroundColor: diskColors[diskId],
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#000',
                zIndex: 2,
                pointerEvents: 'none',
                transition: 'left 0.4s ease, bottom 0.4s ease, transform 0.15s, box-shadow 0.15s',
                transform: `translate(-50%, ${isSelected ? -8 : 0}px)`,
                boxShadow: isSelected ? '0 0 12px 3px #6366f1' : 'none',
                border: isSelected ? '2px solid #6366f1' : 'none'
              }}
            >
              {diskId}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HanoiPuzzle
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Topics from './pages/Topics'
import Questions from './pages/Questions'
import Visualizer from './pages/Visualizer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<Questions />} />
        <Route path="/visualizer/:topicId/:questionId" element={<Visualizer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
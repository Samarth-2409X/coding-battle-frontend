import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ProtectedRoute from './components/layout/ProtectedRoute'


import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Problems from './pages/Problems'
import ProblemDetail from './pages/ProblemDetail'
import CreateRoom from './pages/CreateRoom'
import Battle from './pages/Battle'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          
          <Route path="/battle/create" element={
            <ProtectedRoute><CreateRoom /></ProtectedRoute>
          } />
          <Route path="/battle/:roomCode" element={
            <ProtectedRoute><Battle /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { disconnectSocket } from '../../socket/socket'
import Button from '../ui/Button'

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    disconnectSocket()
    logout()
    navigate('/login')
  }

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-indigo-400'
      : 'text-gray-400 hover:text-gray-100'

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-400">⚔</span>
          <span className="text-lg font-bold text-white">CodeBattle</span>
        </Link>

        
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/problems" className={`transition-colors ${isActive('/problems')}`}>
              Problems
            </Link>
            <Link to="/battle/create" className={`transition-colors ${isActive('/battle/create')}`}>
              Battle
            </Link>
            <Link to="/leaderboard" className={`transition-colors ${isActive('/leaderboard')}`}>
              Leaderboard
            </Link>
          </div>
        )}

        
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:block">{user?.username}</span>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="text-sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

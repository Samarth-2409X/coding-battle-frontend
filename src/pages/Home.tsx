import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import Button from '../components/ui/Button'

const Home = () => {
  const { isLoggedIn, user } = useAuthStore()

  return (
    <div className="min-h-screen">

      
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-900/40 border border-indigo-700/50 text-indigo-300 text-sm px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          Real-time 1v1 coding battles
        </div>

        <h1 className="text-5xl font-bold text-white mb-5 leading-tight">
          Compete. Code. <span className="text-indigo-400">Conquer.</span>
        </h1>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Challenge other developers to real-time coding battles. Solve
          problems faster than your opponent and climb the leaderboard.
        </p>

        <div className="flex items-center justify-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/battle/create">
                <Button variant="primary" className="px-8 py-3 text-base">
                  Start Battle
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="secondary" className="px-8 py-3 text-base">
                  Practice
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button variant="primary" className="px-8 py-3 text-base">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="px-8 py-3 text-base">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      
      <section className="border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-6 text-center">
          {[
            { value: '1v1', label: 'Battle Mode' },
            { value: '30min', label: 'Time Limit' },
            { value: 'Live', label: 'Real-time Updates' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-indigo-400">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Create a room',
              desc: 'Create a battle room and share the 6-character code with your opponent.',
            },
            {
              step: '02',
              title: 'Both players ready',
              desc: 'Once both players join and click ready, a problem is revealed to both.',
            },
            {
              step: '03',
              title: 'First to solve wins',
              desc: 'Write your solution, submit it, and if all test cases pass — you win!',
            },
          ].map((item) => (
            <div key={item.step} className="card">
              <p className="text-4xl font-black text-gray-800 mb-3">{item.step}</p>
              <h3 className="font-semibold text-gray-100 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      {isLoggedIn && (
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="card text-center bg-indigo-900/20 border-indigo-800">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to battle, {user?.username}?
            </h3>
            <p className="text-gray-400 mb-5 text-sm">
              Your current rating: <span className="text-indigo-400 font-bold">{user?.stats.rating}</span>
            </p>
            <Link to="/battle/create">
              <Button variant="primary" className="px-8">
                Find a Battle
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home

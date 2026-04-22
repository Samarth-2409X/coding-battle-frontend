# Multiplayer Coding Battle Platform — Frontend

Real-time 1v1 coding battle platform frontend. Two developers compete head-to-head to solve the same coding problem first. Built with React, TypeScript, Tailwind CSS, and Socket.io.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 + TypeScript | UI framework with full type safety |
| Vite | Fast development server and bundler |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Zustand | Global state management |
| Socket.io Client | Real-time battle communication |
| Monaco Editor | VS Code's code editor in the browser |
| Axios | HTTP client for REST API calls |

---

## Project Structure

```
coding-battle-frontend/
├── src/
│   ├── main.tsx                          # Entry point — mounts React app
│   ├── App.tsx                           # Route definitions
│   ├── index.css                         # Tailwind directives + global styles
│   │
│   ├── types/
│   │   └── index.ts                      # All TypeScript interfaces (IUser, IProblem, etc.)
│   │
│   ├── api/
│   │   └── axios.ts                      # Axios instance + token interceptor
│   │
│   ├── socket/
│   │   └── socket.ts                     # Socket.io client — connect/disconnect
│   │
│   ├── store/
│   │   ├── authStore.ts                  # Zustand — user, token, login, logout
│   │   └── battleStore.ts                # Zustand — room, problem, battle state
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx                # Reusable button — 4 variants
│   │   │   ├── Input.tsx                 # Reusable input with label + error
│   │   │   ├── Badge.tsx                 # Badge + DifficultyBadge components
│   │   │   ├── Loader.tsx                # Full-page loading spinner
│   │   │   └── Modal.tsx                 # Reusable modal overlay
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                # Top navigation bar
│   │   │   └── ProtectedRoute.tsx        # Redirects to login if not authenticated
│   │   ├── battle/
│   │   │   ├── CodeEditor.tsx            # Monaco Editor wrapper
│   │   │   ├── Timer.tsx                 # Live countdown timer
│   │   │   ├── PlayerCard.tsx            # Player status display
│   │   │   └── ProblemPanel.tsx          # Problem description display
│   │   └── problem/
│   │       └── ProblemCard.tsx           # Problem list item card
│   │
│   └── pages/
│       ├── Home.tsx                      # Landing page
│       ├── Login.tsx                     # Login form
│       ├── Register.tsx                  # Register form
│       ├── Problems.tsx                  # Browse all problems
│       ├── ProblemDetail.tsx             # Single problem + practice editor
│       ├── CreateRoom.tsx                # Create or join battle room
│       ├── Battle.tsx                    # Live battle screen
│       ├── Leaderboard.tsx               # Top players by rating
│       └── Profile.tsx                   # User stats + submission history
│
├── .env                                  # Environment variables
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running on port 5000

### Installation

**1. Install dependencies**
```bash
npm install
```

**2. Configure environment**

Create a `.env` file in the root:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

**3. Start development server**
```bash
npm run dev
```

Open `http://localhost:5173`

---

## Pages

| Route | Page | Auth Required |
|-------|------|--------------|
| `/` | Home — landing page | No |
| `/login` | Login form | No |
| `/register` | Register form | No |
| `/problems` | Browse all problems | No |
| `/problems/:id` | Single problem with editor | No |
| `/leaderboard` | Top 20 players | No |
| `/battle/create` | Create or join a room | Yes |
| `/battle/:roomCode` | Live battle screen | Yes |
| `/profile` | Your stats and history | Yes |

---

## Hooks Used

| Hook | Type | Purpose |
|------|------|---------|
| `useState` | React built-in | Local state — forms, loading flags, fetched data |
| `useEffect` | React built-in | API calls on mount, socket setup, countdown timer |
| `useParams` | React Router | Read `:id` and `:roomCode` from URL |
| `useNavigate` | React Router | Navigate after login, logout, room creation |
| `useLocation` | React Router | Highlight active nav link |
| `useAuthStore` | Zustand | Global auth state — user, token, login, logout |
| `useBattleStore` | Zustand | Global battle state — room, problem, code, winner |

---

## State Management

**authStore** — persists to localStorage so user stays logged in on page refresh:
```
user, token, isLoggedIn → login() → logout() → updateUser()
```

**battleStore** — lives in memory, reset when battle ends:
```
room, problem, countdown, winner, myCode, myLanguage → resetBattle()
```

---

## Real-time Socket Events

The frontend connects to Socket.io with the JWT token on authentication.

### Emits (Frontend → Backend)

| Event | When |
|-------|------|
| `JOIN_ROOM` | Player navigates to battle page |
| `PLAYER_READY` | Player clicks "I'm Ready" |
| `CODE_CHANGE` | Player types in the editor |
| `SUBMIT_CODE` | Player clicks Submit |
| `LEAVE_ROOM` | Player leaves or closes the tab |

### Listens (Backend → Frontend)

| Event | What happens in UI |
|-------|--------------------|
| `ROOM_UPDATED` | Refreshes player list in waiting room |
| `PLAYER_JOINED` | New player appears in waiting room |
| `PLAYER_LEFT` | Player removed from waiting room |
| `COUNTDOWN` | Shows 5-4-3-2-1 countdown on screen |
| `BATTLE_STARTED` | Problem revealed, timer starts |
| `OPPONENT_CODE_CHANGE` | Opponent's language indicator updates |
| `SUBMISSION_RESULT` | Shows pass/fail banner below editor |
| `BATTLE_FINISHED` | Winner/loser screen shown to both players |

---

## Battle Flow

```
1. Player 1 creates room → gets code e.g. "ABC123"
2. Player 2 joins with code "ABC123"
3. Both see each other in the waiting room
4. Both click "I'm Ready"
5. 5 second countdown on both screens
6. Same problem revealed to both simultaneously
7. Players write solution in Monaco Editor
8. Player submits → Judge0 runs test cases
9. All tests pass → BATTLE_FINISHED sent to both
10. Winner gets +25 rating, loser gets -15
```

---

## How to Test With 2 Players Locally

```
1. Open Tab 1 in normal browser   → register as player1
2. Open Tab 2 in Incognito window → register as player2
3. Player1: Battle → Create Room → note the room code
4. Player2: Battle → Join Room → enter the room code
5. Both click "I'm Ready"
6. Battle starts automatically
```

---

## Scripts

```bash
npm run dev      
npm run build     
npm run preview   
```

---

## 👨‍💻 Author

**Samarth**
GitHub: [Samarth-2409X](https://github.com/Samarth-2409X)

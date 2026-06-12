# 📚 React.js Learning Documentation

Selamat datang di panduan lengkap belajar React.js! Dokumen ini mencakup React 18 dengan Hooks, dari dasar hingga fitur lanjutan.

---

## 📋 Daftar Isi

1. [Apa itu React?](#apa-itu-react)
2. [Setup Project](#setup-project)
3. [JSX & Components](#jsx--components)
4. [Props & State](#props--state)
5. [Hooks](#hooks)
6. [Event Handling](#event-handling)
7. [Conditional Rendering](#conditional-rendering)
8. [Lists & Keys](#lists--keys)
9. [Forms](#forms)
10. [Context API](#context-api)
11. [useReducer](#usereducer)
12. [Custom Hooks](#custom-hooks)
13. [React Router](#react-router)
14. [State Management](#state-management)
15. [Performance Optimization](#performance-optimization)
16. [Best Practices](#best-practices)

---

## 🔰 Apa itu React?

**React** adalah library JavaScript untuk membangun antarmuka pengguna (UI), dikembangkan oleh Meta (Facebook) dan pertama kali dirilis tahun 2013.

### Karakteristik React:

| Karakteristik | Deskripsi |
|--------------|-----------|
| **Component-Based** | Bangun UI dari blok-blok yang dapat digunakan ulang |
| **Virtual DOM** | Update DOM secara efisien dengan diffing algorithm |
| **Unidirectional Data Flow** | Data mengalir satu arah (top-down) |
| **Hooks** | Gunakan state & fitur React tanpa class component |
| **JSX** | Sintaks khusus yang menggabungkan HTML dan JavaScript |

### React vs Vue vs Angular:

```
React      → Library (hanya UI), fleksibel, banyak pilihan
Vue        → Framework progresif, seimbang
Angular    → Framework lengkap, opinionated, enterprise
```

---

## 🛠️ Setup Project

### 1. Menggunakan Vite (Recommended)

```bash
# Create React project dengan Vite
npm create vite@latest my-app -- --template react

# Atau dengan Create React App (deprecated)
npx create-react-app my-app

# Atau Next.js (SSR/Full-stack)
npx create-next-app@latest my-app
```

### 2. Pilih Template

```
Templates:
- react          → Vanilla React
- react-ts       → React + TypeScript
- react-swc      → React dengan SWC compiler (lebih cepat)
```

### 3. Struktur Project React + Vite

```
my-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/       # Komponen reusable
│   ├── pages/           # Halaman (jika pakai router)
│   ├── hooks/           # Custom hooks
│   ├── context/         # React Context
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.js
└── package.json
```

### 4. Install Dependencies

```bash
cd my-app
npm install

# Tambahan yang sering dipakai:
npm install react-router-dom
npm install @tanstack/react-query
npm install zustand
npm install clsx
npm install tailwindcss
```

### 5. Commands

```bash
# Development
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

---

## 🎨 JSX & Components

### 1. JSX Basics

```jsx
// JSX = JavaScript + HTML
// Perbedaan dari HTML:
const element = (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Count: {count + 1}</p>
    <img src={user.avatar} alt={user.name} />
  </div>
)

// className instead of class
<div className="container">

// Self-closing tags harus di-close
<input />
<br />

// JSX expressions
{isLoggedIn ? <User /> : <Login />}

// Conditional rendering
{showMessage && <Message />}
```

### 2. Functional Components

```jsx
// Komponen = Function yang return JSX

// Basic component
function Greeting() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to React</p>
    </div>
  )
}

// Arrow function component
const Header = () => {
  return <header>Site Header</header>
}

// Component dengan props
const UserCard = (props) => {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  )
}

// Penggunaan
function App() {
  return (
    <div>
      <Greeting />
      <UserCard name="Budi" email="budi@email.com" />
    </div>
  )
}
```

### 3. Modern Component dengan Arrow Function

```jsx
// Dengan destructuring props
const UserCard = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  )
}

// Dengan default values
const Button = ({ text = "Click", variant = "primary" }) => {
  return <button className={`btn btn-${variant}`}>{text}</button>
}
```

### 4. Component Composition

```jsx
// Layout component
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

// Card component dengan slots
const Card = ({ title, children, footer }) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// Penggunaan
function App() {
  return (
    <Layout>
      <Card title="Welcome" footer={<Button>Save</Button>}>
        <p>This is card content</p>
      </Card>
    </Layout>
  )
}
```

---

## 📦 Props & State

### 1. Props (Data dari Parent)

```jsx
// Parent component
function App() {
  const user = {
    name: "Budi Santoso",
    email: "budi@email.com",
    role: "Admin"
  }

  return <UserCard {...user} />
}

// Child component
const UserCard = ({ name, email, role }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{email}</p>
      <span className="badge">{role}</span>
    </div>
  )
}
```

### 2. State dengan useState

```jsx
import { useState } from 'react'

function Counter() {
  // [state, setterFunction]
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
```

### 3. Multiple States

```jsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await login(email, password)
      console.log('Success:', response)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
```

### 4. Object State

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Budi',
    email: 'budi@email.com',
    preferences: {
      theme: 'light',
      language: 'id'
    }
  })

  // Update specific field
  const updateName = (newName) => {
    setUser(prev => ({ ...prev, name: newName }))
  }

  // Update nested object
  const updateTheme = (theme) => {
    setUser(prev => ({
      ...prev,
      preferences: { ...prev.preferences, theme }
    }))
  }

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <select
        value={user.preferences.theme}
        onChange={(e) => updateTheme(e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
```

---

## 🪝 Hooks

### 1. useState

```jsx
import { useState } from 'react'

// Basic
const [count, setCount] = useState(0)

// With function (lazy initialization)
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('data')
  return saved ? JSON.parse(saved) : []
})

// Toggle boolean
const [isActive, setIsActive] = useState(false)
const toggle = () => setIsActive(prev => !prev)
```

### 2. useEffect

```jsx
import { useState, useEffect } from 'react'

function UserData({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Fetch data
    setLoading(true)
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })

    // 2. Cleanup function (optional)
    return () => {
      console.log('Component unmounted or userId changed')
    }
  }, [userId]) // 3. Dependency array

  if (loading) return <p>Loading...</p>
  if (!user) return <p>User not found</p>

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}
```

### 3. useEffect Patterns

```jsx
// Run once on mount
useEffect(() => {
  fetchUser()
}, []) // Empty array = mount only

// Run when 'count' changes
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])

// Cleanup subscription
useEffect(() => {
  const subscription = subscribeToData()

  return () => {
    subscription.unsubscribe()
  }
}, [])

// Multiple effects
useEffect(() => {
  initializeApp()
}, [])

useEffect(() => {
  logUserActivity()
}, [userId])
```

### 4. useRef

```jsx
import { useState, useEffect, useRef } from 'react'

function SearchInput() {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <input
      ref={inputRef}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}

// Store mutable value without re-render
function Timer() {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return <p>Timer: {count}</p>
}
```

### 5. useMemo & useCallback

```jsx
import { useState, useMemo, useCallback } from 'react'

function ProductList({ products, filter }) {
  // Memoize expensive calculation
  const filteredProducts = useMemo(() => {
    console.log('Filtering...') // Only runs when products/filter changes
    return products.filter(p => p.category === filter)
  }, [products, filter])

  // Memoize function
  const handleClick = useCallback((productId) => {
    console.log('Clicked:', productId)
  }, []) // Empty deps = function never changes

  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id} onClick={() => handleClick(product.id)}>
          {product.name}
        </li>
      ))}
    </ul>
  )
}
```

### 6. useLayoutEffect

```jsx
import { useState, useEffect, useLayoutEffect } from 'react'

function Tooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // useLayoutEffect = sync, runs before paint
  // useEffect = async, runs after paint
  useLayoutEffect(() => {
    // Get element position synchronously
    const rect = elementRef.current.getBoundingClientRect()
    setPosition({ x: rect.left, y: rect.top })
  }, [])

  // useEffect: Use when you don't need synchronous measurement
  // useLayoutEffect: Use for DOM measurements + mutations
}
```

### 7. useImperativeHandle

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react'

// Forward ref untuk expose methods ke parent
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    value: inputRef.current.value,
    clear: () => {
      inputRef.current.value = ''
    }
  }))

  return <input ref={inputRef} {...props} />
})

// Parent
function Parent() {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return <CustomInput ref={inputRef} />
}
```

### 8. useDebugValue

```jsx
import { useState, useDebugValue } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  // Show custom label in React DevTools
  useDebugValue(value, (v) =>
    v ? `Stored: ${typeof v}` : 'Empty'
  )

  return [value, setValue]
}
```

---

## 🎮 Event Handling

### 1. Basic Events

```jsx
function EventsDemo() {
  const [text, setText] = useState('')

  return (
    <div>
      {/* Click */}
      <button onClick={() => console.log('Clicked!')}>Click</button>

      {/* Input */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
      />

      {/* Form */}
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log('Submitted:', text)
      }}>
        <button type="submit">Submit</button>
      </form>

      {/* Keyboard */}
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') console.log('Enter pressed')
          if (e.ctrlKey && e.key === 's') console.log('Save')
        }}
      />
    </div>
  )
}
```

### 2. Common Events

```jsx
// Mouse events
onClick
onDoubleClick
onMouseEnter / onMouseLeave
onMouseOver / onMouseOut
onMouseDown / onMouseUp
onMouseMove

// Form events
onChange      // Input berubah
onInput       // Raw input
onFocus / onBlur
onSubmit      // Form submit
onReset       // Form reset

// Keyboard events
onKeyDown / onKeyUp / onKeyPress
onKey = { (e) => { e.key, e.target.value } }

// Touch events
onTouchStart / onTouchEnd / onTouchMove

// Clipboard events
onCopy / onCut / onPaste
```

### 3. Event Handler Patterns

```jsx
// Inline (simple cases)
<button onClick={() => setCount(c => c + 1)}>+</button>

// Method reference
<button onClick={handleClick}>Click</button>

// With parameters
<button onClick={() => handleClick(id)}>Delete</button>

// With event object
<button onClick={(e) => handleClick(e, id)}>Delete</button>

// Prevent default
<form onSubmit={(e) => {
  e.preventDefault()
  // Handle submit
}}>
```

---

## 🔀 Conditional Rendering

### 1. If/Else

```jsx
// Ternary operator
{isLoggedIn ? <UserDashboard /> : <LoginForm />}

// With null (don't render)
{showMessage && <Message />}

// Negated
{!isLoading && <Content />}
```

### 2. Multiple Conditions

```jsx
function StatusBadge({ status }) {
  // Using if/else in render
  if (status === 'loading') {
    return <div className="spinner">Loading...</div>
  }

  if (status === 'error') {
    return <div className="error">Error occurred</div>
  }

  return <div className="success">Success!</div>
}
```

### 3. Logical Operators

```jsx
// && operator
{isLoggedIn && <Dashboard />}

// || operator (show default)
{userName || 'Guest'}

// !! operator (convert to boolean)
{!!user && <UserProfile user={user} />}
```

### 4. Early Return

```jsx
function UserProfile({ user }) {
  // Early return for loading
  if (!user) {
    return <p>Loading...</p>
  }

  // Early return for error
  if (user.error) {
    return <p>Error: {user.error}</p>
  }

  // Main render
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  )
}
```

---

## 📋 Lists & Keys

### 1. Basic List Rendering

```jsx
const fruits = ['Apple', 'Banana', 'Orange']

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  )
}
```

### 2. List dengan Objects

```jsx
const users = [
  { id: 1, name: 'Budi', email: 'budi@email.com' },
  { id: 2, name: 'Siti', email: 'siti@email.com' },
  { id: 3, name: 'Andi', email: 'andi@email.com' },
]

function UserList() {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Keys yang Baik vs Buruk

```jsx
// ✅ GOOD: Unique and stable
{users.map(user => (
  <User key={user.id} user={user} />
))}

// ✅ GOOD: Index (only if list never reorders)
{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
))}

// ❌ BAD: Using random
{users.map(user => (
  <User key={Math.random()} user={user} />
))}

// ❌ BAD: Using index when items can reorder
{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li> // BAD if fruits can be sorted
))}
```

### 4. Filter & Map Together

```jsx
function ProductGrid({ products, category }) {
  return (
    <div className="grid">
      {products
        .filter(p => !category || p.category === category)
        .map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}
```

---

## 📝 Forms

### 1. Controlled Components

```jsx
function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', form)
    // Send to API
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  )
}
```

### 2. Form Validation

```jsx
function ValidatedForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!form.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Min 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      console.log('Valid form!')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error">{errors.password}</p>}

      <button type="submit">Submit</button>
    </form>
  )
}
```

### 3. Select & Checkbox

```jsx
function SelectForm() {
  const [category, setCategory] = useState('')
  const [agree, setAgree] = useState(false)
  const [colors, setColors] = useState([])

  const handleColorChange = (color) => {
    setColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  return (
    <div>
      {/* Select */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="tech">Technology</option>
        <option value="art">Art</option>
      </select>

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        I agree to terms
      </label>

      {/* Multiple checkboxes */}
      {['red', 'green', 'blue'].map(color => (
        <label key={color}>
          <input
            type="checkbox"
            checked={colors.includes(color)}
            onChange={() => handleColorChange(color)}
          />
          {color}
        </label>
      ))}
    </div>
  )
}
```

---

## 🌐 Context API

### 1. Create Context

```jsx
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### 2. Use Context

```jsx
// App.jsx
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  )
}

// Dashboard.jsx (anywhere in tree)
import { useTheme } from './context/ThemeContext'

function Dashboard() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`dashboard ${theme}`}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  )
}
```

### 3. Multiple Contexts

```jsx
// Wrap with multiple providers
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Dashboard />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

// Or create combined context
const AppContext = createContext()

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  return (
    <AppContext.Provider value={{ theme, setTheme, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}
```

### 4. Context dengan Nilai yang Berubah

```jsx
// Bad: Creates new object every render
<Context.Provider value={{ theme, setTheme }}>

// Good: Memoize the value
import { useMemo } from 'react'

<Context.Provider value={useMemo(() => ({
  theme, toggleTheme
}), [theme, toggleTheme])}>
```

---

## 🔄 useReducer

### 1. Basic useReducer

```jsx
import { useReducer } from 'react'

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}
```

### 2. Complex Reducer

```jsx
// Todo reducer
function todoReducer(todos, action) {
  switch (action.type) {
    case 'ADD':
      return [...todos, {
        id: Date.now(),
        text: action.payload,
        completed: false
      }]

    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      )

    case 'DELETE':
      return todos.filter(todo => todo.id !== action.payload)

    case 'CLEAR_COMPLETED':
      return todos.filter(todo => !todo.completed)

    default:
      return todos
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD', payload: input })
      setInput('')
    }
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => dispatch({ type: 'TOGGLE', payload: todo.id })}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
            <button onClick={() => dispatch({ type: 'DELETE', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### 3. useState vs useReducer

```jsx
// useState: untuk state sederhana (1-2 transitions)
const [count, setCount] = useState(0)
setCount(c => c + 1)

// useReducer: untuk state kompleks (banyak transitions)
const [state, dispatch] = useReducer(reducer, initialState)
dispatch({ type: 'ACTION_TYPE', payload: data })

// Rule of thumb:
// - If state adalah primitive value → useState
// - If state adalah object/array related → useReducer
// - If logic state update complex → useReducer
```

---

## 🪝 Custom Hooks

### 1. useLocalStorage

```jsx
import { useState, useEffect } from 'react'

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '')

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}
```

### 2. useFetch

```jsx
import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Cleanup: cancel fetch on unmount or url change
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(
    `/api/users/${userId}`
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return <div>{user?.name}</div>
}
```

### 3. useDebounce

```jsx
import { useState, useEffect } from 'react'

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Usage - prevents API calls on every keystroke
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

### 4. useToggle

```jsx
import { useState, useCallback } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(v => !v)
  }, [])

  return [value, toggle]
}

// Usage
function Modal() {
  const [isOpen, toggleIsOpen] = useToggle(false)

  return (
    <div>
      <button onClick={toggleIsOpen}>
        {isOpen ? 'Close' : 'Open'} Modal
      </button>
      {isOpen && <div className="modal">Modal Content</div>}
    </div>
  )
}
```

### 5. Common Custom Hooks Library

| Hook | Fungsi |
|------|--------|
| `useLocalStorage` | Sync state dengan localStorage |
| `useSessionStorage` | Sync state dengan sessionStorage |
| `useFetch` | Data fetching dengan loading/error |
| `useDebounce` | Delay update value |
| `useToggle` | Toggle boolean state |
| `useClickOutside` | Detect click di luar element |
| `useMediaQuery` | Responsive design check |
| `useGeolocation` | Get user location |
| `useIntersectionObserver` | Element visibility |
| `useOnScreen` | Check if element visible |

---

## 🛤️ React Router

### 1. Setup Router

```bash
npm install react-router-dom
```

```jsx
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### 2. Define Routes

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
```

### 3. Navigation

```jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navigation() {
  const navigate = useNavigate()

  return (
    <nav>
      {/* Link - untuk navigasi */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      {/* NavLink - auto dapat active class */}
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>

      {/* useNavigate - programmatic navigation */}
      <button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>

      {/* Navigate dengan state */}
      <button onClick={() => navigate('/user/1', { state: { from: 'list' } })}>
        View User
      </button>
    </nav>
  )
}
```

### 4. Route Params

```jsx
// Define route: /users/:id
function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))
  }, [id])

  return (
    <div>
      <h1>User ID: {id}</h1>
      {user && <p>{user.name}</p>}
    </div>
  )
}

// URL: /users/123 → id = "123"
```

### 5. Nested Routes

```jsx
function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>
        {/* Render nested route */}
        <Outlet />
      </main>
    </div>
  )
}
```

### 6. Protected Routes

```jsx
function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}
```

---

## 📦 State Management

### 1. Local vs Global State

```jsx
// Local state - cukup untuk component ini saja
function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// Global state - dibutuhkan banyak component
function App() {
  return (
    <CartProvider>
      <Header />
      <ProductList />
      <Cart />
    </CartProvider>
  )
}
```

### 2. Zustand (Simple State Management)

```bash
npm install zustand
```

```jsx
// store/useCartStore.js
import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addItem: (product) => set((state) => ({
    items: [...state.items, product],
    total: state.total + product.price
  })),

  removeItem: (productId) => set((state) => {
    const item = state.items.find(i => i.id === productId)
    return {
      items: state.items.filter(i => i.id !== productId),
      total: state.total - (item?.price || 0)
    }
  }),

  clearCart: () => set({ items: [], total: 0 }),

  // Selector
  getItemCount: () => get().items.length
}))

// Usage
function CartButton() {
  const itemCount = useCartStore(state => state.items.length)

  return <button>Cart ({itemCount})</button>
}
```

### 3. Zustand vs Redux vs Context

| Aspect | Context | Zustand | Redux Toolkit |
|--------|---------|---------|---------------|
| **Complexity** | Simple | Simple | Medium-High |
| **Boilerplate** | Low | Very Low | Medium |
| **DevTools** | Basic | Good | Excellent |
| **Performance** | Can be slow | Fast | Fast |
| **Async** | Manual | Middleware | Middleware |
| **Best for** | Simple global | Medium apps | Large apps |

---

## ⚡ Performance Optimization

### 1. React.memo

```jsx
import { memo } from 'react'

// Memoize component - tidak re-render kalau props sama
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
})

// With custom comparison
const ProductCard = memo(
  ({ product, onAddToCart }) => {
    return (
      <div>
        <h3>{product.name}</h3>
        <button onClick={() => onAddToCart(product.id)}>Add</button>
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (don't re-render)
    return prevProps.product.id === nextProps.product.id &&
           prevProps.product.price === nextProps.product.price
  }
)
```

### 2. useMemo

```jsx
import { useMemo } from 'react'

function ProductList({ products, filter }) {
  // Memoize expensive calculation
  const filteredProducts = useMemo(() => {
    console.log('Filtering...')
    return products
      .filter(p => p.category === filter)
      .sort((a, b) => b.price - a.price)
  }, [products, filter])

  return (
    <ul>
      {filteredProducts.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}
```

### 3. useCallback

```jsx
import { useCallback } from 'react'

function Parent() {
  const [count, setCount] = useState(0)

  // Memoize function - tidak berubah setiap render
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id)
  }, []) // Empty deps = function never changes

  return <Child onClick={handleClick} />
}

const Child = memo(({ onClick }) => {
  // Child tidak re-render kalau handleClick tidak berubah
  return <button onClick={() => onClick(1)}>Click</button>
})
```

### 4. Lazy Loading

```jsx
import { Suspense, lazy } from 'react'

// Lazy load heavy component
const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading chart...</p>}>
        <HeavyChart />
      </Suspense>
    </div>
  )
}
```

### 5. Virtualization (for long lists)

```bash
npm install @tanstack/react-virtual
```

```jsx
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50
  })

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## ✅ Best Practices

### 1. Component Organization

```jsx
// 1. Imports
import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from './ui/Button'

// 2. Type definitions (if TypeScript)
// interface UserProps { ... }

// 3. Component definition
export function UserProfile({ userId }) {
  // 4. Hooks first
  const { user } = useAuth()
  const [data, setData] = useState(null)

  // 5. Effects
  useEffect(() => {
    fetchUser(userId)
  }, [userId])

  // 6. Handlers
  const handleDelete = () => { ... }

  // 7. Render
  return (
    <div className="user-profile">
      {/* JSX */}
    </div>
  )
}
```

### 2. Naming Conventions

```jsx
// Components: PascalCase
function UserCard() { ... }
function NavigationMenu() { ... }

// Hooks: camelCase dengan 'use' prefix
function useAuth() { ... }
function useLocalStorage() { ... }

// Functions: camelCase
function handleClick() { ... }
function calculateTotal() { ... }

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3
const API_BASE_URL = 'https://api.example.com'

// Files: match component name
// UserCard.jsx, useAuth.js, constants.js
```

### 3. Common Patterns

```jsx
// Optional chaining untuk aman akses nested
{user?.profile?.avatar}

// Default values
const name = userName || 'Anonymous'

// Fragment untuk multiple elements
return (
  <>
    <Header />
    <Content />
    <Footer />
  </>
)

// Memoization untuk performance
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b])

// Cleanup effects
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe()
}, [])
```

### 4. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  )
}

// Or with hooks (React 16+)
import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function fallbackRender({ error }) {
  return <p>Error: {error.message}</p>
}

<ErrorBoundary fallbackRender={fallbackRender}>
  <MyComponent />
</ErrorBoundary>
```

---

## 📚 Referensi Tambahan

### Official Resources
- [React Documentation](https://react.dev)
- [React Beta Docs](https://react.dev/learn)
- [React Hooks API](https://react.dev/reference/react)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

### Learning
- [React Tutorial Official](https://react.dev/learn/tutorial-tic-tac-toe)
- [Kent C. Dodds Blog](https://kentcdodds.com/blog)
- [Josh Comeau Blog](https://www.joshwcomeau.com/)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Vite](https://vitejs.dev)
- [ESLint + React Plugin](https://www.npmjs.com/package/eslint-plugin-react)

---

## 🎯 Latihan

Coba implementasikan fitur-fitur berikut:

1. [ ] Todo app dengan CRUD operations
2. [ ] Weather app dengan API integration
3. [ ] E-commerce product list dengan filter
4. [ ] Authentication flow (login/logout)
5. [ ] Infinite scroll dengan lazy loading
6. [ ] Dark mode toggle dengan Context
7. [ ] Real-time search dengan debounce
8. [ ] Multi-step form dengan validation
9. [ ] Dashboard dengan charts
10. [ ] Real-time chat app

---

**Happy Coding! React.js adalah pilihan excellent untuk membangun aplikasi web modern!** 🚀
# 📚 Vue.js Learning Documentation

Selamat datang di panduan belajar Vue.js! Dokumen ini mencakup semua yang Anda butuhkan untuk menguasai Vue.js 3, dari konsep dasar hingga fitur lanjutan.

---

## 📋 Daftar Isi

1. [Apa itu Vue.js?](#apa-itu-vuejs)
2. [Setup Project](#setup-project)
3. [Konsep Dasar](#konsep-dasar)
4. [Reactivity System](#reactivity-system)
5. [Components](#components)
6. [Props & Events](#props--events)
7. [Composition API vs Options API](#composition-api-vs-options-api)
8. [Directives](#directives)
9. [Vue Router](#vue-router)
10. [State Management (Pinia)](#state-management-pinia)
11. [Computed & Watch](#computed--watch)
12. [Lifecycle Hooks](#lifecycle-hooks)
13. [Styling](#styling)
14. [Best Practices](#best-practices)
15. [Vue vs React vs Angular](#vue-vs-react-vs-angular)

---

## 🔰 Apa itu Vue.js?

**Vue.js** adalah framework JavaScript progresif untuk membangun antarmuka pengguna (UI). Dibuat oleh Evan You dan pertama kali dirilis pada 2014.

### Karakteristik Vue:

| Karakteristik | Deskripsi |
|--------------|-----------|
| **Progresif** | Bisa digunakan sedikit demi sedikit, tidak harus semua sekaligus |
| **Reaktif** | Data binding otomatis, UI update saat data berubah |
| **Component-based** | Bangun UI dari komponen yang dapat digunakan ulang |
| **Mudah dipelajari** | Sintaks sederhana, dokumentasi excellent |
| **Fleksibel** | Bisa digunakan untuk SPAs atau di halaman existing |

### Versi Vue:

```
Vue 1.x → Vue 2.x (2016-2022) → Vue 3.x (2020-sekarang)
                          ↑
                   Vue 3 adalah versi saat ini
                   Menggunakan Composition API
```

---

## 🛠️ Setup Project

### 1. Menggunakan Vite (Recommended)

```bash
# Create project
npm create vue@latest nama-project

# Atau dengan CLI
npm init vue@latest nama-project

# Pilih fitur saat prompted:
# ✅ TypeScript
# ✅ Vue Router
# ✅ Pinia
# ✅ Vitest
# ✅ ESLint
```

### 2. Struktur Project

```
nama-project/
├── public/              # File statis
├── src/
│   ├── assets/          # CSS, gambar
│   ├── components/      # Komponen reusable
│   ├── views/           # Halaman (routes)
│   ├── router/          # Konfigurasi router
│   ├── stores/          # Pinia stores
│   ├── App.vue          # Root component
│   └── main.js          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

### 3. Install Dependencies

```bash
cd nama-project
npm install
```

### 4. Commands Penting

```bash
# Development server
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 🎯 Konsep Dasar

### 1. Vue Instance

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

### 2. Template Syntax

```vue
<!-- App.vue -->
<script setup>
// Component script (Composition API)
import { ref, computed } from 'vue'

// Reactive state
const message = ref('Hello Vue!')
const count = ref(0)

// Computed property
const doubleCount = computed(() => count.value * 2)

// Method
function increment() {
  count.value++
}
</script>

<template>
  <!-- HTML template -->
  <h1>{{ message }}</h1>
  <p>Count: {{ count }} (doubled: {{ doubleCount }})</p>
  <button @click="increment">Click me</button>
</template>

<style scoped>
/* Scoped CSS */
h1 {
  color: #42b883;
}
</style>
```

### 3. Data Binding

#### Text Interpolation
```vue
<p>{{ message }}</p>
<p>{{ user.name.toUpperCase() }}</p>
<p>{{ isActive ? 'Active' : 'Inactive' }}</p>
```

#### Attribute Binding
```vue
<!-- HTML attribute -->
<img :src="imageUrl" :alt="imageAlt" />
<button :disabled="isLoading">Submit</button>
<div :class="{ active: isActive, 'text-red': hasError }"></div>
```

#### Two-way Binding (v-model)
```vue
<!-- Text input -->
<input v-model="name" type="text" />
<p>Name: {{ name }}</p>

<!-- Checkbox -->
<input type="checkbox" v-model="agree" />
<label>Saya setuju</label>

<!-- Select -->
<select v-model="selectedCity">
  <option value="">Pilih kota</option>
  <option value="jogja">Yogyakarta</option>
  <option value="jakarta">Jakarta</option>
</select>
```

---

## ⚡ Reactivity System

Vue 3 menggunakan **Proxy-based reactivity** untuk melacak perubahan data.

### ref vs reactive

```vue
<script setup>
import { ref, reactive, computed } from 'vue'

// ref - untuk primitive types
const count = ref(0)
const message = ref('Hello')

// ref membutuhkan .value di script
count.value++
console.log(count.value) // 1

// reactive - untuk objects
const user = reactive({
  name: 'Budi',
  age: 25,
  address: {
    city: 'Yogyakarta',
    postalCode: '55111'
  }
})

// reactive tidak butuh .value
user.age = 26
console.log(user.age) // 26

// Computed
const greeting = computed(() => {
  return `Halo, ${user.name}! Anda berusia ${user.age} tahun.`
})
</script>

<template>
  <p>{{ greeting }}</p>
  <p>Count: {{ count }}</p>
</template>
```

### toRef & toRefs

```vue
<script setup>
import { toRef, toRefs, reactive } from 'vue'

const state = reactive({
  name: 'Budi',
  email: 'budi@email.com'
})

// toRefs - destructure reactive object
const { name, email } = toRefs(state)

// toRef - buat ref dari property object
const nameRef = toRef(state, 'name')

// Perubahan di ref akan update original
nameRef.value = 'Siti'
console.log(state.name) // 'Siti'
</script>
```

---

## 🧩 Components

### 1. Membuat Komponen

```vue
<!-- src/components/UserCard.vue -->
<script setup>
defineProps({
  name: String,
  email: String,
  avatar: {
    type: String,
    default: '/default-avatar.png'
  }
})
</script>

<template>
  <div class="user-card">
    <img :src="avatar" :alt="name" class="avatar" />
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
  </div>
</template>

<style scoped>
.user-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
```

### 2. Menggunakan Komponen

```vue
<!-- App.vue -->
<script setup>
import UserCard from './components/UserCard.vue'

const users = [
  { id: 1, name: 'Budi Santoso', email: 'budi@email.com', avatar: '/budi.jpg' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@email.com' },
]
</script>

<template>
  <div class="user-list">
    <UserCard
      v-for="user in users"
      :key="user.id"
      :name="user.name"
      :email="user.email"
      :avatar="user.avatar"
    />
  </div>
</template>
```

### 3. Komponen dengan Emits

```vue
<!-- src/components/Counter.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

const emit = defineEmits(['increment', 'decrement', 'reset'])

function increment() {
  count.value++
  emit('increment', count.value)
}

function decrement() {
  count.value--
  emit('decrement', count.value)
}

function reset() {
  count.value = 0
  emit('reset')
}
</script>

<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <div class="buttons">
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="increment">+</button>
    </div>
  </div>
</template>
```

```vue
<!-- Parent component -->
<Counter
  @increment="(val) => total += val"
  @decrement="(val) => total -= val"
  @reset="total = 0"
/>
```

### 4. v-for dengan Index

```vue
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index + 1 }}. {{ item.name }}
    </li>
  </ul>
</template>
```

### 5. v-for dengan Object

```vue
<template>
  <ul>
    <li v-for="(value, key, index) in object" :key="key">
      {{ index + 1 }}. {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script setup>
const object = reactive({
  name: 'Budi',
  age: 25,
  city: 'Yogyakarta'
})
</script>
```

---

## 📤 Props & Events

### Props Definition

```vue
<!-- Component dengan props -->
<script setup>
// Basic
defineProps(['title', 'content'])

// With type
defineProps({
  title: String,
  content: String,
  count: Number,
  isActive: Boolean
})

// With defaults
defineProps({
  title: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>
```

### Events Definition

```vue
<script setup>
const emit = defineEmits(['update', 'delete', 'click'])

// Simple
emit('update', newValue)

// With validation
emit('delete', { id: 1, reason: 'user_request' })

// Custom event with arguments
emit('click', event, extraData)
</script>
```

### v-model with Components

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input :value="modelValue" @input="onInput" />
</template>
```

```vue
<!-- Parent -->
<CustomInput v-model="searchQuery" />
```

### Multiple v-model

```vue
<!-- TwoWayInput.vue -->
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

const emit = defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input :value="firstName" @input="emit('update:firstName', $event.target.value)" />
  <input :value="lastName" @input="emit('update:lastName', $event.target.value)" />
</template>
```

```vue
<!-- Parent -->
<TwoWayInput v-model:first-name="firstName" v-model:last-name="lastName" />
```

---

## ⚙️ Composition API vs Options API

### Options API (Vue 2 style)

```vue
<script>
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}
</script>
```

### Composition API (Vue 3 style)

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive state
const count = ref(0)
const message = ref('Hello')

// Computed
const doubleCount = computed(() => count.value * 2)

// Methods
function increment() {
  count.value++
}

// Lifecycle
onMounted(() => {
  console.log('Component mounted')
})
</script>
```

### Comparison Table

| Aspect | Options API | Composition API |
|--------|-------------|-----------------|
| **Struktur** | Berdasarkan option type | Berdasarkan fungsi |
| **Reusability** | Mixins | Composables |
| **Logic grouping** | Oleh option type | Boleh dikelompokkan sendiri |
| **TypeScript** | Terbatas | Full support |
| **Bundle size** | Sedikit lebih besar | Lebih optimal |
| **Learning curve** | Lebih mudah untuk pemula | Perlu belajar lebih |

### Ketika Menggunakan Composition API

```vue
<!-- Complex component - use Composition API -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuth } from './composables/useAuth'
import { useFetch } from './composables/useFetch'

// Logic organized by feature
const { user, logout } = useAuth()
const { data, loading, error, fetchData } = useFetch()

onMounted(() => {
  fetchData('/api/users')
})

watch(user, (newUser) => {
  console.log('User changed:', newUser)
})

const activeUsers = computed(() => {
  return data.value?.filter(u => u.isActive) ?? []
})
</script>
```

### Composables (Reusable Logic)

```javascript
// src/composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  const double = computed(() => count.value * 2)

  return {
    count,
    increment,
    decrement,
    reset,
    double
  }
}
```

```vue
<script setup>
import { useCounter } from './composables/useCounter'

const { count, increment, decrement, double } = useCounter(10)
</script>
```

---

## 🎮 Directives

### Built-in Directives

| Directive | Usage | Description |
|----------|-------|-------------|
| `v-text` | `<span v-text="message"></span>` | Render text |
| `v-html` | `<div v-html="htmlContent"></div>` | Render HTML (be careful!) |
| `v-show` | `<div v-show="isVisible"></div>` | Toggle visibility |
| `v-if` | `<div v-if="isActive"></div>` | Conditional render |
| `v-else` | `<div v-if="isActive">A</div><div v-else>B</div>` | Else block |
| `v-for` | `<li v-for="item in items"></li>` | List rendering |
| `v-bind` | `<img :src="url">` | Attribute binding |
| `v-model` | `<input v-model="text">` | Two-way binding |
| `v-on` | `<button @click="handleClick">` | Event binding |
| `v-slot` | `<template v-slot:header>` | Slot content |
| `v-pre` | `<span v-pre>{{ raw }}</span>` | Skip compilation |
| `v-once` | `<span v-once>{{once}}</span>` | Render once only |

### v-if vs v-show

```vue
<template>
  <!-- v-if: Remove from DOM completely -->
  <div v-if="isLoggedIn">
    Welcome, User!
  </div>
  
  <!-- v-show: Toggle CSS display -->
  <div v-show="isLoggedIn">
    Welcome, User!
  </div>
</template>

<script setup>
// v-if: Good for rare toggles (login/logout)
// v-show: Good for frequent toggles (tabs, modals)
</script>
```

### Custom Directives

```javascript
// src/directives/focus.js
export const vFocus = {
  mounted: (el) => {
    el.focus()
  }
}
```

```vue
<script setup>
// Register locally
import { vFocus } from './directives/focus'
</script>

<template>
  <input v-focus placeholder="Auto focused" />
</template>
```

```javascript
// main.js - Register globally
app.directive('focus', {
  mounted: (el) => el.focus()
})
```

### Directive Hooks

```javascript
export const vHighlight = {
  // Called before mount
  beforeMount(el, binding, vnode) {},
  
  // Called after mount
  mounted(el, binding, vnode) {
    el.style.backgroundColor = binding.value
  },
  
  // Called before update
  beforeUpdate(el, binding, vnode, prevNode) {},
  
  // Called after update
  updated(el, binding, vnode, prevNode) {},
  
  // Called before unmount
  beforeUnmount(el) {},
  
  // Called after unmount
  unmounted(el) {}
}
```

```vue
<p v-highlight="'yellow'">Highlighted text</p>
```

---

## 🛤️ Vue Router

### 1. Setup Router

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true  // Pass route params as props
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
```

### 2. Register Router

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 3. Using Router in Components

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navigate programmatically
function goToHome() {
  router.push('/')
}

// With params
function goToUser(userId) {
  router.push({ name: 'UserProfile', params: { id: userId } })
}

// Access route params
console.log(route.params.id)
console.log(route.query.search) // ?search=value
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    
    <!-- Active class automatic -->
    <router-link :to="{ name: 'UserProfile', params: { id: 123 } }">
      User Profile
    </router-link>
  </nav>
  
  <!-- Router view -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
```

### 4. Navigation Guards

```javascript
// router/index.js

// Global guard
router.beforeEach((to, from) => {
  const isAuthenticated = checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  
  return true
})

// Per-route guard
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from) => {
      return confirm('Are you admin?')
    }
  }
]

// Component guard
export default {
  beforeRouteEnter(to, from, next) {
    // Cannot access 'this' here
    next(vm => {
      // Can access component instance
    })
  }
}
```

---

## 📦 State Management (Pinia)

### 1. Install Pinia

```bash
npm install pinia
```

```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

### 2. Create Store

```javascript
// src/stores/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  
  // Getters (computed)
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => user.value?.name ?? 'Guest')
  
  // Actions
  async function login(credentials) {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    const data = await response.json()
    
    user.value = data.user
    token.value = data.token
    localStorage.setItem('token', data.token)
  }
  
  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
  }
  
  return {
    user,
    token,
    isLoggedIn,
    userName,
    login,
    logout
  }
})
```

### 3. Use Store in Components

```vue
<script setup>
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

// Reactive destructuring
const { user, isLoggedIn } = storeToRefs(userStore)

// Actions
const { login, logout } = userStore

async function handleLogin() {
  await login({ email: 'user@email.com', password: '123' })
}
</script>

<template>
  <div v-if="isLoggedIn">
    <p>Welcome, {{ user.name }}!</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <button @click="handleLogin">Login</button>
  </div>
</template>
```

### 4. Multiple Stores

```javascript
// src/stores/cart.js
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const totalItems = computed(() => items.value.length)
  const totalPrice = computed(() => 
    items.value.reduce((sum, item) => sum + item.price, 0)
  )
  
  function addItem(product) {
    items.value.push(product)
  }
  
  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
  }
  
  return { items, totalItems, totalPrice, addItem, removeItem }
})
```

---

## 🧮 Computed & Watch

### Computed Properties

```vue
<script setup>
import { ref, computed } from 'vue'

const products = ref([
  { id: 1, name: 'Laptop', price: 15000000, category: 'electronics' },
  { id: 2, name: 'Shirt', price: 250000, category: 'fashion' },
  { id: 3, name: 'Phone', price: 8000000, category: 'electronics' },
  { id: 4, name: 'Pants', price: 350000, category: 'fashion' },
])

// Computed - caching
const electronics = computed(() =>
  products.value.filter(p => p.category === 'electronics')
)

const totalPrice = computed(() =>
  products.value.reduce((sum, p) => sum + p.price, 0)
)

const expensiveProducts = computed(() =>
  products.value.filter(p => p.price > 10000000)
)

// Read-only vs writable computed
const discountPrice = computed({
  get: () => totalPrice.value * 0.9,
  set: (value) => {
    console.log('New price:', value)
  }
})
</script>
```

### Watch Properties

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const user = ref({ name: 'Budi', age: 25 })

// Watch single value
watch(count, (newValue, oldValue) => {
  console.log(`Count changed: ${oldValue} → ${newValue}`)
})

// Watch multiple values
watch([count, user], ([newCount, newUser], [oldCount, oldUser]) => {
  console.log('Changed!')
})

// Deep watch
watch(user, (newUser) => {
  console.log('User changed:', newUser)
}, { deep: true })

// Watch with immediate
const searchQuery = ref('')
watch(searchQuery, (query) => {
  // Run immediately
  fetchResults(query)
}, { immediate: true })

// Watch nested property
watch(() => user.value.name, (newName) => {
  console.log('Name changed to:', newName)
})
</script>
```

### watchEffect

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const query = ref('')
const results = ref([])

// Auto-track dependencies
watchEffect(() => {
  console.log('Query changed:', query.value)
  
  // Automatically tracks query.value
  if (query.value.length > 2) {
    fetch(`/api/search?q=${query.value}`)
      .then(res => res.json())
      .then(data => results.value = data)
  }
})

// Cleanup in watchEffect
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log('Delayed search for:', query.value)
  }, 500)
  
  // Cleanup on each run
  onCleanup(() => clearTimeout(timer))
})
</script>
```

---

## 🔄 Lifecycle Hooks

### Diagram Lifecycle

```
Component Creation
       ↓
beforeCreate → (setup() runs here in Composition API)
       ↓
    created
       ↓
    Mounting
       ↓
beforeMount → (template compiled)
       ↓
   mounted → (DOM available)
       ↓
    Update
       ↓
beforeUpdate → (data changed, re-render)
       ↓
   updated
       ↓
    Unmount
       ↓
beforeUnmount → (cleanup)
       ↓
  unmounted
```

### Usage in Composition API

```vue
<script setup>
import { ref, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'

const count = ref(0)

// Called before component is mounted
onBeforeMount(() => {
  console.log('About to mount')
})

// Called after component is mounted
onMounted(() => {
  console.log('Component mounted')
  window.addEventListener('resize', handleResize)
})

// Called before update
onBeforeUpdate(() => {
  console.log('About to update')
})

// Called after update
onUpdated(() => {
  console.log('Component updated')
})

// Called before unmount
onBeforeUnmount(() => {
  console.log('About to unmount')
})

// Called after unmount
onUnmounted(() => {
  console.log('Component unmounted')
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  console.log(window.innerWidth)
}
</script>
```

### Common Use Cases

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Fetch data on mount
onMounted(async () => {
  const data = await fetch('/api/users')
  users.value = await data.json()
})

// Cleanup subscriptions
const subscription = subscribeToEvents()
onUnmounted(() => {
  subscription.unsubscribe()
})

// Set up interval
const timer = setInterval(() => {
  console.log('tick')
}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})

// SEO meta tags
onMounted(() => {
  document.title = 'Page Title'
  document.meta.description = 'Description'
})
</script>
```

---

## 🎨 Styling

### Scoped CSS

```vue
<style scoped>
.card {
  padding: 1rem;
  border-radius: 8px;
}

.card-title {
  font-size: 1.5rem;
  color: #333;
}

/* Deep selector */
:deep(.external-component) {
  color: red;
}

/* Global style */
:global(body) {
  margin: 0;
}
</style>
```

### CSS Modules

```vue
<style module>
.card {
  padding: 1rem;
}
</style>

<template>
  <div :class="$style.card">
    <h1 :class="$style.title">Title</h1>
  </div>
</template>
```

### CSS Variables + Dynamic Styles

```vue
<script setup>
const theme = ref('purple')

const styles = computed(() => ({
  '--primary-color': theme.value === 'purple' ? '#7c3aed' : '#06b6d4',
  '--border-radius': '12px'
}))
</script>

<template>
  <div class="card" :style="styles">
    Content
  </div>
</template>
```

### Tailwind CSS Integration

```vue
<script setup>
const isActive = ref(true)
const items = ref(['a', 'b', 'c'])
</script>

<template>
  <!-- Standard Tailwind -->
  <div class="p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold">Title</h1>
  </div>
  
  <!-- Dynamic classes -->
  <div :class="[
    'p-4',
    isActive ? 'bg-green-100' : 'bg-gray-100',
    'rounded-lg'
  ]">
    Content
  </div>
  
  <!-- v-for with Tailwind -->
  <ul>
    <li v-for="item in items" :key="item" class="p-2 hover:bg-gray-50">
      {{ item }}
    </li>
  </ul>
</template>
```

### Component Variants

```vue
<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger'].includes(v)
  }
})
</script>

<template>
  <button :class="[
    'px-4 py-2 rounded-lg font-semibold transition-colors',
    {
      'bg-purple-600 text-white hover:bg-purple-700': variant === 'primary',
      'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
    }
  ]">
    <slot />
  </button>
</template>
```

---

## ✅ Best Practices

### 1. Component Structure

```vue
<!-- 1. <script setup> - Logic -->
<script setup>
import { ref, computed } from 'vue'

// 1. Imports
// 2. Props/Emits
// 3. Reactive state
// 4. Computed
// 5. Watch
// 6. Methods
// 7. Lifecycle hooks
</script>

<!-- 2. <template> - Structure -->
<template>
  <!-- Logical groups with comments -->
  <!-- Header -->
  <!-- Main content -->
  <!-- Footer -->
</template>

<!-- 3. <style scoped> - Presentation -->
<style scoped>
/* CSS organized by element */
</style>
```

### 2. Props Validation

```vue
<script setup>
defineProps({
  // Required
  title: {
    type: String,
    required: true
  },
  
  // With defaults
  count: {
    type: Number,
    default: 0
  },
  
  // Array with default factory
  items: {
    type: Array,
    default: () => []
  },
  
  // Custom validator
  status: {
    type: String,
    validator: (v) => ['pending', 'active', 'done'].includes(v)
  }
})
</script>
```

### 3. Error Handling

```vue
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err, instance, info) => {
  console.error('Error captured:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
  
  // Return false to stop propagation
  return false
})
</script>
```

### 4. Performance Tips

```vue
<script setup>
// ✅ GOOD: Use computed instead of methods in template
const filteredItems = computed(() => 
  items.value.filter(i => i.active)
)

// ❌ BAD: Method called on every render
const getFilteredItems = () => items.value.filter(i => i.active)

// ✅ GOOD: Use shallowRef for large data
import { shallowRef } from 'vue'
const largeData = shallowRef([])

// ✅ GOOD: v-memo for expensive lists
<li v-for="item in items" v-memo="[item.id, item.name]">
  {{ item.name }}
</li>

// ✅ GOOD: Async component with loading
const AsyncHeavy = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200
})
</script>
```

### 5. TypeScript Integration

```typescript
// src/types/index.ts
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface Product {
  id: number
  name: string
  price: number
  category: 'electronics' | 'fashion' | 'food'
}
```

```vue
<script setup lang="ts">
import type { User, Product } from '../types'

defineProps<{
  user: User
  products: Product[]
}>()

const emit = defineEmits<{
  (e: 'select', product: Product): void
  (e: 'delete', id: number): void
}>()

function handleSelect(product: Product) {
  emit('select', product)
}
</script>
```

---

## ⚔️ Vue vs React vs Angular

### Quick Comparison

| Aspect | Vue | React | Angular |
|--------|-----|-------|---------|
| **Creator** | Evan You | Meta (Facebook) | Google |
| **First Release** | 2014 | 2013 | 2010 (AngularJS), 2016 (Angular 2+) |
| **Current Version** | Vue 3 | React 18 | Angular 17 |
| **Language** | JS/TS | JS/TS | TypeScript (required) |
| **Learning Curve** | Easy | Medium | Steep |
| **Ecosystem** | Vue Router, Pinia, Nuxt | React Router, Redux, Next.js | Angular Router, NgRx, Angular Universal |
| **Bundle Size** | ~33KB | ~44KB (with React DOM) | ~450KB |
| **Community** | Large | Huge | Large |

### Syntax Comparison

```vue
<!-- Vue -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="handleClick">Click</button>
  </div>
</template>

<script setup>
const title = ref('Hello')
function handleClick() {
  title.value = 'Clicked!'
}
</script>
```

```jsx
/* React */
function App() {
  const [title, setTitle] = useState('Hello')
  
  function handleClick() {
    setTitle('Clicked!')
  }
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}
```

```typescript
/* Angular */
@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <button (click)="handleClick()">Click</button>
    </div>
  `
})
export class AppComponent {
  title = 'Hello'
  
  handleClick() {
    this.title = 'Clicked!'
  }
}
```

### When to Choose What

| Use Case | Recommendation |
|----------|----------------|
| **Quick MVP / Prototype** | Vue or React |
| **Large Enterprise App** | Angular or Vue (with Nuxt) |
| **SEO-focused app** | Nuxt (Vue) or Next.js (React) |
| **Existing project integration** | Vue (easiest to adopt) |
| **Team with strong TS background** | Angular |
| **Maximum flexibility** | React |
| **Best documentation** | Vue |
| **Job market** | React (most jobs), Vue (growing) |

### Migration Paths

```
Vue 2 → Vue 3 (mostly compatible)
React → React (hooks, no major rewrites)
Angular 2+ → Angular (upgrades are smooth)
```

---

## 📚 Referensi Tambahan

### Official Resources
- [Vue.js Documentation](https://vuejs.org)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org)
- [Vue Router Docs](https://router.vuejs.org)
- [Pinia Docs](https://pinia.vuejs.org)
- [Vue Cookbook](https://vuejs.org/v2/cookbook/)

### Learning Platforms
- [Vue School](https://vueschool.io)
- [Nuxt Academy](https://nuxt.com/academy)
- [Vue Mastery](https://www.vuemastery.com)

### Community
- [Vue Land Discord](https://discord.gg/vue)
- [Vue.js Discussion Forum](https://github.com/vuejs/core/discussions)

---

## 🎯 Latihan

Coba implementasikan fitur-fitur berikut:

1. [ ] Buat todo app dengan Vue + Pinia
2. [ ] Implementasikan authentication flow
3. [ ] Buat dashboard dengan charts
4. [ ] Build e-commerce product page
5. [ ] Implementasikan infinite scroll
6. [ ] Buat admin panel dengan CRUD
7. [ ] Integrate dengan REST API
8. [ ] Implementasikan dark mode toggle
9. [ ] Build real-time chat feature
10. [ ] Create multi-language support (i18n)

---

**Happy Coding! Vue.js adalah pilihan excellent untuk web development.** 🚀

Dokumen ini dibuat untuk pembelajaran Vue.js. Jangan ragu untuk eksplorasi dan eksperimen dengan fitur-fitur Vue!
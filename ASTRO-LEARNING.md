# 📚 Astro Web Development - Learning Documentation

Selamat datang di panduan belajar Astro Web Development! Dokumen ini akan membantu Anda memahami konsep-konsep dasar hingga lanjutan dalam membangun website dengan Astro.

---

## 📋 Daftar Isi

1. [Apa itu Astro?](#apa-itu-astro)
2. [Setup Project](#setup-project)
3. [Struktur Project](#struktur-project)
4. [Komponen Astro](#komponen-astro)
5. [Pages & Routing](#pages--routing)
6. [Layouts](#layouts)
7. [Integrasi Tailwind CSS](#integrasi-tailwind-css)
8. [Dynamic Routing](#dynamic-routing)
9. [Island Architecture](#island-architecture)
10. [Best Practices](#best-practices)

---

## 🔰 Apa itu Astro?

**Astro** adalah framework web modern yang fokus pada **konten-driven websites**. Astro menggabungkan performa terbaik dengan fleksibilitas komponen.

### Keunggulan Astro:

| Fitur | Deskripsi |
|-------|-----------|
| **Zero JS by Default** | Tidak ada JavaScript di client kecuali Anda minta |
| **Island Architecture** | Interaktivitas selektif dengan framework lain |
| **Content Collections** | Sistem pengelolaan konten type-safe |
| **Built-in Image Optimization** | Optimasi gambar otomatis |
| **Server Output** | Mendukung static, server, dan hybrid rendering |

---

## 🛠️ Setup Project

### 1. Membuat Project Baru

```bash
# Menggunakan create-astro (recommended)
npm create astro@latest nama-project

# Atau dengan template
npm create astro@latest nama-project -- --template starter
```

### 2. Struktur Project Standar

```
nama-project/
├── public/              # File statis (favicon, gambar, dll)
├── src/
│   ├── components/       # Komponen Astro/framework lain
│   ├── layouts/         # Layout halaman
│   ├── pages/           # Halaman (routing otomatis)
│   └── styles/          # File CSS global
├── astro.config.mjs     # Konfigurasi Astro
├── package.json         # Dependencies
└── tsconfig.json        # Konfigurasi TypeScript
```

### 3. Install Dependencies

```bash
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

# CLI Astro
npx astro --help
```

---

## 📁 Struktur Project

### File Konfigurasi Utama

#### `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Site URL (untuk SEO & canonical)
  site: 'https://example.com',
  
  // Base path (jika di subdirectory)
  base: '/',
  
  // Output mode: 'static' | 'server' | 'hybrid'
  output: 'static',
  
  // Integrations
  integrations: [tailwind()],
  
  // Build options
  build: {
    format: 'directory',
    assets: '_assets'
  },
  
  // Vite options
  vite: {
    build: {
      cssMinify: true
    }
  }
});
```

#### `package.json`
```json
{
  "name": "my-astro-site",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^4.0.0"
  },
  "devDependencies": {
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

#### `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"]
    }
  }
}
```

---

## 🧩 Komponen Astro

Komponen adalah blok bangunan utama dalam Astro. Mereka memiliki ekstensi `.astro` dan terdiri dari **Component Script** (JavaScript) dan **Component Template** (HTML).

### Struktur Dasar Komponen

```astro
---
// Component Script (server-side)
const title = "Hello World";
const items = ["Item 1", "Item 2", "Item 3"];

function calculate(a: number, b: number) {
  return a + b;
}
---

<!-- Component Template (HTML) -->
<div class="container">
  <h1>{title}</h1>
  <ul>
    {items.map((item) => (
      <li>{item}</li>
    ))}
  </ul>
</div>
```

### Props (Parameter Komponen)

#### Mendefinisikan Props
```astro
---
// src/components/Card.astro
export interface Props {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

const { title, description, image, link = "#" } = Astro.props;
---

<article class="card">
  {image && <img src={image} alt={title} />}
  <h3>{title}</h3>
  <p>{description}</p>
  <a href={link}>Selengkapnya</a>
</article>
```

#### Menggunakan Props
```astro
---
import Card from '../components/Card.astro';
---

<Card 
  title="Judul Artikel"
  description="Deskripsi artikel..."
  image="/images/artikel.jpg"
  link="/artikel/slug"
/>
```

### Props dengan TypeScript

```astro
---
// src/components/ServiceCard.astro
export interface Props {
  title: string;
  description: string;
  icon: string;
  price?: string;
  deliveryTime: string;
  features?: string[];
  highlighted?: boolean;
  popular?: boolean;
}

const {
  title,
  description,
  icon,
  price,
  deliveryTime,
  features = [],  // Default value
  highlighted = false,
  popular = false
} = Astro.props;
---

<div class={`card ${highlighted ? 'highlighted' : ''}`}>
  <i class={`fas ${icon}`}></i>
  <h3>{title}</h3>
  <p>{description}</p>
  <span>{deliveryTime}</span>
  {price && <span class="price">{price}</span>}
  {features.length > 0 && (
    <ul>
      {features.map(f => <li>{f}</li>)}
    </ul>
  )}
</div>
```

---

## 📄 Pages & Routing

Astro menggunakan **file-based routing**. Setiap file di `src/pages/` secara otomatis menjadi halaman di website Anda.

### Dasar-dasar Routing

```
src/pages/
├── index.astro        → /
├── about.astro        → /about
├── services.astro     → /services
├── contact.astro      → /contact
└── nested/
    └── team.astro     → /nested/team
```

### Page Layout Pattern

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="Beranda" description="Deskripsi halaman">
  <main>
    <h1>Selamat Datang!</h1>
    <p>Konten halaman...</p>
  </main>
</Layout>
```

### Meta Tags Dinamis

```astro
---
// Setiap page bisa punya meta berbeda
const { title, description } = Astro.props;
const siteUrl = Astro.site?.toString() || 'https://example.com';
const canonicalUrl = new URL(Astro.url.pathname, siteUrl);
---

<head>
  <title>{title} | Nama Site</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  
  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
</head>
```

---

## 🎨 Layouts

Layout adalah komponen wrapper yang menyediakan struktur HTML dasar untuk halaman-halaman Anda.

### Membuat Layout

```astro
---
// src/layouts/Layout.astro
export interface Props {
  title: string;
  description?: string;
}

const { 
  title, 
  description = "Deskripsi default" 
} = Astro.props;

const currentPath = Astro.url.pathname;
---

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  
  <style is:global>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
    }
  </style>
</head>

<body>
  <nav>
    <!-- Navigation content -->
    <a href="/" class={currentPath === '/' ? 'active' : ''}>Home</a>
    <a href="/about">About</a>
  </nav>

  <!-- Slot untuk konten halaman -->
  <main>
    <slot />
  </main>

  <footer>
    &copy; 2024 Company Name
  </footer>
</body>
</html>
```

### Named Slots

```astro
<!-- layouts/BaseLayout.astro -->
<div class="layout">
  <header><slot name="header" /></header>
  <main><slot /></main>  <!-- Default slot -->
  <footer><slot name="footer" /></footer>
</div>

<!-- pages/index.astro -->
<BaseLayout>
  <h1 slot="header">Page Title</h1>
  <p>Main content</p>
  <div slot="footer">Footer content</div>
</BaseLayout>
```

---

## 🎨 Integrasi Tailwind CSS

### Install Tailwind

```bash
npx astro add tailwind
```

### Konfigurasi Tailwind

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
```

### Menggunakan Tailwind

```astro
---
// Komponen dengan Tailwind classes
const buttonStyle = "bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-full";
---

<button class={buttonStyle}>
  Click Me
</button>

<!-- Conditional classes -->
<div class={`p-4 ${isActive ? 'bg-purple-100' : 'bg-gray-100'}`}>
  Content
</div>

<!-- Dynamic values -->
<div class={`text-${size}`}>
  Scaled text
</div>
```

---

## 🔄 Dynamic Routing

Dynamic routing memungkinkan Anda membuat halaman secara dinamis berdasarkan data.

### Dasar Dynamic Routes

```
src/pages/
├── products/
│   ├── index.astro        → /products
│   └── [slug].astro      → /products/any-slug
```

### Single Parameter

```astro
---
// src/pages/products/[slug].astro
export function getStaticPaths() {
  return [
    { params: { slug: 'product-one' } },
    { params: { slug: 'product-two' } },
    { params: { slug: 'product-three' } },
  ];
}

const { slug } = Astro.params;
---

<h1>Product: {slug}</h1>
```

### Dengan Props

```astro
---
// src/pages/products/[slug].astro
export function getStaticPaths() {
  const products = [
    { slug: 'laptop-gaming', name: 'Laptop Gaming Pro', price: 15000000 },
    { slug: 'smartphone', name: 'Smartphone Flagship', price: 8000000 },
    { slug: 'tablet', name: 'Tablet Ultra', price: 12000000 },
  ];
  
  return products.map(product => ({
    params: { slug: product.slug },
    props: { product }
  }));
}

const { product } = Astro.props;
---

<h1>{product.name}</h1>
<p>Harga: Rp {product.price.toLocaleString('id-ID')}</p>
```

### Multiple Parameters

```
src/pages/[lang]/[category]/[slug].astro  → /en/books/astro-guide
```

```astro
---
export function getStaticPaths() {
  return [
    { 
      params: { lang: 'en', category: 'books', slug: 'astro-guide' },
      props: { title: 'Astro Guide' }
    },
    { 
      params: { lang: 'id', category: 'books', slug: 'panduan-astro' },
      props: { title: 'Panduan Astro' }
    },
  ];
}
---

<h1>{Astro.props.title}</h1>
```

### Rest Parameters

```
src/pages/blog/[...slug].astro  → /blog/2024/05/15/my-post
```

```astro
---
export function getStaticPaths() {
  return [
    { params: { slug: '2024/05/15/my-post' } },
  ];
}

const { slug } = Astro.params;
const [year, month, day, ...postSlug] = slug.split('/');
---

<p>Year: {year}, Month: {month}, Day: {day}</p>
<p>Post: {postSlug.join('/')}</p>
```

---

## 🏝️ Island Architecture

Astro menggunakan **Island Architecture** untuk menambahkan interaktivitas hanya di komponen yang membutuhkan.

### Server vs Client

| Directive | Rendering | Penjelasan |
|-----------|-----------|------------|
| `default` | Server | Static HTML, no JS |
| `client:load` | Client | Hydrate saat page load |
| `client:idle` | Client | Hydrate saat main thread idle |
| `client:visible` | Client | Hydrate saat visible |
| `client:media` | Client | Hydrate berdasarkan media query |
| `client:only` | Client | Hanya render client-side |

### Contoh Island

```astro
---
// src/components/Counter.tsx
import { useState } from 'preact/hooks';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}
```

```astro
---
// src/pages/index.astro
import Counter from '../components/Counter.tsx';
---

<!-- Static HTML - no interactivity -->
<h1>Welcome</h1>

<!-- Interactive Island - hydrated on load -->
<Counter client:load />

<!-- Interactive Island - hydrated when visible -->
<HeavyWidget client:visible />

<!-- Interactive Island - hydrated when idle -->
<Analytics client:idle />
```

---

## 📝 Best Practices

### 1. Optimalisasi Gambar

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/photo.jpg';
---

<Image 
  src={myImage} 
  alt="Deskripsi gambar"
  width={800}
  height={600}
  format="webp"
/>
```

### 2. Component Script Best Practices

```astro
---
// ✅ GOOD: Define props interface
export interface Props {
  title: string;
}

const { title } = Astro.props;

// ✅ GOOD: Destructuring with defaults
const { 
  items = [], 
  variant = 'default' 
} = Astro.props;

// ✅ GOOD: Computed values
const total = items.reduce((sum, item) => sum + item.price, 0);
---

<!-- BAD: Logic di template -->
<!-- {items.map(item => {
  const discounted = item.price * 0.9;
  return <li>{discounted}</li>;
})} -->

<!-- GOOD: Logic di script -->
---
const processedItems = items.map(item => ({
  ...item,
  discounted: item.price * 0.9
}));
---
```

### 3. Styling Best Practices

```astro
---
// ✅ GOOD: Scoped styles
const titleClass = "text-2xl font-bold text-gray-900";
---

<h1 class={titleClass}>Title</h1>

<!-- Scoped CSS -->
<style>
  .card {
    padding: 1rem;
  }
  :global(.external-class) {
    /* Styles applied globally */
  }
</style>

<!-- Global styles -->
<style is:global>
  body {
    font-family: var(--font-sans);
  }
</style>
```

### 4. TypeScript Best Practices

```typescript
// ✅ GOOD: Interface untuk props
export interface Props {
  title: string;
  count?: number;
  items: Array<{ id: string; name: string }>;
}

// ✅ GOOD: Type guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// ✅ GOOD: Generic functions
function processItems<T>(items: T[], processor: (item: T) => T): T[] {
  return items.map(processor);
}
```

### 5. Performance Best Practices

```astro
---
// Preload critical resources
const criticalData = await fetch('/api/data').then(r => r.json());
---

<!-- Lazy load images -->
<img src="/large-image.jpg" loading="lazy" alt="..." />

<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />

<!-- Defer non-critical scripts -->
<script defer src="/analytics.js"></script>
```

---

## 📚 Referensi Tambahan

### Perintah CLI Astro

| Command | Deskripsi |
|---------|-----------|
| `astro add [integration]` | Tambah integration |
| `astro check` | Type checking |
| `astro sync` | Generate types |
| `astro upgrade` | Upgrade Astro |

### Integrasi Populer

| Integration | Fungsi |
|-------------|--------|
| `@astrojs/tailwind` | Tailwind CSS |
| `@astrojs/mdx` | MDX support |
| `@astrojs/sitemap` | Sitemap generation |
| `@astrojs/image` | Image optimization |
| `@astrojs/partytown` | Analytics wrapper |
| `@astrojs/prefetch` | Prefetch links |

### Resources

- [Dokumentasi Resmi Astro](https://docs.astro.build)
- [Astro Recipes](https://docs.astro.build/en/recipes/)
- [Astro Blog](https://astro.build/blog/)
- [Astro Showcase](https://astro.build/showcase/)

---

## 🎯 Latihan

Coba implementasikan fitur-fitur berikut untuk meningkatkan pemahaman Anda:

1. [ ] Tambahkan dark mode toggle
2. [ ] Buat page untuk dynamic blog posts
3. [ ] Implementasikan search functionality
4. [ ] Buat form dengan validasi
5. [ ] Tambahkan internationalization (i18n)
6. [ ] Implementasikan comments system
7. [ ] Buat admin dashboard dengan auth

---

Dokumen ini dibuat untuk membantu pembelajaran Astro Web Development. Selamat coding! 🚀
# Installation Guide - Using LiveMenu UI in Your Project

Complete guide for installing and using LiveMenu UI component library in your React applications.

---

## 📦 Installation

### Step 1: Configure npm for GitHub Packages

Since this is a **private package** hosted on GitHub Packages, you need to authenticate first.

#### Create `.npmrc` in Your Project Root

Create or edit `.npmrc` in your project directory:

```ini
# GitHub Packages configuration
@YOUR_USERNAME:registry=https://npm.pkg.github.com

# Use npm registry for all other packages
registry=https://registry.npmjs.org/
```

**Replace `YOUR_USERNAME`** with the actual GitHub username or organization.

#### Add Authentication Token

You have two options:

**Option A: Global Configuration (Recommended)**

Edit your global `~/.npmrc` file:

```bash
# Open your global .npmrc
nano ~/.npmrc
# or
code ~/.npmrc
```

Add this line:

```ini
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**Option B: Project-Specific (Not Recommended - token in project)**

Add to your project's `.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then set the environment variable:

```bash
export GITHUB_TOKEN="your_token_here"
```

⚠️ **Never commit your token to Git!** Make sure `.npmrc` with tokens is in `.gitignore`.

### Step 2: Install the Package

```bash
# Using npm
npm install @YOUR_USERNAME/livemenu-ui

# Using yarn
yarn add @YOUR_USERNAME/livemenu-ui

# Using pnpm
pnpm add @YOUR_USERNAME/livemenu-ui
```

### Step 3: Install Peer Dependencies

LiveMenu UI requires React 18.x as peer dependencies:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

---

## ⚙️ Configuration

### Tailwind CSS Configuration

LiveMenu UI is built with Tailwind CSS. You need to configure Tailwind to include the library's components.

#### 1. Install Tailwind CSS (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 2. Update `tailwind.config.js`

Add the LiveMenu UI package to your Tailwind configuration:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    
    // 👇 Add this line to include LiveMenu UI components
    './node_modules/@YOUR_USERNAME/livemenu-ui/dist/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 👇 Add LiveMenu orange color palette
        livemenu: {
          light: {
            DEFAULT: '#fef2e5',
            hover: '#feedbd',
            active: '#fcddb8',
          },
          DEFAULT: '#ff7c30',
          hover: '#dd7000',
          active: '#e46300',
          dark: {
            DEFAULT: '#b85d00',
            hover: '#934a00',
            active: '#6e3800',
          },
          darker: '#562b00',
        },
        // 👇 Add primary scale (optional but recommended)
        primary: {
          50: '#fef2e5',
          100: '#feedbd',
          200: '#fcddb8',
          300: '#ffc894',
          400: '#ffa05d',
          500: '#ff7c30',
          600: '#e46300',
          700: '#b85d00',
          800: '#934a00',
          900: '#6e3800',
          950: '#562b00',
          DEFAULT: '#ff7c30',
        },
        // 👇 Add semantic colors (optional)
        secondary: {
          DEFAULT: '#64748b',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          DEFAULT: '#22c55e',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        danger: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        info: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};
```

**Replace `@YOUR_USERNAME`** with the actual scope.

#### Minimal Configuration (Quick Start)

If you only want the basic setup:

```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Add LiveMenu UI
    './node_modules/@YOUR_USERNAME/livemenu-ui/dist/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        livemenu: {
          light: { DEFAULT: '#fef2e5', hover: '#feedbd', active: '#fcddb8' },
          DEFAULT: '#ff7c30',
          hover: '#dd7000',
          active: '#e46300',
          dark: { DEFAULT: '#b85d00', hover: '#934a00', active: '#6e3800' },
          darker: '#562b00',
        },
      },
    },
  },
  plugins: [],
};
```

---

## 📥 Import Examples

### Basic Imports

```tsx
// Import the CSS styles (required)
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';

// Import components
import { 
  LiveMenuButton, 
  LiveMenuCard, 
  LiveMenuBadge, 
  LiveMenuInput 
} from '@YOUR_USERNAME/livemenu-ui';

// Import types (TypeScript)
import type { 
  LiveMenuButtonProps,
  LiveMenuCardProps 
} from '@YOUR_USERNAME/livemenu-ui';
```

### Import Styles in Different Files

**Option 1: Import in Main App File (Recommended)**

```tsx
// src/App.tsx or src/index.tsx
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
import './index.css'; // Your custom styles

function App() {
  return <div>...</div>;
}
```

**Option 2: Import in CSS File**

```css
/* src/index.css */
@import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';

/* Your custom styles */
```

**Option 3: Next.js `_app.tsx`**

```tsx
// pages/_app.tsx
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

---

## 💻 Usage Examples

### Simple Button

```tsx
import { LiveMenuButton } from '@YOUR_USERNAME/livemenu-ui';

function MyComponent() {
  return (
    <LiveMenuButton variant="primary" onClick={() => alert('Clicked!')}>
      Click Me
    </LiveMenuButton>
  );
}
```

### Complete Login Form

```tsx
import React, { useState } from 'react';
import {
  LiveMenuCard,
  LiveMenuInput,
  LiveMenuButton,
  LiveMenuBadge,
} from '@YOUR_USERNAME/livemenu-ui';
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Your login logic here
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <LiveMenuCard
          title={
            <div className="flex items-center justify-between">
              <span>Welcome Back</span>
              <LiveMenuBadge variant="primary" size="sm">
                v2.0
              </LiveMenuBadge>
            </div>
          }
          subtitle="Sign in to your account"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <LiveMenuInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              fullWidth
              error={error && email === '' ? 'Email is required' : undefined}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              }
            />

            <LiveMenuInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              fullWidth
              error={error}
              helperText={!error ? 'Must be at least 8 characters' : undefined}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              }
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-livemenu hover:text-livemenu-hover">
                Forgot password?
              </a>
            </div>

            <div className="space-y-3">
              <LiveMenuButton
                variant="primary"
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </LiveMenuButton>

              <LiveMenuButton
                variant="outline"
                type="button"
                fullWidth
                onClick={() => console.log('Google login')}
              >
                <div className="flex items-center gap-2">
                  <span>Continue with Google</span>
                </div>
              </LiveMenuButton>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-livemenu hover:text-livemenu-hover font-medium">
              Sign up
            </a>
          </div>
        </LiveMenuCard>
      </div>
    </div>
  );
}

export default LoginForm;
```

### Dashboard with Cards and Badges

```tsx
import {
  LiveMenuCard,
  LiveMenuBadge,
  LiveMenuButton,
} from '@YOUR_USERNAME/livemenu-ui';
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';

function Dashboard() {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231', 
      change: '+12.5%', 
      status: 'success' as const 
    },
    { 
      title: 'Active Users', 
      value: '2,345', 
      change: '+8.2%', 
      status: 'success' as const 
    },
    { 
      title: 'Pending Orders', 
      value: '23', 
      change: '-2.4%', 
      status: 'warning' as const 
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-2">
            <LiveMenuButton variant="outline" size="md">
              Export
            </LiveMenuButton>
            <LiveMenuButton variant="primary" size="md">
              New Order
            </LiveMenuButton>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <LiveMenuCard
              key={stat.title}
              hoverable
              title={
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </span>
                  <LiveMenuBadge 
                    variant={stat.status} 
                    size="sm"
                  >
                    {stat.change}
                  </LiveMenuBadge>
                </div>
              }
            >
              <div className="text-3xl font-bold text-livemenu mt-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Last 30 days
              </p>
            </LiveMenuCard>
          ))}
        </div>

        {/* Recent Activity */}
        <LiveMenuCard
          title="Recent Activity"
          subtitle="Latest orders and updates"
          footer={
            <LiveMenuButton variant="outline" size="sm" fullWidth>
              View All Activity
            </LiveMenuButton>
          }
        >
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    New order #100{i}
                  </p>
                  <p className="text-sm text-gray-600">
                    2 minutes ago
                  </p>
                </div>
                <LiveMenuBadge variant="primary" dot>
                  Processing
                </LiveMenuBadge>
              </div>
            ))}
          </div>
        </LiveMenuCard>
      </div>
    </div>
  );
}

export default Dashboard;
```

### Search and Filter Component

```tsx
import { useState } from 'react';
import {
  LiveMenuInput,
  LiveMenuButton,
  LiveMenuBadge,
  LiveMenuCard,
} from '@YOUR_USERNAME/livemenu-ui';
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';

function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'electronics', 'clothing', 'food'];
  const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: '$999', stock: 15 },
    { id: 2, name: 'T-Shirt', category: 'clothing', price: '$29', stock: 50 },
    { id: 3, name: 'Coffee', category: 'food', price: '$12', stock: 100 },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <LiveMenuCard>
        {/* Search Header */}
        <div className="space-y-4 mb-6">
          <LiveMenuInput
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            }
          />

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <LiveMenuButton
                key={cat}
                variant={selectedCategory === cat ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </LiveMenuButton>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          {products
            .filter(p => 
              (selectedCategory === 'all' || p.category === selectedCategory) &&
              p.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <div 
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-livemenu transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.category} • {product.stock} in stock
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-livemenu">
                    {product.price}
                  </span>
                  <LiveMenuBadge 
                    variant={product.stock > 20 ? 'success' : 'warning'}
                  >
                    {product.stock > 20 ? 'In Stock' : 'Low Stock'}
                  </LiveMenuBadge>
                  <LiveMenuButton variant="primary" size="sm">
                    Add
                  </LiveMenuButton>
                </div>
              </div>
            ))}
        </div>
      </LiveMenuCard>
    </div>
  );
}

export default ProductSearch;
```

---

## 📱 Framework-Specific Examples

### Next.js App Router (13+)

```tsx
// app/layout.tsx
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
'use client';

import { LiveMenuButton } from '@YOUR_USERNAME/livemenu-ui';

export default function Home() {
  return (
    <main>
      <LiveMenuButton variant="primary">
        Next.js Example
      </LiveMenuButton>
    </main>
  );
}
```

### Vite + React

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Create React App

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 🔧 TypeScript Support

LiveMenu UI is written in TypeScript and includes full type definitions.

```tsx
import type {
  LiveMenuButtonProps,
  LiveMenuCardProps,
  LiveMenuBadgeProps,
  LiveMenuInputProps,
} from '@YOUR_USERNAME/livemenu-ui';

// Type-safe component
const MyButton: React.FC<LiveMenuButtonProps> = (props) => {
  return <LiveMenuButton {...props} />;
};

// Custom component with extended props
interface CustomButtonProps extends LiveMenuButtonProps {
  customProp?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  customProp, 
  ...buttonProps 
}) => {
  return <LiveMenuButton {...buttonProps} />;
};
```

---

## 🎨 Customization

### Override Styles

You can override LiveMenu UI styles with your own CSS:

```css
/* src/custom-livemenu.css */

/* Custom button style */
.livemenu-btn-primary {
  background-color: #your-custom-color;
}

/* Custom card style */
.livemenu-card {
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

Import after LiveMenu UI styles:

```tsx
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
import './custom-livemenu.css'; // Your overrides
```

### Extend with Tailwind

```tsx
<LiveMenuButton 
  variant="primary" 
  className="shadow-2xl transform hover:scale-105"
>
  Custom Styled
</LiveMenuButton>
```

---

## 🐛 Troubleshooting

### Styles Not Loading

**Problem:** Components appear unstyled.

**Solution:**
```tsx
// Make sure you import the CSS
import '@YOUR_USERNAME/livemenu-ui/dist/styles.css';
```

### Tailwind Classes Not Working

**Problem:** Custom Tailwind classes from LiveMenu UI don't work.

**Solution:** Ensure `tailwind.config.js` includes the package:
```javascript
content: [
  './node_modules/@YOUR_USERNAME/livemenu-ui/dist/**/*.{js,jsx}',
]
```

### Cannot Find Module

**Problem:** `Cannot find module '@YOUR_USERNAME/livemenu-ui'`

**Solution:**
1. Verify `.npmrc` is configured
2. Check authentication token
3. Run `npm install @YOUR_USERNAME/livemenu-ui` again

### Authentication Error

**Problem:** `401 Unauthorized` when installing

**Solution:**
1. Verify GitHub token has `read:packages` scope
2. Check token is in `~/.npmrc`:
   ```ini
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```

---

## 📚 Next Steps

- [View Component Examples](EXAMPLES.md)
- [Read Color Palette Guide](COLOR_PALETTE.md)
- [See Complete Component List](COMPONENTS.md)
- [Check GitHub Packages Setup](GITHUB_PACKAGES_SETUP.md)

---

**Need Help?** Open an issue on the [GitHub repository](https://github.com/YOUR_USERNAME/livemenu-ui/issues).


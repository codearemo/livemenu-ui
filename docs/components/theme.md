# LiveMenuThemeProvider Guide

Complete guide for using the LiveMenuThemeProvider for theme management in your application.

---

## 📖 Overview

The `LiveMenuThemeProvider` is a React context provider that manages theme state across your application. It supports:

- ✅ **3 theme modes**: light, dark, system
- ✅ **localStorage persistence**: Remembers user preference
- ✅ **System preference detection**: Automatically detects OS theme
- ✅ **Dynamic theme switching**: Updates in real-time
- ✅ **SSR-safe**: Works with Next.js and other SSR frameworks
- ✅ **TypeScript support**: Full type definitions

---

## 🚀 Quick Start

### 1. Wrap Your App

```tsx
import { LiveMenuThemeProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

function App() {
  return (
    <LiveMenuThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <YourApp />
    </LiveMenuThemeProvider>
  );
}
```

### 2. Use the Hook

```tsx
import { useLiveMenuTheme } from 'livemenu-ui';

function ThemeToggle() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

---

## 📦 API Reference

### LiveMenuThemeProvider Props

```typescript
interface LiveMenuThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';  // Default: 'system'
  storageKey?: string;                         // Default: 'livemenu-theme'
  applyToRoot?: boolean;                       // Default: true
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Your app components |
| `defaultTheme` | `'light' \| 'dark' \| 'system'` | `'system'` | Initial theme if no saved preference |
| `storageKey` | `string` | `'livemenu-theme'` | localStorage key for persistence |
| `applyToRoot` | `boolean` | `true` | Auto-apply 'dark' class to `<html>` |

### useLiveMenuTheme Hook

```typescript
interface LiveMenuThemeContextValue {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `Theme` | Current theme setting |
| `setTheme` | `function` | Function to change theme |
| `isDark` | `boolean` | Whether dark mode is currently active |

---

## 💻 Usage Examples

### Basic Theme Toggle

```tsx
import { useLiveMenuTheme, LiveMenuButton } from 'livemenu-ui';

function ThemeToggle() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  return (
    <LiveMenuButton
      variant={isDark ? 'light' : 'dark'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </LiveMenuButton>
  );
}
```

### Theme Selector with All Options

```tsx
import { useLiveMenuTheme, LiveMenuButton } from 'livemenu-ui';

function ThemeSelector() {
  const { theme, setTheme } = useLiveMenuTheme();

  return (
    <div className="flex gap-2">
      <LiveMenuButton
        variant={theme === 'light' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('light')}
      >
        ☀️ Light
      </LiveMenuButton>
      
      <LiveMenuButton
        variant={theme === 'dark' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('dark')}
      >
        🌙 Dark
      </LiveMenuButton>
      
      <LiveMenuButton
        variant={theme === 'system' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('system')}
      >
        💻 System
      </LiveMenuButton>
    </div>
  );
}
```

### Settings Page with Theme

```tsx
import { 
  useLiveMenuTheme, 
  LiveMenuCard, 
  LiveMenuButton,
  LiveMenuBadge 
} from 'livemenu-ui';

function AppearanceSettings() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: '☀️', description: 'Light theme' },
    { value: 'dark', label: 'Dark', icon: '🌙', description: 'Dark theme' },
    { value: 'system', label: 'System', icon: '💻', description: 'Use system preference' },
  ] as const;

  return (
    <LiveMenuCard title="Appearance" subtitle="Customize how LiveMenu looks">
      <div className="space-y-4">
        <div>
          <h3 className="livemenu-text-primary font-medium mb-3">
            Theme Preference
          </h3>
          <div className="space-y-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTheme(option.value)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                  ${theme === option.value 
                    ? 'border-livemenu bg-livemenu-light dark:bg-livemenu/10' 
                    : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-dark-border'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div className="text-left">
                    <div className="livemenu-text-primary font-medium">
                      {option.label}
                    </div>
                    <div className="livemenu-text-tertiary text-sm">
                      {option.description}
                    </div>
                  </div>
                </div>
                {theme === option.value && (
                  <LiveMenuBadge variant="primary" size="sm">
                    Active
                  </LiveMenuBadge>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="livemenu-divider" />

        <div className="livemenu-surface rounded-lg p-4">
          <p className="livemenu-text-secondary text-sm">
            Current status: <strong className="livemenu-text-primary">
              {isDark ? 'Dark mode active' : 'Light mode active'}
            </strong>
          </p>
        </div>
      </div>
    </LiveMenuCard>
  );
}
```

### Dropdown Menu for Theme

```tsx
import { useState } from 'react';
import { useLiveMenuTheme, LiveMenuButton } from 'livemenu-ui';

function ThemeDropdown() {
  const { theme, setTheme } = useLiveMenuTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ] as const;

  const currentTheme = themes.find(t => t.value === theme);

  return (
    <div className="relative">
      <LiveMenuButton
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentTheme?.icon} {currentTheme?.label}
      </LiveMenuButton>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 livemenu-surface-elevated rounded-lg shadow-lg z-50">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 flex items-center gap-3
                hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary
                first:rounded-t-lg last:rounded-b-lg
                ${theme === t.value ? 'bg-livemenu-light dark:bg-livemenu/10' : ''}
              `}
            >
              <span>{t.icon}</span>
              <span className="livemenu-text-primary">{t.label}</span>
              {theme === t.value && <span className="ml-auto text-livemenu">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 🎯 Framework Integration

### Next.js (App Router)

```tsx
// app/providers.tsx
'use client';

import { LiveMenuThemeProvider } from 'livemenu-ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LiveMenuThemeProvider defaultTheme="system" storageKey="livemenu-theme">
      {children}
    </LiveMenuThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';
import 'livemenu-ui/dist/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// app/components/theme-toggle.tsx
'use client';

import { useLiveMenuTheme, LiveMenuButton } from 'livemenu-ui';

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  return (
    <LiveMenuButton
      variant="outline"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? '☀️' : '🌙'}
    </LiveMenuButton>
  );
}
```

### Vite + React

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LiveMenuThemeProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LiveMenuThemeProvider defaultTheme="system">
      <App />
    </LiveMenuThemeProvider>
  </React.StrictMode>
);
```

### Create React App

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LiveMenuThemeProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LiveMenuThemeProvider>
      <App />
    </LiveMenuThemeProvider>
  </React.StrictMode>
);
```

---

## 🔧 Advanced Usage

### Custom Storage Key

```tsx
<LiveMenuThemeProvider storageKey="my-custom-theme-key">
  <App />
</LiveMenuThemeProvider>
```

This will persist theme to `localStorage` under `"my-custom-theme-key"`.

### Disable Auto-Apply to Root

```tsx
<LiveMenuThemeProvider applyToRoot={false}>
  <App />
</LiveMenuThemeProvider>
```

Then manually manage the class:

```tsx
function MyApp() {
  const { isDark } = useLiveMenuTheme();
  
  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Your app */}
    </div>
  );
}
```

### Programmatic Theme Control

```tsx
function AutoThemeSwitch() {
  const { setTheme } = useLiveMenuTheme();

  useEffect(() => {
    const hour = new Date().getHours();
    
    // Auto dark mode at night
    if (hour >= 20 || hour <= 6) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return <YourApp />;
}
```

### Multiple Theme Providers (Nested)

```tsx
// Main app theme
<LiveMenuThemeProvider storageKey="app-theme">
  <App />
  
  {/* Isolated component with different theme */}
  <LiveMenuThemeProvider storageKey="widget-theme" applyToRoot={false}>
    <Widget />
  </LiveMenuThemeProvider>
</LiveMenuThemeProvider>
```

---

## 🎨 Complete Application Example

### Full Featured App with Theme Support

```tsx
import React, { useState } from 'react';
import {
  LiveMenuThemeProvider,
  useLiveMenuTheme,
  LiveMenuCard,
  LiveMenuButton,
  LiveMenuInput,
  LiveMenuBadge,
} from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="livemenu-text-secondary text-sm">Theme:</span>
      <div className="flex gap-1 p-1 livemenu-surface rounded-lg">
        <button
          onClick={() => setTheme('light')}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            theme === 'light'
              ? 'bg-livemenu text-white'
              : 'livemenu-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
          }`}
        >
          ☀️
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            theme === 'dark'
              ? 'bg-livemenu text-white'
              : 'livemenu-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
          }`}
        >
          🌙
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            theme === 'system'
              ? 'bg-livemenu text-white'
              : 'livemenu-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
          }`}
        >
          💻
        </button>
      </div>
      <LiveMenuBadge variant={isDark ? 'dark' : 'light'} size="sm">
        {isDark ? 'Dark' : 'Light'}
      </LiveMenuBadge>
    </div>
  );
}

// Main App Component
function AppContent() {
  const { isDark } = useLiveMenuTheme();
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen livemenu-bg-primary transition-colors duration-300">
      {/* Header */}
      <header className="livemenu-surface border-b livemenu-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold livemenu-text-primary">
              LiveMenu
            </h1>
            <LiveMenuBadge variant="primary" size="sm">
              v1.0
            </LiveMenuBadge>
          </div>
          
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Login Card */}
          <LiveMenuCard
            title="Welcome Back"
            subtitle="Sign in to your account"
          >
            <form className="space-y-4">
              <LiveMenuInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                fullWidth
              />
              
              <LiveMenuButton variant="primary" fullWidth>
                Sign In
              </LiveMenuButton>
            </form>
          </LiveMenuCard>

          {/* Status Card */}
          <LiveMenuCard
            hoverable
            title="Current Theme"
            subtitle={`${isDark ? 'Dark' : 'Light'} mode is active`}
          >
            <div className="space-y-3">
              <div className="livemenu-surface-elevated rounded-lg p-4">
                <p className="livemenu-text-primary font-medium">
                  Theme: {isDark ? '🌙 Dark' : '☀️ Light'}
                </p>
                <p className="livemenu-text-tertiary text-sm mt-1">
                  Background adapts automatically
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <LiveMenuBadge variant="success" dot>Active</LiveMenuBadge>
                <LiveMenuBadge variant="primary">Themed</LiveMenuBadge>
                <LiveMenuBadge variant="info">Responsive</LiveMenuBadge>
              </div>
            </div>
          </LiveMenuCard>
        </div>
      </main>
    </div>
  );
}

// Root App with Provider
export default function App() {
  return (
    <LiveMenuThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <AppContent />
    </LiveMenuThemeProvider>
  );
}
```

---

## 🌐 SSR Support (Next.js, Remix)

### Avoiding Hydration Mismatch

```tsx
// app/providers.tsx
'use client';

import { LiveMenuThemeProvider } from 'livemenu-ui';
import { useState, useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LiveMenuThemeProvider defaultTheme="system">
      {children}
    </LiveMenuThemeProvider>
  );
}
```

### Prevent Flash of Wrong Theme

Add script to `<head>` before React loads:

```html
<!-- pages/_document.tsx or app/layout.tsx -->
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      const storageKey = 'livemenu-theme';
      const theme = localStorage.getItem(storageKey) || 'system';
      
      let isDark = false;
      if (theme === 'dark') {
        isDark = true;
      } else if (theme === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    })();
  `
}} />
```

---

## 🎭 Use Cases

### User Preference Settings

```tsx
function UserSettings() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  return (
    <LiveMenuCard title="Display Preferences">
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span className="livemenu-text-primary">Dark Mode</span>
          <input
            type="checkbox"
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            className="rounded border-gray-300"
          />
        </label>

        <label className="flex items-center justify-between">
          <span className="livemenu-text-primary">Follow System</span>
          <input
            type="checkbox"
            checked={theme === 'system'}
            onChange={(e) => setTheme(e.target.checked ? 'system' : 'light')}
            className="rounded border-gray-300"
          />
        </label>
      </div>
    </LiveMenuCard>
  );
}
```

### Conditional Rendering Based on Theme

```tsx
function ThemedComponent() {
  const { isDark } = useLiveMenuTheme();

  return (
    <div>
      {isDark ? (
        <img src="/logo-dark.png" alt="Logo" />
      ) : (
        <img src="/logo-light.png" alt="Logo" />
      )}
    </div>
  );
}
```

### Analytics Tracking

```tsx
function ThemeAnalytics() {
  const { theme } = useLiveMenuTheme();

  useEffect(() => {
    // Track theme preference
    analytics.track('Theme Changed', { theme });
  }, [theme]);

  return null;
}
```

---

## 🐛 Troubleshooting

### Hook Error: "must be used within a LiveMenuThemeProvider"

**Problem:**
```
Error: useLiveMenuTheme must be used within a LiveMenuThemeProvider
```

**Solution:**
Ensure your component is wrapped with `<LiveMenuThemeProvider>`:

```tsx
// ✅ Correct
<LiveMenuThemeProvider>
  <ComponentUsingHook />
</LiveMenuThemeProvider>

// ❌ Wrong
<ComponentUsingHook />  // No provider!
```

### Theme Not Persisting

**Problem:** Theme resets on page reload

**Solution:**
1. Check `storageKey` prop is consistent
2. Verify localStorage is available
3. Check browser console for errors

```tsx
// Verify localStorage
console.log(localStorage.getItem('livemenu-theme'));
```

### System Theme Not Detecting

**Problem:** 'system' theme doesn't follow OS preference

**Solution:**
1. Test in browser: Go to OS dark mode settings and toggle
2. Check browser support for `prefers-color-scheme`
3. Ensure component is client-side (not SSR initial render)

### Dark Class Not Applying

**Problem:** Dark mode styles not working

**Solution:**
1. Verify `applyToRoot={true}` (default)
2. Check if `darkMode: 'class'` in Tailwind config
3. Inspect HTML element for 'dark' class

```tsx
// Debug
const { isDark } = useLiveMenuTheme();
console.log('isDark:', isDark);
console.log('html classes:', document.documentElement.className);
```

---

## 📊 API Summary

### LiveMenuThemeProvider

```tsx
<LiveMenuThemeProvider
  defaultTheme="system"      // 'light' | 'dark' | 'system'
  storageKey="livemenu-theme" // localStorage key
  applyToRoot={true}         // Auto-apply to <html>
>
  <App />
</LiveMenuThemeProvider>
```

### useLiveMenuTheme Hook

```tsx
const { theme, setTheme, isDark } = useLiveMenuTheme();

// theme: 'light' | 'dark' | 'system'
// setTheme: (theme: Theme) => void
// isDark: boolean (computed value)
```

---

## ✨ Features

- ✅ **3 theme modes**: light, dark, system
- ✅ **Persistent**: Saves to localStorage
- ✅ **System aware**: Detects OS preference
- ✅ **Dynamic**: Changes apply instantly
- ✅ **SSR-safe**: Works with server-side rendering
- ✅ **TypeScript**: Full type safety
- ✅ **Accessible**: Respects user preferences
- ✅ **Lightweight**: Minimal overhead

---

## 📚 Related Documentation

- [Dark Mode Guide](DARK_MODE_GUIDE.md)
- [Dark Mode Usage](DARK_MODE_USAGE.md)
- [Component Examples](EXAMPLES.md)
- [Color Palette](COLOR_PALETTE.md)

---

**Start using theme management in your app today!** 🎨✨


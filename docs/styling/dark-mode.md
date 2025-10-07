# Dark Mode - Complete Guide

Comprehensive guide for implementing dark mode in your application using LiveMenu UI components.

---

## 📖 Table of Contents

1. [Setup Instructions](#-setup-instructions)
2. [LiveMenuThemeProvider](#-livemenuthemeprovider)
3. [LiveMenuThemeToggle](#-livemenuthemetoggle)
4. [useLiveMenuTheme Hook](#-uselivemenutheme-hook)
5. [Dark Mode Colors](#-dark-mode-color-reference)
6. [Component Usage](#-component-usage-in-dark-mode)
7. [Utility Classes](#-utility-classes-reference)
8. [Best Practices](#-best-practices)
9. [Complete Example App](#-complete-example-app)
10. [Troubleshooting](#-troubleshooting)

---

## 🚀 Setup Instructions

### Step 1: Install LiveMenu UI

```bash
npm install @codearemo/livemenu-ui
```

### Step 2: Import Styles

```tsx
// src/App.tsx or src/main.tsx
import '@codearemo/livemenu-ui/dist/styles.css';
```

### Step 3: Wrap App with ThemeProvider

```tsx
import { LiveMenuThemeProvider } from '@codearemo/livemenu-ui';

function App() {
  return (
    <LiveMenuThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <YourApp />
    </LiveMenuThemeProvider>
  );
}

export default App;
```

### Step 4: Add Theme Toggle (Optional)

```tsx
import { LiveMenuThemeToggle } from '@codearemo/livemenu-ui';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <LiveMenuThemeToggle showLabel />
    </header>
  );
}
```

**That's it!** Your app now has full dark mode support. 🎉

---

## 🎯 LiveMenuThemeProvider

The `LiveMenuThemeProvider` manages theme state across your entire application.

### Props

```typescript
interface LiveMenuThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';  // Default: 'system'
  storageKey?: string;                         // Default: 'livemenu-theme'
  applyToRoot?: boolean;                       // Default: true
}
```

### Basic Usage

```tsx
import { LiveMenuThemeProvider } from 'livemenu-ui';

function App() {
  return (
    <LiveMenuThemeProvider>
      <YourApp />
    </LiveMenuThemeProvider>
  );
}
```

### With Custom Settings

```tsx
<LiveMenuThemeProvider
  defaultTheme="light"           // Start in light mode
  storageKey="my-custom-key"    // Custom localStorage key
  applyToRoot={true}            // Auto-apply dark class to <html>
>
  <YourApp />
</LiveMenuThemeProvider>
```

### Next.js Setup

```tsx
// app/providers.tsx
'use client';

import { LiveMenuThemeProvider } from 'livemenu-ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LiveMenuThemeProvider defaultTheme="system">
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
```

---

## 🔘 LiveMenuThemeToggle

A pre-built button component for toggling between light and dark modes.

### Props

```typescript
interface LiveMenuThemeToggleProps {
  className?: string;   // Additional CSS classes
  showLabel?: boolean;  // Show text label (default: false)
}
```

### Basic Usage

```tsx
import { LiveMenuThemeToggle } from 'livemenu-ui';

// Icon only
<LiveMenuThemeToggle />

// With label
<LiveMenuThemeToggle showLabel />

// Custom styling
<LiveMenuThemeToggle className="shadow-lg" showLabel />
```

### In Header/Navbar

```tsx
function Header() {
  return (
    <header className="livemenu-surface border-b livemenu-border p-4">
      <div className="flex items-center justify-between">
        <h1 className="livemenu-text-primary font-bold">My App</h1>
        <LiveMenuThemeToggle showLabel />
      </div>
    </header>
  );
}
```

### Floating Action Button

```tsx
<div className="fixed bottom-6 right-6 z-50">
  <LiveMenuThemeToggle className="shadow-2xl rounded-full w-12 h-12" />
</div>
```

---

## 🪝 useLiveMenuTheme Hook

Access and control theme programmatically.

### API

```typescript
const { theme, setTheme, isDark } = useLiveMenuTheme();

// theme: 'light' | 'dark' | 'system'
// setTheme: (theme: Theme) => void
// isDark: boolean (computed value)
```

### Basic Usage

```tsx
import { useLiveMenuTheme } from 'livemenu-ui';

function MyComponent() {
  const { theme, setTheme, isDark } = useLiveMenuTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Dark mode active: {isDark ? 'Yes' : 'No'}</p>
      
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Theme Selector

```tsx
function ThemeSelector() {
  const { theme, setTheme } = useLiveMenuTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ] as const;

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <LiveMenuButton
          key={t.value}
          variant={theme === t.value ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setTheme(t.value)}
        >
          {t.icon} {t.label}
        </LiveMenuButton>
      ))}
    </div>
  );
}
```

### Conditional Rendering

```tsx
function ThemedLogo() {
  const { isDark } = useLiveMenuTheme();

  return (
    <img 
      src={isDark ? '/logo-dark.png' : '/logo-light.png'} 
      alt="Logo" 
    />
  );
}
```

### Analytics Tracking

```tsx
function ThemeAnalytics() {
  const { theme } = useLiveMenuTheme();

  useEffect(() => {
    analytics.track('Theme Changed', { theme });
  }, [theme]);

  return null;
}
```

---

## 🎨 Dark Mode Color Reference

### Background Colors

| Token | Hex | RGB | Usage | Class |
|-------|-----|-----|-------|-------|
| **Primary** | `#1a1a1a` | `rgb(26, 26, 26)` | Main background | `bg-dark-bg-primary` |
| **Secondary** | `#2d2d2d` | `rgb(45, 45, 45)` | Secondary surfaces | `bg-dark-bg-secondary` |
| **Tertiary** | `#3d3d3d` | `rgb(61, 61, 61)` | Elevated surfaces | `bg-dark-bg-tertiary` |

### Text Colors

| Token | Hex | RGB | Usage | Class |
|-------|-----|-----|-------|-------|
| **Primary** | `#ffffff` | `rgb(255, 255, 255)` | Headings, primary text | `text-dark-text-primary` |
| **Secondary** | `#b3b3b3` | `rgb(179, 179, 179)` | Body text | `text-dark-text-secondary` |
| **Tertiary** | `#808080` | `rgb(128, 128, 128)` | Muted/placeholder text | `text-dark-text-tertiary` |

### Border Color

| Token | Hex | RGB | Usage | Class |
|-------|-----|-----|-------|-------|
| **Border** | `#404040` | `rgb(64, 64, 64)` | Borders, dividers | `border-dark-border` |

### Using in Tailwind

```tsx
{/* Background */}
<div className="bg-white dark:bg-dark-bg-primary">

{/* Text */}
<h1 className="text-gray-900 dark:text-dark-text-primary">

{/* Border */}
<div className="border border-gray-200 dark:border-dark-border">
```

---

## 🧩 Component Usage in Dark Mode

### LiveMenuButton

All button variants automatically support dark mode:

```tsx
<LiveMenuButton variant="primary">Primary</LiveMenuButton>
<LiveMenuButton variant="secondary">Secondary</LiveMenuButton>
<LiveMenuButton variant="outline">Outline</LiveMenuButton>
<LiveMenuButton variant="light">Light</LiveMenuButton>
<LiveMenuButton variant="dark">Dark</LiveMenuButton>
```

**Dark Mode Behavior:**
- **Primary**: Maintains orange background
- **Secondary**: Uses dark tertiary background
- **Outline**: Transparent with orange border
- **Light**: Orange opacity background
- **Dark**: Darker orange background

### LiveMenuCard

Cards automatically adapt with proper contrast:

```tsx
<LiveMenuCard
  title="Card Title"        {/* Auto-adapts to white in dark mode */}
  subtitle="Subtitle"       {/* Auto-adapts to #b3b3b3 in dark mode */}
  hoverable
>
  <p className="livemenu-text-secondary">
    Content automatically adapts
  </p>
</LiveMenuCard>
```

**Dark Mode Behavior:**
- Background: white → `#2d2d2d`
- Border: gray-200 → `#404040`
- Title: gray-900 → white
- Subtitle: gray-600 → `#b3b3b3`
- Footer: gray-50 → `#3d3d3d`

### LiveMenuInput

Inputs have full dark mode support:

```tsx
<LiveMenuInput
  label="Email"                    {/* Auto: #b3b3b3 in dark */}
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"  {/* Auto: adapts */}
  leftIcon={<MailIcon />}         {/* Auto: adapts */}
/>
```

**Dark Mode Behavior:**
- Background: white → `#3d3d3d`
- Border: gray-300 → `#404040`
- Text: gray-900 → white
- Placeholder: gray-400 → `#808080`
- Focus ring: orange (stays same)

### LiveMenuBadge

Badges use opacity-based dark mode:

```tsx
<LiveMenuBadge variant="primary">Primary</LiveMenuBadge>
<LiveMenuBadge variant="success" dot>Success</LiveMenuBadge>
<LiveMenuBadge variant="danger" dot>Danger</LiveMenuBadge>
<LiveMenuBadge variant="warning">Warning</LiveMenuBadge>
<LiveMenuBadge variant="info">Info</LiveMenuBadge>
```

**Dark Mode Behavior:**
- Uses color/20 opacity backgrounds
- Text uses lighter color variants
- Maintains semantic color visibility

---

## 🛠️ Utility Classes Reference

### Text Utilities

Automatically adapt text colors for dark mode:

```tsx
<h1 className="livemenu-text-primary">
  Heading (gray-900 → white)
</h1>

<p className="livemenu-text-secondary">
  Body text (gray-600 → #b3b3b3)
</p>

<span className="livemenu-text-tertiary">
  Muted text (gray-500 → #808080)
</span>
```

**Equivalent to:**
```tsx
<h1 className="text-gray-900 dark:text-dark-text-primary">
<p className="text-gray-600 dark:text-dark-text-secondary">
<span className="text-gray-500 dark:text-dark-text-tertiary">
```

### Background Utilities

```tsx
<div className="livemenu-bg-primary">
  Main background (white → #1a1a1a)
</div>

<div className="livemenu-bg-secondary">
  Secondary surface (gray-50 → #2d2d2d)
</div>

<div className="livemenu-bg-tertiary">
  Elevated surface (gray-100 → #3d3d3d)
</div>
```

### Border Utility

```tsx
<div className="border livemenu-border">
  Border (gray-200 → #404040)
</div>

<hr className="livemenu-divider" />
{/* Divider with adaptive border */}
```

### Surface Utilities

Pre-composed classes for common patterns:

```tsx
{/* Basic surface */}
<div className="livemenu-surface rounded-lg p-4">
  White background + gray border → Dark background + dark border
</div>

{/* Elevated surface */}
<div className="livemenu-surface-elevated rounded-lg p-4">
  Surface with shadow that adapts
</div>
```

### Complete Reference

| Class | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `livemenu-text-primary` | gray-900 | #ffffff | Headings, titles |
| `livemenu-text-secondary` | gray-600 | #b3b3b3 | Body text |
| `livemenu-text-tertiary` | gray-500 | #808080 | Muted text |
| `livemenu-bg-primary` | white | #1a1a1a | Main background |
| `livemenu-bg-secondary` | gray-50 | #2d2d2d | Secondary surfaces |
| `livemenu-bg-tertiary` | gray-100 | #3d3d3d | Elevated surfaces |
| `livemenu-border` | gray-200 | #404040 | Borders |
| `livemenu-surface` | white + border | dark + border | Card surfaces |
| `livemenu-surface-elevated` | surface + shadow | dark + shadow | Cards with elevation |

---

## 💡 Best Practices

### 1. Always Provide Dark Mode Alternatives

```tsx
✅ Good:
<div className="bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-white">

✅ Better (using utilities):
<div className="livemenu-bg-primary livemenu-text-primary">

❌ Bad:
<div className="bg-white text-gray-900">
```

### 2. Use Utility Classes for Consistency

```tsx
✅ Recommended:
<h1 className="livemenu-text-primary">Title</h1>
<p className="livemenu-text-secondary">Description</p>

❌ Not recommended (manual everywhere):
<h1 className="text-gray-900 dark:text-white">Title</h1>
<p className="text-gray-600 dark:text-gray-300">Description</p>
```

### 3. Test Both Modes

Always test your UI in both light and dark modes:

```tsx
// Toggle in browser console
document.documentElement.classList.toggle('dark');
```

### 4. Maintain Color Contrast

Ensure text is readable:
- Light backgrounds → dark text
- Dark backgrounds → light text
- Maintain WCAG AA standards (4.5:1 ratio)

### 5. Persist User Preference

The `LiveMenuThemeProvider` handles this automatically with localStorage.

```tsx
// User's choice is saved automatically
<LiveMenuThemeProvider storageKey="my-app-theme">
```

### 6. Respect System Preferences

Use `defaultTheme="system"` to respect OS settings:

```tsx
<LiveMenuThemeProvider defaultTheme="system">
```

### 7. Avoid Flash of Unstyled Content

Add script to HTML head:

```html
<script>
  if (localStorage.getItem('livemenu-theme') === 'dark' ||
      (!localStorage.getItem('livemenu-theme') && 
       window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### 8. Use Semantic Color Names

```tsx
✅ Good:
<LiveMenuBadge variant="success">Active</LiveMenuBadge>
<LiveMenuBadge variant="danger">Error</LiveMenuBadge>

❌ Avoid:
<span className="bg-green-500">Active</span>
<span className="bg-red-500">Error</span>
```

---

## 🎨 Complete Example App

### Full-Featured Application with Dark Mode

```tsx
import React, { useState } from 'react';
import {
  LiveMenuThemeProvider,
  LiveMenuThemeToggle,
  useLiveMenuTheme,
  LiveMenuCard,
  LiveMenuButton,
  LiveMenuInput,
  LiveMenuBadge,
} from '@codearemo/livemenu-ui';
import '@codearemo/livemenu-ui/dist/styles.css';

// Header Component
function AppHeader() {
  const { isDark } = useLiveMenuTheme();

  return (
    <header className="livemenu-surface border-b livemenu-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-livemenu to-livemenu-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold livemenu-text-primary">
                LiveMenu
              </h1>
              <LiveMenuBadge variant="primary" size="sm" className="-mt-1">
                v1.0
              </LiveMenuBadge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="livemenu-link">Dashboard</a>
            <a href="#" className="livemenu-link">Products</a>
            <a href="#" className="livemenu-link">Settings</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LiveMenuButton variant="outline" size="sm">
              Sign In
            </LiveMenuButton>
            <LiveMenuThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

// Dashboard Stats
function DashboardStats() {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231', 
      change: '+12.5%', 
      variant: 'success' as const 
    },
    { 
      title: 'Active Users', 
      value: '2,345', 
      change: '+8.2%', 
      variant: 'success' as const 
    },
    { 
      title: 'Pending Orders', 
      value: '23', 
      change: '-2.4%', 
      variant: 'warning' as const 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat) => (
        <LiveMenuCard
          key={stat.title}
          hoverable
          title={
            <div className="flex items-center justify-between">
              <span className="text-sm livemenu-text-secondary">
                {stat.title}
              </span>
              <LiveMenuBadge variant={stat.variant} size="sm">
                {stat.change}
              </LiveMenuBadge>
            </div>
          }
        >
          <div className="text-3xl font-bold text-livemenu mt-2">
            {stat.value}
          </div>
          <p className="livemenu-text-tertiary text-sm mt-1">
            Last 30 days
          </p>
        </LiveMenuCard>
      ))}
    </div>
  );
}

// Contact Form
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <LiveMenuCard
      title="Contact Us"
      subtitle="We'd love to hear from you"
      footer={
        <div className="flex gap-2 justify-end">
          <LiveMenuButton variant="outline" size="sm">
            Cancel
          </LiveMenuButton>
          <LiveMenuButton variant="primary" size="sm" type="submit">
            Send Message
          </LiveMenuButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <LiveMenuInput
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
          required
          fullWidth
        />

        <LiveMenuInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
          required
          fullWidth
          helperText="We'll never share your email"
        />

        <div>
          <label className="livemenu-label livemenu-label-required">
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="livemenu-textarea"
            placeholder="Your message..."
            required
          />
        </div>
      </form>
    </LiveMenuCard>
  );
}

// Main App Content
function AppContent() {
  const { isDark } = useLiveMenuTheme();

  return (
    <div className="min-h-screen livemenu-bg-primary transition-colors duration-300">
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold livemenu-text-primary mb-2">
            Dashboard
          </h1>
          <p className="livemenu-text-secondary">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <ContactForm />

          {/* Activity Feed */}
          <LiveMenuCard
            title="Recent Activity"
            subtitle="Latest updates and notifications"
          >
            <div className="space-y-3">
              {[
                { text: 'New order received', status: 'success', time: '2 min ago' },
                { text: 'Payment pending', status: 'warning', time: '5 min ago' },
                { text: 'User registered', status: 'info', time: '10 min ago' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 livemenu-surface rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <LiveMenuBadge variant={item.status} dot size="sm">
                      {item.status}
                    </LiveMenuBadge>
                    <div>
                      <p className="livemenu-text-primary text-sm font-medium">
                        {item.text}
                      </p>
                      <p className="livemenu-text-tertiary text-xs">
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </LiveMenuCard>
        </div>

        {/* Alerts Section */}
        <div className="mt-6 space-y-3">
          <div className="livemenu-alert-success">
            <strong>Success!</strong> Your changes have been saved successfully.
          </div>
          <div className="livemenu-alert-info">
            <strong>Info:</strong> New features are now available in dark mode.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="livemenu-surface border-t livemenu-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="livemenu-text-tertiary text-sm">
              © 2025 LiveMenu. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="livemenu-link text-sm">Privacy Policy</a>
              <a href="#" className="livemenu-link text-sm">Terms of Service</a>
              <a href="#" className="livemenu-link text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Root App Component
export default function App() {
  return (
    <LiveMenuThemeProvider defaultTheme="system" storageKey="livemenu-demo-theme">
      <AppContent />
    </LiveMenuThemeProvider>
  );
}
```

---

## 🐛 Troubleshooting

### Dark Mode Not Working

**Problem:** Components don't change when toggling dark mode

**Solutions:**

1. **Check if ThemeProvider is wrapping your app:**
   ```tsx
   // ✅ Correct
   <LiveMenuThemeProvider>
     <App />
   </LiveMenuThemeProvider>

   // ❌ Wrong
   <App />  // No provider!
   ```

2. **Verify Tailwind config has darkMode enabled:**
   ```javascript
   // tailwind.config.js
   export default {
     darkMode: 'class',  // Must be 'class'
     // ...
   }
   ```

3. **Check if dark class is applied:**
   ```javascript
   // Browser console
   document.documentElement.classList.contains('dark');
   // Should return true in dark mode
   ```

4. **Ensure styles are imported:**
   ```tsx
   import 'livemenu-ui/dist/styles.css';
   ```

### Hook Error

**Problem:**
```
Error: useLiveMenuTheme must be used within a LiveMenuThemeProvider
```

**Solution:**
Make sure you're using the hook inside a component that's wrapped by the provider:

```tsx
// ✅ Correct
function App() {
  return (
    <LiveMenuThemeProvider>
      <ComponentUsingHook />
    </LiveMenuThemeProvider>
  );
}

// ❌ Wrong
function ComponentUsingHook() {
  const { theme } = useLiveMenuTheme(); // Will error!
  return <div>{theme}</div>;
}

// This ComponentUsingHook is NOT wrapped by provider
<ComponentUsingHook />
```

### Theme Not Persisting

**Problem:** Theme resets on page reload

**Solutions:**

1. **Check localStorage:**
   ```javascript
   // Browser console
   localStorage.getItem('livemenu-theme');
   // Should return 'light', 'dark', or 'system'
   ```

2. **Verify storageKey is consistent:**
   ```tsx
   // Use same key everywhere
   <LiveMenuThemeProvider storageKey="my-app-theme">
   ```

3. **Check browser privacy settings:**
   - Ensure localStorage is not blocked
   - Check incognito/private mode restrictions

### Colors Not Showing Correctly

**Problem:** Dark mode colors don't match expected values

**Solutions:**

1. **Verify Tailwind config includes dark colors:**
   ```javascript
   // tailwind.config.js should have:
   colors: {
     dark: {
       bg: { primary: '#1a1a1a', /* ... */ },
       // ...
     }
   }
   ```

2. **Rebuild Tailwind:**
   ```bash
   npm run build
   ```

3. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### System Theme Not Detecting

**Problem:** 'system' mode doesn't follow OS preference

**Solutions:**

1. **Check browser support:**
   ```javascript
   window.matchMedia('(prefers-color-scheme: dark)').matches;
   ```

2. **Test OS theme change:**
   - Change OS dark mode setting
   - Should trigger update if theme is 'system'

3. **Verify event listener:**
   - ThemeProvider listens to system changes
   - Only works when theme is 'system'

### Hydration Mismatch (Next.js)

**Problem:** Warning about hydration mismatch in Next.js

**Solution:**
Use `suppressHydrationWarning` on html element:

```tsx
// app/layout.tsx
<html lang="en" suppressHydrationWarning>
```

And prevent flash with inline script:

```tsx
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      const theme = localStorage.getItem('livemenu-theme') || 'system';
      if (theme === 'dark' || 
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    })();
  `
}} />
```

---

## 📚 Additional Resources

### Documentation
- [Theme Provider Guide](THEME_PROVIDER_GUIDE.md) - Complete API docs
- [Theme Toggle Examples](THEME_TOGGLE_EXAMPLES.md) - Toggle component examples
- [Dark Mode Usage](DARK_MODE_USAGE.md) - Component-specific examples
- [Color Palette](COLOR_PALETTE.md) - Complete color documentation

### External Resources
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

---

## 🎯 Quick Reference

### Setup (3 steps)

```tsx
// 1. Wrap with provider
<LiveMenuThemeProvider>

// 2. Use toggle component
<LiveMenuThemeToggle showLabel />

// 3. Use utility classes
<div className="livemenu-bg-primary livemenu-text-primary">
```

### Hook Usage

```tsx
const { theme, setTheme, isDark } = useLiveMenuTheme();
```

### Utility Classes

```tsx
livemenu-text-primary     // Adaptive text
livemenu-bg-primary       // Adaptive background
livemenu-border           // Adaptive border
livemenu-surface          // Combined surface
```

---

## ✅ Checklist for Dark Mode Support

When building your app:

- [ ] Wrap app with `<LiveMenuThemeProvider>`
- [ ] Import `livemenu-ui/dist/styles.css`
- [ ] Use `livemenu-text-*` for text colors
- [ ] Use `livemenu-bg-*` for backgrounds
- [ ] Use `livemenu-border` for borders
- [ ] Add `<LiveMenuThemeToggle>` for user control
- [ ] Test in both light and dark modes
- [ ] Check color contrast ratios
- [ ] Verify system theme detection works
- [ ] Test theme persistence (reload page)

---

**Your app now has professional dark mode support!** 🌙✨

For questions or issues, open an issue on the [GitHub repository](https://github.com/codearemo/livemenu-ui/issues).


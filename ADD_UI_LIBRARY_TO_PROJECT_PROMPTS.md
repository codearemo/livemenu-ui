# LiveMenu UI Setup Prompts

Use these prompts in sequence to set up the `@codearemo/livemenu-ui` library in a new React + Vite + TypeScript project.

---

## Prompt 1: Install Dependencies

```
Install the livemenu-ui library and its required dependencies:
1. Install @codearemo/livemenu-ui from GitHub: npm install github:codearemo/livemenu-ui
2. Install Tailwind CSS v3 (stable): npm install -D tailwindcss@^3.4.0 postcss autoprefixer
3. Verify all packages are installed correctly
```

---

## Prompt 2: Create PostCSS Configuration

```
Create a postcss.config.ts file in the project root with the following content:

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## Prompt 3: Create Tailwind Configuration

```
Create a tailwind.config.js file in the project root with this configuration:

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

Important: The darkMode must be set to 'class' for the LiveMenuThemeProvider to work correctly.
```

---

## Prompt 4: Update CSS File

```
Update the main CSS file (typically src/index.css) to include:

1. Add Tailwind directives at the top:
@tailwind base;
@tailwind components;
@tailwind utilities;

2. Add custom dark mode styles:
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #213547;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark mode styles */
:root.dark body {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

---

## Prompt 5: Update Main Entry File

```
Update src/main.tsx to wrap the app with LiveMenuThemeProvider:

1. Import the library styles BEFORE your own CSS:
import '@codearemo/livemenu-ui/dist/styles.css';
import './index.css'

2. Import LiveMenuThemeProvider:
import { LiveMenuThemeProvider } from '@codearemo/livemenu-ui';

3. Wrap your App component:
<StrictMode>
  <LiveMenuThemeProvider defaultTheme="system">
    <App />
  </LiveMenuThemeProvider>
</StrictMode>

The order of CSS imports is critical: livemenu-ui styles must come before your own styles.
```

---

## Prompt 6: Add Theme Toggle to App

```
Update src/App.tsx to add the theme toggle:

1. Import the ThemeToggle component:
import { ThemeToggle } from '@codearemo/livemenu-ui';

2. Add it to your component:
<ThemeToggle />

You can also import other components like:
import { LiveMenuButton, LiveMenuCard, LiveMenuInput } from '@codearemo/livemenu-ui';
```

---

## Prompt 7: Test the Setup

```
Create a test component in src/App.tsx to verify everything works:

import { LiveMenuButton, ThemeToggle } from '@codearemo/livemenu-ui';

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          LiveMenu Test App
        </h1>
        
        <div className="flex items-center gap-4">
          <LiveMenuButton variant="primary">
            Click Me
          </LiveMenuButton>
          
          <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <p className="text-2xl text-gray-800 dark:text-gray-200">
            Dark mode is working! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

Run npm run dev and test:
- The page should render with proper styling
- Clicking the theme toggle should switch between light and dark modes
- The dark: utility classes should activate in dark mode
```

---

## Common Issues & Solutions

### Issue: "Cannot find module '@codearemo/livemenu-ui'"
**Solution**: Run `npm install github:codearemo/livemenu-ui` to install from GitHub.

### Issue: "Unknown at rule @tailwind"
**Solution**: This is just a CSS linter warning and can be ignored. The directives work correctly at runtime.

### Issue: Dark mode toggle doesn't work
**Solution**: Ensure `darkMode: 'class'` is set in tailwind.config.js and LiveMenuThemeProvider is wrapping your app.

### Issue: Styles not applying
**Solution**: Check that '@codearemo/livemenu-ui/dist/styles.css' is imported BEFORE your own CSS in main.tsx.

### Issue: PostCSS errors
**Solution**: Ensure you're using Tailwind CSS v3 (not v4 beta). Run `npm install -D tailwindcss@^3.4.0`

---

## Quick Setup Checklist

- [ ] Install @codearemo/livemenu-ui from GitHub
- [ ] Install tailwindcss@^3.4.0, postcss, autoprefixer
- [ ] Create postcss.config.ts with tailwindcss and autoprefixer plugins
- [ ] Create tailwind.config.js with darkMode: 'class'
- [ ] Add @tailwind directives to src/index.css
- [ ] Import library styles in src/main.tsx (before your CSS)
- [ ] Wrap app with LiveMenuThemeProvider in src/main.tsx
- [ ] Add ThemeToggle component to your app
- [ ] Test dark mode toggle functionality

---

## Package Versions

```json
{
  "dependencies": {
    "@codearemo/livemenu-ui": "github:codearemo/livemenu-ui",
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

---

## Complete File Examples

### postcss.config.ts
```typescript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### src/main.tsx
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@codearemo/livemenu-ui/dist/styles.css';
import './index.css'
import App from './App.tsx'
import { LiveMenuThemeProvider } from '@codearemo/livemenu-ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LiveMenuThemeProvider defaultTheme="system">
      <App />
    </LiveMenuThemeProvider>
  </StrictMode>,
)
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #213547;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Dark mode styles */
:root.dark body {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

---

## Single Comprehensive Prompt (All-in-One)

```
Set up the @codearemo/livemenu-ui library in this React + Vite + TypeScript project:

1. Install dependencies:
   - npm install github:codearemo/livemenu-ui
   - npm install -D tailwindcss@^3.4.0 postcss autoprefixer

2. Create postcss.config.ts in project root with tailwindcss and autoprefixer plugins

3. Create tailwind.config.js with:
   - content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
   - darkMode: 'class'

4. Update src/index.css:
   - Add @tailwind base/components/utilities directives at the top
   - Add custom :root.dark body styles for dark mode

5. Update src/main.tsx:
   - Import '@codearemo/livemenu-ui/dist/styles.css' BEFORE './index.css'
   - Import and wrap App with LiveMenuThemeProvider with defaultTheme="system"

6. Update src/App.tsx:
   - Import and add ThemeToggle component
   - Test with dark mode utility classes (dark:bg-gray-800, dark:text-white)

7. Start dev server and verify dark mode toggle works correctly

Important: Use Tailwind CSS v3 (not v4), and ensure darkMode is set to 'class'.
```

---

Generated: $(date)
Project: livemenu-customer

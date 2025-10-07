# LiveMenu UI Component Library

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

**A production-ready React component library for LiveMenu with Tailwind CSS styling and a custom orange color palette.**

[Components](#-components) • [Installation](#-installation) • [Setup](#-setup-in-consuming-projects) • [Documentation](docs/) • [Examples](#-usage-examples)

📖 **[Complete Documentation →](docs/)**

</div>

---

## 📖 About

LiveMenu UI is a comprehensive React component library built with TypeScript and Tailwind CSS. It provides a set of accessible, customizable, and production-ready components with a consistent design system centered around the LiveMenu brand orange color (`#ff7c30`).

### Key Features

✨ **4 Core Components** - Button, Card, Badge, and Input  
🎨 **Custom Color Palette** - 10+ orange shades + semantic colors  
🔒 **TypeScript First** - Full type safety and IntelliSense support  
♿ **Accessible** - WCAG AA compliant with ARIA attributes  
📦 **Tree-shakeable** - Import only what you need  
🎯 **Tailwind CSS** - 44+ custom utility classes  
📱 **Responsive** - Mobile-first design approach  
🚀 **Production Ready** - Minified, optimized, and tested

---

## 📦 Installation

### From GitHub Private Repository

```bash
# Using npm
npm install git+https://github.com/codearemo/livemenu-ui.git

# Using yarn
yarn add git+https://github.com/codearemo/livemenu-ui.git

# Using pnpm
pnpm add git+https://github.com/codearemo/livemenu-ui.git

# Or from GitHub Packages (after publishing)
npm install @codearemo/livemenu-ui
```

### From Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_ORG/livemenu-ui.git
cd livemenu-ui

# Install dependencies
npm install

# Build the library
npm run build

# Link for local development
npm link
```

Then in your project:

```bash
npm link livemenu-ui
```

---

## 🔧 Setup in Consuming Projects

### 1. Install Peer Dependencies

LiveMenu UI requires React and React-DOM as peer dependencies:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

### 2. Configure Tailwind CSS

To use the custom LiveMenu colors and classes in your project, extend your Tailwind configuration:

#### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // Add the livemenu-ui package to content sources
    './node_modules/livemenu-ui/dist/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // LiveMenu orange palette
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
        // Semantic colors
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
        // Add other semantic colors as needed
      },
    },
  },
  plugins: [],
};
```

### 3. Import Styles

Import the LiveMenu UI styles in your main application file:

#### `App.tsx` or `index.tsx`

```typescript
// Import LiveMenu UI styles (includes Tailwind CSS)
import 'livemenu-ui/dist/styles.css';

// Your other imports
import { LiveMenuButton, LiveMenuCard } from 'livemenu-ui';
```

**Important:** Make sure to import the styles **before** your own styles to allow for easy overrides.

### 4. TypeScript Configuration (Optional)

If using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "jsx": "react-jsx"
  }
}
```

---

## 🎯 Components

### LiveMenuButton

A versatile button component with 7 variants, 3 sizes, and full customization options.

**Key Features:**
- 7 variants: primary, secondary, outline, light, dark, success, danger
- 3 sizes: sm, md, lg
- Full-width option
- Disabled state
- TypeScript support

**Quick Example:**
```tsx
<LiveMenuButton variant="primary" size="md" onClick={handleClick}>
  Click Me
</LiveMenuButton>
```

[📚 View detailed examples →](docs/components/button.md)

---

### LiveMenuCard

A flexible card component with optional header, body, footer, and hover effects.

**Key Features:**
- Optional title and subtitle
- Optional footer section
- Hoverable effect
- Conditional rendering
- Customizable styling

**Quick Example:**
```tsx
<LiveMenuCard 
  title="Card Title" 
  subtitle="Subtitle"
  hoverable
  footer={<button>Action</button>}
>
  Your content here
</LiveMenuCard>
```

[📚 View detailed examples →](docs/components/card.md)

---

### LiveMenuBadge

Small label component for status indicators, counts, tags, and labels.

**Key Features:**
- 7 color variants
- 3 sizes
- Optional dot indicator
- Hover effects
- Inline or standalone

**Quick Example:**
```tsx
<LiveMenuBadge variant="success" dot size="md">
  Active
</LiveMenuBadge>
```

[📚 View detailed examples →](docs/components/badge.md)

---

### LiveMenuInput

Comprehensive input component with labels, icons, validation, and error states.

**Key Features:**
- 9 input types supported
- Left/right icon slots
- Error and success states
- Helper text
- Required indicator
- Full accessibility

**Quick Example:**
```tsx
<LiveMenuInput 
  label="Email"
  type="email"
  required
  error="Invalid email"
  leftIcon={<MailIcon />}
/>
```

[📚 View detailed examples →](docs/components/input.md)

---

### Form Components

Additional form components for complete form building.

**LiveMenuAlert** - Notifications and messages  
**LiveMenuDropdown** - Custom select with icons  
**LiveMenuCheckbox** - Checkbox with label  
**LiveMenuRadio** - Radio button groups  
**LiveMenuTextarea** - Multi-line text input  
**LiveMenuSwitch** - Toggle switch component  

**Quick Example:**
```tsx
<LiveMenuAlert variant="success">Saved!</LiveMenuAlert>
<LiveMenuDropdown options={countries} onChange={setCountry} />
<LiveMenuCheckbox label="I agree" checked={agreed} />
<LiveMenuSwitch label="Dark mode" checked={dark} />
```

[📚 View all form components →](docs/components/form-components.md)

---

### LiveMenuModal

A powerful modal system with programmatic triggering and stacking support.

**Key Features:**
- Programmatic triggering from anywhere
- Multiple modals stacked on each other
- 5 size options (sm, md, lg, xl, full)
- Dismissable/non-dismissable options
- Full keyboard and accessibility support
- Auto focus management

**Quick Example:**
```tsx
import { showModal, useModal, LiveMenuModalProvider } from 'livemenu-ui';

// Wrap your app
<LiveMenuModalProvider>
  <App />
</LiveMenuModalProvider>

// Trigger modals programmatically
showModal(MyModalContent, {
  size: 'md',
  dismissable: true,
  showCloseButton: true,
  props: {
    title: 'Hello',
    onConfirm: () => console.log('Confirmed!')
  }
});

// Or use the hook in components
const { showModal, hideModal } = useModal();
```

[📚 View modal documentation →](docs/components/modal.md)  
[📚 View complete modal examples →](docs/examples/MODAL_EXAMPLES.md)

**Confirm Dialog Hook:**
```tsx
import { useConfirm } from 'livemenu-ui';

const { confirm } = useConfirm();

confirm({
  title: 'Delete Item',
  message: 'Are you sure?',
  variant: 'danger',
  confirmText: 'Delete',
  onConfirm: () => deleteItem()
});
```

[📚 View confirm documentation →](docs/components/confirm.md)

---

## 💻 Usage Examples

### Basic Form

```tsx
import { LiveMenuCard, LiveMenuInput, LiveMenuButton } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LiveMenuCard title="Sign In" subtitle="Welcome back!">
      <div className="space-y-4">
        <LiveMenuInput 
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <LiveMenuInput 
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <LiveMenuButton variant="primary" fullWidth>
          Sign In
        </LiveMenuButton>
      </div>
    </LiveMenuCard>
  );
}
```

### Dashboard Card with Badge

```tsx
import { LiveMenuCard, LiveMenuBadge } from 'livemenu-ui';

function StatsCard() {
  return (
    <LiveMenuCard 
      hoverable
      title={
        <div className="flex items-center justify-between">
          <span>Total Revenue</span>
          <LiveMenuBadge variant="success" size="sm">
            +12.5%
          </LiveMenuBadge>
        </div>
      }
    >
      <div className="text-4xl font-bold text-livemenu">
        $45,231
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Last 30 days
      </p>
    </LiveMenuCard>
  );
}
```

### Button Group

```tsx
import { LiveMenuButton } from 'livemenu-ui';

function ActionButtons() {
  return (
    <div className="flex gap-2">
      <LiveMenuButton variant="primary" size="md">
        Save
      </LiveMenuButton>
      <LiveMenuButton variant="outline" size="md">
        Cancel
      </LiveMenuButton>
      <LiveMenuButton variant="danger" size="md">
        Delete
      </LiveMenuButton>
    </div>
  );
}
```

---

## 🎨 Styling Guidelines

### Naming Convention

All components and classes follow the **LiveMenu prefix** pattern:

- **Components:** `LiveMenu[ComponentName]` (e.g., `LiveMenuButton`, `LiveMenuCard`)
- **CSS Classes:** `livemenu-[component]-[variant]` (e.g., `livemenu-btn-primary`)
- **Props Types:** `LiveMenu[ComponentName]Props` (e.g., `LiveMenuButtonProps`)

### Custom Classes

The library provides 44+ custom Tailwind classes:

```css
/* Buttons */
livemenu-btn, livemenu-btn-primary, livemenu-btn-secondary
livemenu-btn-outline, livemenu-btn-light, livemenu-btn-dark
livemenu-btn-sm, livemenu-btn-md, livemenu-btn-lg

/* Cards */
livemenu-card, livemenu-card-header, livemenu-card-body, livemenu-card-footer

/* Badges */
livemenu-badge-primary, livemenu-badge-success, livemenu-badge-danger

/* Inputs */
livemenu-input, livemenu-label, livemenu-textarea, livemenu-select

/* Utilities */
livemenu-link, livemenu-divider, livemenu-shadow
```

[View all component classes →](docs/styling/tailwind-classes.md)

### Color Palette

Access the LiveMenu orange palette through Tailwind classes:

```tsx
<div className="bg-livemenu text-white">Primary Orange</div>
<div className="bg-livemenu-light text-livemenu-dark">Light Orange</div>
<div className="bg-livemenu-dark text-white">Dark Orange</div>
<div className="border-livemenu">Orange Border</div>
<input className="focus:ring-livemenu" />
```

[View complete color documentation →](docs/styling/colors.md)

---

## 🛠 Development

### Prerequisites

- Node.js 16.x or later
- npm, yarn, or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_ORG/livemenu-ui.git
cd livemenu-ui

# Install dependencies
npm install

# Start development (watch mode)
npm run watch
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the library for production |
| `npm run watch` | Build in watch mode for development |
| `npm run prepublishOnly` | Runs automatically before publishing |

### Project Structure

```
livemenu-ui/
├── src/
│   ├── components/
│   │   ├── Badge/
│   │   │   ├── Badge.tsx
│   │   │   └── index.ts
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── tailwind.css
│   └── index.ts
├── dist/                  (generated)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── rollup.config.js
└── README.md
```

### Building Components

When creating new components, follow these conventions:

1. **File Structure:**
   ```
   src/components/ComponentName/
   ├── ComponentName.tsx    (Main component)
   └── index.ts             (Exports)
   ```

2. **Component Template:**
   ```tsx
   import React from 'react';

   export interface LiveMenuComponentNameProps {
     children: React.ReactNode;
     // ... other props
   }

   export const LiveMenuComponentName: React.FC<LiveMenuComponentNameProps> = ({
     children,
     ...props
   }) => {
     return <div {...props}>{children}</div>;
   };

   // Legacy alias
   export const ComponentName = LiveMenuComponentName;
   ```

3. **Export from index:**
   ```typescript
   export { LiveMenuComponentName, ComponentName } from './ComponentName';
   export type { LiveMenuComponentNameProps } from './ComponentName';
   ```

See the [Component Template Guide](docs/guides/creating-components.md) for complete details.

### Testing Locally

See the [Development Guide](docs/guides/development.md) for complete workflow.

```bash
# In the livemenu-ui directory
npm link

# In your test project
npm link livemenu-ui

# Make changes and rebuild
npm run watch  # In livemenu-ui directory
```

### Building for Production

```bash
# Clean build
rm -rf dist
npm run build

# Verify output
ls -la dist/
```

---

## 🤝 Contributing

We welcome contributions to LiveMenu UI! Here's how you can help:

### Reporting Issues

- Use the GitHub issue tracker
- Include a clear description and reproduction steps
- Add screenshots for UI issues
- Specify your environment (React version, browser, etc.)

### Pull Request Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/livemenu-ui.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Update documentation
   - Add examples if needed
   - Ensure TypeScript types are correct

4. **Test your changes**
   ```bash
   npm run build
   # Test in a consuming project
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Include screenshots for UI changes

### Code Style

- Use TypeScript for all components
- Follow existing naming conventions (LiveMenu prefix)
- Add JSDoc comments for all props
- Use functional components with React.FC
- Include prop types and default values
- Write accessible components (ARIA attributes)

### Documentation

When adding new components or features:

- Update the main README
- Create example files (e.g., `COMPONENT_EXAMPLES.md`)
- Add JSDoc comments
- Include TypeScript types
- Provide usage examples

---

## 📚 Documentation

### Getting Started
- **[Quick Start](docs/getting-started/quick-start.md)** - 5-minute setup guide
- **[Installation](docs/getting-started/installation.md)** - Complete installation guide

### Components
- **[Button](docs/components/button.md)** - Button examples and API
- **[Card](docs/components/card.md)** - Card examples and API
- **[Badge](docs/components/badge.md)** - Badge examples and API
- **[Input](docs/components/input.md)** - Input examples and API
- **[Form Components](docs/components/form-components.md)** - Alert, Dropdown, Checkbox, Radio, Textarea, Switch
- **[Theme](docs/components/theme.md)** - ThemeProvider and dark mode

### Styling
- **[Dark Mode](docs/styling/dark-mode.md)** - Complete dark mode guide
- **[Colors](docs/styling/colors.md)** - Color palette reference
- **[Tailwind Classes](docs/styling/tailwind-classes.md)** - Utility classes

### Development
- **[Development Guide](docs/guides/development.md)** - Development workflow
- **[Creating Components](docs/guides/creating-components.md)** - Component templates
- **[Publishing](docs/guides/publishing.md)** - GitHub Packages guide

---

## 🔗 Package Information

| Property | Value |
|----------|-------|
| **Name** | livemenu-ui |
| **Version** | 1.0.0 |
| **Type** | ES Module |
| **Main (CJS)** | dist/index.js |
| **Module (ESM)** | dist/index.esm.js |
| **Types** | dist/types/index.d.ts |
| **Styles** | dist/styles.css |

### Bundle Size

- **JS (CJS):** ~4KB (minified)
- **JS (ESM):** ~4KB (minified)
- **CSS:** ~35KB (minified, includes all Tailwind classes)

### Browser Support

| Browser | Version |
|---------|---------|
| Chrome | Latest ✅ |
| Firefox | Latest ✅ |
| Safari | Latest ✅ |
| Edge | Latest ✅ |
| iOS Safari | Latest ✅ |
| Chrome Mobile | Latest ✅ |

---

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Rollup](https://rollupjs.org/)

---

<div align="center">

**Made with ❤️ by the LiveMenu Team**

[Report Bug](https://github.com/codearemo/livemenu-ui/issues) • [Request Feature](https://github.com/codearemo/livemenu-ui/issues)

</div>


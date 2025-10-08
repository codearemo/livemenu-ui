# Which Generator Should I Use?

There are **TWO** component generators in LiveMenu UI. Here's when to use each:

## 🎨 For Library Components

**Use:** `npm run generate:component`  
**Location:** Inside the `livemenu-ui` repository  
**Purpose:** Create reusable UI components for the library itself

### When to use:
- ✅ Adding a new component to the LiveMenu UI library (Select, DatePicker, etc.)
- ✅ Creating components that will be exported from `@codearemo/livemenu-ui`
- ✅ Building library infrastructure components

### Example:
```bash
cd livemenu-ui
npm run generate:component Select
```

### What it creates:
```
src/components/Select/
├── Select.tsx              # LiveMenuSelect component
└── index.ts               # Exports LiveMenuSelect & Select

docs/components/
└── select.md              # Component documentation
```

### Generated component:
```tsx
export interface LiveMenuSelectProps { ... }
export const LiveMenuSelect: React.FC<LiveMenuSelectProps> = ...
export const Select = LiveMenuSelect;  // Legacy alias
```

---

## 🏗️ For App Components

**Use:** `npx livemenu-generate`  
**Location:** In any project that **uses** livemenu-ui  
**Purpose:** Create application-specific components that **use** LiveMenu UI

### When to use:
- ✅ Building features in your customer app (RestaurantCard, UserProfile, etc.)
- ✅ Creating components that **consume** LiveMenu UI components
- ✅ Application-specific business logic components

### Example:
```bash
cd livemenu-customer
npx livemenu-generate RestaurantCard
```

### What it creates:
```
src/components/RestaurantCard/
├── RestaurantCard.tsx           # Your app component
├── index.ts                     # Exports
└── RestaurantCard.test.tsx      # Tests
```

### Generated component:
```tsx
import { LiveMenuCard, LiveMenuButton } from '@codearemo/livemenu-ui';

export interface RestaurantCardProps { ... }
export const RestaurantCard: React.FC<RestaurantCardProps> = ...
export default RestaurantCard;
```

---

## Quick Reference Table

| Feature | Library Generator | App Generator |
|---------|------------------|---------------|
| **Command** | `npm run generate:component` | `npx livemenu-generate` |
| **Where** | `livemenu-ui/` repo | Any project using livemenu-ui |
| **Purpose** | Create library components | Create app components |
| **Naming** | `LiveMenuComponentName` | `ComponentName` |
| **Output** | Library component + docs | App component + tests |
| **Imports** | Base React components | Imports from `@codearemo/livemenu-ui` |
| **Exports** | Multiple (prefixed + legacy) | Single default + named |

---

## Visual Guide

### Library Development Flow
```
livemenu-ui/
│
├── [npm run generate:component Select]
│   └── Creates LiveMenuSelect in library
│
├── [Implement component]
│
├── [npm run build]
│
└── [npm publish]
    └── Available to all projects!
```

### App Development Flow
```
livemenu-customer/
│
├── [npm install @codearemo/livemenu-ui]
│
├── [npx livemenu-generate RestaurantCard]
│   └── Creates RestaurantCard in your app
│
├── [Implement using LiveMenuCard, LiveMenuButton, etc.]
│
└── [Use in your app]
```

---

## Examples

### Example 1: Adding a Select to the Library

```bash
# 1. In livemenu-ui repository
cd livemenu-ui
npm run generate:component Select

# 2. Implement LiveMenuSelect
# Edit: src/components/Select/Select.tsx

# 3. Build and publish
npm run build
npm publish
```

### Example 2: Building a Restaurant Card in Your App

```bash
# 1. In your app
cd livemenu-customer
npm install @codearemo/livemenu-ui

# 2. Generate app component
npx livemenu-generate RestaurantCard

# 3. Implement using library components
# Edit: src/components/RestaurantCard/RestaurantCard.tsx
```

```tsx
// RestaurantCard.tsx - Uses library components
import { LiveMenuCard, LiveMenuButton, LiveMenuBadge } from '@codearemo/livemenu-ui';

export const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  return (
    <LiveMenuCard title={restaurant.name} hoverable>
      <LiveMenuBadge variant={restaurant.isOpen ? 'success' : 'danger'}>
        {restaurant.isOpen ? 'Open' : 'Closed'}
      </LiveMenuBadge>
      <LiveMenuButton variant="primary">View Menu</LiveMenuButton>
    </LiveMenuCard>
  );
};
```

---

## Decision Tree

```
Need a new component?
│
├─ Is it a reusable UI primitive? (Button, Input, Select, etc.)
│  └─ YES → Use library generator in livemenu-ui
│     └─ npm run generate:component ComponentName
│
└─ Is it app-specific? (RestaurantCard, UserProfile, etc.)
   └─ YES → Use app generator in your project
      └─ npx livemenu-generate ComponentName
```

---

## Pro Tips

### 🎨 Library Development
- Focus on **reusable**, **configurable** components
- Include comprehensive props and variants
- Write detailed documentation
- Consider accessibility and dark mode
- Export both `LiveMenuComponentName` and `ComponentName`

### 🏗️ App Development
- **Compose** library components to build features
- Keep components **domain-specific**
- Use library components for UI primitives
- Focus on business logic
- Leverage library theming and styling

---

## Summary

**Library Generator** (`npm run generate:component`)
- 🎨 Creates UI primitives
- 📦 For the livemenu-ui library
- 🌍 Used by all projects

**App Generator** (`npx livemenu-generate`)
- 🏗️ Creates feature components
- 🎯 For your specific app
- 🧩 Uses library components

---

**Still confused?**

- Creating a **Select, DatePicker, or Slider**? → Library generator
- Creating a **RestaurantCard, UserProfile, or OrderHistory**? → App generator

**Both generators ensure consistency and speed up development!** 🚀

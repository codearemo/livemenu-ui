# Component Generator CLI - Setup Complete! 🎉

## What Was Created

The LiveMenu UI library now includes a **CLI tool** that works in **any project** where the library is installed!

### Files Created

1. **`bin/generate-component.js`** - Binary script that consumers can run
2. **`GENERATOR_USAGE.md`** - Complete usage documentation for consuming projects
3. **Updated `package.json`** - Added `bin` field to expose the CLI command
4. **Updated `README.md`** - Added prominent CLI documentation

## How It Works

### 1. **In the Library (livemenu-ui)**
For developing library components:
```bash
cd livemenu-ui
npm run generate:component Select
```
Creates library components with `LiveMenu` prefix.

### 2. **In Consuming Projects** (⭐ NEW!)
For app developers using your library:
```bash
# In any project with livemenu-ui installed
npx livemenu-generate RestaurantCard
```
Creates app components that **use** LiveMenu UI components!

## Usage Example

### In Your Customer Project

```bash
# 1. Install the library
cd livemenu-customer
npm install @codearemo/livemenu-ui

# 2. Generate a component
npx livemenu-generate RestaurantCard

# Output:
# ✅ Component 'RestaurantCard' generated successfully!
# 📁 Generated files:
#    - src/components/RestaurantCard/RestaurantCard.tsx
#    - src/components/RestaurantCard/index.ts
#    - src/components/RestaurantCard/RestaurantCard.test.tsx
```

### What Gets Generated

```tsx
// src/components/RestaurantCard/RestaurantCard.tsx
import React from 'react';
// Import LiveMenu UI components as needed
// import { LiveMenuCard, LiveMenuButton } from '@codearemo/livemenu-ui';

export interface RestaurantCardProps {
  children?: React.ReactNode;
  className?: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`restaurantcard ${className}`}>
      {children}
    </div>
  );
};

export default RestaurantCard;
```

## Key Features

✅ **Works from node_modules** - Automatically detects if running from installed package  
✅ **Generates in project root** - Creates components in `src/components/`  
✅ **TypeScript ready** - Full type definitions included  
✅ **Test file included** - Basic test template generated  
✅ **LiveMenu UI integration** - Comments show how to import and use LiveMenu components  
✅ **Kebab-case support** - Auto-converts `restaurant-card` to `RestaurantCard`  

## Package.json Changes

```json
{
  "bin": {
    "livemenu-generate": "./bin/generate-component.js"
  },
  "files": [
    "dist",
    "bin",      // ← Added
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "react",
    "components",
    "ui",
    "livemenu",
    "tailwind",
    "typescript",
    "component-generator",  // ← Added
    "cli",                  // ← Added
    "scaffolding"          // ← Added
  ]
}
```

## Testing

### Test in Library
```bash
cd livemenu-ui
npm run generate:component TestComponent
# Clean up: rm -rf src/components/TestComponent
```

### Test in Consuming Project

```bash
# After publishing/linking the library
cd livemenu-customer
npx livemenu-generate TestComponent

# Should create:
# src/components/TestComponent/
#   ├── TestComponent.tsx
#   ├── index.ts
#   └── TestComponent.test.tsx
```

## Publishing Checklist

Before publishing to make this available to all projects:

- [x] Binary script created (`bin/generate-component.js`)
- [x] Made executable (`chmod +x`)
- [x] Added to `package.json` bin field
- [x] Added `bin` to files array
- [x] Updated keywords
- [x] Created documentation (`GENERATOR_USAGE.md`)
- [x] Updated main `README.md`
- [ ] Test locally with `npm link`
- [ ] Build the package (`npm run build`)
- [ ] Publish to GitHub Packages

## Next Steps

### 1. Test Locally

```bash
# In livemenu-ui
npm link

# In livemenu-customer
npm link @codearemo/livemenu-ui

# Try the generator
npx livemenu-generate TestComponent
```

### 2. Build and Publish

```bash
cd livemenu-ui
npm run build
npm publish
```

### 3. Use in Projects

```bash
# In any project
npm install @codearemo/livemenu-ui
npx livemenu-generate YourComponent
```

## Documentation

- **[GENERATOR_USAGE.md](GENERATOR_USAGE.md)** - Complete usage guide for consuming projects
- **[COMPONENT_GENERATOR_GUIDE.md](COMPONENT_GENERATOR_GUIDE.md)** - Guide for library development
- **[README.md](README.md)** - Main documentation with CLI section

## Benefits

1. **DRY Principle** - Write the generator once, use in all projects
2. **Consistency** - All projects follow the same component structure
3. **Speed** - Generate components in seconds
4. **Best Practices** - Built-in patterns and TypeScript types
5. **Integration** - Components are ready to use LiveMenu UI primitives

## Example Use Case

Your developers can now:

```bash
# Create a new feature
cd livemenu-customer
npx livemenu-generate RestaurantList
npx livemenu-generate RestaurantCard  
npx livemenu-generate OrderHistory

# Each component is ready to use LiveMenu UI:
import { LiveMenuCard, LiveMenuButton } from '@codearemo/livemenu-ui';
```

---

**The generator is ready to use!** 🚀

Try it in your `livemenu-customer` project after linking or publishing the library.

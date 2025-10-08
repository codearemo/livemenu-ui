# Component Generator Usage

The LiveMenu UI library includes a powerful component generator that works in **any project** where the library is installed!

## 🎯 For Consuming Projects (Your Apps)

Once you've installed `@codearemo/livemenu-ui` in your project, you can generate components directly:

### Installation

```bash
npm install @codearemo/livemenu-ui
# or from GitHub
npm install git+https://github.com/codearemo/livemenu-ui.git
```

### Generate Components in Your Project

```bash
# Using npx (recommended)
npx livemenu-generate RestaurantCard

# Or add to package.json scripts
npm pkg set scripts.generate="livemenu-generate"
npm run generate UserProfile
```

### Examples

```bash
# Generate a RestaurantCard component
npx livemenu-generate RestaurantCard

# Generate a UserProfile component (kebab-case auto-converts)
npx livemenu-generate user-profile

# Generate an OrderHistory component
npx livemenu-generate OrderHistory
```

### What Gets Created

```
your-project/
└── src/
    └── components/
        └── RestaurantCard/
            ├── RestaurantCard.tsx     # Component implementation
            ├── index.ts               # Exports
            └── RestaurantCard.test.tsx # Test file
```

### Generated Component Structure

```tsx
import React from 'react';
// Import LiveMenu UI components as needed
// import { LiveMenuCard, LiveMenuButton } from '@codearemo/livemenu-ui';

export interface RestaurantCardProps {
  children?: React.ReactNode;
  className?: string;
  // Add your props
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

### Usage in Your App

```tsx
import { RestaurantCard } from './components/RestaurantCard';
import { LiveMenuCard, LiveMenuButton } from '@codearemo/livemenu-ui';

function App() {
  return (
    <RestaurantCard>
      <LiveMenuCard title="My Restaurant">
        <p>Restaurant details here</p>
        <LiveMenuButton variant="primary">View Menu</LiveMenuButton>
      </LiveMenuCard>
    </RestaurantCard>
  );
}
```

## 🔧 For Library Development

If you're contributing to the livemenu-ui library itself:

```bash
cd livemenu-ui
npm run generate:component Select
```

This uses the internal generator for creating **library components** with the LiveMenu prefix.

## 📚 Command Reference

### Basic Usage

```bash
npx livemenu-generate <ComponentName>
```

### Options

| Argument | Description | Example |
|----------|-------------|---------|
| `ComponentName` | PascalCase component name | `RestaurantCard` |
| `component-name` | kebab-case (auto-converts) | `restaurant-card` → `RestaurantCard` |

### Output Structure

The generator creates:
- ✅ Component file (`ComponentName.tsx`)
- ✅ Index file with exports (`index.ts`)
- ✅ Test file (`ComponentName.test.tsx`)
- ✅ Proper TypeScript types
- ✅ JSDoc comments
- ✅ Import suggestions for LiveMenu UI components

## 💡 Best Practices

### 1. **Use LiveMenu UI Components**

Build your app components using LiveMenu UI primitives:

```tsx
import { LiveMenuCard, LiveMenuButton, LiveMenuInput } from '@codearemo/livemenu-ui';

export const LoginForm: React.FC = () => {
  return (
    <LiveMenuCard title="Sign In">
      <LiveMenuInput label="Email" type="email" />
      <LiveMenuInput label="Password" type="password" />
      <LiveMenuButton variant="primary">Login</LiveMenuButton>
    </LiveMenuCard>
  );
};
```

### 2. **Naming Conventions**

- **PascalCase**: `RestaurantCard`, `UserProfile`, `OrderList`
- **Descriptive**: `RestaurantDetailsCard` not just `Details`
- **Single Responsibility**: Each component should do one thing well

### 3. **Component Organization**

```
src/
└── components/
    ├── RestaurantCard/
    │   ├── RestaurantCard.tsx
    │   ├── RestaurantCard.test.tsx
    │   └── index.ts
    ├── UserProfile/
    │   ├── UserProfile.tsx
    │   ├── UserProfile.test.tsx
    │   └── index.ts
    └── OrderHistory/
        ├── OrderHistory.tsx
        ├── OrderHistory.test.tsx
        └── index.ts
```

## 🚀 Quick Start Example

### 1. Install LiveMenu UI in your project

```bash
cd your-project
npm install @codearemo/livemenu-ui
```

### 2. Generate a component

```bash
npx livemenu-generate RestaurantList
```

### 3. Implement your component

```tsx
// src/components/RestaurantList/RestaurantList.tsx
import React from 'react';
import { LiveMenuCard, LiveMenuBadge } from '@codearemo/livemenu-ui';

export interface RestaurantListProps {
  restaurants: Array<{
    id: string;
    name: string;
    rating: number;
    isOpen: boolean;
  }>;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <div className="restaurant-list space-y-4">
      {restaurants.map(restaurant => (
        <LiveMenuCard key={restaurant.id} title={restaurant.name} hoverable>
          <div className="flex items-center gap-2">
            <LiveMenuBadge variant={restaurant.isOpen ? 'success' : 'danger'}>
              {restaurant.isOpen ? 'Open' : 'Closed'}
            </LiveMenuBadge>
            <span>⭐ {restaurant.rating}</span>
          </div>
        </LiveMenuCard>
      ))}
    </div>
  );
};

export default RestaurantList;
```

### 4. Use in your app

```tsx
import { RestaurantList } from './components/RestaurantList';

function App() {
  const restaurants = [
    { id: '1', name: 'Pizza Palace', rating: 4.5, isOpen: true },
    { id: '2', name: 'Burger Haven', rating: 4.2, isOpen: false },
  ];

  return <RestaurantList restaurants={restaurants} />;
}
```

## 📋 Checklist After Generation

- [ ] Implement component logic
- [ ] Add proper TypeScript types
- [ ] Import and use LiveMenu UI components
- [ ] Write tests
- [ ] Add documentation/comments
- [ ] Style with Tailwind classes
- [ ] Test in light and dark modes

## 🆘 Troubleshooting

### Command not found

If `npx livemenu-generate` doesn't work:

1. **Check installation**:
   ```bash
   npm list @codearemo/livemenu-ui
   ```

2. **Reinstall the package**:
   ```bash
   npm install @codearemo/livemenu-ui --force
   ```

3. **Use full path**:
   ```bash
   node node_modules/@codearemo/livemenu-ui/bin/generate-component.js ComponentName
   ```

### Component already exists

If you see "Component already exists":
- Choose a different name
- Or delete the existing component folder first

### Wrong directory structure

The generator expects:
```
your-project/
└── src/
    └── components/  ← Components go here
```

If your structure is different, you'll need to move the generated files manually.

## 🤝 Integration with Package Managers

### npm

```bash
npx livemenu-generate ComponentName
```

### yarn

```bash
yarn dlx livemenu-generate ComponentName
```

### pnpm

```bash
pnpm dlx livemenu-generate ComponentName
```

## 📚 Additional Resources

- [LiveMenu UI Documentation](docs/)
- [Component Examples](docs/examples/)
- [Contributing Guide](docs/guides/creating-components.md)

---

**Made with ❤️ by the LiveMenu Team**

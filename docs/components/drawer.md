# Drawer

A flexible and accessible drawer (side panel) component for LiveMenu UI that slides in from any edge of the screen.

## Installation

Make sure you have `@codearemo/livemenu-ui` installed in your project.

```bash
npm install @codearemo/livemenu-ui
```

## Basic Usage

```tsx
import { useState } from 'react';
import { LiveMenuDrawer, DrawerHeader, DrawerBody, DrawerFooter } from '@codearemo/livemenu-ui';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      
      <LiveMenuDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold">Drawer Title</h2>
        </DrawerHeader>
        <DrawerBody>
          <p>Your drawer content goes here</p>
        </DrawerBody>
        <DrawerFooter>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </DrawerFooter>
      </LiveMenuDrawer>
    </>
  );
}
```

## Features

- 🎯 **Four Positions**: Slide in from left, right, top, or bottom
- 📏 **Five Size Options**: Small, medium, large, extra-large, and full
- 🎨 **Dark Mode Support**: Beautiful appearance in both light and dark themes
- ♿ **Fully Accessible**: ARIA attributes and keyboard navigation
- 🔒 **Body Scroll Lock**: Prevents background scrolling when drawer is open
- 🎭 **Backdrop Overlay**: Optional backdrop with click-to-close
- ⌨️ **Keyboard Support**: Close with Escape key
- ✨ **Smooth Animations**: Slide-in animations for all positions
- 🧩 **Structured Layout**: Built-in Header, Body, and Footer components
- 🎨 **Customizable**: Flexible styling options

## Props

### LiveMenuDrawerProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | `boolean` | **required** | Whether the drawer is open |
| onClose | `() => void` | **required** | Callback when drawer should close |
| children | `React.ReactNode` | **required** | Content to display in the drawer |
| dismissable | `boolean` | `true` | Whether clicking outside closes the drawer |
| showCloseButton | `boolean` | `true` | Whether to show the close button |
| position | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Position of the drawer |
| size | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Size of the drawer |
| backdrop | `boolean` | `true` | Whether to show backdrop overlay |
| closeOnEscape | `boolean` | `true` | Whether to close on Escape key |
| lockScroll | `boolean` | `true` | Whether to lock body scroll when open |
| className | `string` | `''` | Additional CSS classes for drawer |
| overlayClassName | `string` | `''` | Additional CSS classes for overlay |
| zIndex | `number` | `50` | Z-index for the drawer |

### DrawerHeader Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | ✅ | Header content |
| className | `string` | - | Additional CSS classes |

### DrawerBody Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | ✅ | Body content |
| className | `string` | - | Additional CSS classes |

### DrawerFooter Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `React.ReactNode` | ✅ | Footer content |
| className | `string` | - | Additional CSS classes |

## Examples

### Basic Drawer (Right Position)

```tsx
import { useState } from 'react';
import { LiveMenuDrawer, DrawerHeader, DrawerBody } from '@codearemo/livemenu-ui';

function BasicDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Menu</button>
      
      <LiveMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerHeader>
          <h2 className="text-xl font-bold">Menu</h2>
        </DrawerHeader>
        <DrawerBody>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Home
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              About
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              Contact
            </a>
          </nav>
        </DrawerBody>
      </LiveMenuDrawer>
    </>
  );
}
```

### Left Position Drawer

```tsx
<LiveMenuDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
>
  <DrawerHeader>
    <h2>Navigation</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>Content from the left side</p>
  </DrawerBody>
</LiveMenuDrawer>
```

### Top Position Drawer

```tsx
<LiveMenuDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="top"
  size="md"
>
  <DrawerHeader>
    <h2>Notification Center</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>Your notifications appear here</p>
  </DrawerBody>
</LiveMenuDrawer>
```

### Bottom Position Drawer

```tsx
<LiveMenuDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="bottom"
  size="lg"
>
  <DrawerHeader>
    <h2>Sheet Content</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>Bottom sheet content</p>
  </DrawerBody>
</LiveMenuDrawer>
```

### Different Sizes

```tsx
// Small
<LiveMenuDrawer isOpen={isOpen} onClose={onClose} size="sm">
  <DrawerBody>Small drawer (256px / 16rem)</DrawerBody>
</LiveMenuDrawer>

// Medium (default)
<LiveMenuDrawer isOpen={isOpen} onClose={onClose} size="md">
  <DrawerBody>Medium drawer (320px / 20rem)</DrawerBody>
</LiveMenuDrawer>

// Large
<LiveMenuDrawer isOpen={isOpen} onClose={onClose} size="lg">
  <DrawerBody>Large drawer (384px / 24rem)</DrawerBody>
</LiveMenuDrawer>

// Extra Large
<LiveMenuDrawer isOpen={isOpen} onClose={onClose} size="xl">
  <DrawerBody>Extra large drawer (512px / 32rem)</DrawerBody>
</LiveMenuDrawer>

// Full
<LiveMenuDrawer isOpen={isOpen} onClose={onClose} size="full">
  <DrawerBody>Full width/height drawer</DrawerBody>
</LiveMenuDrawer>
```

### With Footer Actions

```tsx
import { LiveMenuDrawer, DrawerHeader, DrawerBody, DrawerFooter } from '@codearemo/livemenu-ui';

function DrawerWithFooter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LiveMenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerHeader>
        <h2 className="text-xl font-bold">Confirm Action</h2>
      </DrawerHeader>
      <DrawerBody>
        <p>Are you sure you want to proceed with this action?</p>
      </DrawerBody>
      <DrawerFooter>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle confirm
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Confirm
          </button>
        </div>
      </DrawerFooter>
    </LiveMenuDrawer>
  );
}
```

### Without Backdrop

```tsx
<LiveMenuDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  backdrop={false}
>
  <DrawerHeader>
    <h2>No Backdrop</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>Drawer without background overlay</p>
  </DrawerBody>
</LiveMenuDrawer>
```

### Non-dismissable Drawer

```tsx
<LiveMenuDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  dismissable={false}
  closeOnEscape={false}
>
  <DrawerHeader>
    <h2>Important Message</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>This drawer must be closed using the button</p>
  </DrawerBody>
  <DrawerFooter>
    <button onClick={() => setIsOpen(false)}>Close</button>
  </DrawerFooter>
</LiveMenuDrawer>
```

### Without Close Button

```tsx
<LiveMenuDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showCloseButton={false}
>
  <DrawerHeader>
    <h2>Custom Close</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>Use custom close button in footer</p>
  </DrawerBody>
  <DrawerFooter>
    <button onClick={() => setIsOpen(false)}>
      Close Drawer
    </button>
  </DrawerFooter>
</LiveMenuDrawer>
```

### Navigation Menu

```tsx
function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { label: 'Dashboard', icon: '📊', href: '/dashboard' },
    { label: 'Projects', icon: '📁', href: '/projects' },
    { label: 'Team', icon: '👥', href: '/team' },
    { label: 'Settings', icon: '⚙️', href: '/settings' },
  ];

  return (
    <LiveMenuDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="left"
      size="md"
    >
      <DrawerHeader>
        <h2 className="text-xl font-bold">Navigation</h2>
      </DrawerHeader>
      <DrawerBody>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </DrawerBody>
      <DrawerFooter>
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
      </DrawerFooter>
    </LiveMenuDrawer>
  );
}
```

### Filter Panel

```tsx
function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    inStock: false,
  });

  return (
    <LiveMenuDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      size="lg"
    >
      <DrawerHeader>
        <h2 className="text-xl font-bold">Filters</h2>
      </DrawerHeader>
      <DrawerBody>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <input
              type="range"
              min="0"
              max="1000"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>
      </DrawerBody>
      <DrawerFooter>
        <div className="flex gap-2 justify-between">
          <button
            onClick={() => setFilters({ category: '', priceRange: [0, 1000], inStock: false })}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Reset
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Apply Filters
          </button>
        </div>
      </DrawerFooter>
    </LiveMenuDrawer>
  );
}
```

### Shopping Cart Drawer

```tsx
function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = [
    { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
  ];
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <LiveMenuDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      position="right"
      size="md"
    >
      <DrawerHeader>
        <h2 className="text-xl font-bold">Shopping Cart ({cartItems.length})</h2>
      </DrawerHeader>
      <DrawerBody>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 pb-4 border-b">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="font-medium">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </DrawerBody>
      <DrawerFooter>
        <div className="space-y-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            onClick={() => {
              // Handle checkout
              setIsOpen(false);
            }}
          >
            Checkout
          </button>
        </div>
      </DrawerFooter>
    </LiveMenuDrawer>
  );
}
```

## Styling

The Drawer component uses the following CSS classes:

- `.livemenu-drawer-container` - Main container wrapper
- `.livemenu-drawer` - Drawer panel
- `.livemenu-drawer-header` - Header section
- `.livemenu-drawer-body` - Body section
- `.livemenu-drawer-footer` - Footer section

You can customize the appearance by:

1. Adding custom classes via the `className` prop (for drawer) or `overlayClassName` prop (for backdrop)
2. Using Tailwind utility classes on the sub-components
3. Overriding the default styles in your CSS

### Dark Mode

The Drawer component automatically supports dark mode when used with the LiveMenu theme system.

```tsx
import { ThemeProvider } from '@codearemo/livemenu-ui';

<ThemeProvider>
  <LiveMenuDrawer isOpen={isOpen} onClose={onClose}>
    This will automatically adapt to dark mode
  </LiveMenuDrawer>
</ThemeProvider>
```

## Accessibility

The Drawer component follows WAI-ARIA best practices:

- ✅ Uses proper ARIA role (`dialog`) and `aria-modal` attribute
- ✅ Manages focus automatically when opened
- ✅ Restores focus to previous element when closed
- ✅ Supports keyboard navigation (Escape key to close)
- ✅ Locks body scroll to prevent background scrolling
- ✅ Provides proper close button with `aria-label`
- ✅ Uses semantic HTML structure

### Keyboard Navigation

- **Escape** - Closes the drawer (if `closeOnEscape={true}`)
- **Tab** - Navigate through focusable elements inside the drawer

## Size Reference

### Horizontal Drawers (Left/Right)

- **sm**: 256px (16rem)
- **md**: 320px (20rem)
- **lg**: 384px (24rem)
- **xl**: 512px (32rem)
- **full**: 100% width

### Vertical Drawers (Top/Bottom)

- **sm**: 256px (16rem)
- **md**: 320px (20rem)
- **lg**: 384px (24rem)
- **xl**: 512px (32rem)
- **full**: 100% height

## Best Practices

1. **Use appropriate position**: Left for navigation, right for secondary content, top for notifications, bottom for sheets
2. **Consider mobile**: Use full-width drawers on mobile devices
3. **Keep it focused**: Don't overload the drawer with too much content
4. **Provide clear actions**: Include clear close/cancel/confirm buttons
5. **Use appropriate size**: Match the size to the amount of content
6. **Accessibility**: Always provide a way to close the drawer

## API Reference

### LiveMenuDrawer

Main drawer component that handles the overlay and slide-in panel.

### DrawerHeader

Optional header component for titles and description.

### DrawerBody

Main content area that can scroll if content exceeds available space.

### DrawerFooter

Optional footer component for actions and buttons.

## Tips

- Use `DrawerHeader` for titles and close actions
- Use `DrawerBody` for scrollable content
- Use `DrawerFooter` for action buttons
- Combine with other LiveMenu components like Button, Input, etc.
- Set `dismissable={false}` for important actions that require explicit confirmation
- Use `backdrop={false}` for less intrusive drawers
- Consider using smaller sizes on mobile devices

## Related Components

- [Modal](./modal.md) - For centered overlay dialogs
- [Toast](./toast.md) - For temporary notifications
- [Button](./button.md) - For drawer actions


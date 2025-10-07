# LiveMenuBadge Component Examples

## Import

```tsx
import { LiveMenuBadge } from 'livemenu-ui';
// or
import { Badge } from 'livemenu-ui'; // Legacy alias
```

## Basic Usage

### Simple Badge
```tsx
<LiveMenuBadge>New</LiveMenuBadge>
```

## Variants

### Primary (Orange)
```tsx
<LiveMenuBadge variant="primary">Primary</LiveMenuBadge>
```

### Light (Light Orange)
```tsx
<LiveMenuBadge variant="light">Light</LiveMenuBadge>
```

### Dark (Dark Orange)
```tsx
<LiveMenuBadge variant="dark">Dark</LiveMenuBadge>
```

### Success (Green)
```tsx
<LiveMenuBadge variant="success">Success</LiveMenuBadge>
```

### Danger (Red)
```tsx
<LiveMenuBadge variant="danger">Danger</LiveMenuBadge>
```

### Warning (Yellow)
```tsx
<LiveMenuBadge variant="warning">Warning</LiveMenuBadge>
```

### Info (Blue)
```tsx
<LiveMenuBadge variant="info">Info</LiveMenuBadge>
```

## Sizes

### Small
```tsx
<LiveMenuBadge size="sm" variant="primary">Small</LiveMenuBadge>
```

### Medium (Default)
```tsx
<LiveMenuBadge size="md" variant="primary">Medium</LiveMenuBadge>
```

### Large
```tsx
<LiveMenuBadge size="lg" variant="primary">Large</LiveMenuBadge>
```

## Dot Indicator

### Badge with Dot
```tsx
<LiveMenuBadge dot variant="success">Active</LiveMenuBadge>
```

### Different Variants with Dots
```tsx
<LiveMenuBadge dot variant="primary">New Feature</LiveMenuBadge>
<LiveMenuBadge dot variant="danger">Critical</LiveMenuBadge>
<LiveMenuBadge dot variant="warning">Pending</LiveMenuBadge>
```

## Complete Examples

### Status Badges
```tsx
<div className="flex gap-2">
  <LiveMenuBadge dot variant="success">Online</LiveMenuBadge>
  <LiveMenuBadge dot variant="warning">Away</LiveMenuBadge>
  <LiveMenuBadge dot variant="danger">Offline</LiveMenuBadge>
</div>
```

### Notification Count
```tsx
<div className="relative inline-block">
  <button className="livemenu-btn-outline">
    Messages
  </button>
  <LiveMenuBadge 
    variant="danger" 
    size="sm"
    className="absolute -top-2 -right-2"
  >
    5
  </LiveMenuBadge>
</div>
```

### Product Tags
```tsx
<div className="flex flex-wrap gap-2">
  <LiveMenuBadge variant="primary">Featured</LiveMenuBadge>
  <LiveMenuBadge variant="success">In Stock</LiveMenuBadge>
  <LiveMenuBadge variant="warning">Limited</LiveMenuBadge>
  <LiveMenuBadge variant="info">New Arrival</LiveMenuBadge>
</div>
```

### User Role Badges
```tsx
<div className="flex items-center gap-2">
  <span>John Doe</span>
  <LiveMenuBadge variant="dark" size="sm">Admin</LiveMenuBadge>
</div>
```

### Card with Badge
```tsx
<LiveMenuCard 
  title={
    <div className="flex items-center justify-between">
      <span>Article Title</span>
      <LiveMenuBadge variant="success" size="sm">Published</LiveMenuBadge>
    </div>
  }
>
  <p>Article content goes here...</p>
</LiveMenuCard>
```

### List with Status Indicators
```tsx
<ul className="space-y-2">
  <li className="flex items-center justify-between p-2">
    <span>Task 1</span>
    <LiveMenuBadge dot variant="success">Complete</LiveMenuBadge>
  </li>
  <li className="flex items-center justify-between p-2">
    <span>Task 2</span>
    <LiveMenuBadge dot variant="warning">In Progress</LiveMenuBadge>
  </li>
  <li className="flex items-center justify-between p-2">
    <span>Task 3</span>
    <LiveMenuBadge dot variant="danger">Blocked</LiveMenuBadge>
  </li>
</ul>
```

### Priority Badges
```tsx
<div className="flex gap-2">
  <LiveMenuBadge variant="danger" size="sm">High</LiveMenuBadge>
  <LiveMenuBadge variant="warning" size="sm">Medium</LiveMenuBadge>
  <LiveMenuBadge variant="info" size="sm">Low</LiveMenuBadge>
</div>
```

### Category Tags
```tsx
<div className="flex flex-wrap gap-2">
  <LiveMenuBadge variant="light">React</LiveMenuBadge>
  <LiveMenuBadge variant="light">TypeScript</LiveMenuBadge>
  <LiveMenuBadge variant="light">Tailwind</LiveMenuBadge>
  <LiveMenuBadge variant="light">UI Components</LiveMenuBadge>
</div>
```

### Version Badge
```tsx
<div className="flex items-center gap-2">
  <h3>LiveMenu UI</h3>
  <LiveMenuBadge variant="info" size="sm">v1.0.0</LiveMenuBadge>
</div>
```

## Custom Styling

### With Additional Classes
```tsx
<LiveMenuBadge 
  variant="primary" 
  className="uppercase tracking-wide"
>
  Custom Style
</LiveMenuBadge>
```

### Animated Badge
```tsx
<LiveMenuBadge 
  dot 
  variant="danger"
  className="animate-pulse"
>
  Live
</LiveMenuBadge>
```

## TypeScript Props

```typescript
interface LiveMenuBadgeProps {
  children: React.ReactNode;                           // Required
  variant?: 'primary' | 'light' | 'dark' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;                                       // Show dot indicator
  className?: string;
}
```

## Color Reference

- **primary**: Orange background with dark orange text
- **light**: Light orange background with dark orange text
- **dark**: Dark orange background with white text
- **success**: Green tones
- **danger**: Red tones
- **warning**: Yellow tones
- **info**: Blue tones

## Styling Features

- ✅ **Rounded pill shape** - Fully rounded corners
- ✅ **Small footprint** - Compact design
- ✅ **Hover effects** - Subtle color transitions
- ✅ **Dot indicator** - Optional status dot
- ✅ **Multiple sizes** - sm, md, lg
- ✅ **Semantic colors** - 7 variant options
- ✅ **Flexible** - Works inline or as standalone

## Use Cases

- Status indicators (online, offline, active)
- Notification counts and alerts
- Category and tag labels
- Version and release labels
- Priority indicators
- User role badges
- Product labels (new, sale, featured)
- Progress status (complete, pending, failed)


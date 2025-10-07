# LiveMenuButton Component Examples

## Import

```tsx
import { LiveMenuButton } from 'livemenu-ui';
// or
import { Button } from 'livemenu-ui'; // Legacy alias
```

## Basic Usage

### Primary Button (Default)
```tsx
<LiveMenuButton onClick={() => console.log('Clicked!')}>
  Click Me
</LiveMenuButton>
```

## Variants

### Primary (Orange)
```tsx
<LiveMenuButton variant="primary">
  Primary Button
</LiveMenuButton>
```

### Secondary (Gray)
```tsx
<LiveMenuButton variant="secondary">
  Secondary Button
</LiveMenuButton>
```

### Outline
```tsx
<LiveMenuButton variant="outline">
  Outline Button
</LiveMenuButton>
```

### Light
```tsx
<LiveMenuButton variant="light">
  Light Button
</LiveMenuButton>
```

### Dark
```tsx
<LiveMenuButton variant="dark">
  Dark Button
</LiveMenuButton>
```

### Success (Green)
```tsx
<LiveMenuButton variant="success">
  Success Button
</LiveMenuButton>
```

### Danger (Red)
```tsx
<LiveMenuButton variant="danger">
  Delete Item
</LiveMenuButton>
```

## Sizes

### Small
```tsx
<LiveMenuButton size="sm" variant="primary">
  Small Button
</LiveMenuButton>
```

### Medium (Default)
```tsx
<LiveMenuButton size="md" variant="primary">
  Medium Button
</LiveMenuButton>
```

### Large
```tsx
<LiveMenuButton size="lg" variant="primary">
  Large Button
</LiveMenuButton>
```

## States

### Disabled
```tsx
<LiveMenuButton disabled variant="primary">
  Disabled Button
</LiveMenuButton>
```

### Full Width
```tsx
<LiveMenuButton fullWidth variant="primary">
  Full Width Button
</LiveMenuButton>
```

## Custom Styling

### With Additional Classes
```tsx
<LiveMenuButton 
  variant="primary" 
  className="mt-4 shadow-xl"
>
  Custom Styled Button
</LiveMenuButton>
```

## Event Handlers

### With onClick Handler
```tsx
<LiveMenuButton
  variant="primary"
  onClick={(e) => {
    console.log('Button clicked!', e);
    // Your logic here
  }}
>
  Click Handler
</LiveMenuButton>
```

### Form Submit
```tsx
<form onSubmit={handleSubmit}>
  <LiveMenuButton 
    type="submit" 
    variant="success"
  >
    Submit Form
  </LiveMenuButton>
</form>
```

## Complex Examples

### Button Group
```tsx
<div className="flex gap-2">
  <LiveMenuButton variant="primary">
    Save
  </LiveMenuButton>
  <LiveMenuButton variant="secondary">
    Cancel
  </LiveMenuButton>
  <LiveMenuButton variant="danger">
    Delete
  </LiveMenuButton>
</div>
```

### Responsive Sizes
```tsx
<LiveMenuButton 
  variant="primary"
  className="text-sm md:text-base lg:text-lg"
>
  Responsive Button
</LiveMenuButton>
```

### With Icons (using any icon library)
```tsx
<LiveMenuButton variant="primary">
  <span className="flex items-center gap-2">
    <svg className="w-5 h-5" fill="currentColor">
      {/* Your icon */}
    </svg>
    Save Changes
  </span>
</LiveMenuButton>
```

### Loading State
```tsx
const [loading, setLoading] = useState(false);

<LiveMenuButton 
  variant="primary"
  disabled={loading}
  onClick={async () => {
    setLoading(true);
    await performAction();
    setLoading(false);
  }}
>
  {loading ? 'Loading...' : 'Submit'}
</LiveMenuButton>
```

### Card Actions
```tsx
<div className="livemenu-card">
  <div className="livemenu-card-header">
    Confirm Action
  </div>
  <div className="livemenu-card-body">
    Are you sure you want to proceed?
  </div>
  <div className="livemenu-card-footer flex gap-2">
    <LiveMenuButton 
      variant="danger" 
      size="sm"
      onClick={handleConfirm}
    >
      Confirm
    </LiveMenuButton>
    <LiveMenuButton 
      variant="secondary" 
      size="sm"
      onClick={handleCancel}
    >
      Cancel
    </LiveMenuButton>
  </div>
</div>
```

## TypeScript Props

```typescript
interface LiveMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'dark' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}
```

## Styling Features

All LiveMenuButton components include:

- ✅ **Smooth transitions** - 200ms ease-in-out
- ✅ **Hover effects** - Color changes and shadow
- ✅ **Active states** - Scale transform (0.95)
- ✅ **Focus states** - Orange ring with offset
- ✅ **Disabled styles** - 50% opacity, no pointer events
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Accessible** - Proper ARIA attributes inherited from HTML button

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)


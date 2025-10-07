# LiveMenuCard Component Examples

## Import

```tsx
import { LiveMenuCard } from 'livemenu-ui';
// or
import { Card } from 'livemenu-ui'; // Legacy alias
```

## Basic Usage

### Simple Card with Content Only
```tsx
<LiveMenuCard>
  <p>This is a basic card with just content.</p>
</LiveMenuCard>
```

## Card with Title

### Title Only
```tsx
<LiveMenuCard title="Welcome">
  <p>Card content goes here</p>
</LiveMenuCard>
```

### Title as React Node
```tsx
<LiveMenuCard 
  title={
    <div className="flex items-center gap-2">
      <span>🎉</span>
      <span>Special Card</span>
    </div>
  }
>
  <p>Card with custom title component</p>
</LiveMenuCard>
```

## Card with Title and Subtitle

### String Title and Subtitle
```tsx
<LiveMenuCard 
  title="User Profile" 
  subtitle="Manage your account settings"
>
  <div className="space-y-4">
    <p>Name: John Doe</p>
    <p>Email: john@example.com</p>
  </div>
</LiveMenuCard>
```

### React Node Title and Subtitle
```tsx
<LiveMenuCard 
  title={<h2 className="text-xl font-bold">Dashboard</h2>}
  subtitle={<span className="text-gray-500">Last updated: Today</span>}
>
  <p>Dashboard content here</p>
</LiveMenuCard>
```

## Card with Footer

### Simple Footer
```tsx
<LiveMenuCard 
  title="Confirm Action"
  footer={
    <div className="flex gap-2">
      <button className="livemenu-btn-primary livemenu-btn-sm">
        Confirm
      </button>
      <button className="livemenu-btn-secondary livemenu-btn-sm">
        Cancel
      </button>
    </div>
  }
>
  <p>Are you sure you want to proceed?</p>
</LiveMenuCard>
```

### Footer with Multiple Elements
```tsx
<LiveMenuCard 
  title="Product Details"
  footer={
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">Price: $29.99</span>
      <button className="livemenu-btn-primary livemenu-btn-sm">
        Add to Cart
      </button>
    </div>
  }
>
  <p>Premium product with amazing features.</p>
</LiveMenuCard>
```

## Hoverable Cards

### Basic Hover Effect
```tsx
<LiveMenuCard hoverable>
  <p>Hover over this card to see the shadow effect</p>
</LiveMenuCard>
```

### Clickable Card with Hover
```tsx
<LiveMenuCard 
  hoverable
  onClick={() => console.log('Card clicked!')}
  className="cursor-pointer"
>
  <p>Click me!</p>
</LiveMenuCard>
```

### Card Grid with Hover Effects
```tsx
<div className="grid grid-cols-3 gap-4">
  <LiveMenuCard hoverable title="Card 1">
    <p>First card</p>
  </LiveMenuCard>
  <LiveMenuCard hoverable title="Card 2">
    <p>Second card</p>
  </LiveMenuCard>
  <LiveMenuCard hoverable title="Card 3">
    <p>Third card</p>
  </LiveMenuCard>
</div>
```

## Complete Card Examples

### User Profile Card
```tsx
<LiveMenuCard
  title="John Doe"
  subtitle="Software Engineer"
  hoverable
  footer={
    <div className="flex gap-2">
      <button className="livemenu-btn-primary livemenu-btn-sm">
        View Profile
      </button>
      <button className="livemenu-btn-outline livemenu-btn-sm">
        Message
      </button>
    </div>
  }
>
  <div className="space-y-2">
    <p className="text-sm text-gray-600">
      📧 john.doe@example.com
    </p>
    <p className="text-sm text-gray-600">
      📱 +1 (555) 123-4567
    </p>
    <p className="text-sm text-gray-600">
      📍 San Francisco, CA
    </p>
  </div>
</LiveMenuCard>
```

### Product Card
```tsx
<LiveMenuCard
  hoverable
  title="Premium Package"
  subtitle="Most Popular"
  footer={
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold text-livemenu">$99/mo</span>
      <button className="livemenu-btn-primary livemenu-btn-sm">
        Subscribe
      </button>
    </div>
  }
  className="border-2 border-livemenu"
>
  <ul className="space-y-2">
    <li className="flex items-center gap-2">
      <span className="text-success">✓</span>
      <span>Unlimited access</span>
    </li>
    <li className="flex items-center gap-2">
      <span className="text-success">✓</span>
      <span>Priority support</span>
    </li>
    <li className="flex items-center gap-2">
      <span className="text-success">✓</span>
      <span>Advanced features</span>
    </li>
  </ul>
</LiveMenuCard>
```

### Stats Card
```tsx
<LiveMenuCard
  title="Total Revenue"
  subtitle="Last 30 days"
  hoverable
>
  <div className="space-y-4">
    <div className="text-4xl font-bold text-livemenu">
      $45,231
    </div>
    <div className="text-sm text-success">
      ↑ 12.5% from last month
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-livemenu h-2 rounded-full" 
        style={{ width: '75%' }}
      />
    </div>
  </div>
</LiveMenuCard>
```

### Notification Card
```tsx
<LiveMenuCard
  title={
    <div className="flex items-center justify-between">
      <span>New Message</span>
      <span className="livemenu-badge-primary">Unread</span>
    </div>
  }
  subtitle="2 minutes ago"
  footer={
    <button className="livemenu-btn-outline livemenu-btn-sm w-full">
      Mark as Read
    </button>
  }
>
  <p className="text-gray-700">
    You have a new message from Sarah. Click to view the full conversation.
  </p>
</LiveMenuCard>
```

### Form Card
```tsx
<LiveMenuCard
  title="Login"
  subtitle="Enter your credentials"
  footer={
    <div className="flex flex-col gap-2">
      <button className="livemenu-btn-primary w-full">
        Sign In
      </button>
      <button className="livemenu-btn-outline w-full">
        Sign Up
      </button>
    </div>
  }
>
  <form className="space-y-4">
    <div>
      <label className="livemenu-label">Email</label>
      <input 
        type="email" 
        className="livemenu-input" 
        placeholder="Enter your email"
      />
    </div>
    <div>
      <label className="livemenu-label">Password</label>
      <input 
        type="password" 
        className="livemenu-input" 
        placeholder="Enter your password"
      />
    </div>
  </form>
</LiveMenuCard>
```

## Custom Styling

### With Additional Classes
```tsx
<LiveMenuCard 
  title="Custom Styled Card"
  className="shadow-2xl border-2 border-livemenu"
>
  <p>This card has custom styling applied</p>
</LiveMenuCard>
```

### Card with Background Color
```tsx
<LiveMenuCard 
  title="Info Card"
  className="bg-info-50 border-info-200"
>
  <p>This is an informational card with custom background</p>
</LiveMenuCard>
```

## Responsive Cards

### Mobile-Friendly Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <LiveMenuCard title="Card 1" hoverable>
    <p>Responsive card content</p>
  </LiveMenuCard>
  <LiveMenuCard title="Card 2" hoverable>
    <p>Responsive card content</p>
  </LiveMenuCard>
  <LiveMenuCard title="Card 3" hoverable>
    <p>Responsive card content</p>
  </LiveMenuCard>
</div>
```

### Stack on Mobile
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <LiveMenuCard 
    title="Desktop View"
    className="flex-1"
  >
    <p>Stacks vertically on mobile, horizontal on desktop</p>
  </LiveMenuCard>
  <LiveMenuCard 
    title="Desktop View"
    className="flex-1"
  >
    <p>Stacks vertically on mobile, horizontal on desktop</p>
  </LiveMenuCard>
</div>
```

## TypeScript Props

```typescript
interface LiveMenuCardProps {
  children: React.ReactNode;           // Required
  title?: string | React.ReactNode;    // Optional
  subtitle?: string | React.ReactNode; // Optional
  footer?: React.ReactNode;            // Optional
  hoverable?: boolean;                 // Optional (default: false)
  className?: string;                  // Optional
}
```

## Styling Features

All LiveMenuCard components include:

- ✅ **White background** - Clean, professional look
- ✅ **Rounded corners** - Modern design with border-radius
- ✅ **Shadow** - Subtle elevation effect
- ✅ **Border** - Light gray border for definition
- ✅ **Conditional header** - Only renders if title/subtitle provided
- ✅ **Padded content** - Comfortable spacing (px-6 py-4)
- ✅ **Gray footer** - Visually separated footer section
- ✅ **Hover effects** - Enhanced shadow when hoverable is true
- ✅ **Responsive** - Works on all screen sizes

## Use Cases

- User profiles and contact cards
- Product listings and pricing cards
- Dashboard widgets and stats
- Form containers
- Notification and alert displays
- Blog post previews
- Settings panels
- Feature highlights
- Image galleries with captions
- Comment and review cards


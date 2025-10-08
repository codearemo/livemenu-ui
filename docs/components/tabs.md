# Tabs

A flexible and accessible tabs component for LiveMenu UI with multiple variants and full keyboard navigation support.

## Installation

Make sure you have `@codearemo/livemenu-ui` installed in your project.

```bash
npm install @codearemo/livemenu-ui
```

## Basic Usage

```tsx
import { LiveMenuTabs } from '@codearemo/livemenu-ui';

const tabs = [
  { id: 'profile', label: 'Profile', content: <div>Profile content</div> },
  { id: 'settings', label: 'Settings', content: <div>Settings content</div> },
  { id: 'notifications', label: 'Notifications', content: <div>Notifications content</div> }
];

function App() {
  return (
    <LiveMenuTabs tabs={tabs} defaultActiveTab="profile" />
  );
}
```

## Props

### LiveMenuTabsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| tabs | `TabItem[]` | **required** | Array of tab items to display |
| defaultActiveTab | `string` | First tab's id | ID of the initially active tab (uncontrolled) |
| activeTab | `string` | - | Controlled active tab ID |
| onChange | `(tabId: string) => void` | - | Callback when tab changes |
| variant | `'underline' \| 'pills' \| 'bordered'` | `'underline'` | Tab variant style |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab size |
| fullWidth | `boolean` | `false` | Whether tabs should take full width |
| className | `string` | `''` | Additional CSS classes for container |
| tabListClassName | `string` | `''` | Additional CSS classes for tab list |
| contentClassName | `string` | `''` | Additional CSS classes for content area |

### TabItem

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| id | `string` | ✅ | Unique identifier for the tab |
| label | `string` | ✅ | Label to display on the tab |
| content | `React.ReactNode` | ✅ | Content to display when tab is active |
| disabled | `boolean` | - | Whether the tab is disabled |
| icon | `React.ReactNode` | - | Optional icon to display before the label |
| badge | `string \| number` | - | Optional badge to display after the label |

## Examples

### Basic Tabs (Underline Variant)

```tsx
const tabs = [
  { id: 'home', label: 'Home', content: <div>Home content</div> },
  { id: 'about', label: 'About', content: <div>About content</div> },
  { id: 'contact', label: 'Contact', content: <div>Contact content</div> }
];

<LiveMenuTabs tabs={tabs} />
```

### Pills Variant

```tsx
<LiveMenuTabs 
  tabs={tabs} 
  variant="pills"
  defaultActiveTab="home"
/>
```

### Bordered Variant

```tsx
<LiveMenuTabs 
  tabs={tabs} 
  variant="bordered"
  defaultActiveTab="home"
/>
```

### With Icons

```tsx
const tabs = [
  { 
    id: 'user', 
    label: 'Profile', 
    icon: <UserIcon className="w-4 h-4" />,
    content: <div>Profile content</div> 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: <SettingsIcon className="w-4 h-4" />,
    content: <div>Settings content</div> 
  }
];

<LiveMenuTabs tabs={tabs} />
```

### With Badges

```tsx
const tabs = [
  { id: 'inbox', label: 'Inbox', badge: 12, content: <div>Inbox content</div> },
  { id: 'sent', label: 'Sent', content: <div>Sent content</div> },
  { id: 'drafts', label: 'Drafts', badge: 3, content: <div>Drafts content</div> }
];

<LiveMenuTabs tabs={tabs} />
```

### Disabled Tabs

```tsx
const tabs = [
  { id: 'tab1', label: 'Active Tab', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Disabled Tab', content: <div>Content 2</div>, disabled: true },
  { id: 'tab3', label: 'Another Tab', content: <div>Content 3</div> }
];

<LiveMenuTabs tabs={tabs} />
```

### Full Width Tabs

```tsx
<LiveMenuTabs 
  tabs={tabs} 
  fullWidth
  variant="pills"
/>
```

### Different Sizes

```tsx
// Small
<LiveMenuTabs tabs={tabs} size="sm" />

// Medium (default)
<LiveMenuTabs tabs={tabs} size="md" />

// Large
<LiveMenuTabs tabs={tabs} size="lg" />
```

### Controlled Tabs

```tsx
function ControlledExample() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = [
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
    { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> }
  ];

  return (
    <div>
      <LiveMenuTabs 
        tabs={tabs} 
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <p>Current tab: {activeTab}</p>
    </div>
  );
}
```

### With Custom Styling

```tsx
<LiveMenuTabs 
  tabs={tabs}
  className="my-custom-tabs"
  tabListClassName="custom-tab-list"
  contentClassName="custom-content"
/>
```

### Complex Content

```tsx
const tabs = [
  { 
    id: 'overview', 
    label: 'Overview',
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p>Welcome to your dashboard!</p>
        <div className="grid grid-cols-3 gap-4">
          <Card>Stat 1</Card>
          <Card>Stat 2</Card>
          <Card>Stat 3</Card>
        </div>
      </div>
    )
  },
  { 
    id: 'analytics', 
    label: 'Analytics',
    badge: 'New',
    content: (
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Chart data={analyticsData} />
      </div>
    )
  }
];

<LiveMenuTabs tabs={tabs} variant="pills" />
```

## Styling

The Tabs component uses the following CSS classes:

- `.livemenu-tabs` - Base container class
- `.livemenu-tabs-list` - Tab list container
- `.livemenu-tab` - Individual tab button
- `.livemenu-tab-icon` - Tab icon wrapper
- `.livemenu-tab-label` - Tab label text
- `.livemenu-tab-badge` - Tab badge
- `.livemenu-tabs-content` - Content area

You can customize the appearance by:

1. Adding custom classes via the `className`, `tabListClassName`, or `contentClassName` props
2. Overriding the default styles in your CSS
3. Using Tailwind utility classes

### Dark Mode

The Tabs component automatically supports dark mode when used with the LiveMenu theme system.

```tsx
import { ThemeProvider } from '@codearemo/livemenu-ui';

<ThemeProvider>
  <LiveMenuTabs tabs={tabs}>
    This will automatically adapt to dark mode
  </LiveMenuTabs>
</ThemeProvider>
```

## Accessibility

The Tabs component follows WAI-ARIA best practices:

- ✅ Uses proper ARIA roles (`tablist`, `tab`, `tabpanel`)
- ✅ Implements `aria-selected` for active tabs
- ✅ Links tabs to panels with `aria-controls` and `aria-labelledby`
- ✅ Supports keyboard navigation (Tab, Shift+Tab)
- ✅ Provides focus indicators
- ✅ Properly handles disabled states
- ✅ Uses semantic HTML (`button` elements for tabs)

### Keyboard Navigation

- **Tab** - Move focus to the next focusable element
- **Shift + Tab** - Move focus to the previous focusable element
- **Click/Enter/Space** - Activate the focused tab

## Variants

### Underline (Default)
Clean underline style with a colored border for the active tab.

### Pills
Rounded pill-shaped tabs with filled background for the active tab.

### Bordered
Traditional bordered tabs with a connected content area.

## API Reference

### LiveMenuTabs

```tsx
interface LiveMenuTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  tabListClassName?: string;
  contentClassName?: string;
}

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}
```

## Notes

- This component is fully typed with TypeScript
- Supports both controlled and uncontrolled modes
- Automatically manages focus and keyboard navigation
- The component is exported as both `LiveMenuTabs` and `Tabs` (legacy)
- All standard HTML div attributes are supported via spread props
- Badge styling adapts to the theme colors

## Best Practices

1. **Use meaningful tab IDs** - Make them descriptive and unique
2. **Keep tab labels concise** - Short, clear labels work best
3. **Limit the number of tabs** - Too many tabs can overwhelm users (consider 3-7 tabs)
4. **Use badges sparingly** - Only for important notifications
5. **Consider mobile responsiveness** - Use `fullWidth` or smaller sizes on mobile
6. **Provide feedback** - Use the `onChange` callback to track user interactions
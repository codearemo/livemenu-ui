# LiveMenuModal Component

A powerful, flexible modal system with programmatic triggering, modal stacking, and extensive customization options.

## Features

✨ **Programmatic Control** - Trigger modals from anywhere in your app  
📚 **Modal Stacking** - Support for multiple modals stacked on top of each other  
🎨 **5 Size Options** - sm, md, lg, xl, full  
🔒 **Dismissable Options** - Control backdrop and ESC key dismissal  
♿ **Accessible** - Full keyboard navigation and ARIA support  
🎯 **Focus Management** - Automatic focus trap and restoration  
🌙 **Dark Mode** - Full dark mode support  
⚡ **TypeScript** - Complete type safety

---

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
  - [Using Hooks](#using-hooks)
  - [Programmatic (No Hooks)](#programmatic-no-hooks)
  - [Component-based](#component-based)
- [Options](#options)
- [Examples](#examples)
- [API Reference](#api-reference)

---

## Setup

### 1. Wrap Your App with ModalProvider

To use the modal system, wrap your application with `LiveMenuModalProvider`:

```tsx
import { LiveMenuModalProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

function App() {
  return (
    <LiveMenuModalProvider>
      {/* Your app components */}
    </LiveMenuModalProvider>
  );
}
```

### 2. Optional: Custom Base Z-Index

```tsx
<LiveMenuModalProvider baseZIndex={2000}>
  {/* Your app */}
</LiveMenuModalProvider>
```

---

## Usage

### Using Hooks

The recommended way to use modals within React components:

```tsx
import { useModal } from 'livemenu-ui';

function MyComponent() {
  const { showModal, hideModal, hideAllModals } = useModal();

  const handleOpenModal = () => {
    const modalId = showModal(MyModalContent, {
      size: 'md',
      dismissable: true,
      showCloseButton: true,
      props: {
        title: 'Hello World',
        onConfirm: () => console.log('Confirmed!')
      }
    });
    
    // Store modalId if you need to close it programmatically
  };

  return (
    <button onClick={handleOpenModal}>
      Open Modal
    </button>
  );
}

// Your modal content component
function MyModalContent({ title, onConfirm, onClose }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p>Modal content goes here</p>
      <div className="flex gap-2 mt-6">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
```

### Programmatic (No Hooks)

Use modals outside of React components (e.g., in utility functions, event handlers):

```tsx
import { showModal, hideModal, hideAllModals } from 'livemenu-ui';

// In any JavaScript/TypeScript file
function handleApiError(error) {
  showModal(ErrorModal, {
    size: 'sm',
    dismissable: false,
    props: {
      error: error.message
    }
  });
}

// Close specific modal
const modalId = showModal(ConfirmModal, { /* options */ });
hideModal(modalId);

// Close all modals
hideAllModals();
```

### Component-based

Use the modal component directly with your own state management:

```tsx
import { LiveMenuModal } from 'livemenu-ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <LiveMenuModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="md"
        dismissable={true}
        showCloseButton={true}
      >
        <div className="p-4">
          <h2>My Modal</h2>
          <p>Content here</p>
        </div>
      </LiveMenuModal>
    </>
  );
}
```

---

## Options

All modal options are optional with sensible defaults:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `dismissable` | `boolean` | `true` | Allow closing on backdrop click |
| `showCloseButton` | `boolean` | `true` | Show the X close button |
| `backdrop` | `boolean` | `true` | Show backdrop overlay |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key press |
| `className` | `string` | `''` | Additional modal content classes |
| `overlayClassName` | `string` | `''` | Additional overlay classes |
| `zIndex` | `number` | Auto | Custom z-index (auto-incremented for stacking) |
| `props` | `object` | `{}` | Props to pass to modal content component |

---

## Examples

### Basic Confirmation Dialog

```tsx
import { showModal, LiveMenuButton } from 'livemenu-ui';

function ConfirmDialog({ message, onConfirm, onClose }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <LiveMenuButton variant="outline" onClick={onClose}>
          Cancel
        </LiveMenuButton>
        <LiveMenuButton 
          variant="primary" 
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </LiveMenuButton>
      </div>
    </div>
  );
}

// Usage
function deleteItem(id) {
  showModal(ConfirmDialog, {
    size: 'sm',
    dismissable: false,
    props: {
      message: 'Are you sure you want to delete this item?',
      onConfirm: () => {
        // Delete logic here
        console.log('Item deleted');
      }
    }
  });
}
```

### Form Modal

```tsx
import { useModal, LiveMenuInput, LiveMenuButton, LiveMenuCard } from 'livemenu-ui';

function EditUserModal({ user, onSave, onClose }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, name, email });
    onClose();
  };

  return (
    <div className="min-w-[400px]">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <LiveMenuInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <LiveMenuInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <LiveMenuButton type="button" variant="outline" onClick={onClose}>
            Cancel
          </LiveMenuButton>
          <LiveMenuButton type="submit" variant="primary">
            Save Changes
          </LiveMenuButton>
        </div>
      </form>
    </div>
  );
}

// Usage
function UserList() {
  const { showModal } = useModal();

  const handleEditUser = (user) => {
    showModal(EditUserModal, {
      size: 'md',
      props: {
        user,
        onSave: (updatedUser) => {
          // Save logic here
          console.log('User saved:', updatedUser);
        }
      }
    });
  };

  return (
    <button onClick={() => handleEditUser({ id: 1, name: 'John', email: 'john@example.com' })}>
      Edit User
    </button>
  );
}
```

### Stacked Modals

```tsx
import { showModal, LiveMenuButton } from 'livemenu-ui';

function FirstModal({ onClose }) {
  const openSecondModal = () => {
    showModal(SecondModal, {
      size: 'sm',
      props: {}
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">First Modal</h2>
      <p className="mb-4">This is the first modal.</p>
      <LiveMenuButton onClick={openSecondModal}>
        Open Second Modal
      </LiveMenuButton>
    </div>
  );
}

function SecondModal({ onClose }) {
  const openThirdModal = () => {
    showModal(ThirdModal, {
      size: 'sm',
      props: {}
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Second Modal</h2>
      <p className="mb-4">This modal is stacked on top!</p>
      <LiveMenuButton onClick={openThirdModal}>
        Open Third Modal
      </LiveMenuButton>
    </div>
  );
}

function ThirdModal({ onClose }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Third Modal</h2>
      <p className="mb-4">Even more modals! 🎉</p>
      <LiveMenuButton onClick={onClose}>
        Close This Modal
      </LiveMenuButton>
    </div>
  );
}
```

### Non-Dismissable Modal

```tsx
import { showModal } from 'livemenu-ui';

function LoadingModal() {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-livemenu mx-auto mb-4"></div>
      <p>Processing your request...</p>
      <p className="text-sm text-gray-500 mt-2">Please wait</p>
    </div>
  );
}

// Usage
const modalId = showModal(LoadingModal, {
  size: 'sm',
  dismissable: false,
  showCloseButton: false,
  closeOnEscape: false
});

// Close it programmatically when done
setTimeout(() => {
  hideModal(modalId);
}, 3000);
```

### Full-Screen Modal

```tsx
import { showModal } from 'livemenu-ui';

function FullScreenPreview({ imageUrl, onClose }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Image Preview</h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src={imageUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
      </div>
    </div>
  );
}

// Usage
showModal(FullScreenPreview, {
  size: 'full',
  props: {
    imageUrl: 'https://example.com/image.jpg'
  }
});
```

### Alert Modal with Auto-Close

```tsx
import { showModal, hideModal } from 'livemenu-ui';

function AlertModal({ type, message, onClose }) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const colors = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-info'
  };

  return (
    <div className="text-center py-6">
      <div className={`text-5xl mb-4 ${colors[type]}`}>
        {icons[type]}
      </div>
      <p className="text-lg">{message}</p>
    </div>
  );
}

// Usage with auto-close
function showAlert(type, message, duration = 2000) {
  const modalId = showModal(AlertModal, {
    size: 'sm',
    showCloseButton: false,
    props: { type, message }
  });

  setTimeout(() => {
    hideModal(modalId);
  }, duration);
}

// Call it
showAlert('success', 'Item saved successfully!');
```

### Modal with LiveMenuCard

```tsx
import { showModal, LiveMenuCard, LiveMenuButton } from 'livemenu-ui';

function CardModal({ onClose }) {
  return (
    <LiveMenuCard
      title="Welcome!"
      subtitle="Get started with our platform"
      footer={
        <div className="flex justify-end gap-2">
          <LiveMenuButton variant="outline" onClick={onClose}>
            Maybe Later
          </LiveMenuButton>
          <LiveMenuButton variant="primary">
            Get Started
          </LiveMenuButton>
        </div>
      }
    >
      <p className="mb-4">
        Welcome to our platform! We're excited to have you here.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
    </LiveMenuCard>
  );
}

showModal(CardModal, {
  size: 'md',
  className: 'p-0' // Remove default padding since Card has its own
});
```

---

## API Reference

### LiveMenuModalProvider

The context provider that manages modal state.

```tsx
<LiveMenuModalProvider baseZIndex={1000}>
  {children}
</LiveMenuModalProvider>
```

**Props:**
- `baseZIndex` (optional): Base z-index for modals. Default: `1000`
- `children`: React nodes

---

### useModal()

Hook that returns modal control functions.

```tsx
const { showModal, hideModal, hideAllModals } = useModal();
```

**Returns:**
- `showModal(component, options)`: Show a modal, returns modal ID
- `hideModal(id)`: Hide a specific modal
- `hideAllModals()`: Hide all open modals

---

### showModal()

Programmatically show a modal (can be used outside React components).

```tsx
const modalId = showModal(MyComponent, {
  size: 'md',
  dismissable: true,
  showCloseButton: true,
  props: { /* component props */ }
});
```

**Parameters:**
- `component`: React component to render
- `options`: Modal options (see [Options](#options))

**Returns:** `string` - Modal ID for later reference

---

### hideModal()

Hide a specific modal by ID.

```tsx
hideModal(modalId);
```

**Parameters:**
- `id`: Modal ID returned from `showModal()`

---

### hideAllModals()

Close all open modals.

```tsx
hideAllModals();
```

---

### LiveMenuModal

The base modal component for state-based usage.

```tsx
<LiveMenuModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="md"
  dismissable={true}
  showCloseButton={true}
>
  {children}
</LiveMenuModal>
```

**Props:**
- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- All options from [Options](#options)
- `children`: React nodes

---

## Accessibility

The modal system includes comprehensive accessibility features:

- **Focus Management**: Automatically focuses the modal when opened and restores focus when closed
- **Keyboard Navigation**: ESC key support (configurable)
- **ARIA Attributes**: `role="dialog"`, `aria-modal="true"`
- **Screen Reader Support**: Proper labeling and descriptions
- **Focus Trap**: Keeps focus within the modal when open
- **Body Scroll Lock**: Prevents background scrolling when modal is open

---

## Dark Mode

The modal system fully supports dark mode through the `LiveMenuThemeProvider`:

```tsx
import { LiveMenuThemeProvider, LiveMenuModalProvider } from 'livemenu-ui';

function App() {
  return (
    <LiveMenuThemeProvider>
      <LiveMenuModalProvider>
        {/* Your app */}
      </LiveMenuModalProvider>
    </LiveMenuThemeProvider>
  );
}
```

Dark mode styling is applied automatically based on the current theme.

---

## Best Practices

### 1. Keep Modal Content Components Pure

```tsx
// ✅ Good: Pure component with props
function ConfirmModal({ title, message, onConfirm, onClose }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
}

// ❌ Avoid: Component with hard-coded content
function ConfirmModal({ onClose }) {
  return <div>Hard-coded content</div>;
}
```

### 2. Always Provide onClose to Modal Content

The modal system passes `onClose` and `modalId` to your component:

```tsx
function MyModal({ onClose, modalId, ...otherProps }) {
  // Use onClose to close the modal
  return <button onClick={onClose}>Close</button>;
}
```

### 3. Use Appropriate Sizes

- `sm`: Alerts, confirmations (300px)
- `md`: Forms, content (500px) - default
- `lg`: Detailed forms (800px)
- `xl`: Complex content (1000px)
- `full`: Full-screen experiences

### 4. Handle Async Operations

```tsx
function SaveModal({ onSave, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave();
      onClose(); // Close after success
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSave} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
```

### 5. Clean Up Modal State

When using modals with forms, reset form state when modal closes:

```tsx
function FormModal({ onClose }) {
  const [formData, setFormData] = useState(initialState);

  const handleClose = () => {
    setFormData(initialState); // Reset form
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="button" onClick={handleClose}>Cancel</button>
    </form>
  );
}
```

---

## Troubleshooting

### Modal not showing

**Problem:** Modal doesn't appear when `showModal()` is called.

**Solution:** Ensure `LiveMenuModalProvider` is wrapped around your app:

```tsx
// ✅ Correct
<LiveMenuModalProvider>
  <App />
</LiveMenuModalProvider>

// ❌ Wrong
<App />
```

### Error: "Modal system not initialized"

**Problem:** Using `showModal()` programmatically before provider is mounted.

**Solution:** Make sure the provider is mounted before calling programmatic functions, or use the hook version inside components.

### Multiple modals have same z-index

**Problem:** Modals overlap incorrectly.

**Solution:** Let the system handle z-index automatically, or set a higher `baseZIndex` in the provider:

```tsx
<LiveMenuModalProvider baseZIndex={2000}>
```

### Modal not scrolling on small screens

**Problem:** Modal content is cut off on mobile.

**Solution:** The modal has `max-h-[90vh]` and `overflow-auto` built in. Ensure your content doesn't have fixed heights.

---

## TypeScript Support

Full TypeScript support with type inference:

```tsx
import { showModal, ModalOptions } from 'livemenu-ui';

interface MyModalProps {
  title: string;
  count: number;
  onConfirm: () => void;
}

function MyModal({ title, count, onConfirm, onClose }: MyModalProps & { onClose: () => void }) {
  return <div>{title}: {count}</div>;
}

// Type-safe usage
showModal(MyModal, {
  size: 'md',
  props: {
    title: 'Hello',
    count: 42,
    onConfirm: () => {}
  }
});
```

---

## License

MIT License - Part of the LiveMenu UI component library.


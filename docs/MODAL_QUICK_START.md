# Modal System - Quick Start Guide

Get the LiveMenu Modal system up and running in 5 minutes!

## Step 1: Setup (One-time)

Wrap your app with `LiveMenuModalProvider`:

```tsx
// App.tsx or main.tsx
import { LiveMenuModalProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

function App() {
  return (
    <LiveMenuModalProvider>
      {/* Your app components */}
      <YourApp />
    </LiveMenuModalProvider>
  );
}

export default App;
```

## Step 2: Create Your Modal Content

Create a component for your modal content:

```tsx
// components/WelcomeModal.tsx
import { LiveMenuButton } from 'livemenu-ui';

function WelcomeModal({ userName, onClose }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {userName}! 👋
      </h2>
      <p className="mb-6 text-gray-600">
        Thanks for joining our platform. Let's get you started!
      </p>
      <div className="flex gap-3">
        <LiveMenuButton variant="primary" onClick={onClose}>
          Get Started
        </LiveMenuButton>
        <LiveMenuButton variant="outline" onClick={onClose}>
          Maybe Later
        </LiveMenuButton>
      </div>
    </div>
  );
}

export default WelcomeModal;
```

## Step 3: Trigger the Modal

### Option A: Programmatic (Anywhere in your app)

```tsx
import { showModal } from 'livemenu-ui';
import WelcomeModal from './components/WelcomeModal';

// Call this from anywhere - event handlers, utilities, etc.
function handleShowWelcome() {
  showModal(WelcomeModal, {
    size: 'md',
    dismissable: true,
    showCloseButton: true,
    props: {
      userName: 'John'
    }
  });
}

// Use it
<button onClick={handleShowWelcome}>
  Show Welcome
</button>
```

### Option B: Using Hook (Inside React Components)

```tsx
import { useModal } from 'livemenu-ui';
import WelcomeModal from './components/WelcomeModal';

function MyComponent() {
  const { showModal, hideModal, hideAllModals } = useModal();

  const handleClick = () => {
    const modalId = showModal(WelcomeModal, {
      size: 'md',
      props: {
        userName: 'John'
      }
    });

    // You can close it later programmatically if needed
    // hideModal(modalId);
  };

  return (
    <button onClick={handleClick}>
      Show Welcome
    </button>
  );
}
```

## Common Use Cases

### 1. Confirmation Dialog

```tsx
import { showModal } from 'livemenu-ui';

function ConfirmDialog({ message, onConfirm, onClose }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
      <p className="mb-6">{message}</p>
      <div className="flex gap-2 justify-end">
        <button onClick={onClose} className="px-4 py-2">
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="px-4 py-2 bg-livemenu text-white rounded"
        >
          Confirm
        </button>
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
        // Your delete logic here
        console.log('Item deleted:', id);
      }
    }
  });
}
```

### 2. Form Modal

```tsx
import { LiveMenuInput, LiveMenuButton } from 'livemenu-ui';
import { useState } from 'react';

function EditProfileModal({ user, onSave, onClose }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, email });
    onClose();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <LiveMenuInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <LiveMenuInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <LiveMenuButton type="button" variant="outline" onClick={onClose}>
            Cancel
          </LiveMenuButton>
          <LiveMenuButton type="submit" variant="primary">
            Save
          </LiveMenuButton>
        </div>
      </form>
    </div>
  );
}

// Usage
showModal(EditProfileModal, {
  size: 'md',
  props: {
    user: { name: 'John', email: 'john@example.com' },
    onSave: (data) => console.log('Saved:', data)
  }
});
```

### 3. Loading Indicator

```tsx
import { showModal, hideModal } from 'livemenu-ui';

function LoadingModal() {
  return (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-livemenu mx-auto mb-4"></div>
      <p>Loading...</p>
    </div>
  );
}

// Show loading
const loadingId = showModal(LoadingModal, {
  size: 'sm',
  dismissable: false,
  showCloseButton: false,
  closeOnEscape: false
});

// Hide loading when done
setTimeout(() => {
  hideModal(loadingId);
}, 2000);
```

### 4. Multiple Stacked Modals

```tsx
function FirstModal({ onClose }) {
  const openSecondModal = () => {
    showModal(SecondModal, {
      size: 'md',
      props: {}
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">First Modal</h2>
      <button onClick={openSecondModal} className="px-4 py-2 bg-livemenu text-white rounded">
        Open Another Modal
      </button>
    </div>
  );
}

function SecondModal({ onClose }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Second Modal</h2>
      <p>This modal is stacked on top!</p>
    </div>
  );
}

// First modal opens
showModal(FirstModal, { size: 'lg' });
// User clicks button → second modal appears on top
```

## Modal Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal width |
| `dismissable` | `boolean` | `true` | Close on backdrop click |
| `showCloseButton` | `boolean` | `true` | Show X button |
| `backdrop` | `boolean` | `true` | Show dark backdrop |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key |
| `className` | `string` | `''` | Extra CSS classes |
| `props` | `object` | `{}` | Props for your modal component |

## Size Guide

- **`sm`** - Small (max-w-sm, ~384px) - Perfect for alerts, confirmations
- **`md`** - Medium (max-w-md, ~448px) - Default, good for most forms
- **`lg`** - Large (max-w-lg, ~512px) - Detailed forms
- **`xl`** - Extra Large (max-w-xl, ~576px) - Complex content
- **`full`** - Full Screen - Image galleries, previews

## Tips

1. **Always pass `onClose` prop**: Your modal component receives this automatically
2. **Use `dismissable: false`** for critical actions like confirmations
3. **Stack modals wisely**: Keep it to 2-3 levels max
4. **Loading states**: Disable buttons during async operations
5. **Auto-close alerts**: Use `hideModal(id)` after a timeout for success messages

## Troubleshooting

**Modal doesn't show?**
- Make sure `LiveMenuModalProvider` wraps your app
- Check console for errors

**Multiple modals overlap weirdly?**
- They auto-stack with increasing z-index
- Set custom `baseZIndex` in provider if needed: `<LiveMenuModalProvider baseZIndex={2000}>`

**Can't close modal on backdrop click?**
- This is controlled by `dismissable` option
- Set `dismissable: true` (default)

## Next Steps

- [Full Modal Documentation](./components/modal.md)
- [Complete Modal Examples](./examples/MODAL_EXAMPLES.md)
- [API Reference](./components/modal.md#api-reference)

---

**That's it!** You're ready to use the modal system. Check out the examples above and the full documentation for more advanced use cases. 🎉


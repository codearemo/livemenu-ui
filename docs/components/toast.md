# LiveMenuToast - Notification/Toast System

A comprehensive notification/toast system with multiple variants, stacking support, and extensive customization options.

## Features

✨ **5 Variants** - success, error, warning, info, default  
📚 **Multiple Toasts** - Stack multiple toasts at once  
📍 **6 Positions** - top-right, top-left, top-center, bottom-right, bottom-left, bottom-center  
⏱️ **Auto-dismiss** - Configurable duration with progress bar  
🎨 **Icons Included** - Default icons for each variant  
🔘 **Action Buttons** - Optional action button support  
🎯 **Programmatic API** - Trigger from anywhere  
⚡ **Hook Support** - `useToast()` for React components  
📦 **Helper Functions** - `showSuccessToast`, `showErrorToast`, etc.  
♿ **Accessible** - ARIA support  
🌙 **Dark Mode** - Full dark mode support  
🎬 **Smooth Animations** - Slide in/out with progress indicator

---

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
- [Options](#options)
- [Positions](#positions)
- [Examples](#examples)
- [API Reference](#api-reference)

---

## Quick Start

### 1. Setup

Wrap your app with `LiveMenuToastProvider`:

```tsx
import { LiveMenuToastProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

function App() {
  return (
    <LiveMenuToastProvider>
      {/* Your app components */}
    </LiveMenuToastProvider>
  );
}
```

### 2. Use Toasts

```tsx
import { useToast } from 'livemenu-ui';

function MyComponent() {
  const { showToast } = useToast();

  const handleClick = () => {
    showToast('Operation successful!', {
      variant: 'success',
      duration: 3000
    });
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

### 3. Or Use Standalone Functions

```tsx
import { showSuccessToast, showErrorToast } from 'livemenu-ui';

// Anywhere in your app
showSuccessToast('Saved successfully!');
showErrorToast('Failed to save');
```

---

## Usage

### Using the Hook

```tsx
import { useToast } from 'livemenu-ui';

function MyComponent() {
  const { showToast, hideToast, hideAllToasts } = useToast();

  const handleSuccess = () => {
    showToast('Operation completed!', {
      variant: 'success',
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleWithAction = () => {
    showToast('File deleted', {
      variant: 'default',
      action: {
        label: 'Undo',
        onClick: () => {
          console.log('Undo clicked');
          restoreFile();
        }
      }
    });
  };

  return (
    <>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleWithAction}>Delete with Undo</button>
    </>
  );
}
```

### Using Standalone Functions

```tsx
import {
  showToast,
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast
} from 'livemenu-ui';

// Generic toast
showToast('Hello!', { variant: 'default' });

// Helper functions
showSuccessToast('Saved!');
showErrorToast('Failed!');
showWarningToast('Be careful!');
showInfoToast('Did you know?');

// With options
showSuccessToast('Item added to cart', {
  duration: 2000,
  position: 'bottom-right',
  action: {
    label: 'View Cart',
    onClick: () => router.push('/cart')
  }
});
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info' \| 'default'` | `'default'` | Toast style variant |
| `duration` | `number` | `5000` | Auto-dismiss time in ms (0 = no auto-dismiss) |
| `position` | `ToastPosition` | `'top-right'` | Toast position |
| `dismissible` | `boolean` | `true` | Show close button |
| `icon` | `ReactNode` | Auto | Custom icon (or `null` to hide) |
| `action` | `ToastAction` | `undefined` | Action button config |
| `showProgress` | `boolean` | `true` | Show progress bar |
| `onDismiss` | `() => void` | `undefined` | Callback when toast is dismissed |

### ToastAction Interface

```tsx
interface ToastAction {
  label: string;
  onClick: () => void;
}
```

---

## Positions

Available positions for toasts:

- **`top-right`** - Top right corner (default)
- **`top-left`** - Top left corner
- **`top-center`** - Top center
- **`bottom-right`** - Bottom right corner
- **`bottom-left`** - Bottom left corner
- **`bottom-center`** - Bottom center

```tsx
showToast('Message', { position: 'bottom-center' });
```

---

## Provider Options

Configure defaults for all toasts:

```tsx
<LiveMenuToastProvider
  defaultPosition="top-right"
  maxToasts={5}
  defaultDuration={5000}
>
  <App />
</LiveMenuToastProvider>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultPosition` | `ToastPosition` | `'top-right'` | Default position |
| `maxToasts` | `number` | `5` | Max toasts to show at once |
| `defaultDuration` | `number` | `5000` | Default auto-dismiss time (ms) |

---

## Examples

### 1. Success Toast

```tsx
import { showSuccessToast } from 'livemenu-ui';

showSuccessToast('Item saved successfully!');

// With options
showSuccessToast('Profile updated!', {
  duration: 3000,
  position: 'top-center'
});
```

### 2. Error Toast

```tsx
import { showErrorToast } from 'livemenu-ui';

showErrorToast('Failed to connect to server');

// With longer duration
showErrorToast('Invalid email address', {
  duration: 7000
});
```

### 3. Warning Toast

```tsx
import { showWarningToast } from 'livemenu-ui';

showWarningToast('Your session will expire in 5 minutes');
```

### 4. Info Toast

```tsx
import { showInfoToast } from 'livemenu-ui';

showInfoToast('New features available!');
```

### 5. Toast with Action Button

```tsx
import { showToast } from 'livemenu-ui';

showToast('Message deleted', {
  variant: 'default',
  action: {
    label: 'Undo',
    onClick: () => {
      restoreMessage();
    }
  }
});
```

### 6. Persistent Toast (No Auto-dismiss)

```tsx
import { showToast, hideToast } from 'livemenu-ui';

const toastId = showToast('Please confirm your email', {
  variant: 'warning',
  duration: 0, // Won't auto-dismiss
  action: {
    label: 'Send Email',
    onClick: () => {
      sendVerificationEmail();
      hideToast(toastId);
    }
  }
});
```

### 7. Custom Icon

```tsx
import { showToast } from 'livemenu-ui';

showToast('Download complete!', {
  variant: 'success',
  icon: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>
  )
});
```

### 8. No Icon

```tsx
import { showToast } from 'livemenu-ui';

showToast('Simple message', {
  icon: null, // Hide icon
  showProgress: false // Hide progress bar too
});
```

### 9. Custom Message with JSX

```tsx
import { showToast } from 'livemenu-ui';

showToast(
  <div>
    <p className="font-semibold">New Comment</p>
    <p className="text-sm">John replied to your post</p>
  </div>,
  {
    variant: 'info',
    duration: 6000
  }
);
```

### 10. Multiple Toasts

```tsx
import { showSuccessToast, showInfoToast, showWarningToast } from 'livemenu-ui';

// Show multiple toasts at once
showSuccessToast('First notification');
showInfoToast('Second notification');
showWarningToast('Third notification');

// They stack automatically
```

### 11. Different Positions

```tsx
import { showToast } from 'livemenu-ui';

// Top positions
showToast('Top Right', { position: 'top-right' });
showToast('Top Left', { position: 'top-left' });
showToast('Top Center', { position: 'top-center' });

// Bottom positions
showToast('Bottom Right', { position: 'bottom-right' });
showToast('Bottom Left', { position: 'bottom-left' });
showToast('Bottom Center', { position: 'bottom-center' });
```

### 12. With onDismiss Callback

```tsx
import { showToast } from 'livemenu-ui';

showToast('Important message', {
  variant: 'warning',
  onDismiss: () => {
    console.log('User dismissed the toast');
    markAsRead();
  }
});
```

---

## Real-World Use Cases

### Form Submission

```tsx
import { showSuccessToast, showErrorToast } from 'livemenu-ui';

async function handleSubmit(formData) {
  try {
    await saveForm(formData);
    showSuccessToast('Form submitted successfully!');
    router.push('/success');
  } catch (error) {
    showErrorToast(`Failed to submit: ${error.message}`);
  }
}
```

### File Upload

```tsx
import { showInfoToast, showSuccessToast, showErrorToast } from 'livemenu-ui';

async function handleFileUpload(file) {
  const toastId = showInfoToast('Uploading...', {
    duration: 0 // Don't auto-dismiss
  });

  try {
    await uploadFile(file);
    hideToast(toastId);
    showSuccessToast('File uploaded successfully!');
  } catch (error) {
    hideToast(toastId);
    showErrorToast('Upload failed');
  }
}
```

### Delete with Undo

```tsx
import { showToast } from 'livemenu-ui';

function handleDelete(itemId) {
  const deletedItem = getItem(itemId);
  deleteItem(itemId);

  showToast('Item deleted', {
    variant: 'default',
    duration: 5000,
    action: {
      label: 'Undo',
      onClick: () => {
        restoreItem(deletedItem);
        showInfoToast('Item restored');
      }
    }
  });
}
```

### Copy to Clipboard

```tsx
import { showSuccessToast } from 'livemenu-ui';

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showSuccessToast('Copied to clipboard!', {
    duration: 2000,
    position: 'bottom-center'
  });
}
```

### API Error Handling

```tsx
import { showErrorToast, showWarningToast } from 'livemenu-ui';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      showWarningToast('Session expired. Please log in again.');
      router.push('/login');
    } else if (error.response?.status >= 500) {
      showErrorToast('Server error. Please try again later.');
    } else {
      showErrorToast(error.response?.data?.message || 'An error occurred');
    }
    return Promise.reject(error);
  }
);
```

### Network Status

```tsx
import { showWarningToast, showSuccessToast } from 'livemenu-ui';

window.addEventListener('offline', () => {
  showWarningToast('You are offline', {
    duration: 0,
    position: 'bottom-center'
  });
});

window.addEventListener('online', () => {
  showSuccessToast('Back online!', {
    duration: 3000,
    position: 'bottom-center'
  });
});
```

---

## API Reference

### LiveMenuToastProvider

```tsx
<LiveMenuToastProvider
  defaultPosition="top-right"
  maxToasts={5}
  defaultDuration={5000}
>
  {children}
</LiveMenuToastProvider>
```

### useToast()

```tsx
const { showToast, hideToast, hideAllToasts } = useToast();
```

**Returns:**
- `showToast(message, options)` - Show a toast, returns toast ID
- `hideToast(id)` - Hide a specific toast
- `hideAllToasts()` - Hide all toasts

### showToast()

```tsx
const toastId = showToast(message, options);
```

**Parameters:**
- `message` - `string | ReactNode` - Toast message
- `options` - `ToastOptions` - Toast configuration

**Returns:** `string` - Toast ID

### Helper Functions

```tsx
showSuccessToast(message, options?);
showErrorToast(message, options?);
showWarningToast(message, options?);
showInfoToast(message, options?);
```

### hideToast()

```tsx
hideToast(toastId);
```

### hideAllToasts()

```tsx
hideAllToasts();
```

---

## Variants

### Success
- Green theme
- Checkmark icon
- Use for: Successful operations

### Error
- Red theme
- X icon
- Use for: Errors, failures

### Warning
- Yellow/orange theme
- Warning triangle icon
- Use for: Warnings, important notices

### Info
- Blue theme
- Info icon
- Use for: Information, tips

### Default
- Neutral theme
- Bell icon
- Use for: General notifications

---

## Accessibility

The toast system includes accessibility features:

- **ARIA Live Regions**: Toasts use `aria-live="polite"`
- **Keyboard Accessible**: Close buttons are keyboard accessible
- **Screen Reader Support**: Proper labeling and descriptions
- **Auto-dismiss**: Configurable durations for different content
- **Visual Progress**: Progress bar shows time remaining

---

## Dark Mode

Toasts automatically adapt to dark mode when using `LiveMenuThemeProvider`:

```tsx
import { LiveMenuThemeProvider, LiveMenuToastProvider } from 'livemenu-ui';

<LiveMenuThemeProvider>
  <LiveMenuToastProvider>
    <App />
  </LiveMenuToastProvider>
</LiveMenuThemeProvider>
```

---

## Best Practices

### 1. Use Appropriate Variants

```tsx
// ✅ Good
showSuccessToast('Saved!');
showErrorToast('Failed to save');

// ❌ Avoid
showToast('Saved!', { variant: 'error' });
```

### 2. Keep Messages Concise

```tsx
// ✅ Good
showSuccessToast('Profile updated');

// ❌ Avoid
showSuccessToast('Your profile has been successfully updated and all changes have been saved to the database');
```

### 3. Use Actions for Important Operations

```tsx
// ✅ Good: Provide undo for destructive actions
showToast('Message deleted', {
  action: { label: 'Undo', onClick: restore }
});
```

### 4. Adjust Duration Based on Content

```tsx
// Short message = short duration
showSuccessToast('Saved!', { duration: 2000 });

// Important/longer message = longer duration
showWarningToast('Your session will expire soon', { duration: 7000 });

// Critical action = no auto-dismiss
showErrorToast('Payment failed', { duration: 0 });
```

### 5. Limit Toast Frequency

```tsx
// ❌ Avoid spamming
for (let i = 0; i < 100; i++) {
  showToast(`Item ${i}`);
}

// ✅ Good: Batch notifications
showSuccessToast(`${items.length} items processed`);
```

---

## TypeScript Support

Full TypeScript support with type inference:

```tsx
import { showToast, ToastOptions, ToastVariant } from 'livemenu-ui';

const options: ToastOptions = {
  variant: 'success',
  duration: 3000,
  position: 'top-right',
  action: {
    label: 'Undo',
    onClick: () => {}
  }
};

showToast('Message', options);
```

---

## License

MIT License - Part of the LiveMenu UI component library.


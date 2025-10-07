# LiveMenuConfirm Component & useConfirm Hook

A specialized confirmation dialog component and hook that makes it super easy to create confirmation prompts with customizable buttons and actions.

## Features

✨ **Dead Simple API** - One-line confirmation dialogs  
🎨 **4 Variants** - primary, danger, warning, success  
🔘 **Default Buttons** - Confirm and Cancel buttons included  
✏️ **Customizable Text** - Change button labels  
🎯 **Callback Functions** - Handle confirm and cancel actions  
🎨 **Custom Actions** - Replace default buttons with your own  
⚡ **Async Support** - Handles async confirm operations with loading state  
🎭 **Icons Included** - Default icons for each variant  
🔄 **Auto-close** - Closes automatically after confirm/cancel

---

## Table of Contents

- [Quick Start](#quick-start)
- [Using the Hook](#using-the-hook)
- [Options](#options)
- [Examples](#examples)
- [API Reference](#api-reference)

---

## Quick Start

### Basic Usage

```tsx
import { useConfirm } from 'livemenu-ui';

function MyComponent() {
  const { confirm } = useConfirm();

  const handleDelete = () => {
    confirm({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        // Your delete logic here
        deleteItem();
      },
      onCancel: () => {
        console.log('User cancelled');
      }
    });
  };

  return <button onClick={handleDelete}>Delete Item</button>;
}
```

---

## Using the Hook

### useConfirm()

The `useConfirm` hook provides a simple way to trigger confirmation dialogs.

```tsx
import { useConfirm } from 'livemenu-ui';

const { confirm } = useConfirm();
```

**Returns:**
- `confirm(options)` - Function to show a confirmation dialog

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `'Confirm'` | Dialog title |
| `message` | `string \| ReactNode` | Required | Confirmation message |
| `confirmText` | `string` | `'Confirm'` | Text for confirm button |
| `cancelText` | `string` | `'Cancel'` | Text for cancel button |
| `onConfirm` | `() => void \| Promise<void>` | `undefined` | Callback when confirmed |
| `onCancel` | `() => void` | `undefined` | Callback when cancelled |
| `variant` | `'primary' \| 'danger' \| 'warning' \| 'success'` | `'primary'` | Visual style variant |
| `icon` | `ReactNode` | Auto | Custom icon (or `null` to hide) |
| `customActions` | `ReactNode` | `undefined` | Replace default buttons |
| `modalOptions` | `ModalOptions` | `{ size: 'sm' }` | Additional modal options |

---

## Examples

### 1. Basic Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function BasicExample() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      title: 'Confirm Action',
      message: 'Are you sure you want to proceed?',
      onConfirm: () => {
        console.log('User confirmed');
      }
    });
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

### 2. Delete Confirmation (Danger Variant)

```tsx
import { useConfirm } from 'livemenu-ui';

function DeleteExample() {
  const { confirm } = useConfirm();

  const handleDelete = (itemId: string) => {
    confirm({
      title: 'Delete Item',
      message: 'This action cannot be undone. Are you sure you want to delete this item?',
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Keep It',
      onConfirm: () => {
        // Delete the item
        deleteItem(itemId);
      },
      onCancel: () => {
        console.log('User decided to keep the item');
      }
    });
  };

  return <button onClick={() => handleDelete('123')}>Delete</button>;
}
```

### 3. Async Operation with Loading State

```tsx
import { useConfirm } from 'livemenu-ui';

function AsyncExample() {
  const { confirm } = useConfirm();

  const handleSave = () => {
    confirm({
      title: 'Save Changes',
      message: 'Do you want to save your changes?',
      variant: 'success',
      confirmText: 'Save',
      cancelText: 'Discard',
      onConfirm: async () => {
        // Async operation - button shows "Processing..." automatically
        await saveChanges();
        
        // Modal closes automatically after success
        showSuccessToast('Changes saved!');
      }
    });
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### 4. Warning Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function WarningExample() {
  const { confirm } = useConfirm();

  const handlePublish = () => {
    confirm({
      title: 'Publish Article',
      message: 'This will make your article visible to everyone. Continue?',
      variant: 'warning',
      confirmText: 'Publish',
      cancelText: 'Not Yet',
      onConfirm: () => {
        publishArticle();
      }
    });
  };

  return <button onClick={handlePublish}>Publish</button>;
}
```

### 5. Custom Message with JSX

```tsx
import { useConfirm } from 'livemenu-ui';

function CustomMessageExample() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      title: 'Terms and Conditions',
      message: (
        <div>
          <p className="mb-2">Before proceeding, please note:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>All data will be processed</li>
            <li>This action is irreversible</li>
            <li>You will be charged $10</li>
          </ul>
        </div>
      ),
      variant: 'primary',
      confirmText: 'I Agree',
      onConfirm: () => {
        processPayment();
      }
    });
  };

  return <button onClick={handleAction}>Proceed</button>;
}
```

### 6. Custom Actions (Replace Default Buttons)

```tsx
import { useConfirm, LiveMenuButton } from 'livemenu-ui';

function CustomActionsExample() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      title: 'Choose an Option',
      message: 'How would you like to proceed?',
      variant: 'primary',
      customActions: (
        <>
          <LiveMenuButton 
            variant="success" 
            onClick={() => {
              saveAndContinue();
              // You need to close the modal manually
            }}
          >
            Save & Continue
          </LiveMenuButton>
          <LiveMenuButton 
            variant="outline"
            onClick={() => {
              saveAsDraft();
            }}
          >
            Save as Draft
          </LiveMenuButton>
          <LiveMenuButton 
            variant="danger"
            onClick={() => {
              discard();
            }}
          >
            Discard
          </LiveMenuButton>
        </>
      )
    });
  };

  return <button onClick={handleAction}>Options</button>;
}
```

**Note:** When using `customActions`, the modal doesn't auto-close. You need to handle closing manually or use `onClose` prop passed to your component.

### 7. Without Icon

```tsx
import { useConfirm } from 'livemenu-ui';

function NoIconExample() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      title: 'Simple Confirmation',
      message: 'Continue with this action?',
      icon: null, // Hide the icon
      onConfirm: () => {
        console.log('Confirmed');
      }
    });
  };

  return <button onClick={handleAction}>Confirm</button>;
}
```

### 8. Custom Icon

```tsx
import { useConfirm } from 'livemenu-ui';

function CustomIconExample() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      title: 'New Message',
      message: 'You have a new message. Would you like to read it now?',
      icon: (
        <div className="text-5xl">📧</div>
      ),
      confirmText: 'Read Now',
      cancelText: 'Later',
      onConfirm: () => {
        openMessage();
      }
    });
  };

  return <button onClick={handleAction}>Check Messages</button>;
}
```

### 9. Non-dismissable Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function NonDismissableExample() {
  const { confirm } = useConfirm();

  const handleCriticalAction = () => {
    confirm({
      title: 'Critical Action',
      message: 'This is a critical action. You must choose an option.',
      variant: 'danger',
      confirmText: 'Proceed',
      cancelText: 'Cancel',
      modalOptions: {
        dismissable: false, // Can't close by clicking backdrop
        showCloseButton: false, // Hide X button
        closeOnEscape: false, // Can't close with ESC
      },
      onConfirm: () => {
        performCriticalAction();
      }
    });
  };

  return <button onClick={handleCriticalAction}>Critical Action</button>;
}
```

### 10. Confirmation Chain

```tsx
import { useConfirm } from 'livemenu-ui';

function ChainExample() {
  const { confirm } = useConfirm();

  const handleMultiStep = () => {
    confirm({
      title: 'Step 1: Confirm',
      message: 'Do you want to proceed to step 2?',
      onConfirm: () => {
        // Show another confirmation
        confirm({
          title: 'Step 2: Final Confirmation',
          message: 'This is the final step. Are you absolutely sure?',
          variant: 'danger',
          onConfirm: () => {
            performFinalAction();
          }
        });
      }
    });
  };

  return <button onClick={handleMultiStep}>Multi-Step Action</button>;
}
```

---

## API Reference

### useConfirm()

Hook that returns confirmation dialog controls.

```tsx
const { confirm } = useConfirm();
```

**Returns:**
- `confirm(options)` - Function to show confirmation dialog

---

### confirm(options)

Show a confirmation dialog.

```tsx
const modalId = confirm({
  title: 'Title',
  message: 'Message',
  variant: 'danger',
  onConfirm: () => { /* ... */ }
});
```

**Parameters:**
- `options` - `ConfirmOptions` object (see [Options](#options))

**Returns:**
- `string` - Modal ID (can be used with `hideModal(id)`)

---

### LiveMenuConfirm Component

The underlying component (can be used directly if needed).

```tsx
import { LiveMenuConfirm } from 'livemenu-ui';

<LiveMenuConfirm
  title="Title"
  message="Message"
  onClose={() => {}}
  onConfirm={() => {}}
/>
```

---

## Variants

### Primary (Default)
Blue/orange theme, for general confirmations.

```tsx
confirm({ variant: 'primary', message: 'Continue?' });
```

### Danger
Red theme, for destructive actions like delete.

```tsx
confirm({ variant: 'danger', message: 'Delete this item?' });
```

### Warning
Yellow/orange theme, for actions that need attention.

```tsx
confirm({ variant: 'warning', message: 'This will affect all users.' });
```

### Success
Green theme, for positive confirmations.

```tsx
confirm({ variant: 'success', message: 'Save your changes?' });
```

---

## Default Icons

Each variant comes with a default icon:

- **Primary**: Info/question icon
- **Danger**: Warning triangle
- **Warning**: Alert triangle
- **Success**: Checkmark circle

You can override with `icon` prop or hide with `icon: null`.

---

## Async Handling

The confirm button automatically handles async operations:

```tsx
confirm({
  message: 'Save changes?',
  onConfirm: async () => {
    // Button shows "Processing..." during this
    await saveToDatabase();
    // Modal closes automatically after success
  }
});
```

If an error occurs, the modal stays open and logs the error to console.

---

## Best Practices

### 1. Use Appropriate Variants

```tsx
// ✅ Good: Danger variant for destructive actions
confirm({
  variant: 'danger',
  message: 'Delete account?',
  confirmText: 'Delete'
});

// ❌ Avoid: Primary variant for destructive actions
confirm({
  variant: 'primary',
  message: 'Delete account?'
});
```

### 2. Clear, Concise Messages

```tsx
// ✅ Good: Clear and specific
confirm({
  message: 'Delete "Project Alpha"? This cannot be undone.'
});

// ❌ Avoid: Vague or unclear
confirm({
  message: 'Are you sure?'
});
```

### 3. Descriptive Button Text

```tsx
// ✅ Good: Action-specific button text
confirm({
  message: 'Delete this comment?',
  confirmText: 'Delete Comment',
  cancelText: 'Keep It'
});

// ❌ Avoid: Generic button text for critical actions
confirm({
  message: 'Delete this comment?',
  confirmText: 'Yes',
  cancelText: 'No'
});
```

### 4. Handle Errors in Async Operations

```tsx
confirm({
  message: 'Save changes?',
  onConfirm: async () => {
    try {
      await saveChanges();
      showSuccessNotification();
    } catch (error) {
      showErrorNotification(error.message);
    }
  }
});
```

---

## TypeScript Support

Full TypeScript support with type inference:

```tsx
import { useConfirm, ConfirmOptions } from 'livemenu-ui';

const { confirm } = useConfirm();

const options: ConfirmOptions = {
  title: 'Delete',
  message: 'Are you sure?',
  variant: 'danger',
  onConfirm: async () => {
    await deleteItem();
  }
};

confirm(options);
```

---

## Differences from Generic Modal

### Confirm (This Component)
- ✅ Built-in buttons
- ✅ Pre-styled layouts
- ✅ Default icons
- ✅ Auto-close behavior
- ✅ Simpler API
- 🎯 **Use for**: Yes/No, Confirm/Cancel dialogs

### Generic Modal
- ✅ Full customization
- ✅ Any content
- ✅ Manual control
- 🎯 **Use for**: Forms, complex content, custom layouts

---

## Examples in Context

### E-commerce: Order Cancellation

```tsx
const { confirm } = useConfirm();

const handleCancelOrder = (orderId: string) => {
  confirm({
    title: 'Cancel Order',
    message: 'Are you sure you want to cancel this order? Your payment will be refunded within 5-7 business days.',
    variant: 'warning',
    confirmText: 'Cancel Order',
    cancelText: 'Keep Order',
    onConfirm: async () => {
      await cancelOrder(orderId);
      showNotification('Order cancelled successfully');
      router.push('/orders');
    }
  });
};
```

### Social Media: Delete Post

```tsx
const { confirm } = useConfirm();

const handleDeletePost = (postId: string) => {
  confirm({
    title: 'Delete Post',
    message: 'This post will be permanently deleted. You cannot undo this action.',
    variant: 'danger',
    confirmText: 'Delete Forever',
    cancelText: 'Cancel',
    onConfirm: async () => {
      await deletePost(postId);
      removePostFromFeed(postId);
    }
  });
};
```

### Admin Panel: Deactivate User

```tsx
const { confirm } = useConfirm();

const handleDeactivateUser = (user: User) => {
  confirm({
    title: `Deactivate ${user.name}`,
    message: (
      <div>
        <p className="mb-2">This will:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Revoke all access permissions</li>
          <li>Log the user out of all devices</li>
          <li>Send a notification email</li>
        </ul>
      </div>
    ),
    variant: 'danger',
    confirmText: 'Deactivate User',
    onConfirm: async () => {
      await deactivateUser(user.id);
      refreshUserList();
    }
  });
};
```

---

## License

MIT License - Part of the LiveMenu UI component library.


# Confirm Dialog - Quick Examples

Ready-to-use confirmation dialog examples with the `useConfirm` hook.

## Basic Examples

### 1. Simple Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function SimpleExample() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      message: 'Are you sure you want to continue?',
      onConfirm: () => {
        console.log('User confirmed!');
      }
    });
  };

  return <button onClick={handleAction}>Continue</button>;
}
```

### 2. Delete Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function DeleteButton({ item }) {
  const { confirm } = useConfirm();

  const handleDelete = () => {
    confirm({
      title: 'Delete Item',
      message: `Delete "${item.name}"? This action cannot be undone.`,
      variant: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: async () => {
        await deleteItem(item.id);
        showSuccessToast('Item deleted');
      }
    });
  };

  return (
    <button onClick={handleDelete} className="text-danger">
      Delete
    </button>
  );
}
```

### 3. Save Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function SaveButton({ formData }) {
  const { confirm } = useConfirm();

  const handleSave = () => {
    confirm({
      title: 'Save Changes',
      message: 'Do you want to save your changes?',
      variant: 'success',
      confirmText: 'Save',
      cancelText: 'Discard',
      onConfirm: async () => {
        await saveData(formData);
      },
      onCancel: () => {
        console.log('Changes discarded');
      }
    });
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### 4. Warning Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function PublishButton({ article }) {
  const { confirm } = useConfirm();

  const handlePublish = () => {
    confirm({
      title: 'Publish Article',
      message: 'This will make your article visible to everyone. Continue?',
      variant: 'warning',
      confirmText: 'Publish Now',
      cancelText: 'Not Yet',
      onConfirm: async () => {
        await publishArticle(article.id);
        router.push('/articles');
      }
    });
  };

  return <button onClick={handlePublish}>Publish</button>;
}
```

## Advanced Examples

### 5. Custom Message with JSX

```tsx
import { useConfirm } from 'livemenu-ui';

function SubscribeButton({ plan }) {
  const { confirm } = useConfirm();

  const handleSubscribe = () => {
    confirm({
      title: 'Subscribe to Premium',
      message: (
        <div className="text-left">
          <p className="mb-3">You're about to subscribe to:</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-3">
            <div className="font-semibold">{plan.name}</div>
            <div className="text-2xl font-bold text-livemenu">${plan.price}/month</div>
          </div>
          <ul className="text-sm space-y-1">
            <li>✓ Unlimited access</li>
            <li>✓ Priority support</li>
            <li>✓ Cancel anytime</li>
          </ul>
        </div>
      ),
      variant: 'success',
      confirmText: 'Subscribe',
      onConfirm: async () => {
        await createSubscription(plan.id);
      }
    });
  };

  return <button onClick={handleSubscribe}>Subscribe</button>;
}
```

### 6. Custom Action Buttons

```tsx
import { useConfirm, LiveMenuButton } from 'livemenu-ui';

function UnsavedChangesDialog({ onSave, onDiscard, onCancel }) {
  const { confirm } = useConfirm();

  const showDialog = () => {
    const modalId = confirm({
      title: 'Unsaved Changes',
      message: 'You have unsaved changes. What would you like to do?',
      customActions: (
        <>
          <LiveMenuButton
            variant="success"
            onClick={async () => {
              await onSave();
              hideModal(modalId);
            }}
          >
            Save & Exit
          </LiveMenuButton>
          <LiveMenuButton
            variant="outline"
            onClick={() => {
              onDiscard();
              hideModal(modalId);
            }}
          >
            Discard Changes
          </LiveMenuButton>
          <LiveMenuButton
            variant="light"
            onClick={() => {
              onCancel();
              hideModal(modalId);
            }}
          >
            Keep Editing
          </LiveMenuButton>
        </>
      )
    });
  };

  return showDialog;
}
```

### 7. Non-dismissable Confirmation

```tsx
import { useConfirm } from 'livemenu-ui';

function CriticalActionButton() {
  const { confirm } = useConfirm();

  const handleCriticalAction = () => {
    confirm({
      title: 'Critical Action Required',
      message: 'You must choose an option to continue. This window cannot be closed.',
      variant: 'danger',
      confirmText: 'Proceed',
      cancelText: 'Go Back',
      modalOptions: {
        dismissable: false,
        showCloseButton: false,
        closeOnEscape: false,
      },
      onConfirm: () => {
        performCriticalAction();
      },
      onCancel: () => {
        router.back();
      }
    });
  };

  return <button onClick={handleCriticalAction}>Start Process</button>;
}
```

### 8. Chained Confirmations

```tsx
import { useConfirm } from 'livemenu-ui';

function MultiStepDelete() {
  const { confirm } = useConfirm();

  const handleDelete = () => {
    confirm({
      title: 'Delete Account',
      message: 'This will permanently delete your account. Continue?',
      variant: 'warning',
      onConfirm: () => {
        // Show second confirmation
        confirm({
          title: 'Final Confirmation',
          message: 'Are you absolutely sure? This cannot be undone!',
          variant: 'danger',
          confirmText: 'Yes, Delete Forever',
          onConfirm: async () => {
            await deleteAccount();
            logout();
          }
        });
      }
    });
  };

  return <button onClick={handleDelete}>Delete Account</button>;
}
```

### 9. With Custom Icon

```tsx
import { useConfirm } from 'livemenu-ui';

function SendEmailButton({ recipient }) {
  const { confirm } = useConfirm();

  const handleSend = () => {
    confirm({
      title: 'Send Email',
      message: `Send email to ${recipient}?`,
      icon: <div className="text-5xl">📧</div>,
      confirmText: 'Send',
      cancelText: 'Cancel',
      onConfirm: async () => {
        await sendEmail(recipient);
      }
    });
  };

  return <button onClick={handleSend}>Send Email</button>;
}
```

### 10. Without Icon

```tsx
import { useConfirm } from 'livemenu-ui';

function MinimalConfirm() {
  const { confirm } = useConfirm();

  const handleAction = () => {
    confirm({
      title: 'Quick Question',
      message: 'Would you like to enable notifications?',
      icon: null, // No icon
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => {
        enableNotifications();
      }
    });
  };

  return <button onClick={handleAction}>Enable Notifications</button>;
}
```

## Real-World Use Cases

### E-commerce: Cancel Order

```tsx
import { useConfirm } from 'livemenu-ui';

function CancelOrderButton({ order }) {
  const { confirm } = useConfirm();

  const handleCancel = () => {
    confirm({
      title: 'Cancel Order',
      message: (
        <div>
          <p className="mb-2">Cancel order #{order.id}?</p>
          <p className="text-sm text-gray-600">
            Your payment of ${order.total} will be refunded within 5-7 business days.
          </p>
        </div>
      ),
      variant: 'warning',
      confirmText: 'Cancel Order',
      cancelText: 'Keep Order',
      onConfirm: async () => {
        await cancelOrder(order.id);
        showNotification('Order cancelled. Refund processing.');
      }
    });
  };

  return (
    <button onClick={handleCancel} className="text-warning">
      Cancel Order
    </button>
  );
}
```

### Social Media: Block User

```tsx
import { useConfirm } from 'livemenu-ui';

function BlockUserButton({ user }) {
  const { confirm } = useConfirm();

  const handleBlock = () => {
    confirm({
      title: `Block ${user.username}`,
      message: 'They will no longer be able to see your profile or contact you.',
      variant: 'danger',
      confirmText: 'Block User',
      cancelText: 'Cancel',
      onConfirm: async () => {
        await blockUser(user.id);
        removeFromFeed(user.id);
      }
    });
  };

  return <button onClick={handleBlock}>Block</button>;
}
```

### Admin: Deactivate User

```tsx
import { useConfirm } from 'livemenu-ui';

function DeactivateButton({ user }) {
  const { confirm } = useConfirm();

  const handleDeactivate = () => {
    confirm({
      title: `Deactivate ${user.name}`,
      message: (
        <div>
          <p className="mb-3">This will:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Revoke all access permissions</li>
            <li>Log user out of all devices</li>
            <li>Send notification email</li>
          </ul>
        </div>
      ),
      variant: 'danger',
      confirmText: 'Deactivate',
      onConfirm: async () => {
        await deactivateUser(user.id);
        refreshUserList();
      }
    });
  };

  return <button onClick={handleDeactivate}>Deactivate</button>;
}
```

### File Upload: Replace File

```tsx
import { useConfirm } from 'livemenu-ui';

function FileUpload({ existingFile }) {
  const { confirm } = useConfirm();

  const handleUpload = (newFile: File) => {
    if (existingFile) {
      confirm({
        title: 'Replace File',
        message: `Replace "${existingFile.name}" with "${newFile.name}"?`,
        variant: 'warning',
        confirmText: 'Replace',
        onConfirm: async () => {
          await uploadFile(newFile, { replace: true });
        }
      });
    } else {
      uploadFile(newFile);
    }
  };

  return <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />;
}
```

### Form: Discard Changes

```tsx
import { useConfirm } from 'livemenu-ui';

function EditForm({ hasUnsavedChanges, onClose }) {
  const { confirm } = useConfirm();

  const handleClose = () => {
    if (hasUnsavedChanges) {
      confirm({
        title: 'Discard Changes',
        message: 'You have unsaved changes. Are you sure you want to leave?',
        variant: 'warning',
        confirmText: 'Discard',
        cancelText: 'Keep Editing',
        onConfirm: () => {
          onClose();
        }
      });
    } else {
      onClose();
    }
  };

  return (
    <form>
      {/* Form fields */}
      <button type="button" onClick={handleClose}>Cancel</button>
    </form>
  );
}
```

## Integration Patterns

### With React Router

```tsx
import { useConfirm } from 'livemenu-ui';
import { useNavigate } from 'react-router-dom';

function NavigateWithConfirm() {
  const { confirm } = useConfirm();
  const navigate = useNavigate();

  const handleNavigate = () => {
    confirm({
      message: 'Leave this page? Changes may not be saved.',
      onConfirm: () => {
        navigate('/dashboard');
      }
    });
  };

  return <button onClick={handleNavigate}>Go to Dashboard</button>;
}
```

### With Redux

```tsx
import { useConfirm } from 'livemenu-ui';
import { useDispatch } from 'react-redux';
import { deletePost } from './store/actions';

function DeletePostButton({ postId }) {
  const { confirm } = useConfirm();
  const dispatch = useDispatch();

  const handleDelete = () => {
    confirm({
      title: 'Delete Post',
      message: 'This post will be permanently deleted.',
      variant: 'danger',
      onConfirm: () => {
        dispatch(deletePost(postId));
      }
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### With React Query

```tsx
import { useConfirm } from 'livemenu-ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function DeleteButton({ itemId }) {
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
    }
  });

  const handleDelete = () => {
    confirm({
      title: 'Delete Item',
      message: 'Are you sure?',
      variant: 'danger',
      onConfirm: () => {
        deleteMutation.mutate(itemId);
      }
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Tips & Best Practices

1. **Use appropriate variants:**
   - `danger` for destructive actions (delete, remove, deactivate)
   - `warning` for actions that need attention (publish, share)
   - `success` for positive confirmations (save, submit)
   - `primary` for general confirmations

2. **Be specific in messages:**
   - ✅ "Delete 'Project Alpha'? This cannot be undone."
   - ❌ "Are you sure?"

3. **Use action-specific button text:**
   - ✅ `confirmText: "Delete Post"`
   - ❌ `confirmText: "Yes"`

4. **Handle async operations properly:**
   ```tsx
   onConfirm: async () => {
     try {
       await saveData();
       showSuccess();
     } catch (error) {
       showError(error.message);
     }
   }
   ```

5. **Use custom actions for complex choices:**
   When you have more than 2 options, use `customActions` prop

6. **Non-dismissable for critical actions:**
   Set `modalOptions.dismissable: false` for actions that require user decision

## Cheat Sheet

```tsx
// Simple
confirm({ message: 'Continue?' })

// Delete
confirm({ variant: 'danger', message: 'Delete?', confirmText: 'Delete' })

// Save
confirm({ variant: 'success', message: 'Save?', confirmText: 'Save' })

// Warning
confirm({ variant: 'warning', message: 'This will...', confirmText: 'Proceed' })

// With callbacks
confirm({ 
  message: 'Continue?',
  onConfirm: () => doSomething(),
  onCancel: () => console.log('cancelled')
})

// Async
confirm({
  message: 'Save?',
  onConfirm: async () => await save()
})

// Custom buttons
confirm({
  message: 'Choose:',
  customActions: <><button>A</button><button>B</button></>
})
```

Happy confirming! 🎉


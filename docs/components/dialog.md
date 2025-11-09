# LiveMenu Dialog

The dialog layer builds on top of the existing modal infrastructure and offers higher-level helpers for confirmation and alert-style prompts.

---

## Installation

Ensure your app is wrapped in the modal provider so dialogs can mount anywhere:

```tsx
import { LiveMenuModalProvider, ModalContextConnector } from 'livemenu-ui';

export function AppShell() {
  return (
    <LiveMenuModalProvider>
      <ModalContextConnector />
      {/* the rest of your app */}
    </LiveMenuModalProvider>
  );
}
```

---

## Hook Usage

```tsx
import { useDialog } from 'livemenu-ui';

export function DeleteUserButton() {
  const { confirm } = useDialog();

  const handleDelete = async () => {
    const result = await confirm({
      title: 'Delete user?',
      description: 'This action permanently removes the user and all related data.',
      destructive: true,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
    });

    if (result === 'confirm') {
      // run delete mutation
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
```

### `confirm(options)`

Returns a promise that resolves to `'confirm'` or `'cancel'`.

**Key options**

- `title`, `description`, `icon`, `children` – dialog content
- `confirmLabel`, `cancelLabel` – button text (defaults to `Confirm` / `Cancel`)
- `destructive` – switches the confirm button to the danger variant
- `closeOnConfirm`, `closeOnCancel` – opt out of auto-closing on action
- `hideCancelButton` – render a single confirm button
- `modal` – overrides for the underlying modal (size, dismissable, etc.)

Action handlers receive `{ close, modalId }`, making it easy to keep the dialog open or close it manually.

```tsx
const result = await confirm({
  title: 'Unsaved changes',
  description: 'You have unsaved changes. Are you sure you want to leave?',
  closeOnConfirm: false,
  onConfirm: async ({ close }) => {
    await saveDraft();
    close();
  },
});
```

### `alert(options)`

Single-button helper that resolves once the confirm action runs:

```tsx
const { alert } = useDialog();

await alert({
  title: 'Profile updated',
  description: 'Your changes are live.',
  confirmLabel: 'Got it',
});
```

### `showDialog({ dialog, modal })`

Low-level escape hatch that mirrors `showModal` but pre-wires the dialog layout:

```tsx
const { showDialog } = useDialog();

const modalId = showDialog({
  dialog: {
    title: 'Invite teammate',
    children: <InviteForm />,
    closeOnConfirm: false,
    onConfirm: async ({ close, modalId }) => {
      await submitInvite();
      close();
      console.log('Closed dialog', modalId);
    },
  },
  modal: { size: 'md' },
});
```

The returned `modalId` can be used with `hideModal` or other modal helpers if needed.

---

## Custom Content

Use `children` for complex layouts or forms:

```tsx
const { showDialog } = useDialog();

showDialog({
  dialog: {
    title: 'Create role',
    children: (
      <RoleForm
        onSubmit={async ({ close }) => {
          await createRole();
          close();
        }}
      />
    ),
    confirmLabel: 'Create',
    cancelLabel: 'Back',
  },
});
```

You can also pass a custom icon via the `icon` prop for warning or success states.

---

## Stacking

Dialogs stack using the same underlying modal queue. Triggering another dialog while one is open will push it on top with an incremented `z-index`, and each dialog remains fully interactive.



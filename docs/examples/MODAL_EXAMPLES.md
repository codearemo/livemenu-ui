# LiveMenu Modal - Complete Usage Examples

This guide provides practical, copy-paste ready examples for implementing the LiveMenu Modal system.

## Quick Start

### 1. Setup Your App

```tsx
// App.tsx or index.tsx
import { LiveMenuModalProvider } from 'livemenu-ui';
import 'livemenu-ui/dist/styles.css';

function App() {
  return (
    <LiveMenuModalProvider>
      <YourAppComponents />
    </LiveMenuModalProvider>
  );
}

export default App;
```

### 2. Basic Usage

```tsx
import { showModal, LiveMenuButton } from 'livemenu-ui';

// Your modal content component
function WelcomeModal({ message, onClose }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
      <p className="mb-6">{message}</p>
      <LiveMenuButton onClick={onClose} variant="primary">
        Got it!
      </LiveMenuButton>
    </div>
  );
}

// Trigger the modal
function HomePage() {
  const handleOpenWelcome = () => {
    showModal(WelcomeModal, {
      size: 'md',
      props: {
        message: 'Thanks for joining our platform!'
      }
    });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleOpenWelcome}>Show Welcome</button>
    </div>
  );
}
```

---

## Real-World Examples

### 1. Delete Confirmation

```tsx
import { showModal, hideModal, LiveMenuButton } from 'livemenu-ui';

function DeleteConfirmModal({ itemName, onConfirm, onClose, modalId }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
      // Show success notification
      showModal(SuccessModal, {
        size: 'sm',
        props: { message: `${itemName} deleted successfully` }
      });
    } catch (error) {
      alert('Failed to delete');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="text-danger text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold mb-2">Delete {itemName}?</h2>
      <p className="text-gray-600 mb-6">
        This action cannot be undone. Are you sure you want to delete this item?
      </p>
      <div className="flex gap-3 justify-end">
        <LiveMenuButton
          variant="outline"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </LiveMenuButton>
        <LiveMenuButton
          variant="danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </LiveMenuButton>
      </div>
    </div>
  );
}

// Usage in a component
function ItemCard({ item }) {
  const handleDelete = () => {
    showModal(DeleteConfirmModal, {
      size: 'sm',
      dismissable: false,
      props: {
        itemName: item.name,
        onConfirm: async () => {
          await deleteItem(item.id);
        }
      }
    });
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

### 2. User Profile Edit Form

```tsx
import { useModal, LiveMenuInput, LiveMenuButton, LiveMenuCard } from 'livemenu-ui';

function EditProfileModal({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
      
      // Show success message
      showModal(SuccessModal, {
        size: 'sm',
        props: { message: 'Profile updated successfully!' }
      });
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <LiveMenuInput
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
            fullWidth
          />
          
          <LiveMenuInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            required
            fullWidth
          />
          
          <div>
            <label className="livemenu-label">Bio</label>
            <textarea
              className="livemenu-textarea w-full"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          {errors.submit && (
            <div className="text-danger text-sm">{errors.submit}</div>
          )}
        </div>

        <div className="flex gap-3 justify-end mt-6">
          <LiveMenuButton
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </LiveMenuButton>
          <LiveMenuButton
            type="submit"
            variant="primary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </LiveMenuButton>
        </div>
      </form>
    </div>
  );
}

// Usage
function ProfilePage({ user }) {
  const { showModal } = useModal();

  const handleEditProfile = () => {
    showModal(EditProfileModal, {
      size: 'md',
      props: {
        user,
        onSave: async (updatedData) => {
          await updateUserProfile(user.id, updatedData);
          // Refresh user data
          await refetchUser();
        }
      }
    });
  };

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  );
}
```

### 3. Image Gallery with Full-Screen Preview

```tsx
import { showModal, hideModal } from 'livemenu-ui';

function ImagePreviewModal({ image, images, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);
  
  const currentImage = images[index];

  const goToNext = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };

  const goToPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [index]);

  return (
    <div className="h-screen flex flex-col bg-black text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{currentImage.title}</h2>
          <p className="text-sm text-gray-400">
            {index + 1} of {images.length}
          </p>
        </div>
      </div>

      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center relative">
        {index > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
          >
            ←
          </button>
        )}

        <img
          src={currentImage.url}
          alt={currentImage.title}
          className="max-w-full max-h-full object-contain"
        />

        {index < images.length - 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 bg-white/10 hover:bg-white/20 rounded-full p-3 transition"
          >
            →
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt={img.title}
            className={`h-16 w-16 object-cover rounded cursor-pointer transition ${
              idx === index ? 'ring-2 ring-livemenu' : 'opacity-50 hover:opacity-100'
            }`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// Usage
function Gallery({ images }) {
  const openPreview = (index) => {
    showModal(ImagePreviewModal, {
      size: 'full',
      className: 'p-0 bg-black',
      props: {
        images,
        currentIndex: index
      }
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={image.title}
          className="cursor-pointer hover:opacity-80 transition"
          onClick={() => openPreview(index)}
        />
      ))}
    </div>
  );
}
```

### 4. Multi-Step Wizard

```tsx
import { useModal, LiveMenuButton } from 'livemenu-ui';

function MultiStepWizardModal({ onComplete, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {}
  });

  const totalSteps = 3;

  const updateStepData = (stepKey, data) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data }
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await onComplete(formData);
    onClose();
    
    showModal(SuccessModal, {
      size: 'sm',
      props: { message: 'Setup completed!' }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Content
            data={formData.step1}
            onChange={(data) => updateStepData('step1', data)}
          />
        );
      case 2:
        return (
          <Step2Content
            data={formData.step2}
            onChange={(data) => updateStepData('step2', data)}
          />
        );
      case 3:
        return (
          <Step3Content
            data={formData.step3}
            onChange={(data) => updateStepData('step3', data)}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`text-sm font-medium ${
                s <= step ? 'text-livemenu' : 'text-gray-400'
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-livemenu transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] mb-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <LiveMenuButton
          variant="outline"
          onClick={() => step === 1 ? onClose() : setStep(step - 1)}
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </LiveMenuButton>
        <LiveMenuButton
          variant="primary"
          onClick={handleNext}
        >
          {step === totalSteps ? 'Complete' : 'Next'}
        </LiveMenuButton>
      </div>
    </div>
  );
}
```

### 5. Loading Modal (Programmatic Control)

```tsx
import { showModal, hideModal } from 'livemenu-ui';

function LoadingModal({ message = 'Loading...' }) {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-livemenu mb-4"></div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}

// Utility function to show loading
export function showLoading(message?: string) {
  return showModal(LoadingModal, {
    size: 'sm',
    dismissable: false,
    showCloseButton: false,
    closeOnEscape: false,
    props: { message }
  });
}

// Usage in async operations
async function saveData(data) {
  const loadingModalId = showLoading('Saving your data...');
  
  try {
    await api.saveData(data);
    hideModal(loadingModalId);
    
    // Show success
    showModal(SuccessModal, {
      size: 'sm',
      props: { message: 'Data saved successfully!' }
    });
  } catch (error) {
    hideModal(loadingModalId);
    
    // Show error
    showModal(ErrorModal, {
      size: 'sm',
      props: { message: error.message }
    });
  }
}
```

### 6. Notification/Alert Modals

```tsx
import { showModal, hideModal, LiveMenuButton } from 'livemenu-ui';

function AlertModal({ type, title, message, onClose }) {
  const config = {
    success: {
      icon: '✓',
      color: 'text-success',
      bgColor: 'bg-success-50 dark:bg-success/10'
    },
    error: {
      icon: '✕',
      color: 'text-danger',
      bgColor: 'bg-danger-50 dark:bg-danger/10'
    },
    warning: {
      icon: '⚠',
      color: 'text-warning',
      bgColor: 'bg-warning-50 dark:bg-warning/10'
    },
    info: {
      icon: 'ℹ',
      color: 'text-info',
      bgColor: 'bg-info-50 dark:bg-info/10'
    }
  };

  const { icon, color, bgColor } = config[type];

  return (
    <div className={`rounded-lg p-6 ${bgColor}`}>
      <div className="flex items-start gap-4">
        <div className={`text-4xl ${color}`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <LiveMenuButton onClick={onClose} variant="primary" size="sm">
          OK
        </LiveMenuButton>
      </div>
    </div>
  );
}

// Helper functions
export function showSuccess(title, message, autoClose = true) {
  const modalId = showModal(AlertModal, {
    size: 'sm',
    props: { type: 'success', title, message }
  });
  
  if (autoClose) {
    setTimeout(() => hideModal(modalId), 3000);
  }
  
  return modalId;
}

export function showError(title, message) {
  return showModal(AlertModal, {
    size: 'sm',
    props: { type: 'error', title, message }
  });
}

// Usage
showSuccess('Success!', 'Your changes have been saved.');
showError('Error', 'Failed to connect to server.');
```

### 7. Nested/Stacked Modals

```tsx
import { showModal, useModal } from 'livemenu-ui';

function SettingsModal({ onClose }) {
  const openThemeSettings = () => {
    showModal(ThemeSettingsModal, {
      size: 'md',
      props: {}
    });
  };

  const openAccountSettings = () => {
    showModal(AccountSettingsModal, {
      size: 'md',
      props: {}
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-3">
        <button
          onClick={openThemeSettings}
          className="w-full text-left p-4 border rounded hover:bg-gray-50"
        >
          <h3 className="font-semibold">Theme Settings</h3>
          <p className="text-sm text-gray-600">Customize appearance</p>
        </button>
        <button
          onClick={openAccountSettings}
          className="w-full text-left p-4 border rounded hover:bg-gray-50"
        >
          <h3 className="font-semibold">Account Settings</h3>
          <p className="text-sm text-gray-600">Manage your account</p>
        </button>
      </div>
    </div>
  );
}

function ThemeSettingsModal({ onClose }) {
  const [theme, setTheme] = useState('light');

  const confirmThemeChange = () => {
    showModal(ConfirmModal, {
      size: 'sm',
      props: {
        message: 'Apply this theme?',
        onConfirm: () => {
          applyTheme(theme);
          onClose(); // Close the theme settings modal
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Theme Settings</h2>
      {/* Theme options */}
      <button onClick={confirmThemeChange}>Apply Theme</button>
    </div>
  );
}
```

---

## Integration Patterns

### With React Context/State Management

```tsx
// Using with Redux
import { useDispatch } from 'react-redux';
import { showModal } from 'livemenu-ui';

function AddItemModal({ onClose }) {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({});

  const handleSubmit = async () => {
    await dispatch(addItem(itemData));
    onClose();
  };

  return (/* form */);
}

// Trigger from anywhere
dispatch(showModal(AddItemModal, { size: 'md' }));
```

### With React Query

```tsx
import { useMutation } from '@tanstack/react-query';
import { showModal, hideModal } from 'livemenu-ui';

function useDeleteItem() {
  const mutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      showSuccess('Item deleted successfully!');
    },
    onError: (error) => {
      showError('Delete failed', error.message);
    }
  });

  const confirmDelete = (item) => {
    showModal(DeleteConfirmModal, {
      size: 'sm',
      props: {
        item,
        onConfirm: () => mutation.mutate(item.id)
      }
    });
  };

  return { confirmDelete, ...mutation };
}
```

### With Form Libraries (React Hook Form)

```tsx
import { useForm } from 'react-hook-form';
import { showModal, LiveMenuInput, LiveMenuButton } from 'livemenu-ui';

function FormModal({ onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitForm = async (data) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <input
        {...register('email', { required: true })}
        className="livemenu-input"
      />
      {errors.email && <span className="text-danger">Email is required</span>}
      
      <LiveMenuButton type="submit">Submit</LiveMenuButton>
    </form>
  );
}
```

---

## Tips & Best Practices

1. **Always handle cleanup**: Reset form state when modal closes
2. **Use appropriate sizes**: `sm` for alerts, `md` for forms, `lg`/`xl` for complex content
3. **Disable dismissal for critical actions**: Set `dismissable: false` for confirmation dialogs
4. **Show loading states**: Disable buttons during async operations
5. **Stack modals thoughtfully**: Don't go more than 3 levels deep
6. **Use auto-close for success messages**: 2-3 seconds is ideal
7. **Validate before closing**: Prevent accidental data loss
8. **Make modals accessible**: Use semantic HTML and ARIA labels

---

## Common Patterns Cheat Sheet

```tsx
// Simple alert
showModal(AlertModal, { size: 'sm', props: { message: 'Hello!' } });

// Confirmation dialog
showModal(ConfirmModal, {
  size: 'sm',
  dismissable: false,
  props: { onConfirm: () => deleteItem() }
});

// Form modal
showModal(FormModal, {
  size: 'md',
  props: { initialData, onSave }
});

// Loading modal
const id = showModal(LoadingModal, {
  size: 'sm',
  dismissable: false,
  showCloseButton: false
});
// Later: hideModal(id);

// Full-screen preview
showModal(PreviewModal, {
  size: 'full',
  className: 'p-0'
});
```


# Component Development Guide

Complete template and guidelines for creating new components in the LiveMenu UI library.

---

## 📋 Quick Checklist

When creating a new component, ensure you:

- [ ] Use `LiveMenu[ComponentName]` naming convention
- [ ] Create proper file structure (`ComponentName/ComponentName.tsx`, `index.ts`)
- [ ] Define TypeScript interface with `LiveMenu[ComponentName]Props`
- [ ] Include common props (className, children, variant, size, disabled)
- [ ] Use Tailwind CSS with `livemenu-[component]` class prefix
- [ ] Export both new and legacy names
- [ ] Update `src/components/index.ts`
- [ ] Create documentation with examples
- [ ] Add JSDoc comments
- [ ] Build and test

---

## 🎯 Naming Conventions

### Component Names

All components must use the **LiveMenu prefix**:

```tsx
✅ Correct:
LiveMenuButton
LiveMenuCard
LiveMenuModal
LiveMenuDropdown

❌ Incorrect:
Button
MenuCard
Modal
```

### File Names

Files should match the component name without the prefix:

```
✅ Correct:
Button/Button.tsx
Card/Card.tsx
Modal/Modal.tsx

❌ Incorrect:
Button/LiveMenuButton.tsx
LiveMenuCard/Card.tsx
```

### CSS Classes

Use lowercase with hyphens and the `livemenu-` prefix:

```css
✅ Correct:
.livemenu-button
.livemenu-card
.livemenu-modal-header

❌ Incorrect:
.LiveMenuButton
.button
.menu-card
```

---

## 📁 File Structure

### Directory Layout

```
src/components/ComponentName/
├── ComponentName.tsx    # Main component implementation
└── index.ts             # Exports
```

### Example: Creating a Modal Component

```
src/components/Modal/
├── Modal.tsx
└── index.ts
```

---

## 📝 Component Template

### Basic Template

```tsx
// src/components/ComponentName/ComponentName.tsx
import React from 'react';

export interface LiveMenuComponentNameProps {
  /**
   * Component content
   */
  children: React.ReactNode;
  /**
   * Component variant
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * Component size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuComponentName - Brief description of what this component does
 * 
 * @example
 * ```tsx
 * <LiveMenuComponentName variant="primary" size="md">
 *   Content here
 * </LiveMenuComponentName>
 * ```
 */
export const LiveMenuComponentName: React.FC<LiveMenuComponentNameProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  // Base component class
  const baseClass = 'livemenu-componentname';
  
  // Variant classes mapping
  const variantClasses: Record<NonNullable<LiveMenuComponentNameProps['variant']>, string> = {
    primary: 'livemenu-componentname-primary',
    secondary: 'livemenu-componentname-secondary',
    outline: 'livemenu-componentname-outline',
  };
  
  // Size classes mapping
  const sizeClasses: Record<NonNullable<LiveMenuComponentNameProps['size']>, string> = {
    sm: 'livemenu-componentname-sm',
    md: 'livemenu-componentname-md',
    lg: 'livemenu-componentname-lg',
  };
  
  // Disabled class
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Combine all classes
  const componentClasses = [
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div className={componentClasses} aria-disabled={disabled}>
      {children}
    </div>
  );
};

// Legacy export for backwards compatibility
export const ComponentName = LiveMenuComponentName;
export type ComponentNameProps = LiveMenuComponentNameProps;
```

### Index File Template

```tsx
// src/components/ComponentName/index.ts
export { LiveMenuComponentName, ComponentName } from './ComponentName';
export type { LiveMenuComponentNameProps, ComponentNameProps } from './ComponentName';
```

---

## 🎨 TypeScript Interface Pattern

### Standard Props

Every component should include these standard props:

```tsx
export interface LiveMenuComponentNameProps {
  /**
   * Component content (if applicable)
   */
  children?: React.ReactNode;
  
  /**
   * Component variant/style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'dark';
  
  /**
   * Component size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  
  /**
   * Additional CSS classes for customization
   */
  className?: string;
}
```

### Extending HTML Elements

When wrapping HTML elements, extend their native props:

```tsx
// For button-based components
export interface LiveMenuComponentNameProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Add custom props here
  variant?: 'primary' | 'secondary';
}

// For div-based components
export interface LiveMenuComponentNameProps 
  extends React.HTMLAttributes<HTMLDivElement> {
  // Add custom props here
  variant?: 'primary' | 'secondary';
}

// For input-based components
export interface LiveMenuComponentNameProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // Add custom props here
  size?: 'sm' | 'md' | 'lg'; // Custom size prop
}
```

### Optional vs Required Props

```tsx
export interface LiveMenuComponentNameProps {
  // Required props (no '?')
  title: string;
  onSubmit: () => void;
  
  // Optional props (with '?')
  subtitle?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  
  // Optional with default values specified in component
  disabled?: boolean; // defaults to false
  className?: string; // defaults to ''
}
```

---

## 🎨 Tailwind CSS Styling Approach

### Custom Classes in `src/styles/tailwind.css`

Define component styles in the `@layer components` section:

```css
@layer components {
  /* Base component style */
  .livemenu-componentname {
    @apply inline-flex items-center justify-center;
    @apply rounded-md font-medium;
    @apply transition-all duration-200 ease-in-out;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  /* Variant styles */
  .livemenu-componentname-primary {
    @apply livemenu-componentname;
    @apply bg-livemenu text-white;
    @apply hover:bg-livemenu-hover;
    @apply active:bg-livemenu-active;
    @apply focus:ring-livemenu;
  }

  .livemenu-componentname-secondary {
    @apply livemenu-componentname;
    @apply bg-secondary text-white;
    @apply hover:bg-secondary-600;
    @apply active:bg-secondary-700;
    @apply focus:ring-secondary;
  }

  /* Size styles */
  .livemenu-componentname-sm {
    @apply px-3 py-1.5 text-sm;
  }

  .livemenu-componentname-md {
    @apply px-4 py-2 text-base;
  }

  .livemenu-componentname-lg {
    @apply px-6 py-3 text-lg;
  }
}
```

### Safelist in `tailwind.config.js`

Add patterns to safelist to prevent tree-shaking:

```javascript
safelist: [
  // ComponentName classes
  { pattern: /^livemenu-componentname/ },
],
```

### Using Tailwind Utilities in Component

```tsx
// Combine custom classes with Tailwind utilities
const componentClasses = [
  'livemenu-componentname',              // Custom base class
  variantClasses[variant],               // Custom variant class
  sizeClasses[size],                     // Custom size class
  fullWidth ? 'w-full' : '',             // Tailwind utility
  disabled ? 'opacity-50' : '',          // Tailwind utility
  className,                             // User's custom classes
]
  .filter(Boolean)
  .join(' ');
```

---

## 📦 Common Prop Types

### Essential Props

```tsx
export interface LiveMenuComponentNameProps {
  /**
   * Component content
   */
  children: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
```

### Interactive Props

```tsx
export interface LiveMenuComponentNameProps {
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * Change handler
   */
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  
  /**
   * Blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  
  /**
   * Focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
}
```

### Style Props

```tsx
export interface LiveMenuComponentNameProps {
  /**
   * Visual variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'light' | 'dark' | 'success' | 'danger' | 'warning' | 'info';
  
  /**
   * Component size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether component takes full width
   */
  fullWidth?: boolean;
}
```

### State Props

```tsx
export interface LiveMenuComponentNameProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the component is loading
   */
  loading?: boolean;
  
  /**
   * Whether the component is in error state
   */
  error?: boolean | string;
  
  /**
   * Whether the component is required
   */
  required?: boolean;
}
```

### Content Props

```tsx
export interface LiveMenuComponentNameProps {
  /**
   * Component title
   */
  title?: string | React.ReactNode;
  
  /**
   * Component subtitle
   */
  subtitle?: string | React.ReactNode;
  
  /**
   * Icon to display (left or right)
   */
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  /**
   * Helper text
   */
  helperText?: string;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
}
```

---

## 🔄 Export Pattern

### Component Export

```tsx
// src/components/ComponentName/ComponentName.tsx

// Primary export (with LiveMenu prefix)
export const LiveMenuComponentName: React.FC<LiveMenuComponentNameProps> = (props) => {
  // Implementation
};

// Legacy alias export (backwards compatibility)
export const ComponentName = LiveMenuComponentName;

// Type exports
export type ComponentNameProps = LiveMenuComponentNameProps;
```

### Index Export

```tsx
// src/components/ComponentName/index.ts

// Export everything from the component file
export { LiveMenuComponentName, ComponentName } from './ComponentName';
export type { LiveMenuComponentNameProps, ComponentNameProps } from './ComponentName';
```

### Components Index Update

Update `src/components/index.ts`:

```tsx
// Export all ComponentName components and types
export * from './ComponentName';
```

---

## 📚 Complete Example: Modal Component

### File: `src/components/Modal/Modal.tsx`

```tsx
import React, { useEffect } from 'react';

export interface LiveMenuModalProps {
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Function to close the modal
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string | React.ReactNode;
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking overlay closes modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * LiveMenuModal - A flexible modal/dialog component
 * 
 * @example
 * ```tsx
 * <LiveMenuModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   footer={
 *     <>
 *       <LiveMenuButton variant="secondary" onClick={onClose}>Cancel</LiveMenuButton>
 *       <LiveMenuButton variant="primary" onClick={onConfirm}>Confirm</LiveMenuButton>
 *     </>
 *   }
 * >
 *   Are you sure you want to proceed?
 * </LiveMenuModal>
 * ```
 */
export const LiveMenuModal: React.FC<LiveMenuModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size classes
  const sizeClasses: Record<NonNullable<LiveMenuModalProps['size']>, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl w-full
          ${sizeClasses[size]}
          ${className}
          transform transition-all
          animate-in fade-in zoom-in-95 duration-200
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold text-gray-900"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Legacy export
export const Modal = LiveMenuModal;
export type ModalProps = LiveMenuModalProps;
```

### File: `src/components/Modal/index.ts`

```tsx
export { LiveMenuModal, Modal } from './Modal';
export type { LiveMenuModalProps, ModalProps } from './Modal';
```

### Update: `src/components/index.ts`

```tsx
// ... existing exports ...

// Export all Modal components and types
export * from './Modal';
```

---

## 📖 Documentation Template

Create `MODAL_EXAMPLES.md` (or `COMPONENTNAME_EXAMPLES.md`):

```markdown
# LiveMenuModal Component Examples

## Import

\`\`\`tsx
import { LiveMenuModal } from 'livemenu-ui';
\`\`\`

## Basic Usage

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<LiveMenuModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  Modal content here
</LiveMenuModal>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | - | Whether modal is open |
| onClose | function | - | Close handler |
| title | string/ReactNode | - | Modal title |
| size | 'sm'/'md'/'lg'/'xl' | 'md' | Modal size |

## Examples

[Add comprehensive examples here]
```

---

## ✅ Testing Checklist

Before finalizing your component:

- [ ] Component renders without errors
- [ ] All props work as expected
- [ ] TypeScript types are correct
- [ ] Tailwind classes apply correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (keyboard navigation, ARIA attributes)
- [ ] Works in different variants and sizes
- [ ] Disabled state works properly
- [ ] Custom className applies correctly
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] JSDoc comments are complete
- [ ] Examples are documented

---

## 🚀 Quick Start Commands

```bash
# 1. Create component directory
mkdir -p src/components/ComponentName

# 2. Create component files
touch src/components/ComponentName/ComponentName.tsx
touch src/components/ComponentName/index.ts

# 3. Update components index
# Add: export * from './ComponentName'; to src/components/index.ts

# 4. Add Tailwind classes
# Edit: src/styles/tailwind.css

# 5. Update safelist
# Edit: tailwind.config.js

# 6. Build and test
npm run build

# 7. Test in watch mode
npm run watch
```

---

## 📝 Commit Message Template

```
feat(ComponentName): add LiveMenuComponentName component

- Add LiveMenuComponentName with primary, secondary, outline variants
- Support sm, md, lg sizes
- Include disabled state
- Add TypeScript types and JSDoc comments
- Create documentation with examples

Closes #issue-number
```

---

## 🎯 Best Practices

1. **Keep it simple** - Start with essential props, add more as needed
2. **Be consistent** - Follow existing component patterns
3. **Document everything** - JSDoc for props, examples for usage
4. **Think accessibility** - ARIA attributes, keyboard navigation
5. **Test thoroughly** - Different props, states, and screen sizes
6. **Use TypeScript** - Strong typing prevents bugs
7. **Follow conventions** - Naming, file structure, styling
8. **Reuse patterns** - Look at existing components for reference

---

## 📚 Reference

- Existing components: `src/components/`
- Styling guide: `src/styles/tailwind.css`
- Type patterns: See Button, Card, Badge, Input components
- Documentation examples: `*_EXAMPLES.md` files

---

**Need help?** Check existing components or open a discussion on GitHub!


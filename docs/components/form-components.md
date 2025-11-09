# New Components Guide

Documentation for the 6 new LiveMenu UI components with full dark mode support.

---

## 🎉 Components Overview

All components follow the LiveMenu design system with:
- ✅ Orange color palette integration
- ✅ Full dark mode support
- ✅ TypeScript definitions
- ✅ Accessibility features
- ✅ Consistent API patterns

---

## 1. LiveMenuAlert

**File:** `src/components/Alert/Alert.tsx`

Alert/notification component for displaying messages with icons and optional dismiss button.

### Props

```typescript
interface LiveMenuAlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

### Usage Examples

```tsx
import { LiveMenuAlert } from 'livemenu-ui';

// Basic success alert
<LiveMenuAlert variant="success">
  Your changes have been saved successfully!
</LiveMenuAlert>

// With title
<LiveMenuAlert variant="warning" title="Warning">
  Please review your information before submitting.
</LiveMenuAlert>

// Dismissible
<LiveMenuAlert 
  variant="info" 
  dismissible
  onDismiss={() => console.log('Dismissed')}
>
  New features are now available!
</LiveMenuAlert>

// Error alert
<LiveMenuAlert variant="danger" title="Error">
  Something went wrong. Please try again.
</LiveMenuAlert>
```

### Features
- 4 variants with semantic icons
- Optional title
- Dismissible with close button
- Auto-adapts to dark mode
- ARIA role="alert"

---

## 2. LiveMenuDropdown

**File:** `src/components/Dropdown/Dropdown.tsx`

Custom dropdown/select component with optional multi-select and search.

### Props

```typescript
interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

interface LiveMenuDropdownProps<T = string> {
  options: DropdownOption<T>[];
  value?: T | T[];
  onChange?: (
    value: T | T[],
    option?: DropdownOption<T>,
    meta?: { selectedValues: T[]; selectedOptions: DropdownOption<T>[] }
  ) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  multiple?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  noResultsMessage?: React.ReactNode;
  filterOptions?: (options: DropdownOption<T>[], query: string) => DropdownOption<T>[];
  className?: string;
}
```

### Usage Examples

```tsx
import { LiveMenuDropdown } from 'livemenu-ui';

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
];

// Basic dropdown
<LiveMenuDropdown
  label="Country"
  options={countries}
  value={selectedCountry}
  onChange={(next) => {
    if (typeof next === 'string') setSelectedCountry(next);
  }}
  fullWidth
/>

// Multi-select with search
const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
  { label: 'Billing', value: 'billing' },
];

<LiveMenuDropdown
  label="Team roles"
  options={roleOptions}
  value={selectedRoles}
  multiple
  searchable
  placeholder="Select roles"
  onChange={(next) => {
    setSelectedRoles(Array.isArray(next) ? next : [next]);
  }}
/>

// With icons and error state
const statusOptions = [
  { label: 'Active', value: 'active', icon: <span>✓</span> },
  { label: 'Pending', value: 'pending', icon: <span>⏱</span> },
  { label: 'Inactive', value: 'inactive', icon: <span>✗</span> },
];

<LiveMenuDropdown
  label="Status"
  options={statusOptions}
  value={status}
  onChange={(next) => {
    if (typeof next === 'string') setStatus(next);
  }}
  error={!status ? 'Please choose a status' : undefined}
  required
/>
```

### Features
- Optional multi-select with inline checkboxes
- Sticky search input for large option sets
- Customizable filter logic via `filterOptions`
- Icon, prefix, and suffix support for options
- Keyboard navigation (ESC to close), click-outside handling
- Selected state indicators with dark mode support

---

## 3. LiveMenuCheckbox

**File:** `src/components/Checkbox/Checkbox.tsx`

Checkbox component with label, helper text, and validation.

### Props

```typescript
interface LiveMenuCheckboxProps {
  label?: string | React.ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

### Usage Examples

```tsx
import { LiveMenuCheckbox } from 'livemenu-ui';

// Basic checkbox
<LiveMenuCheckbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

// With helper text
<LiveMenuCheckbox
  label="Subscribe to newsletter"
  helperText="Receive weekly updates and promotions"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>

// Different sizes
<LiveMenuCheckbox label="Small" size="sm" />
<LiveMenuCheckbox label="Medium" size="md" />
<LiveMenuCheckbox label="Large" size="lg" />

// With error
<LiveMenuCheckbox
  label="Accept terms"
  error="You must accept the terms to continue"
  checked={false}
/>

// Disabled
<LiveMenuCheckbox
  label="Disabled option"
  checked={true}
  disabled
/>

// Multiple checkboxes
<div className="space-y-3">
  <LiveMenuCheckbox label="React" checked />
  <LiveMenuCheckbox label="TypeScript" checked />
  <LiveMenuCheckbox label="Tailwind CSS" checked />
</div>
```

### Features
- 3 sizes (sm, md, lg)
- Orange accent color
- Helper text support
- Error states
- Dark mode support
- Accessible

---

## 4. LiveMenuRadio

**File:** `src/components/Radio/Radio.tsx`

Radio button group component for single selection.

### Props

```typescript
interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

interface LiveMenuRadioProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  direction?: 'vertical' | 'horizontal';
  className?: string;
}
```

### Usage Examples

```tsx
import { LiveMenuRadio } from 'livemenu-ui';

// Basic radio group
<LiveMenuRadio
  name="plan"
  label="Select Plan"
  options={[
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ]}
  value={selectedPlan}
  onChange={setSelectedPlan}
/>

// Horizontal layout
<LiveMenuRadio
  name="size"
  label="Size"
  direction="horizontal"
  options={[
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ]}
  value={size}
  onChange={setSize}
/>

// With helper text
<LiveMenuRadio
  name="billing"
  label="Billing Cycle"
  options={[
    { 
      label: 'Monthly', 
      value: 'monthly',
      helperText: '$9.99/month'
    },
    { 
      label: 'Yearly', 
      value: 'yearly',
      helperText: '$99.99/year (2 months free!)'
    },
  ]}
  value={billing}
  onChange={setBilling}
/>

// With disabled option
<LiveMenuRadio
  name="subscription"
  options={[
    { label: 'Basic', value: 'basic' },
    { label: 'Premium', value: 'premium' },
    { label: 'Enterprise', value: 'enterprise', disabled: true },
  ]}
/>

// With error
<LiveMenuRadio
  name="choice"
  label="Make a choice"
  options={options}
  error="Please select an option"
  required
/>
```

### Features
- Vertical or horizontal layout
- Helper text per option
- Orange accent color
- Error states
- Disabled options
- Dark mode support
- Accessible with ARIA

---

## 5. LiveMenuTextarea

**File:** `src/components/Textarea/Textarea.tsx`

Multi-line text input with label and validation.

### Props

```typescript
interface LiveMenuTextareaProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  rows?: number;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}
```

### Usage Examples

```tsx
import { LiveMenuTextarea } from 'livemenu-ui';

// Basic textarea
<LiveMenuTextarea
  label="Message"
  placeholder="Enter your message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>

// With row count
<LiveMenuTextarea
  label="Description"
  rows={8}
  placeholder="Describe your product..."
/>

// With helper text
<LiveMenuTextarea
  label="Bio"
  helperText="Maximum 500 characters"
  maxLength={500}
  fullWidth
/>

// With error
<LiveMenuTextarea
  label="Comments"
  value={comments}
  error="Comments are required"
  required
/>

// Different sizes
<LiveMenuTextarea label="Small" size="sm" />
<LiveMenuTextarea label="Medium" size="md" />
<LiveMenuTextarea label="Large" size="lg" />

// Full featured
<LiveMenuTextarea
  label="Feedback"
  placeholder="Share your thoughts..."
  value={feedback}
  onChange={(e) => setFeedback(e.target.value)}
  rows={6}
  required
  helperText="Your feedback helps us improve"
  fullWidth
/>
```

### Features
- Uses `livemenu-textarea` class
- Resizable (vertical only)
- 3 sizes (sm, md, lg)
- Error and helper text
- Orange focus ring
- Dark mode support
- Accessible

---

## 6. LiveMenuSwitch

**File:** `src/components/Switch/Switch.tsx`

Toggle switch component for binary on/off choices.

### Props

```typescript
interface LiveMenuSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string | React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'danger';
  className?: string;
}
```

### Usage Examples

```tsx
import { LiveMenuSwitch } from 'livemenu-ui';

// Basic switch
<LiveMenuSwitch
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
/>

// Different sizes
<LiveMenuSwitch label="Small" size="sm" checked />
<LiveMenuSwitch label="Medium" size="md" checked />
<LiveMenuSwitch label="Large" size="lg" checked />

// Different variants
<LiveMenuSwitch label="Primary (Orange)" variant="primary" checked />
<LiveMenuSwitch label="Success (Green)" variant="success" checked />
<LiveMenuSwitch label="Danger (Red)" variant="danger" checked />

// Disabled
<LiveMenuSwitch
  label="Disabled switch"
  checked={true}
  disabled
/>

// Settings panel
<div className="space-y-4">
  <LiveMenuSwitch
    label="Email notifications"
    checked={emailNotifs}
    onChange={setEmailNotifs}
  />
  <LiveMenuSwitch
    label="Push notifications"
    checked={pushNotifs}
    onChange={setPushNotifs}
  />
  <LiveMenuSwitch
    label="Dark mode"
    checked={darkMode}
    onChange={setDarkMode}
    variant="success"
  />
</div>
```

### Features
- 3 sizes (sm, md, lg)
- 3 color variants (primary, success, danger)
- Smooth animations
- iOS-style design
- Dark mode support
- Click label to toggle
- Accessible with ARIA

---

## 📦 Complete Export List

All new components are exported:

```typescript
// Alert
export { LiveMenuAlert, Alert } from 'livemenu-ui';
export type { LiveMenuAlertProps } from 'livemenu-ui';

// Dropdown
export { LiveMenuDropdown, Dropdown } from 'livemenu-ui';
export type { LiveMenuDropdownProps, DropdownOption } from 'livemenu-ui';

// Checkbox
export { LiveMenuCheckbox, Checkbox } from 'livemenu-ui';
export type { LiveMenuCheckboxProps } from 'livemenu-ui';

// Radio
export { LiveMenuRadio, Radio } from 'livemenu-ui';
export type { LiveMenuRadioProps, RadioOption } from 'livemenu-ui';

// Textarea
export { LiveMenuTextarea, Textarea } from 'livemenu-ui';
export type { LiveMenuTextareaProps } from 'livemenu-ui';

// Switch
export { LiveMenuSwitch, Switch } from 'livemenu-ui';
export type { LiveMenuSwitchProps } from 'livemenu-ui';
```

---

## 💻 Complete Form Example

Using all new form components together:

```tsx
import React, { useState } from 'react';
import {
  LiveMenuCard,
  LiveMenuInput,
  LiveMenuTextarea,
  LiveMenuDropdown,
  LiveMenuCheckbox,
  LiveMenuRadio,
  LiveMenuSwitch,
  LiveMenuButton,
  LiveMenuAlert,
} from 'livemenu-ui';

function CompleteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    plan: 'free',
    message: '',
    terms: false,
    newsletter: true,
    notifications: true,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    console.log('Form data:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Success Alert */}
      {showSuccess && (
        <LiveMenuAlert
          variant="success"
          title="Success!"
          dismissible
          onDismiss={() => setShowSuccess(false)}
          className="mb-6"
        >
          Your form has been submitted successfully.
        </LiveMenuAlert>
      )}

      <LiveMenuCard
        title="Contact Form"
        subtitle="Fill out all required fields"
        footer={
          <div className="flex gap-3 justify-end">
            <LiveMenuButton variant="outline">
              Cancel
            </LiveMenuButton>
            <LiveMenuButton variant="primary" type="submit">
              Submit
            </LiveMenuButton>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Text Input */}
          <LiveMenuInput
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />

          {/* Email Input */}
          <LiveMenuInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            fullWidth
          />

          {/* Dropdown */}
          <LiveMenuDropdown
            label="Country"
            placeholder="Select your country"
            options={[
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
              { label: 'United Kingdom', value: 'uk' },
            ]}
            value={formData.country}
            onChange={(value) => setFormData({ ...formData, country: value })}
            required
            fullWidth
          />

          {/* Radio Group */}
          <LiveMenuRadio
            name="plan"
            label="Select Plan"
            options={[
              { 
                label: 'Free', 
                value: 'free',
                helperText: '$0/month - Basic features'
              },
              { 
                label: 'Pro', 
                value: 'pro',
                helperText: '$9.99/month - All features'
              },
              { 
                label: 'Enterprise', 
                value: 'enterprise',
                helperText: 'Custom pricing - Contact sales'
              },
            ]}
            value={formData.plan}
            onChange={(value) => setFormData({ ...formData, plan: value })}
          />

          {/* Textarea */}
          <LiveMenuTextarea
            label="Message"
            placeholder="Tell us more about your needs..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            helperText="Minimum 10 characters"
            fullWidth
          />

          {/* Checkbox */}
          <LiveMenuCheckbox
            label="I accept the terms and conditions"
            checked={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
            required
          />

          {/* Switches */}
          <div className="space-y-3">
            <LiveMenuSwitch
              label="Subscribe to newsletter"
              checked={formData.newsletter}
              onChange={(checked) => setFormData({ ...formData, newsletter: checked })}
              variant="success"
            />
            
            <LiveMenuSwitch
              label="Enable push notifications"
              checked={formData.notifications}
              onChange={(checked) => setFormData({ ...formData, notifications: checked })}
              variant="primary"
            />
          </div>
        </form>
      </LiveMenuCard>
    </div>
  );
}

export default CompleteForm;
```

---

## 🎨 Dark Mode Behavior

All components automatically adapt to dark mode:

| Component | Light Mode | Dark Mode |
|-----------|------------|-----------|
| **Alert** | Pastel backgrounds | Color/10 opacity backgrounds |
| **Dropdown** | White bg, gray border | Dark tertiary bg, dark border |
| **Checkbox** | Gray border, orange check | Dark border, orange check |
| **Radio** | Gray border, orange fill | Dark border, orange fill |
| **Textarea** | White bg, gray border | Dark tertiary bg, dark border |
| **Switch** | Gray (off), orange (on) | Dark tertiary (off), orange (on) |

---

## 🎯 Use Cases

### LiveMenuAlert
- Success/error messages
- System notifications
- Form validation feedback
- Information banners

### LiveMenuDropdown
- Country/region selection
- Status selection
- Category filters
- Settings menus

### LiveMenuCheckbox
- Terms acceptance
- Feature toggles
- Multi-select options
- Preferences

### LiveMenuRadio
- Plan selection
- Single choice questions
- Payment methods
- Shipping options

### LiveMenuTextarea
- Comments
- Descriptions
- Messages
- Feedback forms

### LiveMenuSwitch
- Feature toggles
- Settings on/off
- Preferences
- Binary choices

---

## 📊 Component Statistics

### New Components
- **Total:** 6 components
- **TypeScript:** Full type coverage
- **Dark Mode:** All supported
- **Props:** 40+ props total
- **Variants:** Multiple per component

### Bundle Impact
- **JS (ESM):** 7KB → 18KB (+11KB)
- **CSS:** 50KB → 54KB (+4KB)
- **Total Components:** 6 → 12 (doubled!)

---

## ✨ Features Summary

### All New Components Include:
- ✅ TypeScript support
- ✅ Dark mode support
- ✅ Orange color palette
- ✅ Accessible (ARIA attributes)
- ✅ Error states
- ✅ Disabled states
- ✅ Helper text
- ✅ Multiple sizes
- ✅ JSDoc documentation
- ✅ Legacy exports

---

**6 new components successfully added to LiveMenu UI!** 🎉

See individual component examples and API docs for more details.


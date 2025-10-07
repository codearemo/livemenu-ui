# LiveMenuInput Component Examples

## Import

```tsx
import { LiveMenuInput } from 'livemenu-ui';
// or
import { Input } from 'livemenu-ui'; // Legacy alias
```

## Basic Usage

### Simple Input
```tsx
<LiveMenuInput placeholder="Enter text..." />
```

### Input with Label
```tsx
<LiveMenuInput 
  label="Email Address" 
  type="email"
  placeholder="Enter your email"
/>
```

## Input Types

### Text Input
```tsx
<LiveMenuInput 
  label="Full Name"
  type="text"
  placeholder="John Doe"
/>
```

### Email Input
```tsx
<LiveMenuInput 
  label="Email"
  type="email"
  placeholder="john@example.com"
/>
```

### Password Input
```tsx
<LiveMenuInput 
  label="Password"
  type="password"
  placeholder="Enter password"
/>
```

### Number Input
```tsx
<LiveMenuInput 
  label="Age"
  type="number"
  placeholder="25"
/>
```

### Telephone Input
```tsx
<LiveMenuInput 
  label="Phone Number"
  type="tel"
  placeholder="+1 (555) 123-4567"
/>
```

### URL Input
```tsx
<LiveMenuInput 
  label="Website"
  type="url"
  placeholder="https://example.com"
/>
```

### Search Input
```tsx
<LiveMenuInput 
  label="Search"
  type="search"
  placeholder="Search..."
/>
```

### Date Input
```tsx
<LiveMenuInput 
  label="Date of Birth"
  type="date"
/>
```

## Required Fields

### Required Input with Asterisk
```tsx
<LiveMenuInput 
  label="Email Address"
  type="email"
  required
  placeholder="Enter your email"
/>
```

## Error States

### Input with Error
```tsx
<LiveMenuInput 
  label="Email"
  type="email"
  value="invalid-email"
  error="Please enter a valid email address"
/>
```

### Multiple Inputs with Errors
```tsx
<div className="space-y-4">
  <LiveMenuInput 
    label="Username"
    value="ab"
    error="Username must be at least 3 characters"
  />
  <LiveMenuInput 
    label="Password"
    type="password"
    value="123"
    error="Password must be at least 8 characters"
  />
</div>
```

## Helper Text

### Input with Helper Text
```tsx
<LiveMenuInput 
  label="Username"
  helperText="Choose a unique username between 3-20 characters"
  placeholder="username"
/>
```

### Email with Format Helper
```tsx
<LiveMenuInput 
  label="Email"
  type="email"
  helperText="We'll never share your email with anyone else"
  placeholder="john@example.com"
/>
```

## Icons

### Left Icon (Search)
```tsx
<LiveMenuInput 
  label="Search"
  placeholder="Search products..."
  leftIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  }
/>
```

### Right Icon (Password Visibility)
```tsx
<LiveMenuInput 
  label="Password"
  type="password"
  placeholder="Enter password"
  rightIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  }
/>
```

### Email Icon
```tsx
<LiveMenuInput 
  label="Email"
  type="email"
  placeholder="john@example.com"
  leftIcon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  }
/>
```

### Input with Error Icon
```tsx
<LiveMenuInput 
  label="Email"
  type="email"
  value="invalid"
  error="Invalid email format"
  rightIcon={
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  }
/>
```

## Disabled State

### Disabled Input
```tsx
<LiveMenuInput 
  label="Company Name"
  value="Acme Corporation"
  disabled
/>
```

### Disabled with Helper Text
```tsx
<LiveMenuInput 
  label="Account Status"
  value="Active"
  disabled
  helperText="This field cannot be edited"
/>
```

## Full Width

### Full Width Input
```tsx
<LiveMenuInput 
  label="Full Name"
  placeholder="Enter your full name"
  fullWidth
/>
```

## Controlled Inputs

### With State Management
```tsx
const [email, setEmail] = useState('');

<LiveMenuInput 
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>
```

### With Validation
```tsx
const [password, setPassword] = useState('');
const [error, setError] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setPassword(value);
  
  if (value.length < 8) {
    setError('Password must be at least 8 characters');
  } else {
    setError('');
  }
};

<LiveMenuInput 
  label="Password"
  type="password"
  value={password}
  onChange={handleChange}
  error={error}
  required
/>
```

## Complete Forms

### Login Form
```tsx
<div className="space-y-4">
  <LiveMenuInput 
    label="Email"
    type="email"
    placeholder="Enter your email"
    required
    fullWidth
    leftIcon={<MailIcon />}
  />
  <LiveMenuInput 
    label="Password"
    type="password"
    placeholder="Enter your password"
    required
    fullWidth
    leftIcon={<LockIcon />}
  />
  <LiveMenuButton variant="primary" fullWidth>
    Sign In
  </LiveMenuButton>
</div>
```

### Registration Form
```tsx
<div className="space-y-4">
  <LiveMenuInput 
    label="Full Name"
    type="text"
    placeholder="John Doe"
    required
    fullWidth
  />
  <LiveMenuInput 
    label="Email"
    type="email"
    placeholder="john@example.com"
    required
    fullWidth
    helperText="We'll send a verification email"
  />
  <LiveMenuInput 
    label="Password"
    type="password"
    placeholder="Create a strong password"
    required
    fullWidth
    helperText="Must be at least 8 characters"
  />
  <LiveMenuInput 
    label="Confirm Password"
    type="password"
    placeholder="Re-enter your password"
    required
    fullWidth
  />
  <LiveMenuButton variant="success" fullWidth>
    Create Account
  </LiveMenuButton>
</div>
```

### Contact Form
```tsx
<LiveMenuCard title="Contact Us">
  <div className="space-y-4">
    <LiveMenuInput 
      label="Name"
      type="text"
      placeholder="Your name"
      required
      fullWidth
    />
    <LiveMenuInput 
      label="Email"
      type="email"
      placeholder="your@email.com"
      required
      fullWidth
    />
    <LiveMenuInput 
      label="Phone"
      type="tel"
      placeholder="+1 (555) 123-4567"
      fullWidth
    />
    <LiveMenuButton variant="primary" fullWidth>
      Submit
    </LiveMenuButton>
  </div>
</LiveMenuCard>
```

### Search Bar
```tsx
<LiveMenuInput 
  type="search"
  placeholder="Search for products, brands, and more..."
  fullWidth
  leftIcon={<SearchIcon />}
/>
```

## Event Handlers

### With All Handlers
```tsx
<LiveMenuInput 
  label="Username"
  onChange={(e) => console.log('Changed:', e.target.value)}
  onFocus={(e) => console.log('Focused')}
  onBlur={(e) => console.log('Blurred')}
  placeholder="Enter username"
/>
```

## TypeScript Props

```typescript
interface LiveMenuInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time';
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  label?: string | React.ReactNode;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  // ... extends all HTML input attributes
}
```

## Styling Features

- ✅ **Orange focus ring** - Brand-colored focus state
- ✅ **Error states** - Red border and text for errors
- ✅ **Icon support** - Left and right icon slots
- ✅ **Helper text** - Additional context below input
- ✅ **Required indicator** - Asterisk for required fields
- ✅ **Disabled styling** - Grayed out appearance
- ✅ **Full width option** - Responsive width control
- ✅ **Accessible** - ARIA attributes and proper labels
- ✅ **Transitions** - Smooth focus and hover effects

## Accessibility

- Proper label association with input
- ARIA attributes for error states
- Helper text linked via `aria-describedby`
- Required indicator in label
- Disabled state properly handled
- Focus management

## Use Cases

- Login and registration forms
- Search bars
- Contact forms
- Profile editing
- Data entry forms
- Filters and settings
- Survey and feedback forms
- Checkout processes


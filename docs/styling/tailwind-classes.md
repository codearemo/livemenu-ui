# LiveMenu UI Component Classes

This document lists all available custom component classes in the livemenu-ui library.

## 🎨 Color Palette

### LiveMenu Orange
- **light**: `#fef2e5` (hover: `#feedbd`, active: `#fcddb8`)
- **DEFAULT**: `#ff7c30`
- **hover**: `#dd7000`
- **active**: `#e46300`
- **dark**: `#b85d00` (hover: `#934a00`, active: `#6e3800`)
- **darker**: `#562b00`

### Semantic Colors
- **primary**: Orange scale (50-950)
- **secondary**: Slate scale
- **success**: Green scale
- **danger**: Red scale
- **warning**: Amber scale
- **info**: Blue scale

## 🔘 Button Classes

### Base Styles
- `.livemenu-btn` - Base button with transitions and focus states

### Variants
- `.livemenu-btn-primary` - Primary orange button
- `.livemenu-btn-secondary` - Secondary slate button
- `.livemenu-btn-outline` - Outlined button
- `.livemenu-btn-light` - Light background button
- `.livemenu-btn-dark` - Dark orange button

### Sizes
- `.livemenu-btn-sm` - Small button
- `.livemenu-btn-md` - Medium button (default)
- `.livemenu-btn-lg` - Large button
- `.livemenu-btn-xl` - Extra large button

## 🃏 Card Classes

- `.livemenu-card` - Base card with shadow and hover effect
- `.livemenu-card-header` - Card header section
- `.livemenu-card-body` - Card body section
- `.livemenu-card-footer` - Card footer section
- `.livemenu-card-highlighted` - Card with orange border

## 📝 Input Classes

### Text Inputs
- `.livemenu-input` - Base input style
- `.livemenu-input-error` - Error state input
- `.livemenu-input-success` - Success state input
- `.livemenu-input-sm` - Small input
- `.livemenu-input-lg` - Large input

### Other Form Elements
- `.livemenu-textarea` - Textarea style
- `.livemenu-select` - Select dropdown style
- `.livemenu-label` - Form label
- `.livemenu-label-required` - Label with required asterisk

## 🏷️ Badge Classes

### Variants
- `.livemenu-badge` - Base badge style
- `.livemenu-badge-primary` - Primary orange badge
- `.livemenu-badge-secondary` - Secondary badge
- `.livemenu-badge-success` - Success badge
- `.livemenu-badge-danger` - Danger badge
- `.livemenu-badge-warning` - Warning badge
- `.livemenu-badge-info` - Info badge
- `.livemenu-badge-outline` - Outlined badge

### Sizes
- `.livemenu-badge-sm` - Small badge
- `.livemenu-badge-md` - Medium badge (default)
- `.livemenu-badge-lg` - Large badge

## 🔔 Alert Classes

- `.livemenu-alert` - Base alert style
- `.livemenu-alert-success` - Success alert
- `.livemenu-alert-danger` - Danger alert
- `.livemenu-alert-warning` - Warning alert
- `.livemenu-alert-info` - Info alert

## 🛠️ Utility Classes

- `.livemenu-link` - Styled link with hover underline
- `.livemenu-divider` - Horizontal divider line
- `.livemenu-shadow` - Orange-tinted shadow
- `.livemenu-shadow-lg` - Large orange-tinted shadow

## 📋 Usage Examples

### Buttons
\`\`\`html
<button class="livemenu-btn-primary livemenu-btn-lg">Click Me</button>
<button class="livemenu-btn-outline livemenu-btn-md">Outlined</button>
\`\`\`

### Cards
\`\`\`html
<div class="livemenu-card">
  <div class="livemenu-card-header">Card Title</div>
  <div class="livemenu-card-body">Card content goes here</div>
  <div class="livemenu-card-footer">Footer content</div>
</div>
\`\`\`

### Forms
\`\`\`html
<label class="livemenu-label livemenu-label-required">Email</label>
<input type="email" class="livemenu-input" placeholder="Enter email">
<textarea class="livemenu-textarea" placeholder="Your message"></textarea>
\`\`\`

### Badges
\`\`\`html
<span class="livemenu-badge-primary">New</span>
<span class="livemenu-badge-success livemenu-badge-lg">Active</span>
\`\`\`

### Alerts
\`\`\`html
<div class="livemenu-alert-success">Operation completed successfully!</div>
<div class="livemenu-alert-danger">An error occurred.</div>
\`\`\`

## ✨ Features

All component classes include:
- ✅ Smooth transitions and animations
- ✅ Hover and active states
- ✅ Focus states with orange ring
- ✅ Disabled states where applicable
- ✅ Responsive sizing
- ✅ Consistent orange color palette

# LiveMenu UI Color Palette

Complete color documentation for the LiveMenu UI component library.

## 🎨 LiveMenu Orange Scale

The primary brand color palette based on the signature LiveMenu orange (`#ff7c30`).

### Color Shades

| Shade | Hex Code | RGB | Use Case |
|-------|----------|-----|----------|
| **Light** | `#fef2e5` | `rgb(254, 242, 229)` | Backgrounds, subtle highlights |
| **Light Hover** | `#feedbd` | `rgb(254, 237, 189)` | Hover states for light elements |
| **Light Active** | `#fcddb8` | `rgb(252, 221, 184)` | Active states for light elements |
| **Default** | `#ff7c30` | `rgb(255, 124, 48)` | Primary actions, links, focus |
| **Hover** | `#dd7000` | `rgb(221, 112, 0)` | Hover states |
| **Active** | `#e46300` | `rgb(228, 99, 0)` | Active/pressed states |
| **Dark** | `#b85d00` | `rgb(184, 93, 0)` | Dark buttons, emphasis |
| **Dark Hover** | `#934a00` | `rgb(147, 74, 0)` | Dark button hover |
| **Dark Active** | `#6e3800` | `rgb(110, 56, 0)` | Dark button active |
| **Darker** | `#562b00` | `rgb(86, 43, 0)` | Text, maximum contrast |

### Primary Scale (50-950)

The extended primary scale for maximum flexibility:

| Shade | Hex Code | RGB | Description |
|-------|----------|-----|-------------|
| **50** | `#fef2e5` | `rgb(254, 242, 229)` | Lightest tint |
| **100** | `#feedbd` | `rgb(254, 237, 189)` | Very light |
| **200** | `#fcddb8` | `rgb(252, 221, 184)` | Light |
| **300** | `#ffc894` | `rgb(255, 200, 148)` | Light-medium |
| **400** | `#ffa05d` | `rgb(255, 160, 93)` | Medium-light |
| **500** | `#ff7c30` | `rgb(255, 124, 48)` | **Base color** |
| **600** | `#e46300` | `rgb(228, 99, 0)` | Medium-dark |
| **700** | `#b85d00` | `rgb(184, 93, 0)` | Dark |
| **800** | `#934a00` | `rgb(147, 74, 0)` | Very dark |
| **900** | `#6e3800` | `rgb(110, 56, 0)` | Darkest |
| **950** | `#562b00` | `rgb(86, 43, 0)` | Maximum contrast |

## 📊 Contrast Ratios

Contrast ratios against white (`#ffffff`) and black (`#000000`) backgrounds for accessibility compliance.

### Against White Background

| Color | Contrast Ratio | WCAG AA | WCAG AAA | Use Case |
|-------|----------------|---------|----------|----------|
| Light (`#fef2e5`) | 1.07:1 | ❌ Fail | ❌ Fail | Background only |
| Light Hover (`#feedbd`) | 1.14:1 | ❌ Fail | ❌ Fail | Background only |
| Light Active (`#fcddb8`) | 1.21:1 | ❌ Fail | ❌ Fail | Background only |
| Default (`#ff7c30`) | 2.83:1 | ❌ Fail | ❌ Fail | Large text only |
| Hover (`#dd7000`) | 3.42:1 | ⚠️ Large text only | ❌ Fail | Large text |
| Active (`#e46300`) | 3.31:1 | ⚠️ Large text only | ❌ Fail | Large text |
| Dark (`#b85d00`) | 5.12:1 | ✅ Pass AA | ⚠️ Large text AAA | Body text (AA) |
| Dark Hover (`#934a00`) | 6.84:1 | ✅ Pass AA | ✅ Pass AAA | All text |
| Dark Active (`#6e3800`) | 9.21:1 | ✅ Pass AA | ✅ Pass AAA | All text |
| Darker (`#562b00`) | 11.43:1 | ✅ Pass AA | ✅ Pass AAA | All text |

### Against Black Background

| Color | Contrast Ratio | WCAG AA | WCAG AAA | Use Case |
|-------|----------------|---------|----------|----------|
| Light (`#fef2e5`) | 19.62:1 | ✅ Pass AA | ✅ Pass AAA | All text |
| Default (`#ff7c30`) | 7.42:1 | ✅ Pass AA | ✅ Pass AAA | All text |
| Dark (`#b85d00`) | 4.10:1 | ✅ Pass AA | ⚠️ Large text AAA | Body text (AA) |

### Recommendations

- ✅ **Use white text on orange buttons** (`text-white` on `bg-livemenu`)
- ✅ **Use darker shades for text** (`text-livemenu-dark` or `text-livemenu-darker`)
- ✅ **Light backgrounds for subtle highlights** (`bg-livemenu-light`)
- ⚠️ **Avoid orange text on white** unless using dark shades
- ⚠️ **Test custom combinations** with contrast checker tools

## 🎯 Available Tailwind Classes

### Background Classes

```css
bg-livemenu-light         /* #fef2e5 */
bg-livemenu-light-hover   /* #feedbd */
bg-livemenu-light-active  /* #fcddb8 */
bg-livemenu               /* #ff7c30 */
bg-livemenu-hover         /* #dd7000 */
bg-livemenu-active        /* #e46300 */
bg-livemenu-dark          /* #b85d00 */
bg-livemenu-dark-hover    /* #934a00 */
bg-livemenu-dark-active   /* #6e3800 */
bg-livemenu-darker        /* #562b00 */

/* Extended primary scale */
bg-primary-50 through bg-primary-950
bg-primary  /* Same as bg-livemenu */
```

### Text Classes

```css
text-livemenu-light       /* #fef2e5 */
text-livemenu             /* #ff7c30 */
text-livemenu-hover       /* #dd7000 */
text-livemenu-active      /* #e46300 */
text-livemenu-dark        /* #b85d00 */
text-livemenu-dark-hover  /* #934a00 */
text-livemenu-dark-active /* #6e3800 */
text-livemenu-darker      /* #562b00 */

/* Extended primary scale */
text-primary-50 through text-primary-950
text-primary  /* Same as text-livemenu */
```

### Border Classes

```css
border-livemenu-light
border-livemenu
border-livemenu-hover
border-livemenu-active
border-livemenu-dark
border-livemenu-dark-hover
border-livemenu-dark-active
border-livemenu-darker

/* Extended primary scale */
border-primary-50 through border-primary-950
border-primary
```

### Ring (Focus) Classes

```css
ring-livemenu
ring-livemenu-dark
ring-primary
focus:ring-livemenu
focus:ring-livemenu-dark
```

## 💡 Usage Examples

### Buttons

#### Primary Button (White text on orange)
```tsx
<button className="bg-livemenu text-white hover:bg-livemenu-hover active:bg-livemenu-active">
  Primary Action
</button>

// Using the component
<LiveMenuButton variant="primary">
  Primary Action
</LiveMenuButton>
```

#### Dark Button (White text on dark orange)
```tsx
<button className="bg-livemenu-dark text-white hover:bg-livemenu-dark-hover active:bg-livemenu-dark-active">
  Dark Action
</button>

// Using the component
<LiveMenuButton variant="dark">
  Dark Action
</LiveMenuButton>
```

#### Outline Button
```tsx
<button className="border-2 border-livemenu text-livemenu hover:bg-livemenu-light active:bg-livemenu-light-active">
  Outline Action
</button>

// Using the component
<LiveMenuButton variant="outline">
  Outline Action
</LiveMenuButton>
```

#### Light Button (Orange text on light background)
```tsx
<button className="bg-livemenu-light text-livemenu-dark hover:bg-livemenu-light-hover">
  Light Action
</button>

// Using the component
<LiveMenuButton variant="light">
  Light Action
</LiveMenuButton>
```

### Cards and Containers

#### Subtle Highlight Card
```tsx
<div className="bg-livemenu-light border border-livemenu-light-active rounded-lg p-6">
  <h3 className="text-livemenu-dark font-semibold">Featured Content</h3>
  <p className="text-gray-700">Card content here...</p>
</div>
```

#### Highlighted Border Card
```tsx
<div className="border-2 border-livemenu rounded-lg p-6">
  <h3 className="text-livemenu font-semibold">Important Notice</h3>
  <p className="text-gray-700">Card content here...</p>
</div>

// Using the component
<LiveMenuCard className="border-2 border-livemenu">
  Important content
</LiveMenuCard>
```

### Text and Links

#### Link (Accessible contrast)
```tsx
<a href="#" className="text-livemenu-dark hover:text-livemenu underline">
  Learn more
</a>

// Using utility class
<a href="#" className="livemenu-link">
  Learn more
</a>
```

#### Heading with orange accent
```tsx
<h2 className="text-2xl font-bold text-gray-900">
  Welcome to <span className="text-livemenu">LiveMenu</span>
</h2>
```

### Badges and Labels

#### Status Badge
```tsx
<span className="bg-livemenu-light text-livemenu-dark px-2.5 py-0.5 rounded-full text-xs">
  New Feature
</span>

// Using the component
<LiveMenuBadge variant="primary">
  New Feature
</LiveMenuBadge>
```

#### Dark Badge
```tsx
<span className="bg-livemenu-dark text-white px-2.5 py-0.5 rounded-full text-xs">
  Premium
</span>

// Using the component
<LiveMenuBadge variant="dark">
  Premium
</LiveMenuBadge>
```

### Form Elements

#### Input with Orange Focus
```tsx
<input 
  type="text" 
  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-livemenu focus:border-livemenu"
/>

// Using the component
<LiveMenuInput 
  label="Email"
  type="email"
/>
```

### Alerts and Notifications

#### Info Alert
```tsx
<div className="bg-livemenu-light border-l-4 border-livemenu p-4">
  <p className="text-livemenu-dark font-medium">Important Information</p>
  <p className="text-gray-700 text-sm">Details about the notification...</p>
</div>
```

## 🎨 Custom Styling Examples

### Gradient Backgrounds

#### Orange Gradient
```tsx
<div className="bg-gradient-to-r from-livemenu to-livemenu-dark text-white p-8 rounded-lg">
  <h2 className="text-2xl font-bold">Gradient Background</h2>
</div>
```

#### Subtle Gradient
```tsx
<div className="bg-gradient-to-br from-livemenu-light to-white p-8 rounded-lg">
  <h2 className="text-livemenu-dark text-2xl font-bold">Subtle Gradient</h2>
</div>
```

### Shadows with Orange Tint

#### Custom Shadow
```tsx
<div className="shadow-lg hover:shadow-livemenu/50 transition-shadow">
  Card with orange-tinted shadow
</div>

// Using utility class
<div className="livemenu-shadow-lg">
  Card with orange-tinted shadow
</div>
```

### Hover Effects

#### Scale and Color Transition
```tsx
<button className="bg-livemenu text-white px-6 py-3 rounded-md transform hover:scale-105 hover:bg-livemenu-hover transition-all">
  Hover Me
</button>
```

#### Glow Effect
```tsx
<button className="bg-livemenu text-white px-6 py-3 rounded-md hover:shadow-lg hover:shadow-livemenu/50 transition-shadow">
  Glow Button
</button>
```

### Progress Bars

#### Orange Progress Bar
```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-livemenu h-2 rounded-full transition-all" 
    style={{ width: '75%' }}
  />
</div>
```

#### Gradient Progress Bar
```tsx
<div className="w-full bg-gray-200 rounded-full h-2">
  <div 
    className="bg-gradient-to-r from-livemenu to-livemenu-dark h-2 rounded-full" 
    style={{ width: '60%' }}
  />
</div>
```

### Dividers

#### Orange Accent Divider
```tsx
<div className="flex items-center gap-4">
  <div className="flex-1 border-t border-gray-200"></div>
  <div className="w-12 border-t-2 border-livemenu"></div>
  <div className="flex-1 border-t border-gray-200"></div>
</div>

// Using utility class
<div className="livemenu-divider"></div>
```

## 🧪 Accessibility Testing

### Testing Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- Chrome DevTools - Lighthouse Accessibility Audit

### Quick Test Matrix

| Background | Text Color | Contrast | Status | Size |
|------------|------------|----------|--------|------|
| White | livemenu-darker | 11.43:1 | ✅ AAA | Any |
| White | livemenu-dark-active | 9.21:1 | ✅ AAA | Any |
| White | livemenu-dark-hover | 6.84:1 | ✅ AAA | Any |
| White | livemenu-dark | 5.12:1 | ✅ AA | Any |
| White | livemenu | 2.83:1 | ❌ Fail | ❌ |
| livemenu | White | 2.83:1 | ⚠️ Large only | 18pt+ |
| livemenu-dark | White | 5.12:1 | ✅ AA | Any |
| Black | livemenu-light | 19.62:1 | ✅ AAA | Any |
| Black | livemenu | 7.42:1 | ✅ AAA | Any |

### Best Practices

1. **Primary buttons**: Use white text on orange background ✅
2. **Text on white**: Use `livemenu-dark` or darker shades ✅
3. **Links**: Use `livemenu-dark` for AAA compliance ✅
4. **Large text (18pt+)**: Can use lighter orange shades ⚠️
5. **Decorative elements**: Any shade is acceptable 🎨

## 🌈 Semantic Color Mapping

For consistency across the library:

| Use Case | Color | Class |
|----------|-------|-------|
| Primary actions | Orange | `bg-livemenu`, `text-livemenu-dark` |
| Secondary actions | Gray | `bg-secondary` |
| Success states | Green | `bg-success`, `text-success` |
| Danger/Error | Red | `bg-danger`, `text-danger` |
| Warning | Yellow | `bg-warning`, `text-warning` |
| Info | Blue | `bg-info`, `text-info` |

## 📝 Component Color Usage

### LiveMenuButton
- `primary`: `bg-livemenu` with white text
- `secondary`: `bg-secondary` with white text
- `outline`: `border-livemenu` with `text-livemenu`
- `light`: `bg-livemenu-light` with `text-livemenu-dark`
- `dark`: `bg-livemenu-dark` with white text

### LiveMenuBadge
- `primary`: `bg-livemenu-light` with `text-livemenu-dark`
- `light`: `bg-livemenu-light` with `text-livemenu-dark`
- `dark`: `bg-livemenu-dark` with white text

### LiveMenuInput
- Focus ring: `ring-livemenu`
- Error border: `border-danger`

### LiveMenuCard
- Default: white background
- Highlighted: `border-livemenu` (2px)

## 💻 Code Reference

Access colors in your JavaScript/TypeScript:

```typescript
// Using Tailwind classes
const className = 'bg-livemenu text-white hover:bg-livemenu-hover';

// Custom inline styles (not recommended, use Tailwind)
const style = {
  backgroundColor: '#ff7c30',
  color: '#ffffff',
};

// CSS custom properties (if configured)
const customStyle = {
  backgroundColor: 'var(--livemenu)',
  color: 'white',
};
```

## 📚 Resources

- [Tailwind CSS Color Documentation](https://tailwindcss.com/docs/customizing-colors)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Guide](https://webaim.org/articles/contrast/)

---

**Color Palette Version:** 1.0.0  
**Last Updated:** October 2025  
**Maintained by:** LiveMenu UI Team


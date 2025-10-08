# Component Generator Guide

## Quick Start

Generate a new component with a single command:

```bash
npm run generate:component ComponentName
```

## Examples

```bash
# Generate a Select component
npm run generate:component Select

# Generate a DatePicker component (kebab-case auto-converts to PascalCase)
npm run generate:component date-picker

# Generate a Popover component
npm run generate:component Popover
```

## What Gets Created

The generator creates a complete component structure:

### File Structure

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
└── index.ts                   # Exports

docs/components/
└── componentname.md           # Component documentation
```

### Generated Component (ComponentName.tsx)

```tsx
import React from 'react';

export interface LiveMenuComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Add more props as needed
}

export const LiveMenuComponentName: React.FC<LiveMenuComponentNameProps> = ({
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const componentClasses = [
    'livemenu-componentname',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div className={componentClasses} {...props}>
      {children}
    </div>
  );
};

// Legacy export for backwards compatibility
export const ComponentName = LiveMenuComponentName;
export type ComponentNameProps = LiveMenuComponentNameProps;
```

### Generated Index (index.ts)

```tsx
export { LiveMenuComponentName, ComponentName } from './ComponentName';
export type { LiveMenuComponentNameProps, ComponentNameProps } from './ComponentName';
```

## What Happens Automatically

✅ Component structure is created  
✅ Proper TypeScript types are defined  
✅ Legacy exports are included for backwards compatibility  
✅ `src/components/index.ts` is updated with exports  
✅ Documentation template is generated  
✅ JSDoc comments with examples are included  

## Next Steps After Generation

After running the generator, you need to:

1. **Implement Component Logic**
   - Open `src/components/ComponentName/ComponentName.tsx`
   - Add your component's functionality
   - Update props interface as needed

2. **Add Styles** (if needed)
   - Add CSS classes to `src/styles/tailwind.css`
   - Use the pattern `.livemenu-componentname { ... }`
   - Include dark mode variants

3. **Update Documentation**
   - Edit `docs/components/componentname.md`
   - Add real examples and use cases
   - Document all props and variants
   - Update `docs/DOCUMENTATION_INDEX.md` to link to your component

4. **Build**
   ```bash
   npm run build
   ```

5. **Test**
   - Test in light and dark modes
   - Verify TypeScript types work
   - Check accessibility
   - Test responsive behavior

## Component Guidelines

### Naming Conventions

- **Component Names**: PascalCase (e.g., `Button`, `DatePicker`, `SelectMenu`)
- **File Names**: Match component name exactly
- **CSS Classes**: Lowercase with hyphens (e.g., `livemenu-button`, `livemenu-date-picker`)

### Exports Pattern

Always include both prefixed and legacy exports:

```tsx
// Primary export (with prefix)
export const LiveMenuButton: React.FC<LiveMenuButtonProps> = ...
export interface LiveMenuButtonProps ...

// Legacy export (for backwards compatibility)
export const Button = LiveMenuButton;
export type ButtonProps = LiveMenuButtonProps;
```

### TypeScript

- Extend appropriate React types (`React.HTMLAttributes<HTMLElement>`)
- Use proper generic types when needed
- Include JSDoc comments
- Define clear prop interfaces

### Styling

- Use Tailwind utility classes via the theme system
- Base class pattern: `livemenu-componentname`
- Support dark mode with theme-aware classes
- Make components responsive by default

### Accessibility

- Include proper ARIA attributes
- Support keyboard navigation
- Use semantic HTML elements
- Test with screen readers

## Tips & Best Practices

1. **Review Existing Components** - Look at similar components for patterns and consistency

2. **Start Simple** - Begin with basic functionality, then add features

3. **Use Theme System** - Leverage the existing `ThemeProvider` for dark mode support

4. **Document As You Go** - Update documentation while implementing

5. **Consider Variants** - Plan for different sizes, colors, and states

6. **Test Early** - Build and test frequently during development

## Troubleshooting

### "Component already exists"
The component folder already exists. Choose a different name or delete the existing component first.

### Build Errors After Generation
1. Run `npm run build` to compile TypeScript
2. Check for syntax errors in generated files
3. Verify all imports are correct

### Component Not in Build Output
1. Verify `src/components/index.ts` includes your exports
2. Run `npm run build` again
3. Check the `dist/types/` directory

### Import Errors in Consuming App
1. Ensure you've run `npm run build`
2. Check that types are generated in `dist/types/`
3. Verify package.json exports are correct

## Advanced Usage

### Custom Component Base Elements

If you need a different base element than `div`:

```tsx
export interface LiveMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // ...
}

export const LiveMenuButton: React.FC<LiveMenuButtonProps> = ({
  children,
  ...props
}) => {
  return <button {...props}>{children}</button>;
};
```

### Multiple Sub-Components

For components with multiple parts (like `Modal` with `ModalHeader`, `ModalBody`):

1. Create them in the same file
2. Export all sub-components
3. Document the composition pattern

```tsx
export const LiveMenuModal: React.FC<LiveMenuModalProps> = ...
export const LiveMenuModalHeader: React.FC<...> = ...
export const LiveMenuModalBody: React.FC<...> = ...
```

## Script Location

The generator script is located at:
```
scripts/generate-component.js
```

For detailed script documentation, see:
```
scripts/README.md
```

## Contributing

When adding new components:
1. Use the generator to create the structure
2. Follow the established patterns
3. Update documentation thoroughly
4. Test in multiple scenarios
5. Consider backwards compatibility

---

**Need Help?** Check existing components like `Button`, `Input`, or `Modal` for reference patterns.

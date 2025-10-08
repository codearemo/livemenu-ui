# LiveMenu UI Scripts

This directory contains utility scripts for the LiveMenu UI library.

## Component Generator

The `generate-component.js` script helps you quickly scaffold new components with the proper structure and boilerplate code.

### Usage

#### Using npm script (recommended):

```bash
npm run generate:component ComponentName
```

#### Direct execution:

```bash
node scripts/generate-component.js ComponentName
```

### Examples

```bash
# Generate a Select component
npm run generate:component Select

# Generate a DatePicker component (supports kebab-case, will convert to PascalCase)
npm run generate:component date-picker

# Generate a Tooltip component
npm run generate:component Tooltip
```

### What Gets Generated

The script creates the following structure:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
└── index.ts                   # Exports

docs/components/
└── componentname.md           # Component documentation
```

It also:
- ✅ Updates `src/components/index.ts` to export your new component
- ✅ Creates proper TypeScript types with `LiveMenuComponentNameProps`
- ✅ Includes legacy exports for backwards compatibility
- ✅ Generates comprehensive documentation template

### Component Structure

Each generated component follows this pattern:

#### ComponentName.tsx

```tsx
import React from 'react';

export interface LiveMenuComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  // Props definition
}

export const LiveMenuComponentName: React.FC<LiveMenuComponentNameProps> = ({
  // Implementation
});

// Legacy exports
export const ComponentName = LiveMenuComponentName;
export type ComponentNameProps = LiveMenuComponentNameProps;
```

#### index.ts

```tsx
export { LiveMenuComponentName, ComponentName } from './ComponentName';
export type { LiveMenuComponentNameProps, ComponentNameProps } from './ComponentName';
```

### After Generation

1. ✅ Component structure is created
2. ✅ Exports are added to `src/components/index.ts`
3. ⚠️ Implement your component logic in `ComponentName.tsx`
4. ⚠️ Add custom styles to `src/styles/tailwind.css` if needed
5. ⚠️ Update the documentation in `docs/components/componentname.md`
6. ⚠️ Update `docs/DOCUMENTATION_INDEX.md` to link to your new component
7. ⚠️ Run `npm run build` to generate TypeScript types
8. ⚠️ Test your component thoroughly

### Naming Conventions

- **PascalCase**: `Button`, `DatePicker`, `Select`
- **kebab-case**: Will be converted to PascalCase automatically

### Component Guidelines

Follow these patterns when implementing your component:

1. **Props Interface**: Always extend appropriate React types
2. **Export Pattern**: Include both LiveMenu prefix and legacy exports
3. **Class Naming**: Use `livemenu-componentname` as base class
4. **Documentation**: Include JSDoc comments with examples
5. **Accessibility**: Consider ARIA attributes and keyboard navigation
6. **Dark Mode**: Use theme-aware classes that work with ThemeProvider
7. **TypeScript**: Ensure proper typing for all props and returns

### Tips

- Start with the generated boilerplate and customize as needed
- Review existing components for consistent patterns
- Use Tailwind utility classes via the theme system
- Test in both light and dark modes
- Consider responsive design from the start

### Troubleshooting

**Component already exists?**
- Check if `src/components/ComponentName/` already exists
- Choose a different name or manually update the existing component

**Build errors after generation?**
- Run `npm run build` to compile TypeScript
- Check for syntax errors in the generated files
- Ensure all imports are correct

**Missing in build output?**
- Verify `src/components/index.ts` includes your exports
- Run `npm run build` again
- Check the `dist/` directory

## Future Scripts

More utility scripts will be added here to help with:
- Generating documentation
- Creating test files
- Updating versions
- Publishing workflows

## Contributing

When adding new scripts:
1. Follow the existing patterns
2. Add documentation to this README
3. Include error handling
4. Provide helpful console output
5. Update package.json scripts if needed

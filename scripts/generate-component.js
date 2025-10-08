#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate component folder structure for LiveMenu UI Library
 * Usage: node scripts/generate-component.js <component-name>
 * Example: node scripts/generate-component.js Select
 */

function generateComponentStructure(componentName) {
  const componentPath = path.join(__dirname, '..', 'src', 'components', componentName);
  const docsPath = path.join(__dirname, '..', 'docs', 'components');
  
  // Check if component already exists
  if (fs.existsSync(componentPath)) {
    console.error(`❌ Error: Component '${componentName}' already exists`);
    process.exit(1);
  }
  
  // Create component directory
  fs.mkdirSync(componentPath, { recursive: true });
  
  // Generate files
  const componentFile = path.join(componentPath, `${componentName}.tsx`);
  const indexFile = path.join(componentPath, 'index.ts');
  const docsFile = path.join(docsPath, `${componentName.toLowerCase()}.md`);
  
  // Write component file
  fs.writeFileSync(componentFile, generateComponentCode(componentName));
  
  // Write index file
  fs.writeFileSync(indexFile, generateIndexCode(componentName));
  
  // Write documentation file
  fs.writeFileSync(docsFile, generateDocsCode(componentName));
  
  // Update main components index
  updateMainIndex(componentName);
  
  console.log(`✅ Component '${componentName}' generated successfully!`);
  console.log(`\n📁 Generated files:`);
  console.log(`   - src/components/${componentName}/${componentName}.tsx`);
  console.log(`   - src/components/${componentName}/index.ts`);
  console.log(`   - docs/components/${componentName.toLowerCase()}.md`);
  console.log(`\n⚠️  Don't forget to:`);
  console.log(`   1. Update src/components/index.ts (already done)`);
  console.log(`   2. Implement the component logic in ${componentName}.tsx`);
  console.log(`   3. Add styles to src/styles/tailwind.css if needed`);
  console.log(`   4. Update docs/DOCUMENTATION_INDEX.md`);
  console.log(`   5. Run 'npm run build' to generate types`);
}

function generateComponentCode(componentName) {
  return `import React from 'react';

export interface LiveMenu${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;
  // Add more props as needed
}

/**
 * LiveMenu${componentName} - A flexible ${componentName.toLowerCase()} component
 * 
 * @example
 * \`\`\`tsx
 * <LiveMenu${componentName}>
 *   Content here
 * </LiveMenu${componentName}>
 * \`\`\`
 */
export const LiveMenu${componentName}: React.FC<LiveMenu${componentName}Props> = ({
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  // Combine classes
  const componentClasses = [
    'livemenu-${componentName.toLowerCase()}',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <div
      className={componentClasses}
      {...props}
    >
      {children}
    </div>
  );
};

// Legacy export for backwards compatibility
export const ${componentName} = LiveMenu${componentName};
export type ${componentName}Props = LiveMenu${componentName}Props;
`;
}

function generateIndexCode(componentName) {
  return `export { LiveMenu${componentName}, ${componentName} } from './${componentName}';
export type { LiveMenu${componentName}Props, ${componentName}Props } from './${componentName}';
`;
}

function generateDocsCode(componentName) {
  const lowerName = componentName.toLowerCase();
  return `# ${componentName}

A flexible ${lowerName} component for LiveMenu UI.

## Installation

Make sure you have \`@codearemo/livemenu-ui\` installed in your project.

\`\`\`bash
npm install @codearemo/livemenu-ui
\`\`\`

## Basic Usage

\`\`\`tsx
import { LiveMenu${componentName} } from '@codearemo/livemenu-ui';

function App() {
  return (
    <LiveMenu${componentName}>
      Content here
    </LiveMenu${componentName}>
  );
}
\`\`\`

## Props

### LiveMenu${componentName}Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | \`React.ReactNode\` | - | Component content |
| className | \`string\` | \`''\` | Additional CSS classes |
| disabled | \`boolean\` | \`false\` | Whether the component is disabled |

## Examples

### Basic ${componentName}

\`\`\`tsx
<LiveMenu${componentName}>
  Basic ${lowerName} example
</LiveMenu${componentName}>
\`\`\`

### With Custom Styling

\`\`\`tsx
<LiveMenu${componentName} className="custom-class">
  Styled ${lowerName}
</LiveMenu${componentName}>
\`\`\`

### Disabled State

\`\`\`tsx
<LiveMenu${componentName} disabled>
  Disabled ${lowerName}
</LiveMenu${componentName}>
\`\`\`

## Styling

The ${componentName} component uses the following CSS classes:

- \`.livemenu-${lowerName}\` - Base ${lowerName} class

You can customize the appearance by:

1. Adding custom classes via the \`className\` prop
2. Overriding the default styles in your CSS
3. Using Tailwind utility classes

### Dark Mode

The ${componentName} component automatically supports dark mode when used with the LiveMenu theme system.

\`\`\`tsx
import { ThemeProvider } from '@codearemo/livemenu-ui';

<ThemeProvider>
  <LiveMenu${componentName}>
    This will automatically adapt to dark mode
  </LiveMenu${componentName}>
</ThemeProvider>
\`\`\`

## Accessibility

- Add appropriate accessibility features as needed
- Consider ARIA labels and roles
- Ensure keyboard navigation works properly

## API Reference

### LiveMenu${componentName}

\`\`\`tsx
interface LiveMenu${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
\`\`\`

## Notes

- This component is fully typed with TypeScript
- All standard HTML div attributes are supported via spread props
- The component is exported as both \`LiveMenu${componentName}\` and \`${componentName}\` (legacy)
`;
}

function updateMainIndex(componentName) {
  const mainIndexPath = path.join(__dirname, '..', 'src', 'components', 'index.ts');
  
  if (fs.existsSync(mainIndexPath)) {
    let content = fs.readFileSync(mainIndexPath, 'utf-8');
    
    // Add export line (insert before the last line or at the end)
    const newExport = `export { LiveMenu${componentName}, ${componentName} } from './${componentName}';\nexport type { LiveMenu${componentName}Props, ${componentName}Props } from './${componentName}';\n`;
    
    // Append to the end
    content = content.trim() + '\n' + newExport;
    
    fs.writeFileSync(mainIndexPath, content);
    console.log(`\n✅ Updated src/components/index.ts`);
  }
}

// Utility to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: Component name is required');
    console.log('\nUsage: node scripts/generate-component.js <ComponentName>');
    console.log('Example: node scripts/generate-component.js Select');
    console.log('Example: node scripts/generate-component.js date-picker (will convert to DatePicker)');
    process.exit(1);
  }

  let componentName = args[0];
  
  // Convert to PascalCase if kebab-case is provided
  if (componentName.includes('-')) {
    componentName = toPascalCase(componentName);
    console.log(`📝 Converting to PascalCase: ${componentName}`);
  }
  
  // Validate component name (PascalCase)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    console.error('❌ Error: Component name must be in PascalCase (e.g., Select, DatePicker)');
    process.exit(1);
  }

  try {
    generateComponentStructure(componentName);
  } catch (error) {
    console.error('❌ Error generating component:', error.message);
    process.exit(1);
  }
}

main();

export { generateComponentStructure, toPascalCase };

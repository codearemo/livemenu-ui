#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate component in consuming project
 * This script can be run from projects that have livemenu-ui installed
 * Usage: npx livemenu-generate ComponentName
 */

// Detect if running from node_modules or from library itself
function getProjectRoot() {
  // If running from node_modules, use the consuming project's root
  if (__dirname.includes('node_modules')) {
    // Go up from node_modules/@codearemo/livemenu-ui/bin to project root
    return path.resolve(__dirname, '../../../..');
  }
  // If running from library itself, use current directory
  return process.cwd();
}

const projectRoot = getProjectRoot();

function generateComponentStructure(componentName) {
  const componentPath = path.join(projectRoot, 'src', 'components', componentName);
  
  // Check if component already exists
  if (fs.existsSync(componentPath)) {
    console.error(`❌ Error: Component '${componentName}' already exists at ${componentPath}`);
    process.exit(1);
  }
  
  // Create component directory
  fs.mkdirSync(componentPath, { recursive: true });
  
  // Generate files
  const componentFile = path.join(componentPath, `${componentName}.tsx`);
  const indexFile = path.join(componentPath, 'index.ts');
  const testFile = path.join(componentPath, `${componentName}.test.tsx`);
  
  // Write component file
  fs.writeFileSync(componentFile, generateComponentCode(componentName));
  
  // Write index file
  fs.writeFileSync(indexFile, generateIndexCode(componentName));
  
  // Write test file (optional)
  fs.writeFileSync(testFile, generateTestCode(componentName));
  
  console.log(`✅ Component '${componentName}' generated successfully!`);
  console.log(`\n📁 Generated files:`);
  console.log(`   - src/components/${componentName}/${componentName}.tsx`);
  console.log(`   - src/components/${componentName}/index.ts`);
  console.log(`   - src/components/${componentName}/${componentName}.test.tsx`);
  console.log(`\n📝 Location: ${componentPath}`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Implement your component logic`);
  console.log(`   2. Update styles as needed`);
  console.log(`   3. Import and use: import { ${componentName} } from './components/${componentName}'`);
  console.log(`\n💡 Tip: The component uses LiveMenu UI components. Make sure to import them:`);
  console.log(`   import { LiveMenuCard, LiveMenuButton } from '@codearemo/livemenu-ui'`);
}

function generateComponentCode(componentName) {
  return `import React from 'react';
// Import LiveMenu UI components as needed
// import { LiveMenuCard, LiveMenuButton, LiveMenuInput } from '@codearemo/livemenu-ui';

export interface ${componentName}Props {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  // Add more props as needed
}

/**
 * ${componentName} Component
 * 
 * @example
 * \`\`\`tsx
 * <${componentName}>
 *   Content here
 * </${componentName}>
 * \`\`\`
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  className = '',
}) => {
  return (
    <div className={\`${componentName.toLowerCase()} \${className}\`}>
      {children}
    </div>
  );
};

export default ${componentName};
`;
}

function generateIndexCode(componentName) {
  return `export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
export { default } from './${componentName}';
`;
}

function generateTestCode(componentName) {
  return `import React from 'react';
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName}>Test content</${componentName}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <${componentName} className="custom-class">Test</${componentName}>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  // Add more tests as needed
});
`;
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
    console.log('\n📖 Usage: npx livemenu-generate <ComponentName>');
    console.log('\n📚 Examples:');
    console.log('   npx livemenu-generate RestaurantCard');
    console.log('   npx livemenu-generate restaurant-list  (converts to RestaurantList)');
    console.log('   npx livemenu-generate UserProfile');
    console.log('\n💡 This will create a component in: src/components/<ComponentName>/');
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
    console.error('❌ Error: Component name must be in PascalCase (e.g., RestaurantCard, UserProfile)');
    process.exit(1);
  }

  console.log(`📦 Generating component in: ${projectRoot}`);
  
  try {
    generateComponentStructure(componentName);
  } catch (error) {
    console.error('❌ Error generating component:', error.message);
    process.exit(1);
  }
}

main();

export { generateComponentStructure, toPascalCase };

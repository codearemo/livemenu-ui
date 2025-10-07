# Development Workflow Guide

Complete guide for developing, testing, and releasing the LiveMenu UI component library.

---

## 📋 Table of Contents

1. [Local Development Setup](#-local-development-setup)
2. [Building the Library](#-building-the-library)
3. [Watch Mode Development](#-watch-mode-development)
4. [Testing with npm link](#-testing-with-npm-link)
5. [Version Management](#-version-management)
6. [Release Process](#-release-process)
7. [Troubleshooting](#-troubleshooting)

---

## 🛠️ Local Development Setup

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/codearemo/livemenu-ui.git
cd livemenu-ui

# Install dependencies
npm install

# Build the library
npm run build
```

### Verify Installation

```bash
# Check build output
ls -la dist/

# Should show:
# - index.js (CommonJS)
# - index.esm.js (ES Module)
# - styles.css (Tailwind CSS)
# - types/ (TypeScript declarations)
```

---

## 🏗️ Building the Library

### Production Build

```bash
# Clean build (recommended)
rm -rf dist
npm run build
```

**What happens during build:**

1. **Rollup** compiles TypeScript to JavaScript
2. Creates **CommonJS** bundle (`dist/index.js`)
3. Creates **ES Module** bundle (`dist/index.esm.js`)
4. Generates **TypeScript declarations** (`dist/types/`)
5. Processes **Tailwind CSS** (`dist/styles.css`)
6. Minifies code with **Terser**
7. Generates **source maps**

### Build Output

```
dist/
├── index.js              (~4KB) - CommonJS bundle
├── index.js.map          (~30KB) - CJS source map
├── index.esm.js          (~4KB) - ESM bundle
├── index.esm.js.map      (~30KB) - ESM source map
├── styles.css            (~35KB) - All Tailwind styles
└── types/                - TypeScript declarations
    ├── index.d.ts
    └── components/
        ├── Badge/
        ├── Button/
        ├── Card/
        └── Input/
```

### Verify Build

```bash
# Check for TypeScript errors
npm run build

# Inspect bundle sizes
ls -lh dist/

# Test imports (Node.js)
node -e "const lib = require('./dist/index.js'); console.log(Object.keys(lib));"
```

---

## 👀 Watch Mode Development

### Start Watch Mode

```bash
# Start watch mode (rebuilds on file changes)
npm run watch
```

**Watch mode features:**

- ✅ Automatic rebuild on file changes
- ✅ Fast incremental compilation
- ✅ Real-time error reporting
- ✅ Works with npm link

### Recommended Workflow

**Terminal 1 (Library):**
```bash
cd livemenu-ui
npm run watch
# Keep this running while developing
```

**Terminal 2 (Test App):**
```bash
cd my-test-app
npm start
# Your changes will reflect automatically
```

### What Triggers Rebuild?

Changes to these files trigger automatic rebuild:

- `src/**/*.ts`
- `src/**/*.tsx`
- `src/**/*.css`
- `rollup.config.js`
- `tsconfig.json`

**Does NOT trigger rebuild:**
- `*.md` files
- `package.json`
- Configuration files

---

## 🔗 Testing with npm link

### Why Use npm link?

npm link creates a symlink to test your library locally without publishing.

**Benefits:**
- ✅ Test changes immediately
- ✅ No need to publish
- ✅ Works with watch mode
- ✅ Test real-world integration

### Step-by-Step Guide

#### 1. Link the Library

In the **livemenu-ui directory**:

```bash
# Create a global symlink
npm link

# Output:
# /usr/local/lib/node_modules/@codearemo/livemenu-ui -> /path/to/livemenu-ui
```

Verify:
```bash
# List global linked packages
npm ls -g --depth=0 --link=true
```

#### 2. Create a Test Application

```bash
# Create a new React app
npx create-react-app test-livemenu-app
cd test-livemenu-app

# Or use Vite (faster)
npm create vite@latest test-livemenu-app -- --template react-ts
cd test-livemenu-app
npm install
```

#### 3. Link in Test App

In the **test app directory**:

```bash
# Link the livemenu-ui package
npm link @codearemo/livemenu-ui

# Output:
# /path/to/test-app/node_modules/@codearemo/livemenu-ui -> /usr/local/lib/node_modules/@codearemo/livemenu-ui -> /path/to/livemenu-ui
```

Verify:
```bash
# Check if linked correctly
ls -la node_modules/@codearemo/
```

#### 4. Use in Test App

```tsx
// src/App.tsx
import React, { useState } from 'react';
import '@codearemo/livemenu-ui/dist/styles.css';
import {
  LiveMenuButton,
  LiveMenuCard,
  LiveMenuInput,
  LiveMenuBadge,
} from '@codearemo/livemenu-ui';

function App() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <LiveMenuCard title="Test LiveMenu UI" subtitle="Testing linked package">
        <div className="space-y-4">
          <LiveMenuInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <LiveMenuButton variant="primary" fullWidth>
            Submit
          </LiveMenuButton>
          <LiveMenuBadge variant="success" dot>
            Live Testing
          </LiveMenuBadge>
        </div>
      </LiveMenuCard>
    </div>
  );
}

export default App;
```

#### 5. Start Development

**Terminal 1 (Library):**
```bash
cd livemenu-ui
npm run watch
```

**Terminal 2 (Test App):**
```bash
cd test-livemenu-app
npm start
# or
npm run dev  # for Vite
```

**Changes in livemenu-ui will now reflect in the test app automatically!**

#### 6. Unlink When Done

In the **test app directory**:
```bash
# Unlink the package
npm unlink @codearemo/livemenu-ui

# Reinstall from registry (if needed)
npm install @codearemo/livemenu-ui
```

In the **livemenu-ui directory**:
```bash
# Remove global symlink
npm unlink
# or
npm unlink -g @codearemo/livemenu-ui
```

### Troubleshooting npm link

**Problem: Changes not reflecting**

```bash
# 1. Ensure watch mode is running
cd livemenu-ui
npm run watch

# 2. Check if link is correct
cd test-app
ls -la node_modules/@codearemo/livemenu-ui

# 3. Force rebuild
cd livemenu-ui
rm -rf dist
npm run build

# 4. Restart dev server
cd test-app
# Ctrl+C and restart
npm start
```

**Problem: Peer dependency warnings**

```bash
# Install peer dependencies in test app
cd test-app
npm install react@^18.0.0 react-dom@^18.0.0
```

**Problem: Multiple React instances**

```bash
# Link React from test app to library
cd test-app
npm link ../livemenu-ui/node_modules/react
npm link ../livemenu-ui/node_modules/react-dom
```

---

## 📦 Version Management

### Semantic Versioning (SemVer)

Follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backwards compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

### Bumping Versions

#### Using npm version Command (Recommended)

```bash
# Patch version (bug fixes)
# 1.0.0 → 1.0.1
npm version patch

# Minor version (new features)
# 1.0.0 → 1.1.0
npm version minor

# Major version (breaking changes)
# 1.0.0 → 2.0.0
npm version major

# Pre-release versions
npm version prepatch  # 1.0.0 → 1.0.1-0
npm version preminor  # 1.0.0 → 1.1.0-0
npm version premajor  # 1.0.0 → 2.0.0-0
```

**What npm version does:**
1. Updates `package.json` version
2. Updates `package-lock.json`
3. Creates a git commit
4. Creates a git tag (`v1.0.1`)

#### Manual Version Update

Edit `package.json`:
```json
{
  "version": "1.0.1"
}
```

Then commit and tag:
```bash
git add package.json package-lock.json
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1
```

### Version Bump Workflow

```bash
# 1. Ensure clean working directory
git status

# 2. Pull latest changes
git pull origin main

# 3. Build and test
npm run build

# 4. Bump version
npm version patch -m "chore: bump version to %s"

# 5. Push commits and tags
git push origin main
git push origin --tags
```

---

## 🚀 Release Process

### Complete Release Workflow

#### 1. Pre-Release Checklist

```bash
# Verify everything is ready
cd livemenu-ui

# Clean working directory
git status  # Should be clean

# Pull latest
git pull origin main

# Install dependencies (if needed)
npm install

# Clean build
rm -rf dist
npm run build

# Test locally
npm link
cd ../test-app
npm link @codearemo/livemenu-ui
# Test components...
```

#### 2. Update Version

```bash
# Choose version bump type
npm version patch  # For bug fixes
npm version minor  # For new features
npm version major  # For breaking changes

# Example output:
# v1.0.1
```

#### 3. Update Changelog (Optional but Recommended)

Create/update `CHANGELOG.md`:

```markdown
# Changelog

## [1.0.1] - 2024-01-15

### Fixed
- Fixed button disabled state styling
- Corrected input error message color

### Changed
- Updated badge hover effects

## [1.0.0] - 2024-01-10

### Added
- Initial release
- LiveMenuButton component
- LiveMenuCard component
- LiveMenuBadge component
- LiveMenuInput component
```

Commit the changelog:
```bash
git add CHANGELOG.md
git commit --amend --no-edit  # Add to version commit
```

#### 4. Push to GitHub

```bash
# Push commits
git push origin main

# Push tags
git push origin --tags

# Or push both at once
git push origin main --follow-tags
```

#### 5. Publish to GitHub Packages

```bash
# Ensure you're authenticated
npm whoami --registry=https://npm.pkg.github.com

# Publish
npm publish

# Output:
# + @codearemo/livemenu-ui@1.0.1
```

#### 6. Create GitHub Release (Recommended)

**Option A: Via GitHub UI**

1. Go to: https://github.com/codearemo/livemenu-ui/releases
2. Click "Create a new release"
3. Select the tag (`v1.0.1`)
4. Release title: `v1.0.1`
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

**Option B: Via GitHub CLI**

```bash
# Install GitHub CLI (if not installed)
brew install gh  # macOS
# or visit: https://cli.github.com/

# Authenticate
gh auth login

# Create release
gh release create v1.0.1 \
  --title "v1.0.1" \
  --notes "Bug fixes and improvements. See CHANGELOG.md for details."
```

#### 7. Verify Publication

```bash
# Check GitHub Packages
# Visit: https://github.com/codearemo/livemenu-ui/packages

# Test installation in a new project
mkdir test-install
cd test-install
npm init -y
npm install @codearemo/livemenu-ui
ls node_modules/@codearemo/livemenu-ui
```

### Automated Release (GitHub Actions)

The included workflow (`.github/workflows/publish.yml`) automates publishing:

**Trigger on Release:**
```bash
# Create and push tag
git tag v1.0.1
git push origin v1.0.1

# Then create release via GitHub UI
# The workflow will automatically publish to GitHub Packages
```

**Manual Trigger:**
```bash
# Via GitHub UI: Actions → Publish to GitHub Packages → Run workflow
```

---

## 🔄 Complete Development Cycle

### Day-to-Day Development

```bash
# Morning: Start fresh
cd livemenu-ui
git pull origin main
npm install  # If package.json changed

# Start watch mode
npm run watch

# In another terminal: test app
cd ../test-app
npm start

# Make changes to components...
# Save files → Watch mode rebuilds → Test app updates
```

### Adding a New Component

```bash
# 1. Create component structure
mkdir -p src/components/NewComponent
touch src/components/NewComponent/NewComponent.tsx
touch src/components/NewComponent/index.ts

# 2. Implement component (see COMPONENT_TEMPLATE.md)

# 3. Update exports
# Edit src/components/index.ts

# 4. Add Tailwind styles
# Edit src/styles/tailwind.css

# 5. Update safelist
# Edit tailwind.config.js

# 6. Build and test
npm run build

# 7. Test with linked app
# Changes will reflect in test app

# 8. Commit
git add .
git commit -m "feat(NewComponent): add LiveMenuNewComponent"
```

### Preparing for Release

```bash
# 1. Ensure all changes committed
git status

# 2. Final build and test
rm -rf dist
npm run build

# 3. Test in real application
npm link
cd ../test-app
npm link @codearemo/livemenu-ui
# Test thoroughly...

# 4. Update version
cd ../livemenu-ui
npm version minor  # or patch, major

# 5. Update CHANGELOG.md
# Document changes...

# 6. Push
git push origin main --follow-tags

# 7. Publish
npm publish

# 8. Create GitHub release
gh release create v1.1.0
```

---

## 🐛 Troubleshooting

### Build Issues

**Problem: Build fails with TypeScript errors**

```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix errors, then rebuild
npm run build
```

**Problem: Rollup fails to bundle**

```bash
# Check rollup config
cat rollup.config.js

# Verify plugins are installed
npm list @rollup/plugin-typescript

# Reinstall if needed
npm install
```

### npm link Issues

**Problem: Components not found in test app**

```bash
# Verify link
ls -la test-app/node_modules/@codearemo/

# Re-link
npm unlink @codearemo/livemenu-ui
npm link @codearemo/livemenu-ui
```

**Problem: Styles not loading**

```tsx
// Ensure styles are imported
import '@codearemo/livemenu-ui/dist/styles.css';
```

### Publishing Issues

**Problem: 401 Unauthorized**

```bash
# Check authentication
npm whoami --registry=https://npm.pkg.github.com

# Re-authenticate
# Edit ~/.npmrc and add/update token
```

**Problem: 404 Package not found after publishing**

```bash
# Wait a few minutes (GitHub Packages can be slow)
# Verify at: https://github.com/codearemo/livemenu-ui/packages

# Check package name matches
cat package.json | grep "name"
```

---

## 📊 Development Checklist

### Daily Development
- [ ] Pull latest changes (`git pull origin main`)
- [ ] Start watch mode (`npm run watch`)
- [ ] Test changes in linked app
- [ ] Commit frequently with clear messages
- [ ] Push to GitHub at end of day

### Before Release
- [ ] All tests pass (if you have tests)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] Clean build succeeds (`rm -rf dist && npm run build`)
- [ ] Tested in real application
- [ ] CHANGELOG.md updated
- [ ] Version bumped appropriately
- [ ] All changes committed
- [ ] No uncommitted files (`git status`)

### Release
- [ ] Version tagged (`npm version [patch|minor|major]`)
- [ ] Pushed to GitHub (`git push --follow-tags`)
- [ ] Published to GitHub Packages (`npm publish`)
- [ ] GitHub release created
- [ ] Verified installation works

---

## 🔗 Quick Reference

### Common Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run build` | Build library |
| `npm run watch` | Watch mode (auto-rebuild) |
| `npm link` | Create global symlink |
| `npm version patch` | Bump patch version |
| `npm publish` | Publish to GitHub Packages |
| `git push --follow-tags` | Push commits and tags |

### File Changes That Trigger Rebuild

- `src/**/*.tsx` - Component changes
- `src/**/*.ts` - TypeScript files
- `src/styles/*.css` - Styles
- `tailwind.config.js` - Tailwind config
- `tsconfig.json` - TypeScript config
- `rollup.config.js` - Build config

---

## 📚 Additional Resources

- [npm link Documentation](https://docs.npmjs.com/cli/v9/commands/npm-link)
- [Semantic Versioning](https://semver.org/)
- [GitHub Packages Guide](https://docs.github.com/en/packages)
- [Component Template](COMPONENT_TEMPLATE.md)
- [Installation Guide](INSTALLATION_GUIDE.md)

---

**Happy developing! 🚀**


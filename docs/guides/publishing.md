# GitHub Packages Setup Guide

Complete guide for publishing and consuming the LiveMenu UI component library via GitHub Packages.

---

## 📦 Overview

GitHub Packages is a package hosting service that integrates with GitHub. This guide will help you:

1. Configure the project for GitHub Packages
2. Set up authentication
3. Publish the package
4. Install and use the package in other projects

---

## 🔧 Configuration

### 1. Update `package.json`

The package.json has been configured with:

```json
{
  "name": "@codearemo/livemenu-ui",
  "private": false,
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/codearemo/livemenu-ui.git"
  }
}
```

**Important Changes to Make:**

1. Replace `@codearemo` with your GitHub username or organization name:
   ```json
   "name": "@yourusername/livemenu-ui"
   ```

2. Update repository URLs:
   ```json
   "repository": {
     "url": "git+https://github.com/yourusername/livemenu-ui.git"
   }
   ```

3. Set access level:
   - `"restricted"` - Private package (only you and collaborators)
   - `"public"` - Public package (anyone can install)

### 2. Create `.npmrc` (Project Level)

A `.npmrc` file has been created in the project root:

```ini
# GitHub Packages Registry Configuration
@codearemo:registry=https://npm.pkg.github.com
registry=https://registry.npmjs.org/
```

**Update the scope:**
```ini
@yourusername:registry=https://npm.pkg.github.com
```

**Important:** Do NOT commit authentication tokens to this file!

---

## 🔐 Authentication Setup

### Step 1: Create a GitHub Personal Access Token

1. Go to GitHub Settings: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Configure the token:
   - **Name:** `livemenu-ui-publish`
   - **Expiration:** Choose appropriate duration
   - **Scopes:** Select the following:
     - ✅ `write:packages` - Upload packages
     - ✅ `read:packages` - Download packages
     - ✅ `delete:packages` - Delete packages (optional)
     - ✅ `repo` - Full control of private repositories (if private)

4. Click "Generate token"
5. **Copy the token immediately** (you won't see it again!)

### Step 2: Configure Local Authentication

#### Option A: Using `.npmrc` in your home directory (Recommended)

Create or edit `~/.npmrc`:

```bash
# Edit your global .npmrc file
nano ~/.npmrc
# or
code ~/.npmrc
```

Add these lines:

```ini
# GitHub Packages authentication
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Replace `YOUR_GITHUB_TOKEN` with your actual token.

#### Option B: Using Environment Variable

Add to your shell profile (`~/.zshrc`, `~/.bashrc`, or `~/.bash_profile`):

```bash
# GitHub Packages Token
export GITHUB_TOKEN="your_github_token_here"
```

Then update project `.npmrc`:

```ini
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Reload your shell:
```bash
source ~/.zshrc  # or ~/.bashrc
```

### Step 3: Verify Authentication

```bash
# Check if authenticated
npm whoami --registry=https://npm.pkg.github.com
```

If successful, it should display your GitHub username.

---

## 📤 Publishing Workflow

### Pre-Publish Checklist

Before publishing, ensure:

1. ✅ All changes are committed
2. ✅ Tests pass (if you have tests)
3. ✅ Build is successful
4. ✅ Version number is updated
5. ✅ README and documentation are up-to-date

### Step 1: Update Version

Use semantic versioning (semver):

```bash
# Patch version (1.0.0 → 1.0.1) - Bug fixes
npm version patch

# Minor version (1.0.0 → 1.1.0) - New features
npm version minor

# Major version (1.0.0 → 2.0.0) - Breaking changes
npm version major
```

Or manually update `package.json`:
```json
{
  "version": "1.0.1"
}
```

### Step 2: Build the Package

```bash
# Clean previous build
rm -rf dist

# Build the library
npm run build

# Verify build output
ls -la dist/
```

### Step 3: Publish to GitHub Packages

```bash
# Publish using the custom script
npm run publish:github

# Or directly
npm publish
```

**Expected Output:**
```
npm notice 
npm notice 📦  @yourusername/livemenu-ui@1.0.0
npm notice === Tarball Contents === 
npm notice 4.0kB   dist/index.js
npm notice 3.9kB   dist/index.esm.js
npm notice 35.0kB  dist/styles.css
npm notice ...
npm notice === Tarball Details === 
npm notice name:          @yourusername/livemenu-ui
npm notice version:       1.0.0
npm notice package size:  XX.X kB
npm notice unpacked size: XXX.X kB
npm notice total files:   XX
+ @yourusername/livemenu-ui@1.0.0
```

### Step 4: Verify Publication

1. Go to your GitHub repository
2. Click on "Packages" (right sidebar)
3. You should see `livemenu-ui` listed

Or visit:
```
https://github.com/codearemo/livemenu-ui/packages
```

---

## 📥 Installing in Other Projects

### For Public Packages

If your package is public, users can install directly:

```bash
npm install @yourusername/livemenu-ui
```

### For Private Packages (Restricted Access)

Users need to authenticate first:

#### Step 1: Create User `.npmrc`

In the consuming project's root, create `.npmrc`:

```ini
@yourusername:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=USER_GITHUB_TOKEN
```

Or use global `~/.npmrc` (recommended):

```bash
# Edit global .npmrc
nano ~/.npmrc
```

Add:
```ini
@yourusername:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

#### Step 2: Install the Package

```bash
npm install @yourusername/livemenu-ui
```

#### Step 3: Use in Your Project

```tsx
// Import styles
import '@yourusername/livemenu-ui/dist/styles.css';

// Import components
import { LiveMenuButton, LiveMenuCard } from '@yourusername/livemenu-ui';

function App() {
  return (
    <LiveMenuCard title="Hello">
      <LiveMenuButton variant="primary">
        Click Me
      </LiveMenuButton>
    </LiveMenuCard>
  );
}
```

---

## 🔄 CI/CD Automation (GitHub Actions)

### Automatic Publishing on Release

Create `.github/workflows/publish.yml`:

```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@yourusername'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Automatic Publishing on Tag

Create `.github/workflows/publish-on-tag.yml`:

```yaml
name: Publish on Tag

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://npm.pkg.github.com'
      
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Usage:**
```bash
# Create and push a version tag
git tag v1.0.1
git push origin v1.0.1
```

---

## 🛠️ Troubleshooting

### Error: "You must be logged in to publish packages"

**Solution:** Verify authentication:
```bash
npm whoami --registry=https://npm.pkg.github.com
```

If not logged in, check your `.npmrc` file and token.

### Error: "Package name must be scoped"

**Solution:** Ensure package name is scoped:
```json
{
  "name": "@yourusername/livemenu-ui"
}
```

### Error: "403 Forbidden"

**Causes:**
1. Invalid or expired token
2. Insufficient token permissions
3. Package name conflicts

**Solution:**
- Generate a new token with correct permissions
- Ensure package name is unique
- Check repository ownership

### Error: "404 Not Found" when installing

**Causes:**
1. Package not published
2. Incorrect package name
3. Authentication issues (for private packages)

**Solution:**
- Verify package exists on GitHub
- Check package name spelling
- Ensure authentication is configured

### Cannot install peer dependencies

**Solution:** Install peer dependencies manually:
```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

---

## 📋 Publishing Checklist

Before each publish:

- [ ] Update version in `package.json`
- [ ] Update CHANGELOG.md (if you have one)
- [ ] Run `npm run build` successfully
- [ ] Verify `dist/` folder contents
- [ ] Commit all changes
- [ ] Create a git tag: `git tag v1.0.x`
- [ ] Push tag: `git push origin v1.0.x`
- [ ] Run `npm publish`
- [ ] Verify on GitHub Packages
- [ ] Test installation in another project
- [ ] Update documentation if needed

---

## 🔗 Useful Commands

| Command | Description |
|---------|-------------|
| `npm version patch` | Bump patch version (1.0.0 → 1.0.1) |
| `npm version minor` | Bump minor version (1.0.0 → 1.1.0) |
| `npm version major` | Bump major version (1.0.0 → 2.0.0) |
| `npm publish` | Publish package |
| `npm unpublish @scope/pkg@version` | Unpublish specific version |
| `npm whoami --registry=URL` | Check authentication |
| `npm view @scope/pkg versions` | View all published versions |
| `npm deprecate @scope/pkg@version "msg"` | Deprecate a version |

---

## 📚 Additional Resources

- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions for npm](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages)

---

## 🔒 Security Best Practices

1. **Never commit tokens** to version control
2. **Use environment variables** for CI/CD
3. **Rotate tokens regularly** (every 90 days)
4. **Use scoped tokens** with minimal permissions
5. **Keep .npmrc in .gitignore** if it contains tokens
6. **Use different tokens** for different purposes
7. **Review package access** regularly

---

**Need help?** Open an issue on the [GitHub repository](https://github.com/codearemo/livemenu-ui/issues).


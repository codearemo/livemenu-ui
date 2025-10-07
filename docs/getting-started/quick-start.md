# Quick Start Guide - GitHub Packages

## 🚀 Fast Setup (5 Minutes)

### 1. Update Configuration Files

Replace `codearemo` with your GitHub username in:

- [ ] `package.json` → `"name": "@yourusername/livemenu-ui"`
- [ ] `package.json` → `"repository.url"`
- [ ] `.npmrc` → `@yourusername:registry=...`
- [ ] `.github/workflows/publish.yml` → `scope: '@yourusername'`

### 2. Create GitHub Token

1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select scopes: `write:packages`, `read:packages`, `repo`
4. Copy the token

### 3. Configure Authentication

**Option A: Global (Recommended)**

Edit `~/.npmrc`:
```ini
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

**Option B: Environment Variable**

Add to `~/.zshrc` or `~/.bashrc`:
```bash
export GITHUB_TOKEN="YOUR_TOKEN_HERE"
```

### 4. Publish

```bash
# Build
npm run build

# Publish
npm publish
```

Done! 🎉

## �� Install in Another Project

```bash
# In consuming project
npm install @yourusername/livemenu-ui
```

```tsx
import '@yourusername/livemenu-ui/dist/styles.css';
import { LiveMenuButton } from '@yourusername/livemenu-ui';
```

---

For detailed instructions, see [GITHUB_PACKAGES_SETUP.md](GITHUB_PACKAGES_SETUP.md)

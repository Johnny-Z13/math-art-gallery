# Git Setup & GitHub Release Guide

## Prerequisites

Before you can use git, you need to accept the Xcode license agreement:

```bash
sudo xcodebuild -license
```

Then type `agree` when prompted.

## Initial Setup

### 1. Initialize Git Repository

```bash
cd /Users/johnny.venables/Projects/math-art-gallery
git init
```

### 2. Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Add All Files

```bash
git add .
```

### 4. Create Initial Commit

```bash
git commit -m "Initial commit - Math Art Gallery v0.4.0

Features:
- 14 mathematical formulas (parametric curves, chaos systems, fractals)
- Real-time rendering with HTML5 Canvas
- 15 curated presets
- Export to PNG, JPG, SVG
- Share configurations via URL
- Particle effects system
- Keyboard shortcuts
- Performance monitoring
- Toast notifications
- Error boundaries
- Responsive design

Technical improvements:
- Object pooling for particles
- Delta time-based animation
- Centralized point calculation
- Error boundary component
- Comprehensive documentation"
```

## Create GitHub Repository

### Option 1: Using GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
gh repo create math-art-gallery --public --source=. --remote=origin
git push -u origin main
```

### Option 2: Using GitHub Web Interface

1. Go to [https://github.com/new](https://github.com/new)
2. Create a new repository named `math-art-gallery`
3. **Do NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"
5. Follow the instructions for "push an existing repository from the command line":

```bash
git remote add origin https://github.com/YOUR_USERNAME/math-art-gallery.git
git branch -M main
git push -u origin main
```

## Release v1.0.0

Once you've tested everything and are ready for the first stable release:

### 1. Update Version Numbers

Update these files to version 1.0.0:
- `package.json` - change `"version": "0.4.0"` to `"version": "1.0.0"`
- `src/App.jsx` - change `v0.4.0` to `v1.0.0` in the UI
- `README.md` - update version badge and footer

### 2. Commit Version Bump

```bash
git add package.json src/App.jsx README.md
git commit -m "Bump version to 1.0.0 - First stable release"
git push
```

### 3. Create Git Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0 - First Stable Release

Mathematical Art Gallery - Interactive parametric curve visualizer

Features:
- 14 mathematical formulas
- 15 curated presets
- Export to PNG, JPG, SVG
- Real-time customization
- Particle effects
- Keyboard shortcuts
- Performance optimizations

Tested and stable for production use."

git push origin v1.0.0
```

### 4. Create GitHub Release

Using GitHub CLI:
```bash
gh release create v1.0.0 --title "v1.0.0 - First Stable Release" --notes "See README.md for full feature list"
```

Or manually:
1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Choose tag: `v1.0.0`
4. Release title: `v1.0.0 - First Stable Release`
5. Add release notes (copy from tag message or README)
6. Click "Publish release"

## Future Workflow

For subsequent updates:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# When ready for a new version (e.g., v1.1.0)
# 1. Update version in files
# 2. Commit
# 3. Tag
git tag -a v1.1.0 -m "Release notes"
git push origin v1.1.0
# 4. Create GitHub release
```

## Useful Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# View all tags
git tag

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo changes to a file
git checkout -- filename

# Create a new branch
git checkout -b feature-name
```

## Deployment Options

Once on GitHub, you can deploy to:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder or connect GitHub repo
- **GitHub Pages**: Use `gh-pages` package or GitHub Actions
- **Cloudflare Pages**: Connect GitHub repo

For Vercel/Netlify, build command is `npm run build` and output directory is `dist`.

---

Good luck with your first release! 🚀

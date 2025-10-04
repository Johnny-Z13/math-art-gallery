# Mathematical Art Gallery - Product Requirements Document

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Vision & Goals](#vision--goals)
3. [Current Implementation](#current-implementation)
4. [Technical Architecture](#technical-architecture)
5. [Feature Specifications](#feature-specifications)
6. [Design System](#design-system)
7. [Mathematical Formulas](#mathematical-formulas)
8. [Development Journey](#development-journey)
9. [Future Roadmap](#future-roadmap)
10. [Setup & Installation](#setup--installation)

---

## 🎯 Project Overview

**Mathematical Art Gallery** is an interactive web application that transforms mathematical formulas into mesmerizing generative art. Users can explore parametric curves, adjust parameters in real-time, and create unique visual patterns through the lens of mathematics.

### Core Concept
The app was inspired by a photograph of Euler's formula (`z(θ) = e^(θi) + e^(πθi)`) and evolved into a comprehensive gallery of mathematical curves, each producing beautiful, dynamic visual patterns.

### Target Users
- Math enthusiasts and educators
- Digital artists and creative coders
- Students learning about parametric equations
- Anyone interested in generative art
- Mobile-first users who want to explore math visually

---

## 🚀 Vision & Goals

### Primary Goals
1. **Make mathematics visual and accessible** - Transform abstract formulas into tangible, beautiful art
2. **Interactive exploration** - Allow real-time manipulation of parameters to understand mathematical relationships
3. **Mobile-first experience** - Optimize for touch interactions and small screens
4. **Performance** - Smooth 60fps animations even on mobile devices
5. **Expandability** - Easy to add new formulas and features

### Success Metrics
- Smooth performance on iPhone and mobile devices
- All patterns stay fully visible on screen (no blank screens)
- Intuitive controls that work with touch/tap
- Fast formula switching with instant parameter loading
- Clean, maintainable codebase for future expansion

---

## 💻 Current Implementation

### Tech Stack
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **HTML5 Canvas** - Rendering engine
- **JavaScript (ES6+)** - Core logic

### Project Structure
```
math-art-gallery/
├── src/
│   ├── App.jsx           # Main component with all logic
│   ├── index.jsx         # React entry point
│   └── index.css         # Global styles + Tailwind
├── public/
│   └── index.html        # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind configuration
```

### Current Features ✅
- 9 working mathematical formulas
- Real-time parameter adjustment
- 4 color modes (Rainbow, Neon, Fire, Blue)
- Fullscreen mode with tap-to-exit
- Mobile-optimized sliders and controls
- Responsive canvas sizing
- Dynamic trail length control
- Speed adjustment
- Formula-specific parameter labels

---

## 🏗️ Technical Architecture

### Component Architecture

```
App (MathArtGallery)
├── State Management
│   ├── selectedFormula
│   ├── speed
│   ├── trailLength
│   ├── colorMode
│   ├── scale
│   ├── param1 & param2
│   ├── canvasSize
│   └── isFullscreen
│
├── Canvas Rendering System
│   ├── Animation Loop (requestAnimationFrame)
│   ├── Point Calculation Engine
│   └── Trail Rendering System
│
└── UI Components
    ├── Header (formula display)
    ├── Canvas (with fullscreen toggle)
    └── Control Panel
        ├── Formula Selector
        ├── Sliders (Speed, Trail, Scale, Params)
        └── Color Mode Buttons
```

### Rendering Pipeline

```
1. User Changes Parameter
   ↓
2. State Updates
   ↓
3. useEffect Triggers
   ↓
4. Animation Loop Recalculates
   ↓
5. calculatePoint() returns (x, y)
   ↓
6. Point Added to Trail Array
   ↓
7. Canvas Draws Trail with Alpha Gradient
   ↓
8. requestAnimationFrame (repeat)
```

### Key Technical Decisions

**Why Canvas over SVG/WebGL?**
- Canvas provides optimal performance for continuous animation
- Simple API for 2D drawing operations
- Works perfectly on mobile browsers
- No DOM overhead

**Why Single Component?**
- Simpler state management
- Easier to understand for future developers
- Better performance (no prop drilling)
- Ideal for prototyping and iteration

**Scale as Percentage**
- All patterns use relative scale (0.05-0.42 of canvas size)
- Ensures patterns always fit on screen
- Works across different device sizes
- Prevents blank screen issues

---

## 🎨 Feature Specifications

### 1. Formula System

**Requirements:**
- Each formula must have default parameters that produce visible patterns
- Formulas must stay within canvas bounds
- Switch between formulas without page reload
- Parameters auto-update when formula changes

**Implementation:**
```javascript
FORMULAS = {
  formulaKey: {
    name: "Display Name",
    formula: "Mathematical notation",
    description: "Short description",
    defaultParams: { speed, scale, param1, param2, trail }
  }
}
```

**Calibration Rules:**
- Scale range: 0.05 - 0.42 (5% - 42% of canvas size)
- Speed range: 0.005 - 0.04
- Trail length: 100 - 1000 points
- All patterns must render within visible area

### 2. Interactive Controls

**Speed Control**
- Range: 0.005 - 0.04
- Step: 0.001
- Controls animation speed (theta increment per frame)
- Display: 3 decimal places

**Trail Length**
- Range: 100 - 1000 points
- Step: 50
- Controls how many points are visible
- Affects visual density and memory usage

**Scale Control**
- Range: 5% - 42%
- Step: 1%
- Relative to canvas size
- Display: percentage

**Parameter 1 & 2**
- Range: 0.5 - 10
- Step: 0.5
- Formula-specific meanings
- Dynamic labels based on formula

### 3. Color Modes

**Rainbow Mode**
- HSL color cycling based on theta
- Hue: `(t * 50) % 360`
- Saturation: 80%, Lightness: 60%

**Neon Mode (Cyan-Pink)**
- Oscillating hue: `180 + sin(t) * 120`
- Creates cyan to pink gradient
- More vibrant feel

**Fire Mode**
- Warm color spectrum
- Hue: `30 - cos(t) * 30`
- Red/orange/yellow range

**Blue Mode**
- Static blue color
- `rgba(100, 200, 255, alpha)`
- Calmer aesthetic

### 4. Fullscreen Mode

**Behavior:**
- Triggered by expand icon button
- Canvas fills entire viewport
- Tap anywhere to exit
- Maintains aspect ratio (square)
- Controls hidden in fullscreen

**Implementation Details:**
- z-index: 50 (above all content)
- Fixed positioning
- Touch-optimized (touchAction: 'none')
- Black background for focus

### 5. Mobile Optimization

**Responsive Canvas**
- Portrait mode: `min(width - 16px, 500px)`
- Fullscreen: `min(width, height)`
- Always square aspect ratio
- Updates on window resize

**Touch Controls**
- Slider height: 12px (thin but tappable)
- Slider thumb: 24px (large touch target)
- Button height: 48px minimum
- Grid layout for color buttons (2x2)

**Layout Strategy**
- Fixed header (non-scrolling)
- Fixed canvas area
- Scrollable controls section
- No horizontal scroll
- Fits within viewport height

---

## 🎨 Design System

### Color Palette

```css
/* Background */
--bg-primary: #0A0A14 (rgb(10, 10, 20))
--bg-secondary: #1F2937 (gray-800)
--bg-control: #374151 (gray-700)
--bg-border: #4B5563 (gray-600)

/* Accent */
--accent-primary: #06B6D4 (cyan-400)
--accent-active: #0891B2 (cyan-600)

/* Text */
--text-primary: #FFFFFF
--text-secondary: #06B6D4 (cyan-400)
--text-muted: #9CA3AF (gray-400)
```

### Typography

```css
/* Headers */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...

/* Sizes */
--text-xl: 20px (1.25rem)
--text-sm: 14px (0.875rem)
--text-xs: 12px (0.75rem)

/* Weights */
--font-bold: 700
--font-semibold: 600
--font-medium: 500
```

### Spacing Scale

```css
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-8: 32px
```

### Component Styles

**Sliders**
- Track height: 12px
- Thumb size: 24px circle
- Active thumb: scale(1.1)
- Progress gradient background
- Border radius: 8px

**Buttons**
- Height: 48px
- Border radius: 8px
- Active ring: 4px cyan-400
- Gradient backgrounds for color modes

**Dropdown**
- Padding: 16px
- Border: 2px
- Custom arrow icon (SVG)
- Focus border: cyan-500

---

## 📐 Mathematical Formulas

### Formula Implementation Guide

Each formula must implement the `calculatePoint(theta)` function that returns `{x, y}` coordinates.

### 1. Euler's Identity
```javascript
formula: "z(θ) = e^(θi) + e^(πθi)"
// Sum of two complex exponentials
z1 = cos(θ) + i·sin(θ)
z2 = cos(π·θ) + i·sin(π·θ)
z = z1 + z2
```
**Visual Result:** Quasi-periodic pattern with elegant loops

**Default Params:**
- speed: 0.015
- scale: 0.38
- param1: 1 (frequency 1)
- param2: π (frequency 2)
- trail: 400

### 2. Lissajous Curves
```javascript
formula: "x = A·sin(aθ), y = B·sin(bθ)"
// Harmonic motion in perpendicular directions
x = sin(param1 · θ)
y = sin(param2 · θ)
```
**Visual Result:** Figure-eight patterns, depends on frequency ratio

**Default Params:**
- scale: 0.40
- param1: 3 (x frequency)
- param2: 4 (y frequency)
- trail: 500

### 3. Rose Curve
```javascript
formula: "r = cos(kθ)"
// Polar equation creating flower petals
r = cos(param1 · θ)
x = r · cos(θ)
y = r · sin(θ)
```
**Visual Result:** Flower-like pattern, petals = param1 if odd, 2·param1 if even

**Default Params:**
- scale: 0.40
- param1: 5 (number of petals)
- trail: 600

### 4. Spirograph
```javascript
formula: "Circle rolling inside/outside another circle"
// Hypotrochoid/epitrochoid
R = param1 (fixed circle)
r = param2 (rolling circle)
d = 0.7 (pen distance)

x = (R-r)·cos(θ) + d·r·cos((R-r)/r · θ)
y = (R-r)·sin(θ) - d·r·sin((R-r)/r · θ)
```
**Visual Result:** Classic spirograph toy patterns

**Default Params:**
- scale: 0.15 (smaller to fit complex patterns)
- param1: 5
- param2: 3
- trail: 900

### 5. Harmonograph
```javascript
formula: "Damped harmonic oscillations"
// Simulates a mechanical drawing device
damping = e^(-0.05·θ)

x = sin(param1·θ) · damping
y = sin(param2·θ + π/4) · damping
```
**Visual Result:** Spiraling patterns that decay to center

**Default Params:**
- scale: 0.38
- param1: 3 (x frequency)
- param2: 2 (y frequency)
- trail: 600

### 6. Butterfly Curve
```javascript
formula: "r = e^(sin θ) - 2cos(4θ) + sin^5(θ/12)"
// Transcendental curve
r = e^(sin(θ)) - 2·cos(4θ) + sin^5(θ/12)
x = r · cos(θ)
y = r · sin(θ)
```
**Visual Result:** Butterfly-shaped pattern

**Default Params:**
- scale: 0.15 (complex shape needs smaller scale)
- param1: 1 (scale factor)
- trail: 700

### 7. Epicycloid
```javascript
formula: "Circle rolling on outside of another"
R = param1
r = param2
ratio = R/r

x = (R+r)·cos(θ) - r·cos((ratio+1)·θ)
y = (R+r)·sin(θ) - r·sin((ratio+1)·θ)
```
**Visual Result:** Cusped curves with R/r petals

**Default Params:**
- scale: 0.12
- param1: 5
- param2: 3
- trail: 800

### 8. Hypocycloid
```javascript
formula: "Circle rolling on inside of another"
R = param1
r = param2
ratio = R/r

x = (R-r)·cos(θ) + r·cos((ratio-1)·θ)
y = (R-r)·sin(θ) - r·sin((ratio-1)·θ)
```
**Visual Result:** Can create straight lines (deltoid) or star patterns

**Default Params:**
- scale: 0.25
- param1: 5
- param2: 3
- trail: 800

### 9. Cardioid
```javascript
formula: "r = a(1 + cos(θ))"
// Heart-shaped curve
r = param1 · (1 + cos(θ)) · 2
x = r · cos(θ)
y = r · sin(θ)
```
**Visual Result:** Heart or apple-shaped curve

**Default Params:**
- scale: 0.22
- param1: 1
- trail: 500

---

## 🔄 Development Journey

### Design Evolution

**Phase 1: Initial Concept**
- Started with photo of Euler's formula
- Goal: Create single formula visualization
- Basic canvas rendering

**Phase 2: Multi-Formula Gallery**
- Added dropdown to select formulas
- Implemented 8 formulas initially
- Issues with some formulas going off-screen

**Phase 3: Mobile Optimization**
- Redesigned for iPhone portrait mode
- Made sliders touch-friendly (24px thumbs)
- Fixed layout to prevent scrolling
- Reduced slider height for sleeker look

**Phase 4: Calibration**
- Major issue: Many patterns showed blank screens
- Solution: Switched to percentage-based scale
- Reduced scale ranges and recalibrated defaults
- Removed unstable formulas (Fermat, Logarithmic spirals, etc.)

**Phase 5: Final Polish**
- Refined to 9 stable formulas
- Added fullscreen mode
- Improved color modes
- Optimized performance

### Key Challenges & Solutions

**Challenge 1: Blank Screens**
- Problem: Patterns would scale too large and disappear
- Solution: Made scale relative to canvas size (percentage-based)
- Formula: `actualScale = scale * canvasSize`
- Range: 0.05 - 0.42 (5% - 42%)

**Challenge 2: Mobile Sliders Too Small**
- Problem: Sliders hard to drag on touch screens
- Solution: Increased thumb to 24px, active state scales to 1.1x
- Track height: 12px (thin but visible)

**Challenge 3: Screen Layout on iPhone**
- Problem: Controls scrolling off screen
- Solution: Fixed header + canvas, scrollable controls only
- Canvas sized to leave room for controls

**Challenge 4: Formula Switching**
- Problem: Parameters not updating when changing formulas
- Solution: useEffect hook watching selectedFormula
- Auto-loads formula-specific defaults

**Challenge 5: Performance**
- Problem: Trail rendering could slow down
- Solution: Array management (shift old points)
- Trail length capped at 1000 points

---

## 🗺️ Future Roadmap

### Phase 1: Core Enhancements (v1.1)
- [ ] Add 10+ more mathematical formulas
  - Rhodonea curves
  - Astroid
  - Nephroid  
  - Trefoil knot
  - Epitrochoid variants
- [ ] Save/Load system for configurations
- [ ] Preset gallery with curated patterns
- [ ] Performance monitoring

### Phase 2: Creative Features (v1.2)
- [ ] Export canvas as PNG/SVG
- [ ] Record animation as GIF/MP4
- [ ] Custom color picker
- [ ] Multiple color gradient modes
- [ ] Background pattern options
- [ ] Line width control
- [ ] Opacity control

### Phase 3: Sharing & Social (v1.3)
- [ ] Share configurations via URL
- [ ] QR code generation
- [ ] Social media share buttons
- [ ] Gallery of community creations
- [ ] Voting/favorites system
- [ ] User accounts (optional)

### Phase 4: Educational (v1.4)
- [ ] Formula explanations
- [ ] Interactive tutorials
- [ ] Step-by-step animations
- [ ] Mathematical insights
- [ ] Links to learn more
- [ ] Educational presets

### Phase 5: Advanced (v2.0)
- [ ] 3D formulas with Three.js
- [ ] WebGL rendering for performance
- [ ] Audio reactive mode
- [ ] Multi-formula layering
- [ ] Particle systems
- [ ] Physics simulations
- [ ] Custom formula editor

---

## 📦 Setup & Installation

### Prerequisites
```bash
node >= 18.0.0
npm >= 9.0.0
```

### Quick Start
```bash
# Clone or create project
mkdir math-art-gallery
cd math-art-gallery

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.8"
  }
}
```

### Development Workflow

**Running Locally**
```bash
npm run dev
# Opens at http://localhost:5173
```

**Building**
```bash
npm run build
# Output in /dist folder
```

**Preview Build**
```bash
npm run preview
# Preview production build
```

### File Checklist

Essential files for the project:
- [ ] package.json
- [ ] vite.config.js
- [ ] tailwind.config.js
- [ ] postcss.config.js
- [ ] public/index.html
- [ ] src/index.jsx
- [ ] src/App.jsx
- [ ] src/index.css
- [ ] .gitignore
- [ ] README.md

---

## 🔧 Development Guidelines

### Code Style
- Use functional components
- Prefer hooks over class components
- Keep components focused and small
- Comment complex mathematical logic
- Use meaningful variable names

### Adding New Formulas

1. **Add to FORMULAS object**
```javascript
newFormula: {
  name: "Formula Name",
  formula: "Mathematical notation",
  description: "Brief description",
  defaultParams: { 
    speed: 0.015, 
    scale: 0.30, 
    param1: 1, 
    param2: 1, 
    trail: 500 
  }
}
```

2. **Implement in calculatePoint()**
```javascript
case 'newFormula':
  // Your calculation here
  x = width / 2 + actualScale * ...
  y = height / 2 + actualScale * ...
  break;
```

3. **Test calibration**
- Verify pattern stays on screen
- Test with different parameters
- Adjust default scale if needed

4. **Add parameter labels**
```javascript
// In getParam1Label()
case 'newFormula': return 'Your Label';

// In getParam2Label()
case 'newFormula': return 'Your Label';
```

### Performance Tips
- Keep trail length reasonable (< 1000)
- Use requestAnimationFrame
- Clear old points from array
- Avoid heavy calculations in render loop
- Profile with React DevTools

### Testing Checklist
- [ ] Works on iPhone Safari
- [ ] Works on Chrome mobile
- [ ] Fullscreen mode works
- [ ] All formulas render correctly
- [ ] No blank screens at any scale
- [ ] Smooth 60fps animation
- [ ] Touch controls responsive
- [ ] Formula switching smooth

---

## 📚 Resources & References

### Mathematical Background
- [Parametric Equations - Wikipedia](https://en.wikipedia.org/wiki/Parametric_equation)
- [Lissajous Curves](https://en.wikipedia.org/wiki/Lissajous_curve)
- [Rose Curves](https://en.wikipedia.org/wiki/Rose_(mathematics))
- [Euler's Formula](https://en.wikipedia.org/wiki/Euler%27s_formula)
- [Spirograph Mathematics](https://en.wikipedia.org/wiki/Spirograph)

### Technical Documentation
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Inspiration
- [Desmos Graphing Calculator](https://www.desmos.com/calculator)
- [Coding Train - Parametric Equations](https://thecodingtrain.com/)
- [Generative Artistry](https://generativeartistry.com/)

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

## 🤝 Contributing

Future contributions welcome! Areas of focus:
1. New mathematical formulas
2. Performance optimizations
3. Educational content
4. Accessibility improvements
5. Mobile optimizations

---

## 📞 Support

For questions or issues:
- Check existing formulas for examples
- Review this PRD for specifications
- Test on mobile devices frequently
- Keep patterns within canvas bounds

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-01  
**Status:** Production Ready  
**Next Review:** After v1.1 release
# Testing Checklist for v1.0.0 Release

Before tagging v1.0.0, verify all features are working correctly.

## ✅ Build & Development

- [x] `npm install` works without errors
- [x] `npm run dev` starts dev server successfully
- [x] `npm run build` completes without errors
- [ ] `npm run preview` shows built app correctly
- [ ] No console errors in browser dev tools

## 🎨 Formulas (14 total)

Test each formula renders correctly:

### Classic Curves
- [ ] Euler's Identity - smooth dual spiral pattern
- [ ] Lissajous - figure-8 or complex wave patterns
- [ ] Rose - flower petal patterns
- [ ] Spirograph - nested circular patterns
- [ ] Harmonograph - damped oscillation spirals
- [ ] Butterfly - butterfly wing shape

### Cycloids
- [ ] Epicycloid - circle rolling outside
- [ ] Hypocycloid - circle rolling inside (star shapes)
- [ ] Cardioid - heart-shaped curve

### Chaos Systems
- [ ] Lorenz Attractor - butterfly-shaped strange attractor
- [ ] Hénon Map - discrete chaotic points
- [ ] Clifford Attractor - swirling chaotic pattern

### Fractals
- [ ] Mandelbrot Trace - fractal boundary walking
- [ ] Julia Set - complex fractal patterns

## 🎯 Presets (15 total)

Press keys 1-9 and click buttons to test:

- [ ] 1 - Golden Spiral (Euler)
- [ ] 2 - Lightning Rose
- [ ] 3 - Fire Flower
- [ ] 4 - Cosmic Dance (Lissajous)
- [ ] 5 - Butterfly Garden
- [ ] 6 - Star Burst (Epicycloid)
- [ ] 7 - Ocean Waves (Harmonograph)
- [ ] 8 - Perfect Balance (Hypocycloid)
- [ ] 9 - Heart Beat (Cardioid)
- [ ] Neon Dreams (Spirograph) - click button
- [ ] Strange Attractor (Lorenz) - click button
- [ ] Mandelbrot Edge - click button
- [ ] Chaos Theory (Hénon) - click button
- [ ] Julia Fractal - click button
- [ ] Clifford Attractor - click button

## 🎨 Color Modes

- [ ] Rainbow - smooth color gradient through spectrum
- [ ] Neon (Cyan-Pink) - vibrant cyan to pink
- [ ] Fire - orange/yellow/red gradient
- [ ] Blue - single blue tone

## ⌨️ Keyboard Shortcuts

- [ ] `Space` - Play/Pause works
- [ ] `P` - Particle mode toggles
- [ ] `C` - Clear canvas
- [ ] `F` - Fullscreen mode (press again or Esc to exit)
- [ ] `1-9` - Load presets 1-9
- [ ] `R` - Random preset loads
- [ ] `?` or `/` - Help modal appears
- [ ] `Esc` - Closes help modal and exits fullscreen

## 🎛️ Controls

### Sliders
- [ ] Speed slider (0.005 - 0.04) - animation speed changes
- [ ] Scale slider (5% - 42%) - pattern size changes
- [ ] Trail slider (100 - 1000) - trail length changes
- [ ] Param1 slider - affects formula (label changes per formula)
- [ ] Param2 slider - affects formula (label changes per formula)

### Buttons
- [ ] Formula dropdown - all 14 formulas selectable
- [ ] Particle button - toggles particle effects
- [ ] Play/Pause button - matches spacebar
- [ ] Clear button - clears canvas instantly
- [ ] Preset buttons - load correctly

## 💾 Export Functionality

- [ ] PNG export - downloads .png file
- [ ] JPG export - downloads .jpg file
- [ ] SVG export - downloads .svg file (vector)
- [ ] SVG opens correctly in browser/editor
- [ ] SVG includes all formulas (including chaos systems)
- [ ] Toast notification appears on successful export

## 🔗 Share Functionality

- [ ] Share button copies URL to clipboard
- [ ] Toast notification confirms copy
- [ ] Shared URL loads same configuration
- [ ] Shared URL preserves: formula, speed, scale, params, trail, color mode

## ✨ Particle Effects

- [ ] Particles spawn when moving
- [ ] Particles fade out over time
- [ ] Particle colors match color mode
- [ ] Particles don't cause lag (check FPS)
- [ ] Object pooling working (no memory leaks)

## 🖼️ Fullscreen Mode

- [ ] Fullscreen button works (top right of canvas)
- [ ] F key enters fullscreen
- [ ] Click outside or Esc exits fullscreen
- [ ] Canvas resizes to fit screen
- [ ] Animation continues smoothly

## 📊 Performance Monitoring

- [ ] FPS displays (should be 50-60 normally)
- [ ] Render time shows (should be <16ms ideally)
- [ ] Point count updates in real-time
- [ ] Color coding works (green=good, yellow=ok, red=slow)

## 🎮 User Experience

- [ ] Help modal displays keyboard shortcuts
- [ ] Help modal closes on Esc or click outside
- [ ] Toast notifications appear for exports/shares
- [ ] Toast auto-dismisses after 3 seconds
- [ ] Preset changes clear canvas smoothly
- [ ] No UI jank or freezing

## 🛡️ Error Handling

- [ ] Error boundary catches crashes
- [ ] Error boundary shows user-friendly message
- [ ] Reload button works in error state
- [ ] Console shows detailed error info

## 📱 Responsive Design

- [ ] Canvas centers on page
- [ ] Sidebars visible at desktop width (1280px+)
- [ ] UI doesn't overflow or clip
- [ ] Scrollbars work on sidebar sections

## 🎨 Visual Polish

- [ ] Glassmorphism effects visible
- [ ] Gradient text on headers
- [ ] Hover effects on buttons
- [ ] Smooth animations/transitions
- [ ] Custom scrollbar styling
- [ ] Range slider thumb animations

## 🧪 Edge Cases

- [ ] Switching formulas mid-animation works
- [ ] Extreme parameter values don't crash
- [ ] Very long trail length doesn't freeze
- [ ] Particle mode + max speed performs well
- [ ] Rapid preset switching doesn't break
- [ ] Share URL with malformed config fails gracefully

## 📋 Documentation

- [ ] README.md accurate and complete
- [ ] GIT_SETUP_GUIDE.md clear and helpful
- [ ] Code comments where needed
- [ ] No outdated version numbers

## 🚀 Final Checks

- [ ] Version is 0.4.0 in all files
- [ ] No console errors or warnings
- [ ] All files committed to git
- [ ] .gitignore working (node_modules excluded)
- [ ] Build size reasonable (<200KB JS gzipped)

---

## Ready for v1.0.0?

Once all items checked, you're ready to:

1. Bump version to 1.0.0
2. Create git tag
3. Push to GitHub
4. Create GitHub release
5. (Optional) Deploy to hosting platform

See `GIT_SETUP_GUIDE.md` for release instructions.

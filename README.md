# 🎨 Mathematical Art Gallery

An interactive web application that generates stunning mathematical art using parametric curves, chaos theory, and fractals. Create, customize, and export beautiful visualizations in real-time.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Mathematical Formulas (14 total)
- **Classic Curves**: Euler's Identity, Lissajous, Rose, Spirograph, Harmonograph
- **Cycloids**: Epicycloid, Hypocycloid, Cardioid
- **Chaos Systems**: Lorenz Attractor, Hénon Map, Clifford Attractor
- **Fractals**: Mandelbrot Trace, Julia Set
- **Special Curves**: Butterfly Curve

### Customization
- 🎨 **4 Color Modes**: Rainbow, Neon (Cyan-Pink), Fire, Blue
- 🎯 **15 Curated Presets**: Hand-crafted beautiful patterns
- ⚙️ **Real-time Controls**: Speed, scale, trail length, formula parameters
- ✨ **Particle Effects**: Optional particle system with physics
- 📊 **Performance Monitor**: FPS, render time, point count tracking

### Export & Sharing
- 💾 **Export Formats**: PNG, JPG, SVG (vector graphics)
- 🔗 **Share URLs**: Save and share configurations via URL
- 📱 **Clipboard Support**: One-click copy to clipboard

### User Experience
- ⌨️ **Keyboard Shortcuts**: Fast navigation and control
- 🖼️ **Fullscreen Mode**: Immersive viewing experience
- 🎮 **Interactive Help**: Built-in keyboard shortcuts guide
- 🔔 **Toast Notifications**: Visual feedback for actions
- 🛡️ **Error Boundaries**: Graceful error handling

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Play / Pause animation |
| `P` | Toggle particle effects |
| `C` | Clear canvas |
| `F` | Toggle fullscreen |
| `1-9` | Load preset (1-9) |
| `R` | Random preset |
| `?` or `/` | Show keyboard shortcuts help |
| `Esc` | Exit fullscreen / Close modals |

## 🎯 Usage Tips

1. **Start with a Preset**: Press `1-9` or click a preset button to see beautiful pre-configured patterns
2. **Experiment**: Adjust speed, scale, and parameters in real-time to create unique art
3. **Add Particles**: Press `P` to enable particle effects for extra visual flair
4. **Export Your Art**: Click PNG, JPG, or SVG to download your creation
5. **Share**: Click Share to generate a URL with your current configuration

## 📁 Project Structure

```
math-art-gallery/
├── src/
│   ├── App.jsx              # Main application with rendering logic
│   ├── ErrorBoundary.jsx    # Error handling component
│   ├── index.jsx            # React entry point
│   └── index.css            # Global styles with custom CSS variables
├── public/                   # Static assets
├── index.html               # HTML template
└── package.json             # Project dependencies
```

## 🛠️ Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **HTML5 Canvas** - High-performance rendering
- **JavaScript** - Mathematical computations

## 🎨 Performance Optimizations

- **Object Pooling**: Efficient particle system memory management
- **Delta Time Animation**: Smooth 60 FPS rendering regardless of frame rate
- **Canvas Optimizations**: Minimal redraws and efficient path rendering
- **Error Boundaries**: Graceful degradation on failures

## 🔮 Future Enhancements

- [ ] WebGL renderer for complex patterns
- [ ] Animation recording (GIF/Video export)
- [ ] Gallery of saved patterns (localStorage)
- [ ] Sound-reactive mode
- [ ] Mobile version with touch controls
- [ ] Multi-layer composition
- [ ] Additional formulas and presets

## 📄 License

MIT License - feel free to use this project for learning or creating your own mathematical art!

## 🤝 Contributing

This is a personal learning project, but suggestions and feedback are welcome!

---

**Version**: 1.0.0 - First Stable Release!

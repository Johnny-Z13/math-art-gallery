import React, { useEffect, useRef, useState } from 'react';

const PRESETS = [
  {
    name: "🌀 Golden Spiral",
    formula: "euler",
    params: { speed: 0.012, scale: 0.35, param1: 1.618, param2: Math.PI, trail: 600, colorMode: "rainbow" }
  },
  {
    name: "⚡ Lightning Rose",
    formula: "rose",
    params: { speed: 0.025, scale: 0.38, param1: 7, param2: 1, trail: 800, colorMode: "cyan-pink" }
  },
  {
    name: "🔥 Fire Flower",
    formula: "rose",
    params: { speed: 0.018, scale: 0.42, param1: 5, param2: 1, trail: 500, colorMode: "fire" }
  },
  {
    name: "💫 Cosmic Dance",
    formula: "lissajous",
    params: { speed: 0.015, scale: 0.35, param1: 3, param2: 5, trail: 700, colorMode: "rainbow" }
  },
  {
    name: "🌸 Butterfly Garden",
    formula: "butterfly",
    params: { speed: 0.020, scale: 0.18, param1: 1.2, param2: 1, trail: 900, colorMode: "cyan-pink" }
  },
  {
    name: "⭐ Star Burst",
    formula: "epicycloid",
    params: { speed: 0.015, scale: 0.15, param1: 7, param2: 3, trail: 1000, colorMode: "fire" }
  },
  {
    name: "💙 Ocean Waves",
    formula: "harmonograph",
    params: { speed: 0.020, scale: 0.40, param1: 2, param2: 3, trail: 600, colorMode: "blue" }
  },
  {
    name: "🎯 Perfect Balance",
    formula: "hypocycloid",
    params: { speed: 0.010, scale: 0.30, param1: 6, param2: 2, trail: 800, colorMode: "rainbow" }
  },
  {
    name: "💖 Heart Beat",
    formula: "cardioid",
    params: { speed: 0.018, scale: 0.25, param1: 1.5, param2: 1, trail: 400, colorMode: "fire" }
  },
  {
    name: "🌟 Neon Dreams",
    formula: "spirograph",
    params: { speed: 0.008, scale: 0.18, param1: 8, param2: 3, trail: 900, colorMode: "cyan-pink" }
  },
  {
    name: "🌊 Strange Attractor",
    formula: "lorenz",
    params: { speed: 0.020, scale: 0.08, param1: 10, param2: 28, trail: 2000, colorMode: "cyan-pink" }
  },
  {
    name: "🔮 Mandelbrot Edge",
    formula: "mandelbrot",
    params: { speed: 0.005, scale: 0.25, param1: 2, param2: 3.5, trail: 1500, colorMode: "fire" }
  },
  {
    name: "⚛️ Chaos Theory",
    formula: "henon",
    params: { speed: 0.030, scale: 0.15, param1: 1.4, param2: 0.3, trail: 3000, colorMode: "rainbow" }
  },
  {
    name: "🌀 Julia Fractal",
    formula: "julia",
    params: { speed: 0.008, scale: 0.20, param1: -0.7, param2: 0.27, trail: 1000, colorMode: "cyan-pink" }
  },
  {
    name: "🎭 Clifford Attractor",
    formula: "clifford",
    params: { speed: 0.025, scale: 0.12, param1: -1.4, param2: 1.6, trail: 2500, colorMode: "fire" }
  }
];

const FORMULAS = {
  euler: {
    name: "Euler's Identity",
    formula: "z(θ) = e^(θi) + e^(πθi)",
    description: "Sum of complex exponentials",
    defaultParams: { speed: 0.015, scale: 0.38, param1: 1, param2: Math.PI, trail: 400 }
  },
  lissajous: {
    name: "Lissajous Curves",
    formula: "x = A·sin(aθ), y = B·sin(bθ)",
    description: "Harmonic motion patterns",
    defaultParams: { speed: 0.02, scale: 0.40, param1: 3, param2: 4, trail: 500 }
  },
  rose: {
    name: "Rose Curve",
    formula: "r = cos(kθ)",
    description: "Flower-like patterns",
    defaultParams: { speed: 0.015, scale: 0.40, param1: 5, param2: 1, trail: 600 }
  },
  spirograph: {
    name: "Spirograph",
    formula: "Multiple rotating circles",
    description: "Classic toy mathematics",
    defaultParams: { speed: 0.01, scale: 0.15, param1: 5, param2: 3, trail: 900 }
  },
  harmonograph: {
    name: "Harmonograph",
    formula: "Damped oscillations",
    description: "Spirograph-like patterns",
    defaultParams: { speed: 0.025, scale: 0.38, param1: 3, param2: 2, trail: 600 }
  },
  butterfly: {
    name: "Butterfly Curve",
    formula: "r = e^(sin θ) - 2cos(4θ)",
    description: "Butterfly-shaped curve",
    defaultParams: { speed: 0.018, scale: 0.15, param1: 1, param2: 1, trail: 700 }
  },
  epicycloid: {
    name: "Epicycloid",
    formula: "Circle rolling outside",
    description: "Wheel on circle's exterior",
    defaultParams: { speed: 0.012, scale: 0.12, param1: 5, param2: 3, trail: 800 }
  },
  hypocycloid: {
    name: "Hypocycloid",
    formula: "Circle rolling inside",
    description: "Wheel on circle's interior",
    defaultParams: { speed: 0.012, scale: 0.25, param1: 5, param2: 3, trail: 800 }
  },
  cardioid: {
    name: "Cardioid",
    formula: "r = a(1 + cos(θ))",
    description: "Heart-shaped curve",
    defaultParams: { speed: 0.015, scale: 0.22, param1: 1, param2: 1, trail: 500 }
  },
  lorenz: {
    name: "Lorenz Attractor",
    formula: "Strange attractor system",
    description: "Chaos theory visualization",
    defaultParams: { speed: 0.020, scale: 0.08, param1: 10, param2: 28, trail: 2000 }
  },
  mandelbrot: {
    name: "Mandelbrot Trace",
    formula: "Fractal boundary walker",
    description: "Edge of infinite complexity",
    defaultParams: { speed: 0.005, scale: 0.25, param1: 2, param2: 3.5, trail: 1500 }
  },
  henon: {
    name: "Hénon Map",
    formula: "Chaotic dynamical system",
    description: "Strange attractor mapping",
    defaultParams: { speed: 0.030, scale: 0.15, param1: 1.4, param2: 0.3, trail: 3000 }
  },
  julia: {
    name: "Julia Set",
    formula: "Complex fractal dynamics",
    description: "Infinite fractal boundary",
    defaultParams: { speed: 0.008, scale: 0.20, param1: -0.7, param2: 0.27, trail: 1000 }
  },
  clifford: {
    name: "Clifford Attractor",
    formula: "Strange attractor",
    description: "Chaotic point mapping",
    defaultParams: { speed: 0.025, scale: 0.12, param1: -1.4, param2: 1.6, trail: 2500 }
  }
};

const MathArtGallery = () => {
  const canvasRef = useRef(null);
  const [selectedFormula, setSelectedFormula] = useState('euler');
  const [speed, setSpeed] = useState(0.015);
  const [trailLength, setTrailLength] = useState(400);
  const [colorMode, setColorMode] = useState('rainbow');
  const [scale, setScale] = useState(0.38);
  const [param1, setParam1] = useState(1);
  const [param2, setParam2] = useState(Math.PI);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [particleMode, setParticleMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fps, setFps] = useState(0);
  const [renderTime, setRenderTime] = useState(0);
  const [pointCount, setPointCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showHelp, setShowHelp] = useState(false);
  const animationRef = useRef(null);

  // Chaos system states
  const chaosState = useRef({
    lorenz: { x: 1, y: 1, z: 1 },
    henon: { x: 0, y: 0 },
    mandelbrot: { real: 0, imag: 0, iteration: 0 },
    julia: { real: 0, imag: 0 },
    clifford: { x: 0, y: 0 }
  });

  // Particle system with object pooling
  const particles = useRef([]);
  const particlePool = useRef([]);
  const lastPoint = useRef({ x: 0, y: 0 });

  // Particle pool helpers
  const getParticle = () => {
    return particlePool.current.pop() || {
      x: 0, y: 0, vx: 0, vy: 0, life: 0, decay: 0, size: 0, hue: 0
    };
  };

  const recycleParticle = (particle) => {
    if (particlePool.current.length < 1000) {
      particlePool.current.push(particle);
    }
  };

  // Performance tracking refs
  const frameCount = useRef(0);
  const lastFpsUpdate = useRef(Date.now());
  const lastFrameTime = useRef(0);
  const theta = useRef(0);

  // Animation parameter refs (for real-time updates without restarting)
  const speedRef = useRef(speed);
  const scaleRef = useRef(scale);
  const param1Ref = useRef(param1);
  const param2Ref = useRef(param2);
  const trailLengthRef = useRef(trailLength);
  const colorModeRef = useRef(colorMode);

  // Update refs when state changes
  useEffect(() => {
    speedRef.current = speed;
    scaleRef.current = scale;
    param1Ref.current = param1;
    param2Ref.current = param2;
    trailLengthRef.current = trailLength;
    colorModeRef.current = colorMode;
  }, [speed, scale, param1, param2, trailLength, colorMode]);

  const formula = FORMULAS[selectedFormula];

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Centralized point calculation function
  const calculatePoint = (theta, formulaType, canvasWidth, canvasHeight, actualScale, p1, p2, chaosStateRef) => {
    let x, y;

    switch(formulaType) {
      case 'euler':
        const z1_real = Math.cos(theta);
        const z1_imag = Math.sin(theta);
        const z2_real = Math.cos(p2 * theta);
        const z2_imag = Math.sin(p2 * theta);
        x = canvasWidth / 2 + (z1_real + z2_real) * actualScale;
        y = canvasHeight / 2 + (z1_imag + z2_imag) * actualScale;
        break;

      case 'lissajous':
        x = canvasWidth / 2 + actualScale * Math.sin(p1 * theta);
        y = canvasHeight / 2 + actualScale * Math.sin(p2 * theta);
        break;

      case 'rose':
        const r_rose = Math.cos(p1 * theta);
        x = canvasWidth / 2 + actualScale * r_rose * Math.cos(theta);
        y = canvasHeight / 2 + actualScale * r_rose * Math.sin(theta);
        break;

      case 'epicycloid':
        const R_epi = p1;
        const r_epi = p2;
        const ratio_epi = R_epi / r_epi;
        x = canvasWidth / 2 + actualScale * ((R_epi + r_epi) * Math.cos(theta) - r_epi * Math.cos((ratio_epi + 1) * theta));
        y = canvasHeight / 2 + actualScale * ((R_epi + r_epi) * Math.sin(theta) - r_epi * Math.sin((ratio_epi + 1) * theta));
        break;

      case 'hypocycloid':
        const R_hypo = p1;
        const r_hypo = p2;
        const ratio_hypo = R_hypo / r_hypo;
        x = canvasWidth / 2 + actualScale * ((R_hypo - r_hypo) * Math.cos(theta) + r_hypo * Math.cos((ratio_hypo - 1) * theta));
        y = canvasHeight / 2 + actualScale * ((R_hypo - r_hypo) * Math.sin(theta) - r_hypo * Math.sin((ratio_hypo - 1) * theta));
        break;

      case 'harmonograph':
        const decay = 0.05;
        const damping = Math.exp(-decay * theta);
        x = canvasWidth / 2 + actualScale * Math.sin(p1 * theta) * damping;
        y = canvasHeight / 2 + actualScale * Math.sin(p2 * theta + Math.PI / 4) * damping;
        break;

      case 'butterfly':
        const r_butterfly = Math.exp(Math.sin(theta)) - 2 * Math.cos(4 * theta) + Math.pow(Math.sin(theta / 12), 5);
        x = canvasWidth / 2 + actualScale * r_butterfly * Math.cos(theta) * p1;
        y = canvasHeight / 2 + actualScale * r_butterfly * Math.sin(theta) * p1;
        break;

      case 'spirograph':
        const R_spiro = p1;
        const r_spiro = p2;
        const d = 0.7;
        x = canvasWidth / 2 + actualScale * ((R_spiro - r_spiro) * Math.cos(theta) + d * r_spiro * Math.cos((R_spiro - r_spiro) / r_spiro * theta));
        y = canvasHeight / 2 + actualScale * ((R_spiro - r_spiro) * Math.sin(theta) - d * r_spiro * Math.sin((R_spiro - r_spiro) / r_spiro * theta));
        break;

      case 'cardioid':
        const r_card = p1 * (1 + Math.cos(theta)) * 2;
        x = canvasWidth / 2 + actualScale * r_card * Math.cos(theta);
        y = canvasHeight / 2 + actualScale * r_card * Math.sin(theta);
        break;

      case 'lorenz':
        // Lorenz Strange Attractor
        const sigma = p1;
        const rho = p2;
        const beta = 8/3;
        const dt = 0.01;

        const state = chaosStateRef.lorenz;
        const dx = sigma * (state.y - state.x) * dt;
        const dy = (state.x * (rho - state.z) - state.y) * dt;
        const dz = (state.x * state.y - beta * state.z) * dt;

        state.x += dx;
        state.y += dy;
        state.z += dz;

        x = canvasWidth / 2 + actualScale * state.x * 10;
        y = canvasHeight / 2 + actualScale * state.y * 10;
        break;

      case 'henon':
        // Hénon Map
        const a = p1;
        const b = p2;
        const state_henon = chaosStateRef.henon;

        const newX = 1 - a * state_henon.x * state_henon.x + state_henon.y;
        const newY = b * state_henon.x;

        state_henon.x = newX;
        state_henon.y = newY;

        x = canvasWidth / 2 + actualScale * state_henon.x * 200;
        y = canvasHeight / 2 + actualScale * state_henon.y * 200;
        break;

      case 'mandelbrot':
        // Mandelbrot boundary walker
        const mandel_state = chaosStateRef.mandelbrot;
        const c_real = -0.75 + 0.1 * Math.cos(theta * p1);
        const c_imag = 0.1 * Math.sin(theta * p2);

        const z_real = mandel_state.real;
        const z_imag = mandel_state.imag;

        mandel_state.real = z_real * z_real - z_imag * z_imag + c_real;
        mandel_state.imag = 2 * z_real * z_imag + c_imag;

        // Reset if magnitude gets too large
        if (mandel_state.real * mandel_state.real + mandel_state.imag * mandel_state.imag > 4) {
          mandel_state.real = 0;
          mandel_state.imag = 0;
        }

        x = canvasWidth / 2 + actualScale * mandel_state.real * 150;
        y = canvasHeight / 2 + actualScale * mandel_state.imag * 150;
        break;

      case 'julia':
        // Julia Set boundary
        const julia_state = chaosStateRef.julia;
        const c_julia_real = p1;
        const c_julia_imag = p2;

        // Start with point on unit circle
        julia_state.real = Math.cos(theta);
        julia_state.imag = Math.sin(theta);

        // Iterate a few times
        for (let i = 0; i < 3; i++) {
          const temp_real = julia_state.real * julia_state.real - julia_state.imag * julia_state.imag + c_julia_real;
          const temp_imag = 2 * julia_state.real * julia_state.imag + c_julia_imag;
          julia_state.real = temp_real;
          julia_state.imag = temp_imag;
        }

        x = canvasWidth / 2 + actualScale * julia_state.real * 200;
        y = canvasHeight / 2 + actualScale * julia_state.imag * 200;
        break;

      case 'clifford':
        // Clifford Attractor
        const cliff_state = chaosStateRef.clifford;
        const a_cliff = p1;
        const b_cliff = p2;
        const c_cliff = -1.0;
        const d_cliff = 0.75;

        const newX_cliff = Math.sin(a_cliff * cliff_state.y) + c_cliff * Math.cos(a_cliff * cliff_state.x);
        const newY_cliff = Math.sin(b_cliff * cliff_state.x) + d_cliff * Math.cos(b_cliff * cliff_state.y);

        cliff_state.x = newX_cliff;
        cliff_state.y = newY_cliff;

        x = canvasWidth / 2 + actualScale * cliff_state.x * 250;
        y = canvasHeight / 2 + actualScale * cliff_state.y * 250;
        break;

      default:
        x = canvasWidth / 2;
        y = canvasHeight / 2;
    }

    return { x, y };
  };

  useEffect(() => {
    const updateSize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Always use the same size - fullscreen is just a CSS overlay
      const availableWidth = windowWidth - 400; // Left (192) + Right (192) + padding
      const availableHeight = windowHeight - 180; // Header + bottom controls + padding

      setCanvasSize({
        width: Math.max(availableWidth, 600),
        height: Math.max(availableHeight, 400)
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const params = FORMULAS[selectedFormula].defaultParams;
    setSpeed(params.speed);
    setScale(params.scale);
    setParam1(params.param1);
    setParam2(params.param2);
    setTrailLength(params.trail);
  }, [selectedFormula]);

  useEffect(() => {
    loadFromURL();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent shortcuts when typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') return;

      switch (event.key.toLowerCase()) {
        case ' ':
        case 'spacebar':
          event.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'p':
          event.preventDefault();
          setParticleMode(prev => !prev);
          break;
        case 'c':
          event.preventDefault();
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          break;
        case 'f':
          event.preventDefault();
          setIsFullscreen(prev => !prev);
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          event.preventDefault();
          const presetIndex = parseInt(event.key) - 1;
          if (presetIndex < PRESETS.length) {
            loadPreset(PRESETS[presetIndex]);
          }
          break;
        case 'r':
          event.preventDefault();
          // Random preset
          const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
          loadPreset(randomPreset);
          break;
        case 'escape':
          event.preventDefault();
          if (showHelp) {
            setShowHelp(false);
          } else if (isFullscreen) {
            setIsFullscreen(false);
          }
          break;
        case '?':
        case '/':
          event.preventDefault();
          setShowHelp(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, particleMode, isFullscreen, showHelp]);

  // Separate effect to handle canvas resizing without restarting animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas (this will clear it, but animation continues)
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Fill with background color so it's not transparent
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(10, 10, 20)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const points = [];

    const animate = (timestamp) => {
      const frameStart = performance.now();

      // Get current canvas dimensions dynamically
      const width = canvas.width;
      const height = canvas.height;

      if (!isPlaying) {
        lastFrameTime.current = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate delta time for smooth animation
      if (lastFrameTime.current === 0) {
        lastFrameTime.current = timestamp;
      }
      const deltaTime = Math.min((timestamp - lastFrameTime.current) / 16.67, 2); // Cap at 2x speed
      lastFrameTime.current = timestamp;

      // Track FPS
      frameCount.current++;
      const now = Date.now();
      if (now - lastFpsUpdate.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastFpsUpdate.current)));
        frameCount.current = 0;
        lastFpsUpdate.current = now;
      }

      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Update theta based on speed and delta time (use ref for real-time updates)
      theta.current += speedRef.current * deltaTime;
      const t = theta.current;

      // Get current values from refs for real-time updates
      const actualScale = scaleRef.current * Math.min(width, height);
      const currentParam1 = param1Ref.current;
      const currentParam2 = param2Ref.current;

      const { x, y } = calculatePoint(t, selectedFormula, width, height, actualScale, currentParam1, currentParam2, chaosState.current);

      // Particle effects with object pooling
      if (particleMode) {
        // Add particles at current point
        const velocity = Math.sqrt((x - lastPoint.current.x) ** 2 + (y - lastPoint.current.y) ** 2);
        if (velocity > 1) {
          const particleCount = Math.min(5, Math.floor(velocity / 2));
          for (let i = 0; i < particleCount; i++) {
            const particle = getParticle();
            particle.x = x + (Math.random() - 0.5) * 10;
            particle.y = y + (Math.random() - 0.5) * 10;
            particle.vx = (Math.random() - 0.5) * 4;
            particle.vy = (Math.random() - 0.5) * 4;
            particle.life = 1.0;
            particle.decay = 0.01 + Math.random() * 0.02;
            particle.size = 1 + Math.random() * 3;
            particle.hue = colorModeRef.current === 'rainbow' ? (t * 50) % 360 :
                          colorModeRef.current === 'cyan-pink' ? 180 + Math.sin(t) * 120 :
                          colorModeRef.current === 'fire' ? 30 - Math.cos(t) * 30 : 200;
            particles.current.push(particle);
          }
        }
        lastPoint.current = { x, y };

        // Update and draw particles
        const activeParticles = [];
        for (let i = 0; i < particles.current.length; i++) {
          const particle = particles.current[i];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98; // air resistance
          particle.vy *= 0.98;
          particle.life -= particle.decay;

          if (particle.life > 0) {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            activeParticles.push(particle);
          } else {
            recycleParticle(particle);
          }
        }
        particles.current = activeParticles;
      }

      points.push({ x, y, t });
      if (points.length > trailLengthRef.current) {
        points.shift();
      }

      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];
        const alpha = i / points.length;

        let color;
        if (colorModeRef.current === 'rainbow') {
          const hue = (p2.t * 50) % 360;
          color = `hsla(${hue}, 80%, 60%, ${alpha})`;
        } else if (colorModeRef.current === 'cyan-pink') {
          const hue = 180 + Math.sin(p2.t) * 120;
          color = `hsla(${hue}, 80%, 60%, ${alpha})`;
        } else if (colorModeRef.current === 'fire') {
          const hue = 30 - Math.cos(p2.t) * 30;
          color = `hsla(${hue}, 100%, 60%, ${alpha})`;
        } else {
          color = `rgba(100, 200, 255, ${alpha})`;
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2 + alpha * 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Enhanced main point with glow effect
      const mainColor = colorModeRef.current === 'rainbow'
        ? `hsl(${(t * 50) % 360}, 100%, 70%)`
        : '#00ffff';

      // Glow effect
      ctx.save();
      ctx.shadowColor = mainColor;
      ctx.shadowBlur = particleMode ? 15 : 5;
      ctx.fillStyle = mainColor;
      ctx.beginPath();
      ctx.arc(x, y, particleMode ? 4 : 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Track render time and point count
      const frameEnd = performance.now();
      setRenderTime(frameEnd - frameStart);
      setPointCount(points.length + particles.current.length);

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initial canvas clear
    ctx.fillStyle = 'rgb(10, 10, 20)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedFormula, particleMode, isPlaying]);

  const getParam1Label = () => {
    switch(selectedFormula) {
      case 'euler': return 'Frequency 1';
      case 'lissajous': return 'X Frequency';
      case 'rose': return 'Petals';
      case 'spirograph': return 'Fixed Circle';
      case 'lorenz': return 'Sigma (σ)';
      case 'henon': return 'Parameter a';
      case 'mandelbrot': return 'Real Mod';
      case 'julia': return 'Real Part';
      case 'clifford': return 'Parameter a';
      default: return 'Outer Radius';
    }
  };

  const getParam2Label = () => {
    switch(selectedFormula) {
      case 'euler': return 'Frequency 2';
      case 'lissajous': return 'Y Frequency';
      case 'spirograph': return 'Rolling Circle';
      case 'lorenz': return 'Rho (ρ)';
      case 'henon': return 'Parameter b';
      case 'mandelbrot': return 'Imag Mod';
      case 'julia': return 'Imag Part';
      case 'clifford': return 'Parameter b';
      default: return 'Rolling Radius';
    }
  };

  const exportCanvas = (format = 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataURL = canvas.toDataURL(`image/${format}`, 0.95);
      const link = document.createElement('a');
      link.download = `math-art-${selectedFormula}-${Date.now()}.${format}`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`✓ Exported as ${format.toUpperCase()}`, 'success');
    } catch (error) {
      showToast('✗ Export failed', 'error');
      console.error('Export error:', error);
    }
  };

  const loadPreset = (preset) => {
    const { params } = preset;

    // Clear canvas for smooth transition
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgb(10, 10, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Reset chaos states for clean start
    chaosState.current = {
      lorenz: { x: 1, y: 1, z: 1 },
      henon: { x: 0, y: 0 },
      mandelbrot: { real: 0, imag: 0, iteration: 0 },
      julia: { real: 0, imag: 0 },
      clifford: { x: 0, y: 0 }
    };

    // Reset animation timing
    theta.current = 0;
    lastFrameTime.current = 0;

    // Apply preset parameters
    setSelectedFormula(preset.formula);
    setSpeed(params.speed);
    setScale(params.scale);
    setParam1(params.param1);
    setParam2(params.param2);
    setTrailLength(params.trail);
    setColorMode(params.colorMode);
  };

  const shareConfiguration = () => {
    const config = {
      f: selectedFormula,
      s: speed,
      sc: scale,
      p1: param1,
      p2: param2,
      t: trailLength,
      c: colorMode
    };

    const encoded = btoa(JSON.stringify(config));
    const shareUrl = `${window.location.origin}${window.location.pathname}?config=${encoded}`;

    if (navigator.share) {
      navigator.share({
        title: 'Mathematical Art Gallery',
        text: `Check out this beautiful ${FORMULAS[selectedFormula].name} pattern!`,
        url: shareUrl
      }).then(() => {
        showToast('✓ Shared successfully', 'success');
      }).catch(() => {
        // User cancelled share, no toast needed
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('✓ Link copied to clipboard', 'success');
      }).catch(() => {
        showToast('✗ Failed to copy link', 'error');
      });
    }
  };

  const loadFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const configParam = urlParams.get('config');

    if (configParam) {
      try {
        const config = JSON.parse(atob(configParam));
        setSelectedFormula(config.f || 'euler');
        setSpeed(config.s || 0.015);
        setScale(config.sc || 0.38);
        setParam1(config.p1 || 1);
        setParam2(config.p2 || Math.PI);
        setTrailLength(config.t || 400);
        setColorMode(config.c || 'rainbow');
      } catch (error) {
        console.error('Error loading configuration from URL:', error);
      }
    }
  };

  const exportSVG = () => {
    try {
      const width = canvasSize.width;
      const height = canvasSize.height;
      const actualScale = scale * Math.min(width, height);

      const points = [];
      let t = 0;

      // Create a temporary chaos state for SVG export
      const svgChaosState = {
        lorenz: { x: 1, y: 1, z: 1 },
        henon: { x: 0, y: 0 },
        mandelbrot: { real: 0, imag: 0, iteration: 0 },
        julia: { real: 0, imag: 0 },
        clifford: { x: 0, y: 0 }
      };

      // Generate the same number of points as current trail length
      for (let i = 0; i < trailLength; i++) {
        const { x, y } = calculatePoint(t, selectedFormula, width, height, actualScale, param1, param2, svgChaosState);
        points.push({ x, y, t });
        t += speed;
      }

    // Create SVG path
    let pathData = '';
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];

      if (i === 1) {
        pathData += `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} `;
      }
      pathData += `L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
    }

    // Generate color gradient based on color mode
    let gradientDefs = '';
    let strokeColor = '#00ffff';

    if (colorMode === 'rainbow') {
      gradientDefs = `
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff0000;stop-opacity:1" />
            <stop offset="16.66%" style="stop-color:#ff8800;stop-opacity:1" />
            <stop offset="33.33%" style="stop-color:#ffff00;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#00ff00;stop-opacity:1" />
            <stop offset="66.66%" style="stop-color:#0088ff;stop-opacity:1" />
            <stop offset="83.33%" style="stop-color:#4400ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ff0044;stop-opacity:1" />
          </linearGradient>
        </defs>`;
      strokeColor = 'url(#rainbow)';
    } else if (colorMode === 'cyan-pink') {
      gradientDefs = `
        <defs>
          <linearGradient id="cyanpink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ff00ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#00ffff;stop-opacity:1" />
          </linearGradient>
        </defs>`;
      strokeColor = 'url(#cyanpink)';
    } else if (colorMode === 'fire') {
      gradientDefs = `
        <defs>
          <linearGradient id="fire" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff4400;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ffaa00;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ff6600;stop-opacity:1" />
          </linearGradient>
        </defs>`;
      strokeColor = 'url(#fire)';
    }

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${gradientDefs}
  <rect width="100%" height="100%" fill="rgb(10, 10, 20)"/>
  <path d="${pathData}" stroke="${strokeColor}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${points[points.length - 1]?.x || width/2}" cy="${points[points.length - 1]?.y || height/2}" r="3" fill="${strokeColor}"/>
</svg>`;

      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `math-art-${selectedFormula}-${Date.now()}.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('✓ Exported as SVG', 'success');
    } catch (error) {
      showToast('✗ SVG export failed', 'error');
      console.error('SVG export error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-primary)] overflow-hidden">
      {/* Fullscreen backdrop with exit button */}
      {isFullscreen && (
        <>
          <div
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsFullscreen(false)}
          />
          <button
            onClick={() => setIsFullscreen(false)}
            className="fixed top-4 right-4 z-50 glass hover:bg-[var(--accent-primary)] hover:bg-opacity-20 text-[var(--text-primary)] p-2 rounded-lg btn-hover group transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:stroke-[var(--accent-primary)]">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </>
      )}

      <div className="h-full flex flex-col" style={{ position: 'relative', zIndex: isFullscreen ? 50 : 1 }}>
          {/* Header */}
          <div className="flex-shrink-0 px-6 py-3 glass border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold text-gradient">Mathematical Art Gallery</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowHelp(true)}
                  className="text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer flex items-center gap-1"
                >
                  ⌨️ Shortcuts (?)
                </button>
                <div className="text-xs font-mono text-[var(--text-tertiary)]">v0.4.0</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-mono text-[var(--accent-primary)] tracking-wide">{formula.formula}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{formula.description}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-48 bg-[var(--bg-tertiary)] border-r border-[var(--border-subtle)] p-3 overflow-y-auto space-y-3">
              <div>
                <label className="text-[var(--text-primary)] block mb-2 font-medium text-xs tracking-wide">Formula</label>
                <select value={selectedFormula} onChange={(e) => setSelectedFormula(e.target.value)} className="w-full p-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] focus:border-[var(--accent-primary)] focus:outline-none transition-all duration-200 text-xs">
                  {Object.entries(FORMULAS).map(([key, value]) => (
                    <option key={key} value={key}>{value.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[var(--text-primary)] font-medium text-xs tracking-wide">Speed</label>
                  <span className="text-[var(--accent-primary)] text-xs font-mono">{speed.toFixed(3)}</span>
                </div>
                <input type="range" min="0.005" max="0.04" step="0.001" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[var(--text-primary)] font-medium text-xs tracking-wide">Scale</label>
                  <span className="text-[var(--accent-primary)] text-xs font-mono">{(scale * 100).toFixed(0)}%</span>
                </div>
                <input type="range" min="0.05" max="0.42" step="0.01" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="text-[var(--text-primary)] block mb-2 font-medium text-xs tracking-wide">Effects</label>
                <button
                  onClick={() => setParticleMode(!particleMode)}
                  className={`w-full py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 mb-2 ${
                    particleMode
                      ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white ring-2 ring-[var(--accent-primary)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'
                  }`}
                >
                  ✨ Particles {particleMode ? 'ON' : 'OFF'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex-1 py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]"
                  >
                    {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                  </button>
                  <button
                    onClick={() => {
                      const canvas = canvasRef.current;
                      if (canvas) {
                        const ctx = canvas.getContext('2d');
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                      }
                    }}
                    className="flex-1 py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]"
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[var(--text-primary)] font-medium text-xs tracking-wide">{getParam1Label()}</label>
                  <span className="text-[var(--accent-primary)] text-xs font-mono">{param1.toFixed(1)}</span>
                </div>
                <input type="range" min="0.5" max="10" step="0.5" value={param1} onChange={(e) => setParam1(parseFloat(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="text-[var(--text-primary)] block mb-2 font-medium text-xs tracking-wide">🎨 Presets</label>
                <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
                  {PRESETS.slice(0, 5).map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => loadPreset(preset)}
                      className="py-2 px-2 rounded-lg font-medium text-xs bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:bg-opacity-20 text-[var(--text-primary)] transition-all duration-200 text-left border border-[var(--border-subtle)] btn-hover"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Canvas Center */}
            <div
              className={`flex-1 flex items-center justify-center relative ${isFullscreen ? '' : 'bg-[var(--bg-secondary)]'}`}
              style={{
                position: isFullscreen ? 'fixed' : 'relative',
                inset: isFullscreen ? 0 : 'auto',
                zIndex: isFullscreen ? 50 : 1,
                background: isFullscreen ? 'black' : undefined
              }}
            >
              <canvas
                ref={canvasRef}
                className={`touch-none ${isFullscreen ? '' : 'border border-[var(--border-emphasis)] rounded-xl shadow-2xl'}`}
                style={{
                  display: 'block',
                  width: isFullscreen ? '90vw' : `${canvasSize.width}px`,
                  height: isFullscreen ? '90vh' : `${canvasSize.height}px`,
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
              {!isFullscreen && (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-4 right-4 glass hover:bg-[var(--accent-primary)] hover:bg-opacity-20 text-[var(--text-primary)] p-2 rounded-lg btn-hover group transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:stroke-[var(--accent-primary)]">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a 2 2 0 0 0-2-2h-3m0 18h3a 2 2 0 0 0 2-2v-3M3 16v3a 2 2 0 0 0 2 2h3"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-48 bg-[var(--bg-tertiary)] border-l border-[var(--border-subtle)] p-3 overflow-y-auto space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[var(--text-primary)] font-medium text-xs tracking-wide">Trail</label>
                  <span className="text-[var(--accent-primary)] text-xs font-mono">{trailLength}</span>
                </div>
                <input type="range" min="100" max="1000" step="50" value={trailLength} onChange={(e) => setTrailLength(parseInt(e.target.value))} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[var(--text-primary)] font-medium text-xs tracking-wide">{getParam2Label()}</label>
                  <span className="text-[var(--accent-primary)] text-xs font-mono">{param2.toFixed(1)}</span>
                </div>
                <input type="range" min="0.5" max="10" step="0.5" value={param2} onChange={(e) => setParam2(parseFloat(e.target.value))} className="w-full" />
              </div>

              <div>
                <label className="text-[var(--text-primary)] block mb-2 font-medium text-xs tracking-wide">Color Mode</label>
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => setColorMode('rainbow')} className={`py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 ${colorMode === 'rainbow' ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 ring-2 ring-[var(--accent-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'}`}>Rainbow</button>
                  <button onClick={() => setColorMode('cyan-pink')} className={`py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 ${colorMode === 'cyan-pink' ? 'bg-gradient-to-r from-cyan-500 to-pink-500 ring-2 ring-[var(--accent-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'}`}>Neon</button>
                  <button onClick={() => setColorMode('fire')} className={`py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 ${colorMode === 'fire' ? 'bg-gradient-to-r from-yellow-500 to-red-600 ring-2 ring-[var(--accent-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'}`}>Fire</button>
                  <button onClick={() => setColorMode('blue')} className={`py-2 px-3 rounded-lg font-medium text-xs btn-hover transition-all duration-200 ${colorMode === 'blue' ? 'bg-blue-500 ring-2 ring-[var(--accent-primary)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'}`}>Blue</button>
                </div>
              </div>

              <div>
                <label className="text-[var(--text-primary)] block mb-2 font-medium text-xs tracking-wide">More Presets</label>
                <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
                  {PRESETS.slice(5).map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => loadPreset(preset)}
                      className="py-2 px-2 rounded-lg font-medium text-xs bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:bg-opacity-20 text-[var(--text-primary)] transition-all duration-200 text-left border border-[var(--border-subtle)] btn-hover"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[var(--text-primary)] block mb-2 font-medium text-xs tracking-wide">📊 Performance</label>
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between items-center py-1 px-2 bg-[var(--bg-secondary)] rounded border border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)]">FPS:</span>
                    <span className={`font-bold ${fps >= 50 ? 'text-[var(--accent-success)]' : fps >= 30 ? 'text-[var(--accent-warning)]' : 'text-[var(--accent-danger)]'}`}>
                      {fps}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 px-2 bg-[var(--bg-secondary)] rounded border border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)]">Render:</span>
                    <span className={`font-bold ${renderTime <= 10 ? 'text-[var(--accent-success)]' : renderTime <= 20 ? 'text-[var(--accent-warning)]' : 'text-[var(--accent-danger)]'}`}>
                      {renderTime.toFixed(1)}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 px-2 bg-[var(--bg-secondary)] rounded border border-[var(--border-subtle)]">
                    <span className="text-[var(--text-secondary)]">Points:</span>
                    <span className="text-[var(--accent-primary)] font-bold">
                      {pointCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="flex-shrink-0 bg-[var(--bg-tertiary)] border-t border-[var(--border-subtle)] p-3">
            <div className="flex justify-center space-x-2">
              <button onClick={() => exportCanvas('png')} className="py-2 px-3 rounded-lg font-medium text-xs bg-[var(--accent-success)] hover:bg-opacity-80 text-white transition-all duration-200 btn-hover flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                PNG
              </button>
              <button onClick={() => exportCanvas('jpeg')} className="py-2 px-3 rounded-lg font-medium text-xs bg-blue-600 hover:bg-opacity-80 text-white transition-all duration-200 btn-hover flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                JPG
              </button>
              <button onClick={exportSVG} className="py-2 px-3 rounded-lg font-medium text-xs bg-[var(--accent-secondary)] hover:bg-opacity-80 text-white transition-all duration-200 btn-hover flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                SVG
              </button>
              <button onClick={shareConfiguration} className="py-2 px-4 rounded-lg font-medium text-xs bg-[var(--accent-primary)] hover:bg-opacity-80 text-white transition-all duration-200 btn-hover flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 glass rounded-lg px-4 py-3 shadow-lg animate-slide-in ${
          toast.type === 'success' ? 'border-l-4 border-[var(--accent-success)]' : 'border-l-4 border-[var(--accent-danger)]'
        }`}>
          <p className={`font-medium text-sm ${
            toast.type === 'success' ? 'text-[var(--accent-success)]' : 'text-[var(--accent-danger)]'
          }`}>
            {toast.message}
          </p>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowHelp(false)}>
          <div className="glass rounded-2xl p-6 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gradient">⌨️ Keyboard Shortcuts</h2>
              <button onClick={() => setShowHelp(false)} className="text-[var(--text-tertiary)] hover:text-[var(--accent-primary)] transition-colors">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Play / Pause</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">Space</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Toggle Particles</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">P</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Clear Canvas</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">C</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Fullscreen</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">F</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Load Preset</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">1-9</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Random Preset</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">R</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Show Help</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">?</kbd>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-[var(--bg-secondary)] rounded">
                <span className="text-[var(--text-secondary)]">Close / Exit</span>
                <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded font-mono text-xs text-[var(--accent-primary)]">Esc</kbd>
              </div>
            </div>
            <div className="mt-4 text-xs text-center text-[var(--text-tertiary)]">
              Press <kbd className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] rounded font-mono">Esc</kbd> or click outside to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathArtGallery;
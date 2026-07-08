# Fluid Cursor

A React + Vite app with a clean **white background** and an interactive **WebGL fluid
simulation** that follows your cursor — a real-time GPU fluid solver (advection,
vorticity, pressure/Jacobi iterations) rendered on a transparent canvas so the
colorful fluid trails paint over the white page.

Move the mouse to stir the fluid; click to burst a splat. Works on touch too.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## How it works

- `src/FluidCursor.jsx` — the whole simulation: WebGL2 (with WebGL1 fallback),
  half-float render targets, and shader passes for curl, vorticity confinement,
  divergence, pressure solve, gradient subtraction, and advection.
- The display shader outputs an alpha equal to the dye intensity, so empty areas
  stay transparent and the `#ffffff` background shows through.

Fluid solver adapted from Pavel Dobryakov's
[WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) (MIT).

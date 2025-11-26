## Solar System Explorer

An interactive, minimalist **Solar System Explorer** built with **Next.js 13 App Router**, **Three.js**, and **shadcn/ui**.  
The app lets you select a planet and see a textured 3D sphere, plus key facts like diameter, distance from the Sun, and relative size – all on top of a violet dark theme with a space background.

### Tech stack

-   **Framework**: Next.js (App Router, React Server Components + client components)
-   **Language**: JavaScript (ESNext, JSX)
-   **UI Kit**: [shadcn/ui](https://ui.shadcn.com) (Buttons, Cards, design tokens)
-   **Styling**: Tailwind CSS
-   **3D**: Three.js (WebGLRenderer, Scene, PerspectiveCamera, Mesh, TextureLoader)

### Features

-   **Planet selector**:

    -   Individual buttons for all 8 major planets: Mercury → Neptune
    -   Outline buttons with uppercase labels; selected planet is highlighted.

-   **3D planet viewer**:

    -   A single large 3D sphere rendered with Three.js.
    -   High‑resolution textures from `public/planets/*.jpg`.
    -   Continuous rotation animation.
    -   Saturn has an additional ring mesh with its own texture.

-   **Planet information**:

    -   Name of the currently selected planet (large headline).
    -   Diameter in km.
    -   Distance from the Sun in million km.
    -   Relative size factor.

-   **Theming & visuals**:
    -   Custom **violet dark theme** via shadcn design tokens.
    -   Dark mode forced globally (`<html className="dark">`).
    -   Full‑screen **space background image** from `public/planets/Texturelabs_Sky_145S.jpg`.
    -   Transparent cards and buttons so the background is always visible.

### Project structure (high level)

-   `src/app/page.js`  
    Main page. Handles:

    -   planet metadata for the info card,
    -   planet selection state,
    -   layout and UI composition with shadcn `Card` and `Button`,
    -   passing the selected planet index to the 3D viewer.

-   `src/components/PlanetViewer.jsx`  
    Client‑side Three.js component. Responsible for:

    -   creating and managing the WebGL renderer, scene, and camera,
    -   loading planet textures,
    -   building the sphere mesh and optional Saturn rings,
    -   resizing the canvas to fit its container.

-   `src/components/ui/button.jsx`  
    shadcn button variant definitions (using `class-variance-authority`), customized so the `outline` variant has a transparent background and only a border.

-   `src/app/globals.css`
    -   Tailwind base layers.
    -   Light and dark design tokens (`--background`, `--primary`, etc.).
    -   Violet dark theme overrides under `.dark { ... }`.
    -   Global `body` background image.

### Running the project

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

> Note: If you run this project in a restricted environment (e.g. some online sandboxes), Next.js dev server or Google Fonts may be blocked. On a local machine with Node.js installed, it should work normally.

### How to change planet data

Planet info for the **text card** is defined in `src/app/page.js` (`const planets = [...]`).  
Planet data for **3D rendering** (textures, colors, sizes) is defined in `src/components/PlanetViewer.jsx`.

To tweak or add a planet:

-   update the corresponding entry in both arrays (name, diameter, texture path, etc.),
-   add the texture file into `public/planets/`.

### Customization ideas

-   Add a **theme toggle** (light / dark) instead of always forcing dark.
-   Add **tooltips** or a small description line per planet under the name.
-   Add **camera controls** (orbit controls) so the user can rotate and zoom the planet.
-   Show **orbits or relative distances** using an additional 3D view or a mini‑map.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

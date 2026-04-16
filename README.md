# 🌱 The Data Made Me Do It

A scrollytelling web experience exploring the data behind the decision to go vegan. Built with React, TypeScript, Vite, and Tailwind CSS, with embedded Tableau visualizations.

---

## Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 18 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes bundled with Node.js)

To verify your installations, run:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in your browser

Once the server is running, open your browser and navigate to:

```
http://localhost:3000
```

The site will automatically reload whenever you save changes to the source files.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server on port 3000 |
| `npm run build` | Builds the project for production (output goes to `dist/`) |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking |
| `npm run clean` | Deletes the `dist/` build folder |

---

## Project Structure (main parts)

```
├── App.tsx           # Main application component and page layout
├── TableauViz.tsx    # Tableau embed component
├── storyData.ts      # Content and data for each story section
├── main.tsx          # React app entry point
├── index.css         # Global styles
├── index.html        # HTML shell
├── vite_config.ts    # Vite configuration
└── tsconfig.json     # TypeScript configuration
```

---

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Fast development server and bundler
- **Tailwind CSS 4** — Utility-first styling
- **Motion (Framer Motion)** — Scroll animations
- **Tableau Public** — Embedded data visualizations
- **Lucide React** — Icons

---

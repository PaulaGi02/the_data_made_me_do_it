# The Data Made Me Do It

A scrollytelling web experience exploring the environmental and health data behind the decision to go vegan. 
The project walks through 13 data-driven sections: from global meat production trends to antibiotic resistance, 
each paired with an embedded Tableau visualization.🪴

Built as a final project for the *Understanding Data* module.

-> The visuals are lifeupdated from Tableau Public and need some time to load (world maps even need a bit longer)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI and component logic |
| Vite | Development server and bundler |
| Tailwind CSS 4 | Styling |
| Motion (Framer Motion) | Scroll animations |
| Tableau Public | Embedded data visualizations |
| Lucide React | Icons |

---

## Running Locally

**Prerequisites:** Node.js 18+ and npm.

```bash
# Clone the repository
git clone <your-repository-url>
cd <project-folder>

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Delete the `dist/` build folder |

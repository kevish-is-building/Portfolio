# Kevish Sewliya Portfolio - Next.js

A modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🌙 Modern hero section with GitHub contributions graph
- 💼 Experience, Skills, Projects, and Education sections
- 🔗 Social media links with interactive hover effects

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd nextjs-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy your assets from the parent `Assests` folder to `public/`:
   ```bash
   cp -r ../Assests/* public/
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-portfolio/
├── public/               # Static assets (images, favicon, resume)
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   └── components/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── GitHubContributions.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Work.tsx
│       ├── Education.tsx
│       └── Footer.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy

This project can be easily deployed on [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or any other hosting platform that supports Next.js.

## License

MIT

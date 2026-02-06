# TechLearn – Question of the Day (QOTD)

An interactive daily coding challenge platform designed to build consistent problem-solving habits among tech students.

Developed as part of a technical internship assignment, this project demonstrates production-ready frontend practices with a focus on clean architecture, responsive design, and user engagement.



✨ Features

Core Functionality

- 📅 **Daily Questions** – New technical challenges delivered every day
- 🎨 **Minimal UI** – Distraction-free interface focused on learning
- 📱 **Fully Responsive** – Seamless experience across all devices
- ⚡ **Lightning Fast** – Optimized builds with Vite
- ♿ **Accessible** – WCAG-compliant for inclusive learning

Technical Excellence

- 🧩 **Component Architecture** – Modular, reusable React components
- 🔧 **Type Safety** – PropTypes validation for reliability
- 📏 **Code Quality** – ESLint configuration for consistent standards
- 🎯 **Performance** – Lazy loading and code splitting
- 🔄 **State Management** – Efficient React hooks implementation

🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| React      | UI Library | 18.x |
| Vite       | Build Tool | 5.x |
| JavaScript | Language | ES6+ |
| CSS3       | Styling | Modern CSS |
| ESLint     | Code Quality | Latest |

📁 Project Structure

```
techlearn-qotd/
├── public/                    # Static assets
│   └── vite.svg
├── src/
│   ├── components/           # React components
│   │   ├── QuestionCard.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── lib/                  # Utility functions
│   │   └── helpers.js
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Application entry
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # Linting rules
└── README.md                 # Documentation
```

## Architecture Principles

- ✅ **Separation of Concerns** – Clear component boundaries
- ✅ **DRY Code** – Reusable utilities and components
- ✅ **Scalability** – Easy to extend and maintain
- ✅ **Readability** – Self-documenting code patterns

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16.0+ 
- npm v7.0+ (or yarn)

### Installation

Clone the repository

```bash
git clone https://github.com/yourusername/techlearn-qotd.git
cd techlearn-qotd
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Access at: http://localhost:5173

Build for production

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

### Available Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Create optimized production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint code quality checks
- `npm run lint:fix` — Auto-fix linting issues

## 🌐 Deployment

Recommended Platforms

- **Vercel (Recommended)**

```bash
npm i -g vercel
vercel
```

- **Netlify**

```bash
npm run build
# Drag & drop the 'dist' folder to Netlify
```

- **GitHub Pages**

```bash
npm run build
# Configure base path in vite.config.js
# Deploy the 'dist' folder
```

Other Options: AWS Amplify, Render, Railway, Cloudflare Pages



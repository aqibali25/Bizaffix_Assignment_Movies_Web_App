# Bizaffix_Assignment_Movies_Web_App

A modern, production-ready movie browsing web application with a premium streaming-style interface.

## 🚀 Features

- **Authentication**: Complete authentication flow with Clerk (Sign Up, Sign In, Forgot Password, Reset Password)
- **Movie Search**: Debounced search with OMDb API integration
- **Movie Details**: Comprehensive movie information with cinematic presentation
- **Favorites**: Add/remove movies to personal watchlist with localStorage persistence
- **Sorting**: Sort movies by year (ASC/DESC)
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Mobile-first approach with beautiful UI on all devices

## 🎨 Design Highlights

- Modern gradient color scheme (Deep Indigo + Purple)
- Smooth animations with Framer Motion
- Glass morphism effects
- Skeleton loading states
- Hover effects and micro-interactions
- Customized Clerk authentication pages
- Professional typography and spacing

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- Zustand (State Management)
- Clerk (Authentication)
- Framer Motion (Animations)
- Lucide React (Icons)
- OMDb API

## 📁 Folder Structure

```
├──  public
│   └── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 api
│   │   └── 📄 omdb.js
│   ├── 📁 assets
│   │   └── 🖼️ react.svg
│   ├── 📁 components
│   │   ├── 📁 UI
│   │   │   ├── 📄 Button.jsx
│   │   │   └── 📄 LoadingSpinner.jsx
│   │   ├── 📁 layout
│   │   │   ├── 📄 Footer.jsx
│   │   │   └── 📄 Navbar.jsx
│   │   └── 📁 movies
│   │       ├── 📄 GenreBadge.jsx
│   │       ├── 📄 MovieCard.jsx
│   │       ├── 📄 MovieCardSkeleton.jsx
│   │       └── 📄 RatingBadge.jsx
│   ├── 📁 context
│   │   └── 📄 ThemeContext.jsx
│   ├── 📁 hooks
│   │   └── 📄 useDebounce.js
│   ├── 📁 pages
│   │   ├── 📄 Favorites.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 MovieDetails.jsx
│   │   ├── 📄 NotFound.jsx
│   │   └── 📄 Search.jsx
│   ├── 📁 store
│   │   └── 📄 favoriteStore.js
│   ├── 📁 styles
│   │   └── 🎨 animations.css
│   ├── 📁 utils
│   │   └── 📄 helpers.js
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 bun.lock
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package.json
├── 📄 postcss.config.js
├── 📄 tailwind.config.js
└── 📄 vite.config.js
```

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

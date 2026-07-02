@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --pupa-cream: #f5f2ea;
  --pupa-beige: #f1efe7;
  --pupa-brown: #0f2c22;
  --pupa-dark: #080b09;
  --pupa-gold: #46a87f;
  --pupa-warm: #aebcad;
  --pupa-accent: #2c7a59;
  --pupa-champagne: #d8c7a2;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  scrollbar-gutter: stable;
}

body {
  background-color: var(--pupa-beige);
  color: var(--pupa-brown);
  font-family: var(--font-inter), "Inter", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  width: 100%;
}

/* Mos shfaq outline/border të browser-it pas klikimit ose reload-it */
a:focus:not(:focus-visible),
button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: none;
}

/* Theksimi i tekstit në temën e brand-it */
::selection {
  background: var(--pupa-gold);
  color: var(--pupa-dark);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--pupa-beige);
}
::-webkit-scrollbar-thumb {
  background: var(--pupa-gold);
  border-radius: 3px;
}

/* Loading skeleton animation */
.skeleton {
  background: linear-gradient(
    90deg,
    #dfe3da 25%,
    #f1efe7 50%,
    #dfe3da 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Parallax helper */
.parallax-img {
  will-change: transform;
  transform: translateZ(0);
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  /* Tekst me gradient luksoz — smerald → champagne (për tituj premium) */
  .text-gold-gradient {
    background: linear-gradient(
      120deg,
      #2c7a59 0%,
      #46a87f 26%,
      #e6dcc0 50%,
      #46a87f 74%,
      #2c7a59 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  /* Teksturë "grain" delikate për thellësi sipër fotos */
  .bg-grain {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }

  /* Glow smerald radial */
  .glow-gold {
    background: radial-gradient(
      circle at center,
      rgba(70, 168, 127, 0.5) 0%,
      rgba(70, 168, 127, 0.16) 35%,
      transparent 70%
    );
  }
}

/* Respekto preferencat e përdoruesit për lëvizje të reduktuar */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

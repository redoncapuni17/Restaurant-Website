# PUPA Restaurant & Bar — Website

Static Next.js 14 site for Pupa Restaurant. All menus, copy, hours, and images are configured in code — no database or admin panel.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Docker

**Development:**

```bash
docker compose up --build
```

**Production:**

```bash
docker build -t pupa-restaurant .
docker run -p 3000:3000 pupa-restaurant
```

## Where to edit content

| What | File |
|------|------|
| Images | `public/images/` (see `lib/siteConfig.ts` for paths) |
| Homepage hero, gallery, hours, events | `lib/siteConfig.ts` |
| Gift cards copy | `lib/giftCards.ts` |
| Main / lunch / wine / drink / dessert menus | `lib/mainMenu.ts`, `lib/lunchMenu.ts`, etc. |
| Contact & social links | `components/Footer.tsx`, `components/Navbar.tsx` |

## Image folders

```
public/images/
  heroes/       # Page hero backgrounds
  about/        # Homepage "Our Story" photos
  gallery/      # Homepage gallery grid
  gift-cards/   # Gift card page images
  events/       # Per-event images (optional)
```

Replace any image file to update the site — keep the same filename or update the path in `lib/siteConfig.ts`.

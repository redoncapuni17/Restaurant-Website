# 🍽 PUPA Restaurant & Bar — Website

Website profesional për Pupa Restaurant, ndërtuar me Next.js 14, Tailwind CSS, Framer Motion dhe Supabase.

---

## 🚀 Setup i Plotë

### Hapi 1 — Klono projektin dhe instalo dependencies

```bash
git clone <repo-url>
cd pupa-restaurant
npm install
```

### Hapi 2 — Krijo projekt në Supabase

1. Shko te [supabase.com](https://supabase.com) dhe krijo account falas
2. Krijo projekt të ri
3. Shko te **SQL Editor** dhe ekzekuto të gjithë kodin nga `supabase-schema.sql`
4. Shko te **Storage** dhe krijo bucket me emrin `gallery` (vendose si Public)
5. Shko te **Authentication > Users** dhe shto email-in tënd si admin user

### Hapi 3 — Konfiguro Environment Variables

Kopjo `.env.example` në `.env.local`:

```bash
cp .env.example .env.local
```

Plotëso me kredencialet nga Supabase (Settings → API):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx...
```

### Hapi 4 — Starto projektin lokalisht

```bash
npm run dev
```

Hap [http://localhost:3000](http://localhost:3000)

---

## 📦 Deploy në Vercel (Falas)

### Hapi 1 — GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/pupa-restaurant.git
git push -u origin main
```

### Hapi 2 — Vercel

1. Shko te [vercel.com](https://vercel.com) dhe lidhu me GitHub
2. Importo repo-n `pupa-restaurant`
3. Te **Environment Variables** shto të gjitha variablat nga `.env.local`
4. Kliko **Deploy**

### Hapi 3 — Lidh Domain-in nga Squarespace

1. Tek Vercel → Settings → Domains → shto `puparestaurant.com`
2. Vercel të jep rekorde DNS si:
   ```
   A     @     76.76.21.21
   CNAME www   cname.vercel-dns.com
   ```
3. Tek Squarespace → Domains → DNS Settings → shto këto rekorde
4. Prit 1-24 orë për propagim

---

## 🔐 Admin Panel

Akses në: `yourdomain.com/admin/login`

Nga Admin Panel mund të menaxhosh:
- **Gallery** — ngarko/fshij foto
- **Menu** — shto/ndrysho/fshij pjata
- **Events** — menaxho eventet
- **Opening Hours** — ndrysho oraret

---

## 🛠 Tech Stack

| Teknologji | Përdorim |
|-----------|---------|
| Next.js 14 | Framework |
| Tailwind CSS | Stilet |
| Framer Motion | Animacionet |
| Supabase | Database + Auth + Storage |
| Vercel | Hosting (falas) |

---

## 📁 Struktura

```
pupa-restaurant/
├── app/
│   ├── page.tsx              # Homepage
│   ├── events/page.tsx       # Faqja Events
│   ├── menus/page.tsx        # Faqja Menus
│   ├── private-hire/page.tsx # Private Hire
│   ├── gift-cards/page.tsx   # Gift Cards
│   └── admin/
│       ├── login/page.tsx    # Admin Login
│       ├── dashboard/page.tsx # Dashboard
│       ├── gallery/page.tsx  # Menaxhim Galerie
│       ├── menu/page.tsx     # Menaxhim Menu
│       ├── events/page.tsx   # Menaxhim Events
│       └── hours/page.tsx    # Menaxhim Orareve
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Gallery.tsx
│   ├── BookingWidget.tsx     # ResDiary me lazy loading
│   └── Footer.tsx
├── lib/
│   └── supabase.ts
├── types/
│   └── index.ts
└── supabase-schema.sql       # SQL për database setup
```

---

## 💡 Shënime të Rëndësishme

- **ResDiary Widget** ngarkohet vetëm kur vizitori scrollon tek seksioni i rezervimit (lazy loading) — eliminon vonesën e 1 minutës
- **Fotot** ruhen në Supabase Storage dhe menaxhohen nga Admin Panel
- **Kostoja mujore**: $0 (Vercel free tier + Supabase free tier)
- **Domain**: mbetet tek Squarespace, vetëm DNS ridrejtohet

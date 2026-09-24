# RESQ Trading & Solutions W.L.L. — Website

A static, dependency-free website (plain HTML/CSS/JS — no build step, no framework)
for RESQ Trading & Solutions, exclusive distributor of Amaron Quanta batteries in Qatar.

## Structure

```
.
├── index.html              Homepage
├── about.html               About page
├── contact.html             Contact page (with inquiry form)
├── assets/
│   ├── css/style.css        Shared design system (tokens, layout, mobile nav, motion)
│   ├── js/main.js           Shared behavior (mobile menu, scroll reveal, counters)
│   └── img/                 All photos & partner logos
├── vercel.json               Vercel config (clean URLs, asset caching)
└── package.json
```

## Run locally

No build step is required. Any static file server works:

```bash
npx serve .
# or
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy to Vercel (via Git)

1. Push this folder to a new GitHub/GitLab/Bitbucket repository.
2. In the [Vercel dashboard](https://vercel.com/new), import that repository.
3. Framework Preset: choose **"Other"** (no build command needed).
   - Build Command: *(leave empty)*
   - Output Directory: *(leave empty / root)*
4. Deploy. Vercel will serve `index.html`, `about.html`, and `contact.html` directly,
   with clean URLs enabled (`/about` works without the `.html` extension) via `vercel.json`.

Alternatively, from the CLI:

```bash
npm i -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

## Editing content

- **Text/copy**: edit directly in each page's HTML.
- **Colors/fonts/spacing**: all in `assets/css/style.css` under the `:root` variables at the top.
- **Images**: swap files in `assets/img/` (keep the same filenames, or update the `src`/`url()`
  references in the HTML/CSS if you rename them).
- **WhatsApp quote button**: the number and prefilled message live in the `href="https://wa.me/..."`
  links in the header of each page — update the number and `text=` parameter there.

## Known follow-ups (flagged during build)

- Several images (project photos, partner logos, hero backgrounds) were sourced from
  low-resolution screenshots of the previous site. Replace `assets/img/project-*.jpg`,
  `assets/img/logo-*.png`, and the hero photos with original high-resolution files when available.
- The old site listed two different phone number sets across pages; this build standardizes
  on the Contact-page numbers (+974 3000 8461 / +974 3129 1303). Confirm which are current.
- The "Products" and "Portfolio" nav links point to sections on the homepage
  (`index.html#services`, `index.html#clients`) since dedicated pages don't exist yet.
- The contact form submits via `mailto:` (no backend). For production, wire it to a real
  form handler (e.g. Formspree, a Vercel serverless function, or similar).

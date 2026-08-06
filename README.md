# Happy 2nd Monthsary

A premium one-page digital love letter built with React, Vite, Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to [Vercel](https://vercel.com) — no extra configuration required.

## Personalize

Edit **one file** to customize everything:

[`src/data/content.ts`](src/data/content.ts)

- Girlfriend's name
- Monthsary date (`2026-08-07`)
- Relationship start date (`2026-06-07`)
- Memories, reasons, letter, quotes
- Gallery image URLs
- Music path and title

### Music

1. Add your MP3 to `public/music/song.mp3`
2. Or change `music.src` in `src/data/content.ts`

Playback never autoplays — play/pause only.

### Gallery photos

Replace the Unsplash URLs in `content.gallery` with your own paths, for example:

```ts
src: '/images/our-first-date.jpg'
```

Put local files in `public/images/`.

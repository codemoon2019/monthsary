# Para sa'yo, Mahal

A one-page digital love letter for our 2nd monthsary.

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

Deploy to [Vercel](https://vercel.com) — `vercel.json` is already set up for the Vite SPA.

## Personalize

Edit **one file** to customize everything:

[`src/data/content.ts`](src/data/content.ts)

- Poem title and stanzas
- Monthsary date and relationship start date
- Intro dedication
- Story moments
- Love letter
- Photo paths and captions
- Music path and title
- Final message

### Music

The player uses `public/music/oksihina.mp3`. Change `music.src` or replace the file. Playback never autoplays.

### Photos

Images live in `public/images/` and are referenced from `content.gallery`.

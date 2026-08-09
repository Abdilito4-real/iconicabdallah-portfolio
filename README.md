# portfolio

Abubakar Abdallah Sa'i — Software Engineer portfolio. Now a PWA (installable, works offline).

## Files added for PWA support

- `manifest.json` — app name, theme color, and icon set (regular + maskable)
- `sw.js` — service worker: caches the app shell so the site opens even offline
- `assets/icons/` — icon-16/32/48/180/192/512 and maskable 192/512, generated from the logo mark

## Deploying

Push everything as-is (`index.html`, `manifest.json`, `sw.js`, `assets/`) to the same folder/repo root.
No build step needed — it's still plain HTML/CSS/JS.

**Important: PWAs require HTTPS.** The install prompt and service worker only activate on
`https://` (or `http://localhost` while testing) — not on `file://` and not on plain `http://`.
Vercel/GitHub Pages/Netlify all serve over HTTPS by default, so a normal deploy is enough.

## Testing it

1. Deploy (or run a local HTTPS-capable dev server) and open the live URL in Chrome or Edge.
2. Open DevTools -> Application tab -> check "Manifest" and "Service Workers" both load with no errors.
3. You should see an install icon in the address bar, and the "Install App" button in the navbar
   will appear once the browser fires its install prompt.
4. To test offline: DevTools -> Application -> Service Workers -> check "Offline", then reload.

## Still TODO (marked inline in index.html)

- Add your real CV at `assets/Abubakar-Abdallah-Sai-CV.pdf`
- Real email / LinkedIn link
- Real GitHub stats / contribution graph
- Real experience entries and testimonials

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ndA6bfwMwMq21FnQnLL7gJy-llOM3wxc

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Secure deployment notes (recommended)

- This project can be hosted as a static site (Hostinger), but do NOT expose the `GEMINI_API_KEY` to the client in production.
- Recommended flow: host the static front-end on Hostinger and deploy a server-side proxy (Next.js API) on Vercel. The front-end should call the Vercel API endpoint (set `PROXY_URL` at build time).

How to set `PROXY_URL` for production build:

1. In your Vite build environment (CI or local) set `PROXY_URL` to your Vercel app root, e.g. `https://your-app.vercel.app`.
2. The `vite.config.ts` already exposes `process.env.PROXY_URL` into the build.
3. On Vercel, set `GEMINI_API_KEY` (server environment variable) for the Next.js proxy.

Development tip: If the server proxy is not configured, the component will fall back to a demo response.

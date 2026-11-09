# Pratik Bagad — Portfolio

Personal portfolio for **Pratik Bagad**, Full Stack Developer (React · Next.js · Node.js).

A plain static site: HTML, CSS and vanilla JavaScript. It has no framework and no build step, so it runs anywhere and is free to host.

## Features

- Interactive particle hero: moving the mouse scatters the particles, and clicking sends out a shockwave.
- Animated name reveal, typing role rotator, count-up stats and a 3D tilt portrait card.
- Sections: About, Capabilities, Journey, Recognition (Excellence Award 2025), Work (optional) and Contact.
- Scroll reveals, a reading-progress bar, active nav highlighting and a cursor glow.
- Works on phones, tablets and desktops, and respects `prefers-reduced-motion`.
- Contact form opens the visitor's email app with the message pre-filled, so no backend is needed.

## Project structure

```
index.html        page markup
css/style.css     all styles
js/data.js        ALL CONTENT (text, skills, experience, links): edit this file
js/main.js        rendering + animations
assets/           photos and the trophy icon
```

## Edit the content

Open `js/data.js` and change the text. Useful fields:

- `resume`: put a PDF in `assets/` and set `resume: "assets/Pratik_Bagad_Resume.pdf"` to show a **Download résumé** button.
- `experience[].period`: the job's dates (it currently says "Present").
- `projects`: add entries to make a **Work** section appear automatically.

To swap a photo, replace the file in `assets/` and keep the same name.

## Run locally

You have three options:

**Option 1: Node.js (recommended)**

```bash
npm start
```

Then open http://localhost:3000. This runs `npx serve`, so you don't need to install anything first.

**Option 2: VS Code.** Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.

**Option 3: No tools.** Double-click `index.html` to open it in a browser. Everything works except that the Google Fonts need an internet connection.

## Deploy for free

### Netlify (easiest)

1. Go to https://app.netlify.com/drop.
2. Drag the whole project folder onto the page.
3. You get a live URL such as `https://something.netlify.app`. You can rename it under **Site configuration → Change site name**, for example `pratikbagad.netlify.app`.

To redeploy automatically on every push, use **Add new site → Import an existing project → GitHub** and pick `PSB21/Portfolio`. Leave the build command empty and set the publish directory to `/`.

### GitHub Pages

1. Push this code to `main` on https://github.com/PSB21/Portfolio.
2. In the repo, go to **Settings → Pages → Build and deployment** and choose **Deploy from a branch**, then `main` and `/ (root)`.
3. After about a minute the site is live at https://psb21.github.io/Portfolio/.

### Vercel

Import the GitHub repo at https://vercel.com/new. Choose the **Other** framework preset, leave the build command empty and click Deploy.

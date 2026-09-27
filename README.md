# Sushant Mohurle: Portfolio

A static, dependency-free portfolio site (HTML, CSS, vanilla JS). No build step.

## Structure

```
portfolio/
├── index.html        Page shell, SEO metadata, section markup
├── css/styles.css    Design tokens, layout, animations
├── js/config.js      ALL your content: edit this file
├── js/app.js         Renders sections from config + interactions
└── assets/photo.webp Profile photo (replace with your own)
```

## Editing content

Open `js/config.js`. Everything is in one `PORTFOLIO` object:

| Want to change      | Edit                                              |
| ------------------- | ------------------------------------------------- |
| Name, tagline, year | `site`                                            |
| Profile photo       | replace `assets/photo.webp` (or change `photo.src`) |
| Email, CV, location | `contact`                                         |
| GitHub / LinkedIn / Instagram | `social`                                |
| Skills              | `skills.groups`                                   |
| Projects            | `projects.items` (`demo`, `github`, `image`)      |
| Certificates        | `certifications.items` (`url`, set `sample:false`) |

Links left empty show a small "placeholder" toast instead of a dead link.
Set `contact.email` to enable the contact form (it opens the visitor's email app).

Project images: set `image: "assets/my-project.webp"` on a project to replace the placeholder artwork.

## Run locally

Double-click `index.html`, or serve the folder:

```
npx serve portfolio
```

## Deploy

Upload the folder to any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages.
After deploying, add an absolute `og:image` meta tag in `index.html` for link previews.

## Notes

- Fonts (Space Grotesk, Inter) load from Google Fonts and fall back to system fonts offline.
- The contact form uses `mailto:` (no server). For a hosted form, point it to a service such as Formspree.
- Animations respect `prefers-reduced-motion`.

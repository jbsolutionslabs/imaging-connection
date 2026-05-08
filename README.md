# Imaging Connection — Website

**Connecting Dealers. Accelerating Sales.**

B2B imaging equipment website for Andy Bongar / Imaging Connection, built as a fully static multi-page site for GitHub Pages deployment.

## Project Structure

```
/
├── index.html            # Home
├── about.html            # About Andy & the company
├── equipment.html        # Equipment inventory with filter
├── services.html         # Services offered
├── why-us.html           # Why Choose Us
├── contact.html          # Contact form + map
├── assets/
│   ├── css/
│   │   └── styles.css    # Global styles + CSS variables
│   ├── js/
│   │   └── main.js       # Animations, nav, filter, dot grid
│   └── images/
│       └── logo.png      # Place the Imaging Connection logo here
└── README.md
```

## Adding Images

Before deploying, add these files to `assets/images/`:

| File | Description |
|------|-------------|
| `logo.png` | Imaging Connection logo (the `imaging_connection_logo_final.png` file) |
| `og-image.jpg` | Open Graph image for social sharing (1200×630px recommended) |
| `andy-bongar.jpg` | Andy's headshot (optional, for about.html) |

The nav and footer reference `assets/images/logo.png`. If the image is missing, the fallback text logo displays automatically.

## GitHub Pages Deployment

### Option 1: Deploy from the main branch

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select `main` branch, `/ (root)` folder
5. Click **Save**
6. Your site will be live at `https://<username>.github.io/<repo-name>/`

### Option 2: Custom Domain

1. Add a `CNAME` file to the root with your domain:
   ```
   imagingconnection.com
   ```
2. In your DNS provider, add:
   - An **A record** pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME record** pointing `www` to `<username>.github.io`
3. In GitHub Pages settings, enter your custom domain and enable **Enforce HTTPS**

### Updating the Canonical URLs

Replace `https://imagingconnection.com` in each page's `<link rel="canonical">` tag with your actual domain once it's configured.

## Local Development

No build tools required. Open any `.html` file directly in a browser, or run a simple local server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8080`

## Customization

### Brand Colors
Edit CSS variables at the top of `assets/css/styles.css`:
```css
:root {
  --navy:  #0D1B3E;
  --blue:  #1A6BFF;
  --white: #FFFFFF;
}
```

### Adding Equipment Cards
Copy an `<article class="eq-card">` block in `equipment.html`. Set `data-category` to one of:
- `copier` — Copiers
- `printer` — Printers
- `mfp` — Multifunction
- `specialty` — Specialty

### Contact Form Backend
The contact form is styled only (no backend). To add form submission:
- [Formspree](https://formspree.io) — set `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`
- [Netlify Forms](https://netlify.com) — add `netlify` attribute to `<form>`
- [EmailJS](https://emailjs.com) — add their SDK and submit handler in `main.js`

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript
- Google Fonts: Barlow Condensed + DM Sans
- Animations: CSS transitions + Intersection Observer API
- Canvas API for animated dot grid hero background
- No frameworks, no npm, no build step

## License

© 2025 Imaging Connection. All Rights Reserved.

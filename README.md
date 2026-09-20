# Erika's 54th Birthday — RSVP

A one-page, mobile-first RSVP site for a private gathering on Friday, October 2.
Static HTML, CSS and a little vanilla JavaScript. Submissions go to **Netlify Forms**
— there is no database, no login, and no third-party service of any kind.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole invitation and the RSVP form |
| `styles.css` | All styling, including the CSS-drawn candlelight background |
| `rsvp.js` | Submits the form in the background so we can show our own confirmation |
| `thank-you.html` | Fallback confirmation, only used if JavaScript is unavailable |
| `netlify.toml` | Tells Netlify to publish the folder as-is; adds caching and security headers |
| `assets/fonts/` | Cormorant Garamond + Pinyon Script (self-hosted, SIL OFL 1.1) |
| `.gitignore` | Keeps OS junk out of the repository |

First load is about **97 KB** across five requests.

## How the RSVP works

1. Netlify scans `index.html` at deploy time, finds the `data-netlify="true"` form
   named `rsvp`, and creates a form inbox for it.
2. When a guest submits, `rsvp.js` posts the data to Netlify in the background and
   swaps the form for the matching confirmation message, so nobody sees Netlify's
   default success page.
3. If JavaScript is off or fails, the browser posts the form normally and Netlify
   redirects to `thank-you.html`. The submission is recorded either way.

Each entry records **Name** and **RSVP** (`Yes` or `No`). A hidden `bot-field`
honeypot catches most spam.

### Privacy

The home address is nowhere in this repository. Submissions are never displayed on
the site — there is no guest-list page and no endpoint that reads them back. You are
the only one who sees them, in your Netlify dashboard.

## Deploying to your existing Netlify account

### Option A — connect this Git repository (recommended)

1. Push this branch to GitHub.
2. Go to **app.netlify.com** → **Add new site** → **Import an existing project**.
3. Choose **GitHub**, authorise it if asked, and pick this repository.
4. On the build settings screen:
   - **Branch to deploy:** the branch you pushed
   - **Build command:** leave empty
   - **Publish directory:** `.`
   (`netlify.toml` already sets these, so the defaults it shows should be correct.)
5. Click **Deploy site**. It finishes in under a minute.

### Option B — drag and drop

1. Download this folder to your computer.
2. Go to **app.netlify.com** → **Sites**, and drag the whole folder onto the
   drop area at the bottom of the page.

Drag-and-drop is quicker but you have to re-drag the folder every time you change
something. Option A redeploys automatically on every push.

### After the first deploy — turn on form detection

Netlify does not enable Forms automatically on newer sites.

1. Open the site → **Site configuration** → **Forms**.
2. If it says forms are not enabled, click **Enable form detection**.
3. **Redeploy once** (Deploys → Trigger deploy → Deploy site). Netlify only scans
   for forms during a build, so the form is detected on the deploy *after* you
   enable detection.
4. Open the live site on your phone and send yourself a test RSVP.
5. Check **Forms → rsvp** in the dashboard. Your test should be there.

If the test does not appear, it is almost always step 3 — enable detection, then
deploy again.

### Optional: get notified of each RSVP

**Site configuration → Forms → Form notifications → Add notification → Email
notification.** Send it to your own address so you do not have to keep checking.

### Optional: a nicer name

**Site configuration → Change site name** gives you something like
`erika-54.netlify.app`, which looks better in a WhatsApp message.

## Optional touches

- **Photo background.** Drop an image at `assets/hero.jpg` and uncomment the
  `background-image` block inside `.atmosphere` in `styles.css`. The vignette and
  text stay legible on top of it.
- **WhatsApp link preview.** Add a 1200×630 image at `assets/preview.jpg` and
  uncomment the two `og:image` lines near the top of `index.html`.

## Editing the details

Everything a guest reads is in `index.html`, except the two confirmation messages,
which are in the `MESSAGES` object at the top of `rsvp.js`.

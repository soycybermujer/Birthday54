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
| `assets/hero-760.jpg`, `assets/hero-1400.jpg` | The invitation photograph with its lettering removed, used as the page background |
| `assets/preview.jpg` | The WhatsApp link thumbnail (the invitation itself, lettering and all) |
| `assets/fonts/` | Cormorant Garamond, Kaushan Script, Sacramento (self-hosted, SIL OFL 1.1) |
| `.gitignore` | Keeps OS junk out of the repository |

First load is about **161 KB** on a phone. Nothing is fetched from another domain.

## How it matches the invitation

Colours were sampled from the invitation file: its black is `#0A0605`, its gold
`#E6B46A`, its lettering `#FBF1DC`. The three scripts were matched by rendering
candidates side by side against it, which landed on Kaushan Script for "54th"
and Sacramento for "Let's Gather". The calendar, clock, flutes and heart are
drawn as inline SVG to match the invitation's gold line icons.

The background is the invitation's own photograph. Because the original has the
lettering baked into it, the type was masked out and the gaps filled in from the
surrounding image, leaving the candles, the bokeh and the toast intact. No faces
are recognisable, exactly as in the original.

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

- **A different photo.** Replace `assets/hero-760.jpg` and `assets/hero-1400.jpg`
  and nothing else changes. If the new photo is brighter, deepen the scrim in the
  `.vignette` rule in `styles.css`.
- **Emoji instead of the line icons.** The RSVP choices use the invitation's gold
  champagne and heart icons. To go back to 🥂 and 🤍, replace each
  `<svg class="choice__icon">…</svg>` in `index.html` with
  `<span class="choice__icon">🥂</span>`.

## Editing the details

Everything a guest reads is in `index.html`, except the two confirmation messages,
which are in the `MESSAGES` object at the top of `rsvp.js`.

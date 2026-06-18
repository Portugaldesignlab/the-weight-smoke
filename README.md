# The Weight of Smoke — Film Site

A single-file, cinematic landing page for the (fictional) neo-noir feature
**_The Weight of Smoke_**. No build step, no dependencies to install — just
`index.html`. GSAP, fonts and placeholder images load from CDNs.

## Put it on GitHub Pages

1. Create a new GitHub repo and add these files at the **root**:
   ```
   index.html
   azetc.mp4
   azetec-01.mp4
   ```
2. Commit and push.
3. In the repo: **Settings → Pages → Build and deployment**.
   Set **Source: Deploy from a branch**, **Branch: `main` / `root`**, then **Save**.
4. Wait ~1 minute. Your site is live at
   `https://<your-username>.github.io/<repo-name>/`.

That's it — `index.html` is served automatically.

## About the two videos

The hero plays both clips as one crossfading background. The page looks for
them next to `index.html`:

```
./azetc.mp4
./azetec-01.mp4
```

Commit the two `.mp4` files into the repo root alongside `index.html`. If a
video is missing, the hero gracefully falls back to a graded poster still, so
the page never breaks.

> **GitHub file-size limit:** individual files must be under **100 MB**
> (and a warning fires over 50 MB). If your clips are larger, either compress
> them, use [Git LFS](https://git-lfs.com/), or host the videos elsewhere and
> point the two `<video src="...">` tags at those URLs.

To rename the videos, edit the two `<video src="...">` lines near the top of
`index.html`.

## Test locally first

Opening `index.html` straight off disk works, but a tiny local server avoids
browser quirks with local video and gives you the real Pages behavior:

```bash
# from the folder containing index.html + the two mp4s
python3 -m http.server 8000
# then open http://localhost:8000
```

## Editing content

All copy — title, cast, crew, critic quotes, screenings, image seeds — lives in
the `FILM` object inside the `<script>` block at the bottom of `index.html`.
The teaser-modal video is the `TEASER_SRC` constant just below it.

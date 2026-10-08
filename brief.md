# Surf India — Project Brief

Living record of the product requirements, decisions, working practices, and known issues. Update this file when a requirement changes or a new issue is resolved.

## Purpose

Build a one-page website that helps people discover surf spots and surf schools along the southern half of India.

## Requirements

- One responsive page that works on phones and desktop.
- Clear navigation, a strong headline, a map of surf spots and surf schools, and a starter directory of 10 surf schools.
- Focus on peninsular South India and its coasts.
- Use free-to-use surf photography from India.
- Keep it simple: no libraries, login, or payment flow.
- Requested deliverable filenames: `index.html`, `style.cc`, `script.js`, and `photo.jpg`.
- The current project also includes this brief as `brief.md`.

## Agreed content and direction

- English is the working language (assumed; not explicitly confirmed).
- Start with surf destinations around Karnataka, Kerala, and Tamil Nadu.
- List 10 highly rated schools, showing review scores and counts as snapshots with links to public listing sources.
- Current directory data is drawn from [Go Careless](https://www.gocareless.in/schools) and [Surf Adda](https://surfadda.com/schools/murthy-surf-school). Ratings can change and should be refreshed before any public launch.
- The selected hero photo is a free-to-use Unsplash photo by Milin John, taken in Tamil Nadu: [photo page and license](https://unsplash.com/photos/a-person-riding-a-surfboard-on-a-wave-in-the-ocean-jBg64hwHHQE).
- The map is a hand-drawn, illustrative SVG with interactive spot/school markers and filters. It is not a live navigable map; positions are approximate.

## Preferences and feedback

### Explicit preferences

- The result should be a one-page website.
- It should work on phones.
- No login and no payment.
- Use the specified filenames and avoid libraries.
- The map should focus on the bottom half of India and include surf spots and schools.
- Start with 10 top-rated schools.
- Keep the navigation header visible at the top while scrolling.

### Feedback to preserve

- The page initially appeared as text/links without its intended design.
- The hero image did not load.
- The hand-drawn map looked wrong.
- Keep these as visual acceptance checks for future changes. Do not assume a page is finished because its text and links exist.

## Current implementation state

- `index.html`: page content, inline CSS fallback, map SVG, and hero image markup.
- `style.cc`: stylesheet copy. The unusual extension is intentional per the requested filenames.
- `script.js`: map markers/filters, school cards, mobile navigation, and image fallback behavior.
- `photo.jpg`: **not currently present**. The page tries this local filename first, then falls back to the Unsplash image online. The fallback requires an internet connection.
- `brief.md`: this project record.
- The map outline and marker positions were revised after the visual feedback, but the revised result has not been visually verified in the browser.
- The header is now sticky so it remains visible during scroll; section anchors include top spacing for it.
- GitHub destination requested: [avijainnmims-design/surfing-India](https://github.com/avijainnmims-design/surfing-India). The browser showed GitHub sign-in; upload has not happened yet. The current shell also does not have Git available.

## Important decisions

| Decision | Rationale / status |
| --- | --- |
| Focus on peninsular South India | User clarified the geographic scope. |
| Start with 10 schools | User selected the initial directory size and asked for highly rated options. |
| Use public review snapshots | Makes the directory useful while keeping ratings traceable; refresh before launch. |
| Keep the map library-free and illustrative | Meets the no-libraries constraint; marker positions are approximate. |
| Keep `style.cc` and also embed CSS in `index.html` | Some servers do not recognize `.cc` as CSS. Inline CSS keeps the page styled if the linked file is served with the wrong MIME type. |
| Use a remote image fallback until `photo.jpg` is available | Shell download failed, so no local image file was created. |
| No login or payment UI | Explicit product requirement. |

## SOPs

### Before considering a website change complete

1. Check that all requested files exist, especially `photo.jpg` when the local asset is expected.
2. Check that the page shows its layout and images, not only text and links.
3. Check the map shape, marker placement, spot/school filters, and school count.
4. Check the mobile navigation and a narrow phone-width layout.
5. Confirm that the hero photo has a valid local asset or a working online fallback, and retain its source attribution.
6. When editing CSS, keep the inline fallback and `style.cc` synchronized unless the project deliberately switches to a standard `.css` filename.
7. Refresh ratings and review counts from linked sources before presenting them as current.

### Before uploading to GitHub

1. Confirm the target repository is the user-provided `avijainnmims-design/surfing-India`.
2. Authenticate in GitHub's browser session if prompted; never ask the user to send credentials in chat.
3. Check the repository contents before uploading so unrelated files are not replaced.
4. Upload the agreed project files and `brief.md`; include `photo.jpg` once the actual image file is available.
5. Verify the uploaded filenames and resulting page. If GitHub Pages is desired, enable it separately after the files are present.

## Issue log and prevention

| Issue | Resolution / prevention |
| --- | --- |
| `.cc` stylesheet may be served with an unsupported MIME type, leaving the page unstyled. | Inline CSS was added as a fallback while retaining `style.cc`. Keep both copies in sync, or move to a conventional `.css` file only if the filename requirement changes. |
| Unsplash image could not be saved locally; shell download failed with a Windows TLS credentials error. | Page now tries `photo.jpg` and falls back to the verified Unsplash URL. Add and verify a real local `photo.jpg` before expecting offline display. |
| A local-file preview could not be reopened through the browser tool because its URL policy blocked local-file navigation. | Do not keep retrying blocked browser navigation. The user can inspect the already-open local page; use an approved preview path if one becomes available. |
| The first map silhouette and marker positions looked inaccurate. | The SVG outline and coordinates were revised. Before further visual polish, compare the map at desktop and phone widths and adjust markers against the coastlines. |
| GitHub showed a 404 while the browser was signed out; the repo may be private or inaccessible to that session. | Sign in through GitHub's own page, then recheck the exact repository URL. Do not treat a logged-out 404 as proof that the repo does not exist. Upload is still pending authentication. |

## Open items

- Obtain a valid local `photo.jpg` and verify it displays; keep Unsplash attribution.
- Visually review the revised map and mobile layout in a browser.
- Complete the GitHub upload after GitHub authentication is available.
- Confirm whether the page should eventually be published with GitHub Pages.


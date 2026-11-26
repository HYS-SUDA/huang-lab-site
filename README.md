# Huang Lab Website

A static, single-page research-group website for Huang Lab, Soochow University.

## Preview

Open `index.html` directly, or serve the folder locally:

```powershell
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173/`.

## Files

- `index.html` — page content and section structure
- `assets/css/styles.css` — editorial layout and responsive styles
- `assets/js/content.js` — publication, patent and software data
- `assets/js/main.js` — navigation, filters, reveal animations and dynamic lists
- `assets/images/` — portrait and figures extracted from published papers

## Updating content

- Publications and patents: edit `assets/js/content.js`.
- Research narratives: edit the Research section in `index.html`.
- Team names/photos: replace the two count-based People blocks in `index.html` when member details are available.
- The site does not depend on external JavaScript libraries or fonts.

## Source policy

Research directions and research figures are based on the papers in:

`D:\职称评审材料1\科研论文\论文`

Patents and software are based on:

`D:\职称评审材料1\专利`

No content from the National Natural Science Foundation proposal is used on the site.

## Visual direction

The visual system is inspired by the School of Energy laboratory site at:

http://catalysis.energy.suda.edu.cn/

It uses a fixed white navigation bar, full-width research carousel, blue primary actions, red/green/cyan accents, rounded cards and light-gray section bands.

# Portfolio Design Spec — Zachary Rodriguez, PhD

A single-page, scroll-through portfolio for a github.io site. Dark near-black
gray-blue background, light-gray body text, monospace accents, and one bold
color per section (solarized-dark feel). Minimal, readable, navigable.

Use this doc (plus `styles.css`) to rebuild the site with real content. The
companion file `styles.css` contains every token and component class described
here — link it and use the class names below.

---

## 1. Layout & structure

- **Single page, vertical scroll.** Sections stack one after another and each
  is an anchor target.
- **Sticky top navbar** (64px tall) with a monospace wordmark on the left and
  section links on the right. The link for the section currently in view is
  highlighted (brighter text + a 2px underline in that section's accent color).
  This is driven by scroll position (scrollspy), not `:target`.
- **Content column:** centered, `max-width: 920px`, side padding
  `clamp(24px, 5vw, 48px)`.
- **Name header** sits above the first section (not itself a nav target).
- **Footer** with social/contact links.

Section order & anchors:

| # | Section     | anchor id     | accent name | accent hex |
|---|-------------|---------------|-------------|------------|
| 01 | About Me    | `#about`      | magenta     | `#d3448a` |
| 02 | Projects    | `#projects`   | orange      | `#cb6a3c` |
| 03 | Skills      | `#skills`     | gold        | `#b9962f` |
| 04 | Experience  | `#experience` | green       | `#5aa84f` |
| 05 | Education   | `#education`  | red         | `#d8483d` |
| 06 | Interests   | `#interests`  | blue        | `#4a8fd0` |

Each section leads with a header row: a monospace two-digit number in the
accent color, the `<h2>` title, and a thin gradient rule fading from the accent
to transparent. Sub-content lives inside **lightly-defined boxes** (1px border
`#1e2f45`, radius 10px, translucent panel fill).

---

## 2. Color tokens

```
/* Background (default = deep slate; 5 selectable options, darkest → bluest) */
--bg:            #0b0f17;   /* default deep slate, almost black */
--bg-alt-1:      #0a0d12;   /* darkest / most black */
--bg-alt-2:      #0d1117;   /* github dark */
--bg-alt-3:      #10141b;   /* gunmetal */
--bg-alt-4:      #0e1a2b;   /* original blue-navy */

/* Surfaces */
--panel:         rgba(18,33,52,0.50);  /* #12213480 — box fill over bg */
--chip-bg:       #0e1a2b;              /* pill / code-chip background */
--border:        #1e2f45;              /* hairline box border */
--border-chip:   #2a3f59;              /* chip border */
--rule:          #24384f;              /* timeline spine, scrollbar */
--nav-bg:        rgba(11,22,36,0.88);  /* sticky nav (blurred) */
--nav-border:    #1c2c42;

/* Text */
--text:          #aab8c5;   /* body */
--text-strong:   #e6edf3;   /* headings, emphasized */
--text-bright:   #f2f6fa;   /* name / H1 */
--text-muted:    #96a5b4;   /* secondary paragraph text */
--text-dim:      #8296a9;   /* nav inactive, subtitles */
--text-faint:    #5f7891;   /* footer, mono meta */

/* Links (the one teal in the palette) */
--link:          #4fb3a6;
--link-hover:    #7fd0c6;

/* Section accents */
--accent-about:      #d3448a;  /* magenta */
--accent-projects:   #cb6a3c;  /* orange  */
--accent-skills:     #b9962f;  /* gold    */
--accent-skills-lt:  #d0af52;  /* gold, for skill-category subheads */
--accent-experience: #5aa84f;  /* green   */
--accent-education:  #d8483d;  /* red     */
--accent-interests:  #4a8fd0;  /* blue    */
```

Selection highlight: `::selection { background: rgba(42,161,152,0.35); }`

---

## 3. Typography

- **Body / sans:** `"Helvetica Neue", Arial, system-ui, sans-serif`.
  Base `16px`, `line-height: 1.65`, `-webkit-font-smoothing: antialiased`.
- **Mono accent:** `"JetBrains Mono", monospace` (Google Fonts, weights
  400/500/600). Used for: navbar wordmark, section numbers, nav links, chips,
  dates/meta, footer, the header subtitle.

Sizes:

| Element                 | size / weight |
|-------------------------|---------------|
| Name (H1)               | `clamp(34px,6vw,52px)` / 700, `letter-spacing:-1px` |
| Section title (H2)      | `30px` / 700, `letter-spacing:-.5px`, color `--text-strong` |
| Card / entry title (H3) | `17px` / 600, color `--text-strong` |
| Skill category subhead  | `13px` / 600, UPPERCASE, `letter-spacing:1.2px`, color `--accent-skills-lt` |
| Body paragraph          | `16px` / 1.65, `--text`; card/entry blurbs `14–14.5px`, `--text-muted` |
| Mono meta (dates, nums) | `12–14px`, `--text-faint`/`--text-dim` |

Always apply `text-wrap: pretty` to multi-line paragraphs.

---

## 4. Geometry & effects

- **Radii:** boxes/cards `10px`; chips `5–6px`.
- **Borders:** 1px `--border`; accent boxes add `border-left: 3px solid <accent>`
  (About, Interests).
- **Shadows:** none by default; hover on project cards lifts
  `translateY(-2px)` and switches border to the accent color.
- **Spacing:** sections use `padding: 56px 0` (first `36px` top after the
  header, last `72px` bottom). Section header row `margin-bottom: 28–32px`.
- **Nav offset:** sections set `scroll-margin-top: 88px`; scrollspy line sits at
  `scrollTop + 90`.

---

## 5. Components

### Navbar
Sticky, `height:64px`, `--nav-bg` with `backdrop-filter: blur(10px)`, bottom
border `--nav-border`. Left: wordmark `~/zach.dev` (mono, `~/` in orange
`#cb6a3c`, `.dev` in `#7a94ab`). Right: one link per section, mono `13.5px`.
Active link = `--text-strong` + `border-bottom: 2px solid <section accent>`;
inactive = `--text-dim`, transparent underline.

### Scrollspy (active nav)
On scroll of the page container, pick the **last** `section[id]` whose
`offsetTop <= scrollTop + 90`; at the very bottom, force the last section
active. Set the corresponding nav link to its active style. Clicking a nav link
smooth-scrolls to `section.offsetTop - 72` and sets active immediately.

### Section header
```
[01]  About Me  ───────────────────────
```
Flex row, `gap:16px`, `align-items:baseline`. Number = mono `14px` accent;
title = H2; trailing `<span>` `flex:1; height:1px;
background:linear-gradient(90deg,<accent>,transparent); opacity:.5`.

### Box / panel
`.box`: `1px solid --border`, radius 10px, fill `--panel`. Accent variant adds
`border-left:3px solid <accent>` (About intro, Interests cards).

### Project card (grid)
Grid: `repeat(auto-fill, minmax(240px,1fr))`, `gap:18px`. Card = box, padded
22px, flex-column `gap:12px`: a mono category tag (`--text-faint`), H3 title,
blurb (`--text-muted`, `flex:1`), then a wrap of tech-stack chips. Hover =
accent border + lift.

### Skill group (grid)
Grid: `repeat(auto-fill, minmax(300px,1fr))`, `gap:16px`. Each group = box with
an uppercase mono subhead (`--accent-skills-lt`) and a wrap of pill chips.
**Chip:** mono `12.5px`, `--chip-bg`, `1px solid --border-chip`, radius 6px,
padding `5px 11px`, text `#c3d0dc`.
Categories (fixed): Languages / Programming · Bioinformatics · Cloud,
Containers & DevOps · Clinical Informatics · Statistics · Soft Skills.

### Timeline (Experience, Education)
A `border-left: 2px solid --rule` spine (`margin-left:8px`). Each entry:
`position:relative; padding-left:30px` with a node dot
(`12px` circle, `background:var(--bg-node)`, `2px solid <section accent>`,
`left:-7px`). Inside, a box: header row (H3 role/degree left, mono dates right),
an org line in the section accent, then the blurb.

### Interests
Grid `repeat(auto-fit, minmax(240px,1fr))`, `gap:18px`. Accent-left boxes with
H3 + blurb.

### Footer
Top border `--nav-border`, padded `32px 0 48px`, flex space-between: mono
copyright left; GitHub / LinkedIn / Email links right (mono, `--link`).

---

## 6. Real content to use

### Name header
- **H1:** `Zachary Rodriguez, PhD` (`, PhD` in magenta `--accent-about`)
- **Subtitle (mono):** `Senior Bioinformatician · Geneticist · Computing enthusiast`

### About Me
> Hi, I'm **Zach** — a biologist, computing enthusiast, and geneticist.
>
> I'm currently a **Senior Bioinformatician** in the Setia-Verma, Drivas, and
> Verma labs, where I lead pipeline development and genomic data operations for
> the Penn Medicine BioBank. I completed my PhD at the
> [Museum of Natural Science](https://www.lsu.edu/mns/index.php), Louisiana
> State University, investigating the genomic underpinnings of
> [green-blooded lizards](https://www.science.org/doi/full/10.1126/sciadv.aao5017)
> using phylogenomics and transcriptomics, followed by a postdoc in
> [Computational Psychopathology](https://www.science.org/doi/full/10.1126/sciadv.aao5017)
> analyzing digital phenotypes of serious mental illnesses.
>
> I'm interested in integrating genomic, clinical EHR, and diverse demographic
> datasets to study the causes and treatments of human disease.

### Skills (categories → tags; fill with real tools)
- **Languages / Programming:** Python, R, Bash, SQL, Groovy, JavaScript
- **Bioinformatics:** Nextflow, SAIGE, PLINK, bcftools, VEP, GATK
- **Cloud, Containers & DevOps:** Docker, Singularity, AWS, DNAnexus, Git, LSF/SLURM
- **Clinical Informatics:** EHR data, OMOP CDM, ICD/CPT, FHIR, PheCodes
- **Statistics:** GWAS, Mixed models, Survival analysis, Bayesian, Dimensionality reduction
- **Soft Skills:** Mentorship, Technical writing, Collaboration, Public speaking

### Experience (reverse chronological)
- **Senior Bioinformatician** — Setia-Verma, Drivas & Verma Labs · Penn
  Medicine — *2022–Present*. Leads pipeline development and genomic data
  operations for the Penn Medicine BioBank.
- **Postdoctoral Researcher** — Computational Psychopathology Lab —
  *2019–2022*. Digital phenotypes of serious mental illnesses.
- **Graduate Researcher** — Museum of Natural Science, LSU — *2013–2019*.
  Genomic underpinnings of green-blooded lizards.

### Education
- **Ph.D., Biological Sciences** — Louisiana State University · Museum of
  Natural Science — *2013–2019*. Phylogenomics & transcriptomics.
- *(add earlier degrees)*

### Interests
- **Plant Dad** — [@boricuabites](https://www.instagram.com/boricuabites/)
- **Foodie** — [@papacitoplantito](https://www.instagram.com/papacitoplantito/)
- **Roller Coaster Enthusiast** — organizer of the
  [Scream Queens Coaster Community](https://screamqueens.org/), an LGBTQIA+
  nonprofit built around *"no one rides alone."*

### Footer / contact
GitHub · LinkedIn · Email — replace hrefs with real URLs.

### Projects
Grid of cards. Each: category tag, title, one-line blurb, 2–3 tech chips.
Fill with real repos (github.com/&lt;user&gt;). Placeholders in the current build are
Latin filler — swap them out.

---

## 7. Voice & copy

Plain, precise, technical; confident, not salesy. Sentence case for prose and
titles. Keep exact casing for tools/params (`Nextflow`, `SAIGE`, `bcftools`,
`pLoF`). Prefer concrete specifics over adjectives. No decorative emoji.

---

## 8. Motion

Minimal only: CSS `scroll-behavior: smooth` on the scroll container, the
scrollspy active-nav highlight, and the subtle project-card hover lift. No
scroll-triggered reveals, no looping animation.

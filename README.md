# frogriguez.github.io

Personal site and portfolio for Zachary Rodriguez, PhD. Built with vanilla HTML, CSS, and JavaScript — no framework, no build step, no dependencies — and hosted on GitHub Pages.

- Live: [https://zachrodriguez.me](https://zachrodriguez.me)
- GitHub Pages URL: [https://frogriguez.github.io](https://frogriguez.github.io)

## About

A single-page portfolio covering bio, research projects, skills, work experience, education, and personal interests. Content and design decisions are tracked in [`design.md`](design.md).

## Stack

- **HTML5** — one page, `index.html`, sectioned with semantic tags and anchor-linked nav
- **CSS3** — [`assets/css/styles.css`](assets/css/styles.css), no preprocessor
- **JavaScript** — [`assets/js/main.js`](assets/js/main.js), scrollspy nav highlighting + mobile menu toggle, no libraries
- **SEO** — JSON-LD `Person` schema, `robots.txt`, `sitemap.xml`, and canonical link tag in `index.html`'s `<head>`

No package manager, no build tooling. Anything that runs in a browser runs the site.

## Local Development

No install step required. Either:

- Open `index.html` directly in a browser, or
- Serve it so relative paths behave exactly as they will in production:

  ```bash
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## Structure

```
.
├── index.html              # the entire site
├── robots.txt               # crawler rules, points to sitemap.xml
├── sitemap.xml               # single-URL sitemap for zachrodriguez.me
├── CNAME                    # custom domain for GitHub Pages
├── design.md                 # design spec + content plan
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/                  # photos, logos, figures used on the page
│   ├── resume/                # published resume (HTML + PDF)
│   └── documents/             # private working docs (CV, bio, tailored resumes) — gitignored, not published
└── LICENSE
```

## Deployment

GitHub Pages serves directly off the `main` branch — push to `main` and the live site updates within a minute or two. There's no CI/build pipeline in between.

The custom domain (`zachrodriguez.me`) is registered through GoDaddy and pointed at GitHub Pages via DNS:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | frogriguez.github.io |

These four A-record IPs are GitHub's shared Pages load-balancer addresses — the same for every GitHub Pages custom domain, not specific to this account. The `CNAME` file in the repo root tells GitHub Pages which domain to serve (`zachrodriguez.me`); the DNS records above tell GoDaddy where to send traffic for that domain. Both are required. HTTPS is enforced through GitHub Pages once the domain is verified.

## License

MIT — see [`LICENSE`](LICENSE).

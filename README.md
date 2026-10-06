# Portfolio — amandwivedi.in

## Local preview

```bash
npm install && npm run dev
```

## Deploy (GitHub Pages)

This repo includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). On every push to `main`, GitHub Actions builds with Vite and publishes `dist/` to GitHub Pages.

### 1. Push to GitHub

```bash
gh auth login   # once, in your terminal
gh repo create portfolio --public --source=. --remote=origin --push
```

Or create an empty repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. After the first workflow run succeeds, open the site URL shown on the workflow run

### 3. Custom domain on GitHub

1. **Settings** → **Pages** → **Custom domain**: `amandwivedi.in`
2. Wait for DNS check; enable **Enforce HTTPS** when the certificate is ready  
   (`public/CNAME` already contains `amandwivedi.in` for the build)

### 4. DNS at Hosting Raja

In Hosting Raja’s client area, open **DNS management** for `amandwivedi.in` (zone editor / advanced DNS). Remove any old **A** records for `@` that point to shared hosting if you are moving the site to GitHub Pages only.

**Apex domain (`amandwivedi.in`)** — add four **A** records for host `@`:

| Type | Host | Value |
|------|------|--------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

**Optional `www`** — add a **CNAME** (replace `YOUR_USERNAME` with your GitHub username):

| Type | Host | Value |
|------|------|--------|
| CNAME | www | `YOUR_USERNAME.github.io` |

DNS can take from a few minutes up to 48 hours. Check propagation with [dnschecker.org](https://dnschecker.org) for `amandwivedi.in`.

### Contact form

Replace `YOUR_FORM_ID` in `src/App.jsx` with your free [Formspree](https://formspree.io) form ID, then push again to redeploy.

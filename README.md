# Hao Zhang Personal Website

This repository contains the source for [Hao Zhang's website](https://H20Zhang.github.io/), now built on top of the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme.

## Repository layout

- `_pages/`: top-level pages such as about, publications, projects, CV, blog, and news
- `_bibliography/`: BibTeX source for publications
- `_projects/`: project entries rendered on the projects page
- `_news/`: announcement items shown on the homepage and news page
- `_data/`: structured data for social links, venues, and CV content
- `_posts/`: published blog posts
- `_layouts/`, `_includes/`, `_sass/`, `assets/`: al-folio theme files and assets
- `_publications/`: legacy publication Markdown kept only as migration source material

## Local preview

Install host dependencies if they are missing:

```bash
sudo apt update
sudo apt install -y ruby-full build-essential zlib1g-dev bundler nodejs npm
```

Then use the repo scripts:

```bash
bin/setup
bin/dev
```

- `bin/setup`: installs Ruby gems and Node packages locally
- `bin/dev`: serves the site locally with `_config.dev.yml`
- `bin/build`: runs a production-style Jekyll build

The local site is served at `http://localhost:4000`.

## Content workflow

- Update the main bio and homepage sections in `_pages/about.md`
- Edit publications in `_bibliography/papers.bib`
- Update projects in `_projects/`
- Update announcements in `_news/`
- Update CV data in `_data/cv.yml`
- Add blog posts under `_posts/YYYY-MM-DD-slug.md`

## Publication migration helper

The repository includes a one-off migration helper for converting the legacy publication collection into BibTeX:

```bash
bin/migrate_publications_to_bibtex
```

It reads `_publications/*.md` and regenerates `_bibliography/papers.bib`.

## Validation

Before publishing or opening a PR, run:

```bash
bin/build
```

# Repository Guidelines

## Project Structure & Module Organization
This repository is a Jekyll-based academic site derived from the Minimal Mistakes theme. Main content lives in [`_pages/`](/home/hzhang/code/H20Zhang.github.io/_pages), [`_publications/`](/home/hzhang/code/H20Zhang.github.io/_publications), and [`_drafts/`](/home/hzhang/code/H20Zhang.github.io/_drafts). Shared templates are in [`_layouts/`](/home/hzhang/code/H20Zhang.github.io/_layouts) and [`_includes/`](/home/hzhang/code/H20Zhang.github.io/_includes). Styles are organized under [`_sass/`](/home/hzhang/code/H20Zhang.github.io/_sass) and compiled from [`assets/css/main.scss`](/home/hzhang/code/H20Zhang.github.io/assets/css/main.scss). JavaScript sources live in [`assets/js/`](/home/hzhang/code/H20Zhang.github.io/assets/js), with the minified bundle at [`assets/js/main.min.js`](/home/hzhang/code/H20Zhang.github.io/assets/js/main.min.js). Static downloads belong in [`files/`](/home/hzhang/code/H20Zhang.github.io/files), images in [`images/`](/home/hzhang/code/H20Zhang.github.io/images), and publication/talk generation helpers in [`markdown_generator/`](/home/hzhang/code/H20Zhang.github.io/markdown_generator).

## Build, Test, and Development Commands
Run `bundle install` to install Ruby dependencies from `Gemfile`. Use `bundle exec jekyll serve` for local development at `http://localhost:4000`, or `bundle exec jekyll build` to validate a production build. If you need the local config overrides, run `bundle exec jekyll serve --config _config.yml,_config.dev.yml`. For frontend changes, run `npm install` once, then `npm run build:js` to regenerate `assets/js/main.min.js`. Use `npm run watch:js` while editing JS files.

## Coding Style & Naming Conventions
Preserve Jekyll front matter and use concise Markdown pages with meaningful permalinks. Follow the existing naming patterns: lowercase descriptive page files in `_pages/`, and publication entries named by venue/year such as `SIGMOD-21.md`. Keep YAML keys aligned and indentation consistent at two spaces. Match the existing style in SCSS and JavaScript; edit source files like `assets/js/_main.js`, not the generated minified output directly.

## Testing Guidelines
There is no dedicated automated test suite in this repository. Treat `bundle exec jekyll build` as the required validation step for every content or layout change. When editing JavaScript, also run `npm run build:js` and verify the affected page locally with `bundle exec jekyll serve`. Check generated pages, navigation, publication links, and asset paths before opening a PR.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Add download links for papers on about page` and `Reset homepage content and use TQEX(SQL) naming`. Keep commits focused and descriptive. PRs should explain the user-visible change, list any regenerated assets, and include screenshots for layout or styling updates. If you change template or theme code, follow [`CONTRIBUTING.md`](/home/hzhang/code/H20Zhang.github.io/CONTRIBUTING.md) and reference a closed issue tagged `code change`.

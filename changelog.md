# Changelog

All notable changes to the KKS Ollie Mods Best theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2026-05-09

### Fixed

- Remove unused `postcss-subgrid` (it required PostCSS 7.x). That dependency pinned a vulnerable PostCSS 7 install and made Dependabot security updates for `postcss` impossible; the lockfile now dedupes to PostCSS 8.x only.
- Harden `jwt_auth_whitelist` filter handling by normalizing `$endpoints` to an array before `array_merge()` (prevents PHP 8+ `TypeError` if another filter returns `null`).

### Changed

- Rename Mix entry files and built assets from `kks` to `koolkatscience`: `scss/koolkatscience.scss`, `js/koolkatscience.js`, `dist/koolkatscience.css` / `dist/koolkatscience.js`; enqueue paths in `functions.php` and CI verify step updated accordingly.
- GitHub Actions SSH deploy: rsync the **full theme directory** to the server (excluding `.git/`, `node_modules/`, `vendor/`, `.github/`, etc.). Previously only `dist/` and `images/` were synced, so `changelog.md`, `scss/`, `functions.php`, and other sources never updated on production.

## [1.0.4] - 2026-05-08

### Security

- GitHub Actions deploy: require pinned host keys (`DEPLOY_KNOWN_HOSTS` written to `~/.ssh/known_hosts`), enable strict SSH host key checking, and drop `ssh-keyscan` plus `StrictHostKeyChecking=accept-new` (trust-on-first-use behavior).

### Fixed

- GitHub Actions: do not set `NODE_ENV=production` during `npm ci`, since that skipped `devDependencies` and caused `mix: not found` when running `npm run production`.

### Changed

- GitHub Actions deploy: rsync `--delete` for `dist/` and `images/` so remotes mirror build output (with exclusions for `.DS_Store` and preserving server-only `manifest.json` under `dist/`).
- Version-built assets `dist/koolkatscience.css` and `dist/koolkatscience.js` are tracked in Git; `/dist/` removed from `.gitignore`. CI still runs `npm run production` before rsync so uploads stay build-fresh.

### Added

- GitHub Actions: upload built `dist/` as a downloadable workflow artifact after verify; clearer logging when artifacts are missing.

## [1.0.3] - 2025-08-16
### Added
- Added Facebook Pixel to site per KKS request 8/15/25

## [1.0.2] - 2025-06-07
### Added
- Minor theme updates
- Added heartbeat settings to prevent session expirati
- Added session lifetime settings to prevent session expiration
- Added session refresh settings to prevent session expiration

## [1.0.1] - 2024-06-07
### Added
- Initial custom theme setup
- Based on Ollie theme v1.2.5

## [1.0.0] - 2024-02-07
### Added
- Initial custom theme release
- Custom modifications for KKS

## [Unreleased]

### Changed

- Move the Meta Pixel account ID out of `functions.php` and into the `KKS_META_PIXEL_ID` environment variable, falling back to the existing production pixel ID if the env var isn't set.

- This theme is a custom modification of the Ollie theme (v1.2.5).
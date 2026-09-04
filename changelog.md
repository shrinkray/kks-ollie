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

### Added

- Enqueue the Givebutter donation widget script sitewide, gated on the `KKS_GIVEBUTTER_ACCOUNT_ID` environment variable (renders nothing until that's set).

### Changed

- Move the Meta Pixel account ID out of `functions.php` and into the `KKS_META_PIXEL_ID` environment variable, falling back to the existing production pixel ID if the env var isn't set.
- Meta Pixel now also fires on `koolkatscience.org` (in addition to the legacy `koolkatscience.net`), since the site is publishing to the `.org` domain.

### Fixed

- Meta Pixel host check now normalizes the site host (lowercase, strips a leading `www.`) before comparing, so it also fires on `www.koolkatscience.org` instead of silently skipping it.
- Meta Pixel host check now reads the actual request `Host` header instead of WordPress's DB-configured `home` option, so a staging/preview clone of the production database no longer fires the real production Pixel.

### Security

- Bump `wp-coding-standards/wpcs` 2.3.0 → 3.4.1 (fixes CVE-2026-45293, arbitrary code execution), which pulled in `squizlabs/php_codesniffer` 3.13.6 (fixes CVE-2026-67434, OS command injection) as a transitive dependency. Required removing `wptrt/wpthemereview`, an unused dev dependency (`phpcs.xml` never references its `WPThemeReview` ruleset) that pinned WPCS to `^2.2.0` and has no release compatible with WPCS 3.x.
- `phpcs.xml`: drop the `WordPress.WhiteSpace.PrecisionAlignment` exclude — WPCS 3.x removed that sniff outright, so excluding it is now a phpcs config error.
- `functions.php`: drop the unused `$lifetime` parameter from `kks_extend_session_lifetime()`, flagged by a new WPCS 3.x sniff (the WP hook still calls it fine with fewer declared params).
- npm audit: 38 → 22 vulnerabilities (0 critical, was 2). Bumped `shell-quote` (critical), `websocket-driver` (critical), `postcss` + its `nanoid` dependency (high), `svgo` (high), `ws` (high), `postcss-selector-parser` (high), and `express`/`body-parser`/`qs` (partial — see below), plus routine transitive bumps (`fast-uri`, `brace-expansion`, `js-yaml`, `immutable`, `launch-editor`) picked up along the way. All dev-only build tooling, never shipped to the site; ran `npm run production` after each step and confirmed the build succeeded with no changes to `dist/` output.

### Known remaining (deferred — needs a breaking-change pass, not bundled here)

- `qs` DoS (moderate): stuck at 6.15.3, the newest patch `express`'s declared `~6.15.1` range allows; the advisory covers the entire 6.15.x line. Needs `express` 5.x or a version override.
- `webpack` SSRF (low): fix (5.110.3) is outside the `5.94.0` pinned in `package.json` — needs a tested Laravel Mix build verification, not an automatic bump.
- `@typescript-eslint/*` chain nested under `@wordpress/eslint-plugin`, and a nested `minimatch`: blocked on `@wordpress/eslint-plugin`'s own pinned versions.
- `uuid`, and the `sockjs`/`node-notifier`/`webpack-dev-server` chain that depends on it: no upstream fix published yet.
- `laravel-mix`/`laravel-mix-purgecss` and the old `browserify-sign`/`create-ecdh`/`crypto-browserify`/`elliptic`/`node-libs-browser` polyfill chain they pull in: no fix available upstream.

- This theme is a custom modification of the Ollie theme (v1.2.5).
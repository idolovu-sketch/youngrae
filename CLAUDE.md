# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for 조영래 (Youngrae Cho) — "PLAYER ONE" themed portfolio. Built with React 19 + Vite 8, deployed via GitHub Pages.

## Commands

- `npm run dev` — Start dev server with HMR
- `npm run build` — Production build (outputs to `dist/`)
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

## Architecture

Single-page React app with no routing. `App.jsx` composes all sections in order:

`Particles` → `Hero` → `Profile` → `Stats` → `Games` → `Travel` → `Message` → `Dream` → `Footer`

Each section is a self-contained component in `src/components/`. All styles are in `src/index.css` (single global stylesheet). No CSS modules or styled-components.

## Key Details

- **Language**: Korean (lang="ko"), content is in Korean
- **Fonts**: Google Fonts — Do Hyeon, Noto Sans KR, Press Start 2P
- **Images**: Static assets in `public/` (profile photo, travel photos in `public/travel/italy/`)
- **EXIF**: Uses `exifr` library for reading photo metadata
- **ESLint**: Flat config with react-hooks and react-refresh plugins. Unused vars starting with uppercase or `_` are allowed.
- **No TypeScript, no test framework configured**

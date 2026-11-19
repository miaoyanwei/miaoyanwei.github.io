# AGENTS.md

## General Rules
- Explore the existing codebase before making changes.
- Follow existing conventions and preserve the current architecture.
- Keep changes minimal and focused; avoid unnecessary refactoring or dependencies.
- Keep comments and commit messages short.
- Follow accessibility, responsive design, and performance best practices.
- Ask before making significant architectural or visual changes.

## Project Structure
- `index.html` — Homepage, landing page, and chatbot.
- `projects/` — Individual project detail pages. Follow established page structures and design patterns.

## Design System
Treat the Design System as the single source of truth across the entire website.
- Before planning or implementing any new or updated UI, read [design.md](./design.md) in the repository root and apply its guidance. Before finishing, check the UI against that guidance.
- Use Inter for all portfolio text, including controls and code. Use the Vercel typography roles and weights with Inter.
- **Tokens first:** Centralise colours, typography, spacing, radii, shadows, layout widths, and transitions in CSS custom properties. Reuse existing tokens instead of introducing arbitrary values.
- **Reusable components:** Reuse shared styles and components for recurring patterns. Use consistent variants for intentional differences.
- **Enforce consistency:** Follow established visual, interaction, and responsive patterns. Avoid unnecessary effects, duplicated styles, and one-off overrides.
- **Extend deliberately:** Check existing tokens and components before introducing new ones. Add justified extensions to the central system, not isolated exceptions.
- **Audit continuously:** Before finishing a change, check for inconsistencies, duplication, conflicting overrides, accessibility issues, and regressions across affected pages.

**Priority:** Consistency, reusability, and maintainability over isolated visual experimentation. Improve the existing system rather than reinventing it.

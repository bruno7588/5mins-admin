# 5Mins.ai — Claude Code Instructions

## Project Overview

5Mins.ai is a B2B micro-learning platform for enterprise customers in compliance-heavy industries (hospitality, finance, healthcare). Tech stack: React TypeScript, CSS with design tokens (CSS custom properties).

## Design System

When building any UI component, feature, or screen, you MUST read the relevant design system documentation before writing code.

### How to use the design system docs

1. **Always start** with `docs/design-system/design-system-guidelines.md` — this is the consolidated reference with all tokens, colors, typography, spacing, and component specs.
2. **Then read the specific component doc** for detailed implementation (React TypeScript code, full CSS, usage examples):
   - `docs/design-system/buttons.md` — Button variants, semantic types, sizes, states
   - `docs/design-system/badges.md` — Status badges, pill indicators, quiz badges
   - `docs/design-system/chips.md` — Chip / filter-tag component — all variants (default, hover, selected, disabled), optional left icon (user) and right icon (close/X), dark-theme design tokens, React implementation | Any filter chip, selection pill, dismissible tag, or small pill-shaped interactive label
   - `docs/design-system/headers.md` — Page Headers and Section Headers
   - `docs/design-system/overlays.md` — Dialog, Modal, and Side Drawer
   - `docs/design-system/lesson-cards.md` — Lesson/course card component
   - `docs/design-system/typography.md` — Type scale, weights, colors
   - `docs/design-system/brand-colors.md` — Full color palette and usage rules (Primary, Neutral-0→900, Semantic, Gamification)
   - `docs/design-system/surface-colors.md` — Semantic surface tokens for backgrounds, borders, and button states
   - `docs/design-system/text-colors.md` — Semantic text color tokens for all text roles (hierarchy, buttons, status, interactive, quiz)
   - `docs/design-system/iconography.md` — Iconsax React icons, sizes, variants
   - `docs/design-system/spacing.md` — Spacing scale and border radius system
   - `docs/design-system/input.md` - Text inputs, form fields, search boxes, email/password/numeric fields — all states (Enabled, Hover, Active, Filled, Disabled), validation states, label, helper text, right-side icon | Any user text-entry element or form control
   - `docs/design-system/file-uploader.md` - File upload component — two sizes (L/S), all five states (Enabled, Hover, Error, Uploading, Filled), circular progress, filename display, Preview + Change File CTAs | Any file input, drag-and-drop zone, CSV import, document or media upload
   - `docs/design-system/alerts.md` — Alert and Callout banner — both types, all prop combos, CSS, React implementation | Building any inline notification, warning banner, callout, or info strip
   - `docs/design-system/search.md` — Search input — two sizes (M/L), three states (Enabled, Hover, Active), filled/empty modes, clear button | Building any search field, filter input, or keyword search bar
   - `docs/design-system/tooltip.md` — Tooltip component — 4 positions (Top/Bottom/Left/Right), 3 alignments (Center/Start/End), optional info icon anchor, caret, dark background, max-width 288px, React implementation | Any tooltip, contextual hint, helper text on hover/focus, or info icon with floating label

### Strict rules

- **Never improvise design values.** Use only tokens defined in the design system (colors, spacing, radius, font sizes).
- **Always use semantic tokens over raw palette values.** Prefer `--text-primary` over `--neutral-800`, `--surface-card` over `--neutral-0`, `--border-default` over `--neutral-100`.
- **Always use Poppins** as the font family. Weights: 400, 500, 700 only.
- **Always use Iconsax React** for icons. Standard sizes: 16, 20, 24, 32px only.
- **All spacing must be multiples of 4px.** Use the spacing scale tokens.
- **Never use `--primary-500` for text on white backgrounds** — it fails WCAG contrast.
- **Bold (700) is only for headings and buttons.** Medium (500) for subtle emphasis. Regular (400) for body text.
- **Follow the component patterns exactly** — button pairing, overlay selection, badge type mapping, header hierarchy.

## Code Style

- React functional components with TypeScript
- CSS custom properties (design tokens) for all styling values
- Semantic HTML with proper ARIA attributes
- All interactive elements must have visible `:focus-visible` indicators

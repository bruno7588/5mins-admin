
# 5Mins.ai Lesson Cards

Complete lesson card component system for the 5Mins.ai micro-learning platform.

## Component Overview

Lesson cards display learning content across the platform. The component has two primary views (grid and list) with device-specific layouts and multiple state combinations.

## Props / Variant Properties

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `view` | `"grid" \| "list"` | `"grid"` | Card layout mode |
| `device` | `"Mobile" \| "Web app" \| "Admin" \| "n/a"` | `"n/a"` | Target device/context. Grid view uses `"n/a"` |
| `disabled` | `boolean` | `false` | Locked/inaccessible lesson. Shows lock icon, muted colors |
| `completed` | `boolean` | `false` | Whether the lesson video is fully watched |
| `state` | `"Enabled" \| "Hover"` | `"Enabled"` | Interaction state |
| `quiz` | `"Required" \| "Off" \| "Completed" \| "Pending" \| "Failed"` | `"Required"` | Quiz status badge |

## Variant Combinations

### Grid View (`view="grid"`, `device="n/a"`)

Compact vertical card (170×230px) with image placeholder, progress bar, title, and instructor.

**States:** Enabled, Hover, Completed, Disabled
**Hover effect:** Background changes to `--cards-background-hover`

### List View — Mobile (`view="list"`, `device="Mobile"`)

Horizontal card (343px) with 56px thumbnail, title, metadata, quiz badge, progress bar.

**States:** Enabled only (no hover on mobile)
**Quiz badges:** Off, Required, Completed, Pending, Failed
**Disabled:** Shows lock icon, muted colors, `mix-blend-luminosity` on thumbnail

### List View — Web App (`view="list"`, `device="Web app"`)

Wide horizontal card (900px) with 80px thumbnail, title, metadata row with quiz badge, progress bar.

**States:** Enabled, Hover for each quiz variant
**Hover effect:** Background → `--cards-background-hover`, title → `--text-button-hover`
**Disabled:** Lock icon, `mix-blend-luminosity` thumbnail, muted text

### List View — Admin (`view="list"`, `device="Admin"`)

Compact wide card (900px) with 48px thumbnail, title, metadata. No progress bar.

**States:** Enabled, Hover
**Hover effect:** Background → `--cards-background-hover`, title → `--text-button-hover`

## Design Tokens (Light Theme)

```css
/* Card Backgrounds */
--cards-background: #ffffff;
--cards-background-hover: #eff0f2;
--border: #dfe1e6;

/* Text Colors */
--text-primary: #20222a;
--text-secondary: #454c5e;
--text-disabled: #9ea4b3;
--text-button-hover: #00afc4;

/* Quiz Badge Text */
--text-quiz: #6368db;        /* Quiz Required */
--text-success: #18a957;     /* Quiz Completed */
--text-warning: #e2a610;     /* Quiz Pending */
--text-error: #df1642;       /* Quiz Failed */

/* Progress Bar */
--primary-600: #00afc4;      /* Default progress fill */
--success-500: #18a957;      /* Completed progress fill */

/* Quiz Badge Backgrounds */
quiz-required-bg: rgba(99, 104, 219, 0.12);
quiz-completed-bg: rgba(24, 169, 87, 0.12);
quiz-pending-bg: rgba(255, 165, 56, 0.12);
quiz-failed-bg: rgba(223, 22, 66, 0.12);
```

## Card Shadow

```css
box-shadow: -1px -1px 4px rgba(32, 34, 42, 0.06),
             1px  1px 4px rgba(32, 34, 42, 0.06);
```

Applied to grid, web app, and admin cards. Not applied to mobile cards.

## Typography

| Element | Style | Size | Weight | Line Height |
|---------|-------|------|--------|-------------|
| Grid title | Poppins Bold | 14px | 700 | 1.5 |
| Grid instructor | Poppins Regular | 12px | 400 | 1.2 |
| List title (Web/Admin) | Poppins Bold | 16px | 700 | 1.5 |
| List title (Mobile) | Poppins Bold | 14px | 700 | 1.5 |
| Metadata text | Poppins Regular | 14px (Web/Admin), 12px (Mobile) | 400 | 1.5 (Web), 1.2 (Mobile) |
| Quiz badge text | Poppins Medium | 12px (Web), 10px (Mobile) | 500 | 1.2 |
| Duration badge (grid) | Poppins Regular | 10px | 400 | 1.0 |

## Dimensions & Spacing

### Grid Card
- Card: 170×230px, border-radius 12px, padding 16px on info section
- Image area: fills top, flex-grow
- Progress bar: 0.125rem (2px) height, align-self stretch, full width
- Duration badge: absolute, top-right 0.375rem offset, padding 0.25rem 0.375rem, border-radius var(--XS, 0.25rem), background rgba(15,16,20,0.50), gap 0.5rem
- Tag icon: top-left, 20px icon, 4px padding, border-radius bottom-right 8px

### Mobile List Card
- Card: 343px wide, border-radius 8px
- Thumbnail: 56×56px, border-radius 3.5px
- Content padding: 12px
- Gap between thumb and info: 12px
- Progress bar: 0.125rem (2px) height, align-self stretch, full width

### Web App List Card
- Card: 900px wide, padding 16px, border-radius 12px
- Thumbnail: 80×80px, border-radius 8px
- Gap: 16px between thumb and info, 8px internal info gap
- Progress bar: 6rem (96px) wide, 0.25rem (4px) height

### Admin List Card
- Card: 900px wide, padding 12px, border-radius 12px
- Thumbnail: 48×48px, border-radius 8px
- Gap: 12px, internal gap 4px

## Progress Bar

Segmented progress bar with 8 segments (in-progress) or 4 segments (completed).

- Default progress fill: `--primary-600` (#00afc4)
- Completed fill: `--success-500` (#18a957)
- Empty segment: `--border` (#383d4c)
- Border radius: 20px on first/last segments
- Height: 8px

## Quiz Badges

| Status | Background | Text Color | Icon |
|--------|-----------|------------|------|
| Required | `rgba(99,104,219,0.16)` | `--text-quiz` (#ffdbaf) | Lesson quiz icon |
| Completed | `rgba(24,169,87,0.16)` | `--text-success` (#18a957) | Tick circle |
| Pending | `rgba(255,165,56,0.16)` | `--text-warning` (#ffa538) | Info circle + arrow |
| Failed | `rgba(223,22,66,0.16)` | `--text-error` (#e95c7b) | Info circle |

Badge padding: 4px vertical, 8px horizontal (6px left when icon present).
Badge gap: 4px between icon and text.
Badge border-radius: 40px (pill shape).

## Disabled State Behavior

- Thumbnail: `mix-blend-mode: luminosity` (desaturated)
- Title text: `--text-disabled` (#656b7c)
- Metadata text: `--text-disabled`
- Quiz badge: `mix-blend-mode: luminosity`
- Progress bar segments: all `--border` color (no fill)
- Lock icon: 20px (Mobile), 24px (Web app), replaces completion tick

## Hover State Behavior

- Card background: `--cards-background` → `--cards-background-hover`
- Title text (Web/Admin): `--text-primary` → `--text-button-hover` (#33e2f7)
- All other elements: unchanged

## Implementation

For full React TypeScript implementation with all variants, see: `references/react-implementation.md`

For CSS variables and tokens, see: `assets/lesson-cards-tokens.css`

## Accessibility

- Use semantic `<article>` for each card
- Include `aria-label` with lesson title on card container
- Disabled cards: add `aria-disabled="true"`
- Progress bar: `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Quiz badges: include screen-reader text for status
- Hover states: ensure keyboard focus matches hover styling via `:focus-visible`
- Lock icon on disabled: include `aria-label="Locked lesson"`

---
name: 5mins-chips
description: >
  Chip / filter-tag component for 5Mins.ai. Use when implementing chips, tags,
  filter pills, selection chips, dismissible tags, or any small pill-shaped
  interactive label in the admin or learner UI. Covers all variants (default,
  hover, selected, disabled), optional left icon (user) and right icon (close/X),
  and design tokens. Trigger this skill whenever someone needs a chip,
  filter chip, tag pill, selection pill, or dismissible label in the 5Mins.ai
  platform — even if they just say "add a chip" or "filter tag".
---

# 5Mins.ai — Chips Component

Figma source: `Library` › node `11100-2179`
Screenshot: pill-shaped labels, yellow selected state.

---

## Visual Overview

```
[ Content ]           ← Enabled (border only)
[ Content  x ]        ← Enabled + iconRight (close)
[ 👤 Content ]        ← Enabled + iconLeft (user)
[ Content ]           ← Hover (slightly lit background + brighter border)
[ Content ]           ← Selected (yellow fill, bold dark text)
[ Content ]           ← Disabled (muted border + muted text)
```

---

## Design Tokens

All values use 5Mins.ai design tokens.

| CSS Variable               | Value      | Usage                                  |
|----------------------------|------------|----------------------------------------|
| `--border`                 | `#383d4c`  | Default & disabled border              |
| `--border-hover`           | `#9ea4b3`  | Hover state border                     |
| `--page-background-hover`  | `#2d313d`  | Hover state background fill            |
| `--selected`               | `#ffbb38`  | Selected background (yellow/amber)     |
| `--text-secondary`         | `#bfc2cc`  | Default & hover label color            |
| `--text-disabled`          | `#656b7c`  | Disabled label & icon color            |
| `--neutral-800`            | `#20222a`  | Selected label color (dark on yellow)  |

### Spacing tokens

| Token  | px  | Used for                                         |
|--------|-----|--------------------------------------------------|
| `--xs` | 4   | Gap when no icons or iconLeft present            |
| `--s`  | 8   | Gap when iconRight present                       |
| `--sm` | 12  | Horizontal padding on the icon side of chip      |
| `--m`  | 16  | Horizontal padding on the text side of chip      |

- **Vertical padding:** `8px` (both sides)
- **Border radius:** `24px` (fully rounded pill)

### Typography

| Variant          | Font     | Weight  | Size | Line height |
|------------------|----------|---------|------|-------------|
| Default / hover  | Poppins  | 400     | 14px | 1.5         |
| Selected         | Poppins  | 700     | 14px | 1.5         |
| Disabled         | Poppins  | 400     | 14px | 1.5         |

---

## Props

| Prop        | Type                          | Default     | Description                          |
|-------------|-------------------------------|-------------|--------------------------------------|
| `label`     | `string`                      | `"Content"` | Text displayed inside chip           |
| `selected`  | `boolean`                     | `false`     | Yellow fill, bold dark text          |
| `disabled`  | `boolean`                     | `false`     | Muted border + text, non-interactive |
| `iconLeft`  | `boolean`                     | `false`     | Show 16×16 user icon before label    |
| `iconRight` | `boolean`                     | `false`     | Show 16×16 close (×) icon after label|
| `state`     | `"Enabled" \| "Hover"`        | `"Enabled"` | Visual state (Hover is usually CSS)  |
| `onClick`   | `() => void`                  | —           | Click handler                        |
| `onDismiss` | `() => void`                  | —           | Close-icon click (only with iconRight)|
| `className` | `string`                      | —           | Extra CSS classes                    |

> **Note:** `state` is typically driven by CSS `:hover` in prototypes. Only use the prop for forced-hover stories/tests.

---

## State × Appearance Matrix

| `disabled` | `selected` | `state`    | Border         | Background             | Text color        | Text weight |
|------------|------------|------------|----------------|------------------------|-------------------|-------------|
| false      | false      | Enabled    | `--border`     | transparent            | `--text-secondary`| 400         |
| false      | false      | Hover      | `--border-hover`| `--page-background-hover`| `--text-secondary`| 400         |
| false      | true       | Enabled    | none           | `--selected`           | `--neutral-800`   | 700         |
| true       | false      | n/a        | `--border`     | transparent            | `--text-disabled` | 400         |

**Padding rules:**
- `iconLeft` only: `pl-[12px] pr-[16px]`, gap `4px`
- `iconRight` only: `pl-[16px] pr-[12px]`, gap `8px`
- No icons: `px-[16px]`, gap `0`

---

## React TypeScript Implementation

```tsx
import React from 'react';

// Iconsax icons — use these exact imports
import { CloseCircle, User } from 'iconsax-react';

type ChipState = 'Enabled' | 'Hover';

interface ChipProps {
  label?: string;
  selected?: boolean;
  disabled?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;
  state?: ChipState;
  onClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function Chip({
  label = 'Content',
  selected = false,
  disabled = false,
  iconLeft = false,
  iconRight = false,
  state = 'Enabled',
  onClick,
  onDismiss,
  className = '',
}: ChipProps) {
  const isHover = state === 'Hover';

  // Base classes
  const base = 'inline-flex items-center justify-center rounded-[24px] py-[8px] cursor-pointer select-none transition-colors';

  // Background / border
  const visual = disabled
    ? 'border border-[#383d4c]'
    : selected
    ? 'bg-[#ffbb38]'
    : isHover
    ? 'border border-[#9ea4b3] bg-[#2d313d]'
    : 'border border-[#383d4c] hover:border-[#9ea4b3] hover:bg-[#2d313d]';

  // Padding
  const padding = iconLeft && !iconRight
    ? 'pl-[12px] pr-[16px] gap-[4px]'
    : iconRight && !iconLeft
    ? 'pl-[16px] pr-[12px] gap-[8px]'
    : 'px-[16px]';

  // Text style
  const textStyle = disabled
    ? 'text-[14px] font-normal text-[#656b7c] leading-[1.5] font-[Poppins]'
    : selected
    ? 'text-[14px] font-bold text-[#20222a] leading-[1.5] font-[Poppins]'
    : 'text-[14px] font-normal text-[#bfc2cc] leading-[1.5] font-[Poppins]';

  // Icon color
  const iconColor = disabled ? '#656b7c' : selected ? '#20222a' : '#bfc2cc';

  return (
    <div
      className={`${base} ${visual} ${padding} ${className}`}
      onClick={disabled ? undefined : onClick}
      role="button"
      aria-disabled={disabled}
      aria-pressed={selected}
    >
      {iconLeft && (
        <User size={16} color={iconColor} variant="Linear" />
      )}
      <span className={textStyle}>{label}</span>
      {iconRight && (
        <button
          className="flex items-center justify-center p-0 bg-transparent border-none cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onDismiss?.(); }}
          aria-label="Remove"
          disabled={disabled}
        >
          <CloseCircle size={16} color={iconColor} variant="Linear" />
        </button>
      )}
    </div>
  );
}
```

### CSS variable approach (if token vars are available in the project)

```css
/* In your global CSS or component stylesheet */
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  padding: 8px 16px;
  border: 1px solid var(--border, #383d4c);
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary, #bfc2cc);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s;
}
.chip:hover {
  border-color: var(--border-hover, #9ea4b3);
  background-color: var(--page-background-hover, #2d313d);
}
.chip--selected {
  border: none;
  background-color: var(--selected, #ffbb38);
  color: var(--neutral-800, #20222a);
  font-weight: 700;
}
.chip--disabled {
  border-color: var(--border, #383d4c);
  color: var(--text-disabled, #656b7c);
  cursor: not-allowed;
  pointer-events: none;
}
.chip--icon-left  { padding-left: 12px; gap: 4px; }
.chip--icon-right { padding-right: 12px; gap: 8px; }
```

---

## Usage Examples

```tsx
// Filter chip — default
<Chip label="Finance" />

// Filter chip — selected (user clicked it)
<Chip label="Finance" selected onClick={() => toggleFilter('finance')} />

// Dismissible tag
<Chip label="Ricardo" iconRight onDismiss={() => removeTag('ricardo')} />

// With left user icon
<Chip label="Admin" iconLeft />

// Disabled
<Chip label="Locked" disabled />

// Group of filter chips
const filters = ['All', 'Compliance', 'HR', 'Finance'];
filters.map(f => (
  <Chip
    key={f}
    label={f}
    selected={activeFilter === f}
    onClick={() => setActiveFilter(f)}
  />
))
```

---

## Do's and Don'ts

**Do:**
- Use `selected` + `onClick` to toggle filter state
- Use `iconRight` + `onDismiss` for dismissible chips (e.g. applied filters)
- Use `iconLeft` for chips that represent people/users
- Use `disabled` when the option is unavailable (not just unselected)
- Keep chip label short — 1–3 words max

**Don't:**
- Don't use both `iconLeft` and `iconRight` simultaneously (not in the design spec)
- Don't use chips for navigation — use tabs or buttons instead
- Don't hardcode hover styles inline; let CSS `:hover` handle it unless forcing a state in tests
- Don't change border-radius — `24px` is fixed for all chip sizes

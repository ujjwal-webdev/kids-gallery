# Design System Strategy: The Digital Playroom

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Digital Curator."** In a world of chaotic and overstimulating children's interfaces, we take a different path. We treat the digital experience as a curated, premium gallery—a "playroom" that is as sophisticated as it is whimsical.

We break the "standard template" look by embracing **Intentional Asymmetry**. Elements should feel like they were placed by hand on a canvas, not snapped to a rigid, industrial grid. By using overlapping surfaces, varied corner radii, and high-contrast typography scales, we create a rhythmic, editorial flow that feels alive, safe, and imaginative.

---

## 2. Colors
Our palette balances the warmth of a sunlit nursery with the energy of a box of fresh crayons.

### Palette Roles
- **The Canvas:** Use `surface` (`#fff9eb`) as your primary stage. It is softer and more premium than pure white.
- **The Accents:** Use `primary` (`#ae2f34`) for moments of high energy and `secondary` (`#785900`) for warmth and guidance.
- **The "No-Line" Rule:** To maintain a high-end feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the definition needed without the "cheap" look of a stroke.
- **Surface Hierarchy & Nesting:** Treat the UI as physical layers. Use the `surface-container` tiers to create depth. An inner card should use `surface-container-highest` when placed on a `surface-container-low` parent.
- **The Glass & Gradient Rule:** For floating elements (like navigation bars or "quick-view" modals), use **Glassmorphism**. Apply a semi-transparent `surface` color with a 20px-40px backdrop-blur. For primary CTAs, use a subtle linear gradient transitioning from `primary` to `primary_container` to add "soul" and dimension.

### Full Color Token Map

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#ae2f34` | CTAs, active states, high-energy moments |
| `on-primary` | `#ffffff` | Text/icons on primary |
| `primary-container` | `#ffdad6` | Primary tinted backgrounds |
| `on-primary-container` | `#410003` | Text on primary-container |
| `secondary` | `#785900` | Warm accents, guidance elements |
| `on-secondary` | `#ffffff` | Text/icons on secondary |
| `secondary-container` | `#ffdf9e` | Secondary tinted backgrounds |
| `on-secondary-container` | `#261900` | Text on secondary-container |
| `tertiary` | `#3a6658` | Complementary accent (mint/teal) |
| `tertiary-container` | `#bcecd9` | Tertiary tinted backgrounds (chips, tags) |
| `on-tertiary-container` | `#002117` | Text on tertiary-container |
| `surface` | `#fff9eb` | Primary canvas/stage |
| `surface-container-lowest` | `#ffffff` | Elevated cards on darkened surface |
| `surface-container-low` | `#fff3dc` | Subtle section backgrounds |
| `surface-container` | `#feeece` | Default container backgrounds |
| `surface-container-high` | `#f9e8c8` | Emphasized containers |
| `surface-container-highest` | `#f3e2c2` | Highest elevation containers |
| `on-surface` | `#1d1c13` | Primary text (NOT pure black) |
| `on-surface-variant` | `#4d4639` | Secondary text, captions |
| `outline` | `#7f7667` | Subtle outlines when needed |
| `outline-variant` | `#d0c5b4` | Ghost borders at 15% opacity |
| `error` | `#ba1a1a` | Error states |
| `error-container` | `#ffdad6` | Error backgrounds |

---

## 3. Typography
We utilize **Plus Jakarta Sans** for its friendly, geometric, and highly legible character.

- **Display & Headlines:** Use `display-lg` (3.5rem) and `headline-lg` (2rem) to create a bold, editorial presence. These should be set with tight letter-spacing (-0.02em) to feel "chunky" and intentional.
- **Hierarchy of Fun:** The contrast between a massive `display-lg` headline and a clean `body-md` description creates a hierarchy that is both professional and approachable.
- **Labels:** Use `label-md` for metadata. Despite the playful vibe, typography must remain legible; avoid over-styling body text. Let the headers do the heavy lifting of brand personality.

### Typography Scale

| Token | Size | Weight | Letter Spacing |
|---|---|---|---|
| `display-lg` | 3.5rem (56px) | 800 | -0.02em |
| `display-md` | 2.75rem (44px) | 700 | -0.02em |
| `headline-lg` | 2rem (32px) | 700 | -0.01em |
| `headline-md` | 1.5rem (24px) | 600 | -0.01em |
| `title-lg` | 1.25rem (20px) | 600 | 0 |
| `title-md` | 1rem (16px) | 600 | 0 |
| `body-lg` | 1rem (16px) | 400 | 0 |
| `body-md` | 0.875rem (14px) | 400 | 0.01em |
| `label-lg` | 0.875rem (14px) | 600 | 0.01em |
| `label-md` | 0.75rem (12px) | 500 | 0.02em |

---

## 4. Elevation & Depth
In this system, depth is a feeling, not a shadow effect.

- **The Layering Principle:** Achieve lift by "stacking" tones. A `surface-container-lowest` card on a `surface-container-low` section creates a natural, soft lift.
- **Ambient Shadows:** Standard drop shadows are forbidden. When a floating effect is required, use **Ambient Shadows**: extra-diffused (blur: 32px-64px) and extremely low-opacity (4%-6%). The shadow color must be a tinted version of the `on-surface` color (`#1d1c13`), never a flat grey.
- **The "Ghost Border" Fallback:** If a container requires more definition for accessibility, use a **Ghost Border**. This is the `outline_variant` token at 15% opacity. It should be barely visible—a whisper of a boundary.
- **Soft Shapes:** Use the `full` (9999px) roundedness for buttons and search bars to mimic "bubbly" toy-like shapes. Use `xl` (3rem) for large containers to keep the environment feeling soft and safe.

### Border Radius Scale

| Token | Value | Usage |
|---|---|---|
| `sm` | 0.5rem (8px) | Minimum allowed radius |
| `md` | 1rem (16px) | Images inside cards |
| `lg` | 2rem (32px) | Interactive cards |
| `xl` | 3rem (48px) | Large containers, sections |
| `full` | 9999px | Buttons, chips, search bars |

### Spacing Scale

| Token | Value |
|---|---|
| `1` | 0.25rem (4px) |
| `2` | 0.5rem (8px) |
| `3` | 0.75rem (12px) |
| `4` | 1rem (16px) |
| `6` | 1.5rem (24px) |
| `8` | 2rem (32px) |
| `10` | 2.5rem (40px) |
| `12` | 3rem (48px) |
| `16` | 4rem (64px) |
| `20` | 5rem (80px) |

---

## 5. Components

### Buttons
- **Primary:** Heavily rounded (`full`), using the `primary` fill with `on_primary` text. Apply a subtle "lift" on hover using an Ambient Shadow.
- **Secondary:** Use `secondary_container` with `on_secondary_container` text. These should feel like "softer" alternatives for less urgent actions.

### Search & Inputs
- **The Bubble Input:** Use `surface_container_lowest` for the background with `full` rounding. The search icon should be encased in a `secondary` colored circle to act as a clear focal point, as seen in the reference "Digital Playroom" layout.

### Chips & Tags
- **Filter Chips:** Use `tertiary_container` for a splash of "sky blue" or "mint." Corners should be `full`. No borders; use the color shift to define the hit area.

### Cards & Lists
- **The "No Divider" Rule:** Never use horizontal lines to separate list items. Use **Vertical White Space** (from the `6` or `8` spacing scale) or subtle background shifts between `surface_container_low` and `surface_container_high`.
- **Interactive Cards:** Use `lg` (2rem) rounded corners. Images within cards should inherit a slightly smaller radius (`md`) to create a nested, "framed" look.

### Navigation Decor
- **Whimsical Accents:** Integrate "Star" and "Dot" decorative elements from the reference. These are not just icons; they are environmental textures. Place them at 10-20% opacity behind content to reinforce the "Playroom" theme.

---

## 6. Do's and Don'ts

### Do:
- **Do** use asymmetrical layouts. Let an image overlap two different background color sections.
- **Do** use generous white space. High-end design needs room to breathe.
- **Do** mix the palette. A `primary` button near a `tertiary` decorative element creates the "vibrant" feel requested.

### Don't:
- **Don't** use 1px solid black or grey borders. They break the whimsical illusion and look "un-designed."
- **Don't** use sharp corners. Anything less than `sm` (0.5rem) is too aggressive for this system.
- **Don't** crowd the interface. If the screen feels busy, increase the spacing tokens (e.g., move from `10` to `16`).
- **Don't** use pure black for text. Use `on_surface` (`#1d1c13`) to maintain the soft, premium feel of the "Digital Curator."

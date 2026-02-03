# Visual Style Guide

Complete reference for Pencil MCP style tags and visual design implementation.

## Pencil Style Tags Reference

### Aesthetic Tags (200+)

Complete list of available style guide tags:

heavyweight, confident, vertical-nav, sophisticated, vibrant, semantic-color, calm, publication, brutalist, command-center, minimal, webapp, industrial, soft-shadows, stone, warm, icon-nav, grayscale, modernist, rounded, bright, dramatic, badges, cli, approachable-tech, typography, serif, analytical, colorful, expressive, japanese, neon, high-end, friendly, stroke-based, serif-sans, cream-terracotta, typographic, geometric, editorial, light-mode, glow-effects, monospace-accent, black-stroke, quiet, serif-accent, data-focused, executive, refined, crisp, scandinavian, hospitality, soft, icons-only-nav, architectural, shadowed, gold-accent, primary-colors, electric, slate, data-dense, fintech, orange-accent, poster, organic, bold-type, bauhaus, nordic, cli-inspired, dynamic, cream, organic-modern, clean, earthy, humanist, cyan-accent, exclusive, rail-navigation, graphic, condensed, private, urban, green, precise, neon-accent, red-accent, humanist-digital, stone-palette, top-navigation, serif-contrast, dark, glow, warm-palette, dual-tone, monochrome, creative, data-centric, numbered, luxury, flat, tactile, monospace, terracotta-accent, code-inspired, professional, italic, structural, monitoring, gradient, bold, sage-green, dark-mode, sophisticated-neutral, gold, high-contrast, serif-headlines, rational, modern, burgundy-accent, de-stijl, systematic, website, blue-accent, tech, dual-font, developer, masthead, yellow-accent, floating-nav, muted-palette, informational, purple, icon-navigation, swiss, hacker, color-blocked, technical, elegant, soft-precision, mobile, classical, premium, terracotta, terminal, subtle, premium-saas, bold-typography, warm-neutral, green-accent, crimson-accent, engineering, dark-sidebar, playful, sharp, approachable, sidebar, data-driven, neutral, zen, warm-minimal, display, nature, uppercase, magazine, contemplative, airy, constructivist

### Tag Categories

Mood and Tone:

- Calm: calm, quiet, subtle, zen, contemplative
- Bold: bold, dramatic, confident, expressive, heavyweight
- Friendly: friendly, approachable, playful, warm, humanist
- Professional: professional, executive, sophisticated, refined, elegant

Color Themes:

- Light: light-mode, bright, airy, cream, warm-palette
- Dark: dark, dark-mode, dark-sidebar, monochrome, slate
- Colorful: colorful, vibrant, neon, electric, primary-colors
- Neutral: neutral, grayscale, muted-palette, stone-palette, sophisticated-neutral

Typography Styles:

- Sans-serif: modern, clean, crisp, swiss, rational
- Serif: serif, serif-headlines, serif-accent, serif-contrast, classical
- Monospace: monospace, monospace-accent, terminal, cli, code-inspired
- Display: display, typographic, bold-typography, large type, poster

Layout Approaches:

- Minimal: minimal, clean, airy, quiet, subtle
- Dense: data-dense, data-focused, data-centric, command-center, monitoring
- Grid: geometric, structural, systematic, bauhaus, de-stijl
- Organic: organic, organic-modern, nature, earthy, humanist-digital

Navigation Styles:

- sidebar, dark-sidebar, vertical-nav, rail-navigation
- top-navigation, floating-nav, icon-nav, icons-only-nav, icon-navigation

Industry Focus:

- Tech: tech, developer, engineering, hacker, cli-inspired
- Finance: fintech, data-driven, analytical, data-centric
- Creative: creative, editorial, magazine, publication, poster
- Luxury: luxury, premium, high-end, exclusive, gold

Accent Colors:

- blue-accent, green-accent, orange-accent, red-accent
- yellow-accent, cyan-accent, purple, neon-accent
- gold-accent, burgundy-accent, crimson-accent, terracotta-accent

---

## Color System

### Token Variables

Primary Colors:

- $--foreground: Primary text color
- $--background: Page background
- $--muted-foreground: Secondary text, placeholders
- $--card: Card backgrounds
- $--border: Borders and dividers
- $--primary: Primary actions, brand color
- $--secondary: Secondary elements

Semantic Colors:

- $--color-success: Success states (#22C55E typical)
- $--color-warning: Warning states (#F59E0B typical)
- $--color-error: Error states (#EF4444 typical)
- $--color-info: Info states (#3B82F6 typical)

Foreground Variants:

- $--color-success-foreground
- $--color-warning-foreground
- $--color-error-foreground
- $--color-info-foreground

### Light Theme Palette

Recommended values:

- Background: #FFFFFF or #FAFAFA
- Foreground: #0F172A or #111827
- Muted foreground: #64748B or #6B7280
- Border: #E2E8F0 or #E5E7EB
- Card: #FFFFFF with subtle shadow
- Primary: Brand color (commonly #6366F1, #3B82F6, #8B5CF6)

### Dark Theme Palette

Recommended values:

- Background: #0F172A, #111827, or #000000
- Foreground: #F8FAFC or #FFFFFF
- Muted foreground: #94A3B8 or #9CA3AF
- Border: #1E293B or #374151
- Card: #1E293B or #18181B
- Primary: Vibrant brand color (adjust for dark contrast)

### Gradient Definitions

Linear Gradient:

```
fill: {
  type: "linear",
  stops: [
    { position: 0, color: "#6366F1" },
    { position: 1, color: "#8B5CF6" }
  ],
  angle: 135
}
```

Radial Gradient:

```
fill: {
  type: "radial",
  stops: [
    { position: 0, color: "#6366F1" },
    { position: 1, color: "#3B82F6" }
  ],
  center: { x: 0.5, y: 0.5 }
}
```

---

## Typography System

### Font Tokens

- $--font-primary: Headings, labels, navigation
- $--font-secondary: Body text, descriptions, inputs

### Recommended Font Pairings

Modern Tech:

- Display: Inter, Geist, Satoshi
- Body: Inter, system-ui

Editorial:

- Display: Playfair Display, Fraunces
- Body: Source Serif Pro, Georgia

Creative:

- Display: Space Grotesk, Clash Display
- Body: DM Sans, Outfit

Minimal:

- Display: Archivo, Plus Jakarta Sans
- Body: Inter, Work Sans

Developer:

- Display: JetBrains Mono, Fira Code
- Body: Inter, SF Mono

### Size Scale

Hero headlines: 56-72px (some designs 80-120px)
Section headlines: 36-48px
Subsection headlines: 24-32px
Card titles: 18-24px
Body text: 16-18px
Small text: 14px
Caption: 12px

### Weight Guidelines

Headlines: Bold (600-700)
Subheadlines: Semibold (600) or Medium (500)
Body: Regular (400)
Emphasis: Semibold (600)
Light text: Light (300) for decorative use only

### Line Height

Headlines: 1.1-1.2
Subheadlines: 1.2-1.3
Body: 1.5-1.6
Tight (display): 1.0-1.1

---

## Spacing System

### Token Reference

- $--spacing-xs: 4px
- $--spacing-sm: 8px
- $--spacing-md: 16px
- $--spacing-lg: 24px
- $--spacing-xl: 32px
- $--spacing-2xl: 48px
- $--spacing-3xl: 64px
- $--spacing-4xl: 96px

### Component Spacing

Buttons: padding [10, 16] to [16, 32] depending on size
Inputs: padding [8, 16] to [12, 16]
Cards: padding 24px all sides
Card grids: gap 16-24px
Form fields: gap 16px vertical
Button groups: gap 12px
Page content: padding 32px
Sidebar items: padding [12, 16]

### Section Spacing

Between major sections: 64-96px
Between subsections: 32-48px
Within section content: 16-24px

---

## Border Radius Tokens

- $--radius-none: 0px (tables, sharp containers)
- $--radius-sm: 4px (subtle rounding)
- $--radius-md: 8px (cards, inputs, buttons)
- $--radius-lg: 12px (larger cards, modals)
- $--radius-xl: 16px (prominent elements)
- $--radius-2xl: 24px (hero cards, featured content)
- $--radius-pill: 9999px (buttons, badges, pills)

### Application Guidelines

Buttons: $--radius-pill or $--radius-md
Inputs: $--radius-md
Cards: $--radius-md to $--radius-lg
Modals: $--radius-lg
Badges: $--radius-pill
Images: $--radius-md to $--radius-lg
Containers: $--radius-none to $--radius-md

---

## Shadow System

### Elevation Levels

Level 1 (Subtle):

```
shadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
```

Level 2 (Card):

```
shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
```

Level 3 (Dropdown):

```
shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
```

Level 4 (Modal):

```
shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
```

Level 5 (Floating):

```
shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
```

### Dark Theme Shadows

For dark themes, reduce shadow opacity and consider glow effects:

```
shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
```

Glow alternative:

```
shadow: "0 0 20px rgba(99, 102, 241, 0.3)"
```

---

## Icon Guidelines

### Available Icon Sets

Lucide (Recommended):

- Family: lucide
- Style: Outline, rounded
- Examples: home, settings, user, search, plus, x

Material Symbols:

- Families: Material Symbols Outlined, Material Symbols Rounded, Material Symbols Sharp
- Weight property available (100-900)
- Examples: home, settings, person, search, add, close

Feather:

- Family: feather
- Style: Outline, rounded
- Examples: home, settings, user, search, plus, x

### Common Icon Mappings

| Action | Lucide | Material |
|--------|--------|----------|
| Home | home | home |
| Settings | settings | settings |
| User | user | person |
| Search | search | search |
| Add | plus | add |
| Close | x | close |
| Edit | edit, pencil | edit |
| Delete | trash, trash-2 | delete |
| Check | check | check |
| Arrow | arrow-right | arrow_forward |
| Menu | menu | menu |
| Dashboard | layout-dashboard | dashboard |

### Icon Sizing

Standard sizes:

- Small: 16x16px
- Medium: 20x20px
- Default: 24x24px
- Large: 32x32px

Navigation icons: 20-24px
Button icons: 16-20px
Feature icons: 24-48px
Decorative icons: 48-64px

---

## Image Treatment

### Image Sourcing with G Operation

Stock Images (Unsplash):

```javascript
G("heroImage", "stock", "modern office workspace bright minimal")
```

AI Generated:

```javascript
G("heroImage", "ai", "abstract gradient blue purple mesh background")
```

### Prompt Guidelines

Stock Image Prompts:

- Combine subject, style, mood, composition
- More specific yields better matches
- Examples: "team collaboration meeting bright", "laptop on desk minimal workspace"

AI Image Prompts:

- Describe feeling and human state, not just objects
- Focus on transformation imagery
- Examples: "person leaning back from laptop, eyes closed, slight smile, moment of satisfaction"

### Image Placement Rules

Never place AI images as background fills with text on top directly.

Always place images in dedicated frame containers.

Use overlay colors (rgba) on image backgrounds for text readability.

Product screenshots should have at least 50% visible above fold.

### Image Aspect Ratios

Hero images: 16:9 or custom wide
Feature images: 4:3 or 16:9
Card thumbnails: 1:1 or 4:3
Testimonial photos: 1:1 (circular)
Team photos: 1:1 or 3:4

---

## Responsive Considerations

### Viewport Targets

Desktop: 1440px (design target)
Large desktop: 1920px
Laptop: 1280px
Tablet: 768px
Mobile: 375px

### Hero Height Guidelines

Laptop screens: Hero communicates key information within 700px height.
Larger screens: Hero can scale taller.
Hero should fill majority of viewport before fold.

### Width Properties

fill_container: Responsive to parent width
fit_content: Size to content with optional minimum
Fixed pixel values: Use for consistent elements (sidebar, icons)

---

## Animation Principles

### Motion Guidelines

Purpose: Motion should guide attention and communicate, not decorate.

Performance: Prefer CSS transitions over JavaScript animations.

Subtlety: One well-crafted reveal beats scattered interactions.

Consistency: Same easing and duration across similar interactions.

### Suggested Durations

Micro-interactions: 150-200ms
Standard transitions: 200-300ms
Page transitions: 300-500ms
Complex animations: 500-1000ms

### Easing Functions

Standard: ease-out
Entrance: ease-out
Exit: ease-in
Emphasis: ease-in-out

---

Last Updated: 2026-02-03

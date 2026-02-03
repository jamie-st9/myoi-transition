# Reference Documentation

External resources and documentation links for Pencil MCP design.

## Official Resources

### Framer

- Framer Marketplace: https://www.framer.com/marketplace/templates/
- Framer Templates (Style): https://www.framer.com/marketplace/templates/category/style/
- Framer Templates (Modern): https://www.framer.com/marketplace/templates/category/modern/
- Framer Templates (Minimal): https://www.framer.com/marketplace/templates/category/minimal/
- Framer Templates (Dark): https://www.framer.com/marketplace/templates/category/dark/
- Framer Templates (Gradient): https://www.framer.com/marketplace/templates/category/gradient/
- Framer Templates (3D): https://www.framer.com/marketplace/templates/category/3d/
- Framer Templates (Animated): https://www.framer.com/marketplace/templates/category/animated/

### Design Systems

- Tailwind CSS: https://tailwindcss.com
- Tailwind CSS Colors: https://tailwindcss.com/docs/customizing-colors
- shadcn/ui: https://ui.shadcn.com
- Radix UI: https://www.radix-ui.com
- Vercel Design: https://vercel.com/design

### Icon Libraries

- Lucide Icons: https://lucide.dev
- Lucide Icon Search: https://lucide.dev/icons/
- Material Symbols: https://fonts.google.com/icons
- Feather Icons: https://feathericons.com
- Iconify: https://iconify.design

### Typography

- Google Fonts: https://fonts.google.com
- Variable Fonts: https://v-fonts.com
- Font Pairing: https://fontpair.co
- Type Scale: https://typescale.com

### Color Tools

- Coolors: https://coolors.co
- ColorHunt: https://colorhunt.co
- Happy Hues: https://www.happyhues.co
- Realtime Colors: https://www.realtimecolors.com

### Stock Images

- Unsplash: https://unsplash.com
- Pexels: https://www.pexels.com
- Pixabay: https://pixabay.com

---

## Pencil MCP Tools Quick Reference

### get_editor_state

Get current editor context before starting design work.

Parameters:
- include_schema: boolean - Include .pen file schema (set false if already known)

Usage: Call at start of design task to understand current context.

### open_document

Open or create a .pen file.

Parameters:
- filePathOrTemplate: string - File path or "new" for new document

Usage: Open existing file or create new canvas.

### get_guidelines

Load design guidelines for specific topic.

Parameters:
- topic: "landing-page" | "design-system" | "table" | "tailwind" | "code"

Usage: Load relevant guidelines before designing.

### get_style_guide_tags

Get all available style guide tags.

Parameters: None

Usage: Discover available styles for inspiration.

### get_style_guide

Get style guide for specific tags or name.

Parameters:
- tags: string[] - Array of style tags
- name: string (optional) - Specific style guide name

Usage: Get creative direction for design.

### batch_get

Read nodes from .pen file.

Parameters:
- filePath: string - Path to .pen file
- patterns: array - Search patterns
- nodeIds: string[] - Specific node IDs to read
- readDepth: number - How deep to read children
- searchDepth: number - How deep to search

Usage: Discover existing components and structure.

### batch_design

Execute design operations.

Parameters:
- filePath: string - Path to .pen file
- operations: string - Operations script

Operations:
- I(parent, data) - Insert node
- C(nodeId, parent, data) - Copy node
- U(path, data) - Update node
- R(path, data) - Replace node
- M(nodeId, parent, index) - Move node
- D(nodeId) - Delete node
- G(nodeId, type, prompt) - Generate/get image

Usage: Main tool for creating designs. Max 25 operations per call.

### get_screenshot

Capture visual of node.

Parameters:
- filePath: string - Path to .pen file
- nodeId: string - Node ID to capture

Usage: Validate design visually after batch_design.

### snapshot_layout

Get computed layout rectangles.

Parameters:
- filePath: string - Path to .pen file

Usage: Check layout positioning before inserting new nodes.

### get_variables

Get current variables and themes.

Parameters:
- filePath: string - Path to .pen file

Usage: Understand existing design tokens.

### set_variables

Add or update variables.

Parameters:
- filePath: string - Path to .pen file
- variables: object - Variable definitions

Usage: Set up or modify design tokens.

### find_empty_space_on_canvas

Find empty space for new content.

Parameters:
- filePath: string - Path to .pen file
- direction: string - Search direction
- size: object - Desired size

Usage: Find space for new screens or components.

---

## Framer Template Categories

### By Style (16 Categories)

| Category | Description | Use Case |
|----------|-------------|----------|
| 3D | Depth, perspective, immersive | Gaming, tech, creative |
| Animated | Motion, scroll effects | Engagement-focused |
| Black & White | High contrast, timeless | Portfolio, editorial |
| Colorful | Vibrant, multi-color | Creative, entertainment |
| Dark | Deep backgrounds, moody | Tech, luxury, gaming |
| Gradient | Color transitions | Modern, dynamic |
| Grid | Structured layouts | Portfolio, galleries |
| Illustrative | Custom graphics | Creative, unique |
| Large Type | Typography-forward | Statement, creative |
| Light | Bright, airy | Professional, friendly |
| Minimal | Clean, simple | Business, portfolio |
| Modern | Contemporary, sleek | SaaS, startups |
| Monochromatic | Single color family | Elegant, focused |
| Pastel | Soft, muted colors | Wellness, lifestyle |
| Professional | Business-focused | B2B, enterprise |
| Retro | Vintage-inspired | Creative, nostalgic |

### By Industry (4 Main Categories)

| Category | Templates | Examples |
|----------|-----------|----------|
| Business | 3,000+ | SaaS, Landing, Ecommerce |
| Creative | 1,700+ | Portfolio, Art, Design |
| Community | 214 | Education, Non-profit |
| Style | 2,300+ | Cross-category aesthetics |

---

## Common Design Tokens

### Colors (Light Theme)

```
$--background: #FFFFFF
$--foreground: #0F172A
$--muted-foreground: #64748B
$--card: #FFFFFF
$--border: #E2E8F0
$--primary: #6366F1
$--secondary: #F1F5F9
```

### Colors (Dark Theme)

```
$--background: #0F172A
$--foreground: #F8FAFC
$--muted-foreground: #94A3B8
$--card: #1E293B
$--border: #334155
$--primary: #818CF8
$--secondary: #1E293B
```

### Typography

```
$--font-primary: Inter, system-ui
$--font-secondary: Inter, system-ui
```

### Border Radius

```
$--radius-none: 0
$--radius-sm: 4
$--radius-md: 8
$--radius-lg: 12
$--radius-xl: 16
$--radius-pill: 9999
```

---

## Conversion Best Practices

### Above the Fold Checklist

- [ ] Clear headline with transformation focus
- [ ] Subheadline explaining mechanism/benefit
- [ ] Primary CTA visible
- [ ] Trust signal (logos, testimonial, metric)
- [ ] Product visual (50%+ visible)

### Section Flow

1. Hero: Capture attention, communicate value
2. Problem/Solution: Show you understand
3. Features: Demonstrate capabilities
4. Social Proof: Build trust
5. Pricing: Make decision easy
6. FAQ: Handle objections
7. Final CTA: Drive action
8. Footer: Provide resources

### CTA Best Practices

- One primary action per section
- Action-oriented text ("Start Free Trial" not "Submit")
- High contrast button
- Trust reassurance near CTA
- Secondary action with lower commitment

---

## Accessibility Considerations

### Contrast Ratios

- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

### Text on Images

- Use overlay with sufficient opacity
- Test readability at multiple breakpoints
- Provide fallback for text-only reading

### Interactive Elements

- Visible focus states
- Sufficient click/tap targets (44x44px minimum)
- Keyboard navigable

---

Last Updated: 2026-02-03

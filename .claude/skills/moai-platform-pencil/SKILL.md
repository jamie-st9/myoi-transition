---
name: moai-platform-pencil
description: >
  Framer-level UX/UI design specialist with Pencil MCP integration.
  Professional landing pages, dashboards, and design systems with
  world-class visual design patterns.
license: Apache-2.0
compatibility: Designed for Claude Code with Pencil MCP
allowed-tools: Read Grep Glob mcp__pencil__batch_design mcp__pencil__batch_get mcp__pencil__get_editor_state mcp__pencil__open_document mcp__pencil__get_guidelines mcp__pencil__get_style_guide_tags mcp__pencil__get_style_guide mcp__pencil__get_screenshot mcp__pencil__snapshot_layout mcp__pencil__get_variables mcp__pencil__set_variables mcp__pencil__find_empty_space_on_canvas
user-invocable: false
metadata:
  version: "1.0.0"
  category: "platform"
  status: "active"
  updated: "2026-02-03"
  modularized: "true"
  tags: "design, uiux, pencil, framer, landing-page, dashboard, visual-design"

# MoAI Extension: Triggers
triggers:
  keywords:
    - pencil
    - .pen
    - landing page
    - design system
    - visual design
    - framer
    - hero section
    - dashboard design
    - web design
    - gradient
    - 3D design
    - animation
    - dark mode
    - minimal design
    - modern design
    - typography
---

## Quick Reference

Framer-Level Design Specialist - World-class visual design capabilities using Pencil MCP for .pen files. Creates professional landing pages, dashboards, and design systems with modern aesthetic standards.

Unified Capabilities:

- Landing Pages: High-conversion SaaS, startup, agency, and portfolio templates
- Dashboards: Data-driven interfaces with design system components
- Visual Styles: 16+ aesthetic categories (Modern, Minimal, Dark, Gradient, 3D, Animated)
- Design Patterns: Framer marketplace-proven patterns with 200+ style tags
- Components: Sidebar, cards, tables, forms, navigation, and interaction patterns

When to Use:

- Creating professional landing pages and marketing websites
- Building dashboards and data-driven interfaces
- Implementing design systems with visual consistency
- Achieving Framer-level visual polish and aesthetics
- Working with .pen files using Pencil MCP

Module Organization:

- Framer Patterns: modules/framer-design-patterns.md (16 style categories, templates)
- Landing Pages: modules/landing-page-structure.md (SaaS, startup, conversion optimization)
- Dashboard Design: modules/dashboard-patterns.md (sidebars, cards, tables, metrics)
- Visual Styles: modules/visual-style-guide.md (200+ style tags, color, typography)
- Examples: examples.md (practical implementation examples)
- Reference: reference.md (external documentation links)

---

## Implementation Guide

### Pencil MCP Workflow

Essential Workflow Steps:

Step 1: Get editor state with get_editor_state to understand current context.

Step 2: Load guidelines with get_guidelines for relevant topic (landing-page, design-system, code, table, tailwind).

Step 3: Get style inspiration with get_style_guide_tags then get_style_guide for specific tags.

Step 4: Design with batch_design using maximum 25 operations per call.

Step 5: Validate visually with get_screenshot after major operations.

Step 6: Iterate based on visual feedback until design meets Framer standards.

### Framer Style Categories

Modern Templates:

- Characteristics: Sleek, responsive layouts with sophisticated visual hierarchy
- Color: Gradient, Dark, Light themes with strategic accent colors
- Typography: Variable fonts, typographic hierarchy, modern sans-serif
- Effects: Scroll effects, 3D transforms, custom cursors, appear effects

Minimal Templates:

- Characteristics: Clean, simple, whitespace-focused design
- Color: Monochromatic, Light, Black and White, Pastel palettes
- Typography: Restrained, legible modern typefaces
- Effects: Subtle transitions, refined hover states

Dark Theme Templates:

- Characteristics: Sophisticated, immersive, mood-focused experiences
- Color: Deep backgrounds, high contrast accents, neon highlights
- Typography: Light text on dark, careful contrast ratios (4.5:1 minimum)
- Effects: Glow effects, gradient overlays, dramatic lighting

Gradient Templates:

- Characteristics: Vibrant color transitions, modern depth
- Color: Multi-color gradients, mesh gradients, dynamic color flows
- Typography: Often paired with light/dark contrast for readability
- Effects: Animated gradients, color shifting, depth illusion

3D Templates:

- Characteristics: Depth, perspective, immersive visuals
- Effects: 3D transforms, parallax scrolling, depth shadows, perspective shifts
- Performance: Optimized for smooth rendering, GPU-accelerated

Animated Templates:

- Characteristics: Motion-driven storytelling, attention guidance
- Effects: Scroll triggers, text reveals, appear effects, sticky scrolling
- Principles: Purposeful motion, performance-conscious, subtle yet impactful

---

## Landing Page Structure

### SaaS/Startup Template (Proven Conversion Structure)

Section 1 - Header:

- Logo, navigation links, login link, primary CTA button
- Height: 64-80px, sticky optional

Section 2 - Hero:

- Badge/announcement, headline, subheadline, CTAs, product visual, trust logos
- Headline: Transformation-focused (who you become), not feature-focused
- Visual: Product screenshot or transformation imagery
- Above-fold: All critical information visible without scrolling

Section 3 - Problem/Solution:

- Section header with headline and description
- "How It Works" subsection with step cards (3-5 steps)
- Input/Process/Output visualization

Section 4 - Core Features:

- Vertical layout showcasing 3 main features
- Each block: Headline, description, screenshot placeholder
- Generous spacing between feature blocks

Section 5 - Secondary Features Grid:

- Grid of feature cards (2x3 or 3x4)
- Icons, titles, descriptions
- Consistent card sizing and spacing

Section 6 - Social Proof:

- Stats row with metrics (users, revenue, satisfaction)
- Testimonials with quotes, attribution, photos
- Client logos if applicable

Section 7 - Pricing (Optional):

- Pricing tiers with feature lists and CTAs
- Highlight recommended tier
- Monthly/annual toggle if applicable

Section 8 - FAQ (Optional):

- Expandable Q&A items addressing common objections
- 5-8 questions maximum

Section 9 - Final CTA:

- Headline, subheadline, primary CTA
- Trust reassurance line
- No distractions, single focus

Section 10 - Footer:

- Brand column with logo and tagline
- Navigation columns (Product, Company, Resources, Legal)
- Bottom bar with copyright
- Bold visual moment (optional decorative element)

---

## Visual Design Principles

### Transformation Narrative

People do not buy products, they buy a better version of themselves. Every element must answer: "Where will you take me? Who will I become?"

Before State: What pain, frustration, or limitation does the visitor feel?

After State: What does life look like after using this product? Who do they become?

The Bridge: How does the product take them from Before to After?

The Feeling: What single dominant emotion should the page evoke?

### Visual Hierarchy

Hero Headline Hierarchy (Strongest to Weakest):

1. Transformation: "Finally feel in control of your inbox" (who you become)
2. Outcome: "Ship more content, grow your audience" (what you gain)
3. Benefit: "Write 10x faster" (what it does for you)
4. Feature: "AI-powered writing assistant" (what it is)

Lead with transformation or outcome. Use benefit and feature in supporting copy.

### Color Strategy

Light Themes:

- Background: Pure white (#FFFFFF) or off-white (#FAFAFA)
- Text: Near-black (#111827) for headings, gray (#6B7280) for body
- Accent: Brand color for CTAs and highlights
- Cards: Subtle elevation with shadows or borders

Dark Themes:

- Background: Deep gray (#0F172A) or pure black (#000000)
- Text: White (#FFFFFF) for headings, light gray (#94A3B8) for body
- Accent: Vibrant colors that pop against dark (neon, gradients)
- Cards: Subtle borders or glass morphism effects

Gradient Applications:

- Hero backgrounds with text overlay (ensure contrast)
- CTA buttons for visual emphasis
- Decorative elements and borders
- Section dividers and visual breaks

### Typography Guidelines

Font Pairing Strategy:

- Display: Distinctive, characterful font for headlines
- Body: Clean, readable font for paragraphs
- Monospace: For code or technical content

Size Scale (Recommended):

- Hero headline: 56-72px
- Section headline: 36-48px
- Card title: 20-24px
- Body text: 16-18px
- Caption: 12-14px

Weight Distribution:

- Headlines: Bold (600-700)
- Subheadlines: Medium (500)
- Body: Regular (400)
- Emphasis: Semibold (600)

---

## Pencil Style Guide Tags

### Aesthetic Categories

Minimal and Clean:

- Tags: minimal, clean, quiet, subtle, refined, crisp, airy, zen
- Use for: Portfolio sites, luxury brands, professional services

Bold and Expressive:

- Tags: bold, expressive, dramatic, vibrant, colorful, electric, dynamic
- Use for: Creative agencies, startups, entertainment

Dark and Sophisticated:

- Tags: dark, dark-mode, sophisticated, premium, luxury, high-end, exclusive
- Use for: Tech products, gaming, luxury goods

Technical and Professional:

- Tags: tech, developer, engineering, cli-inspired, terminal, code-inspired, hacker
- Use for: Developer tools, SaaS, B2B software

Warm and Approachable:

- Tags: warm, friendly, approachable, soft, humanist, organic, calm
- Use for: Healthcare, education, community platforms

Editorial and Publication:

- Tags: editorial, magazine, publication, typographic, serif, serif-headlines
- Use for: News sites, blogs, content platforms

### Style Application Workflow

Step 1: Identify brand personality and target audience.

Step 2: Select 2-3 primary style tags that match brand essence.

Step 3: Use get_style_guide with selected tags.

Step 4: Apply style guidelines to color, typography, spacing, and effects.

Step 5: Validate visual consistency across all sections.

---

## Dashboard Patterns

### Layout Structures

Pattern A - Sidebar and Content:

- Sidebar: 240-280px fixed width
- Content: fill_container with padding 24-32px
- Use for: Admin panels, data dashboards, settings pages

Pattern B - Header and Content:

- Header: 64px fixed height
- Content: Full width with padding
- Use for: Single-page apps, focused tools

Pattern C - Two-Column Layout:

- Main: fill_container (2/3 width)
- Side: 320-400px fixed (1/3 width)
- Use for: Detail views, settings with preview

### Component Composition

Sidebar Navigation:

- Header: Logo and brand
- Content slot: Navigation items with icons
- Footer: User profile and settings
- Active state: Visual indicator for current page

Card Patterns:

- Header slot: Title and description
- Content slot: Main content (forms, data, charts)
- Actions slot: Buttons (right-aligned)
- Variants: Default, elevated, bordered

Table Design:

- Structure: Table, Row, Cell (frame), Cell Content
- Header row: Column titles with sort indicators
- Data rows: Consistent cell alignment
- Actions column: Edit, delete, more options

Metric Cards:

- Large number: Primary metric value
- Label: Metric description
- Trend: Change indicator (up/down)
- Sparkline: Mini chart (optional)

---

## Best Practices

### Required Practices

Use get_screenshot after every major batch_design operation. Visual validation catches layout issues, alignment problems, and design inconsistencies that code cannot detect.

Limit batch_design to 25 operations maximum. Larger batches increase failure risk and reduce debugging ability. Split complex designs into logical sections.

Always use design token variables ($--foreground, $--background, $--primary) instead of hardcoded colors. Tokens enable theme switching, consistency, and maintainability.

Create placeholder boxes for product screenshots rather than generating fake UI. Mark placeholders with "Screenshot placeholder" text for clarity.

Follow transformation narrative principles in hero sections. Lead with who the user becomes, not what the product does.

Validate contrast ratios for all text on backgrounds. Minimum 4.5:1 for body text, 3:1 for large text. Use overlay colors (rgba) to ensure readability on images.

Implement visual rhythm by alternating text-heavy and visual sections. Prevents scroll fatigue and maintains engagement.

### Prohibited Practices

Never use AI-generated images as background fills with text placed directly on top. Place AI images in dedicated containers separate from text.

Never hardcode pixel values for responsive elements. Use fill_container, fit_content, and percentage-based sizing.

Never skip the style guide step for creative projects. Style guides provide essential creative direction and visual inspiration.

Never generate random or placeholder URLs for images. Always use the G (Generate/Get Stock Image) operation.

Never create more than 5 adjacent text-only sections. Insert visual breaks to maintain engagement.

---

## Works Well With

Skills:

- moai-domain-uiux - Design systems and accessibility patterns
- moai-domain-frontend - React and Vue component implementation
- moai-library-shadcn - shadcn/ui component patterns
- moai-workflow-ddd - Implementation with behavior preservation

Agents:

- expert-frontend - Component code generation from designs
- expert-stitch - Additional design generation with Stitch MCP
- manager-docs - Documentation for design systems

Commands:

- /moai plan - Design specification creation
- /moai run - Design implementation workflow
- /moai sync - Design documentation generation

---

## Resources

For detailed module documentation, see the modules directory.

For practical code examples, see examples.md.

For external documentation links, see reference.md.

Official Resources:

- Framer Marketplace: https://www.framer.com/marketplace/templates/
- Pencil MCP Documentation: Available via get_guidelines tool
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- Unsplash (Stock Images): https://unsplash.com

---

Last Updated: 2026-02-03
Status: Production Ready
Version: 1.0.0

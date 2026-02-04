---
name: moai-platform-pencil
description: >
  Framer-level UX/UI design specialist with Pencil MCP integration for professional
  design management. Use when creating UI mockups, wireframes, prototypes, landing pages,
  dashboards, or any visual design task requiring Pencil MCP tools.
  Covers design file management, batch design operations, design-to-code workflows,
  and CDN image expiry mitigation strategies.
license: Apache-2.0
compatibility: Designed for Claude Code
allowed-tools: Read Grep Glob Bash mcp__pencil__get_editor_state mcp__pencil__open_document mcp__pencil__batch_get mcp__pencil__batch_design mcp__pencil__get_screenshot mcp__pencil__snapshot_layout mcp__pencil__get_guidelines mcp__pencil__get_style_guide mcp__pencil__get_style_guide_tags mcp__pencil__get_variables mcp__pencil__set_variables mcp__pencil__find_empty_space_on_canvas mcp__pencil__search_all_unique_properties mcp__pencil__replace_all_matching_properties
user-invocable: false
metadata:
  version: "1.0.0"
  category: "platform"
  status: "active"
  updated: "2026-02-04"
  modularized: "false"
  tags: "pencil, design, uiux, pen, mcp, design-system"
  author: "MoAI-ADK"
  related-skills: "moai-domain-uiux, moai-domain-frontend"

# MoAI Extension: Progressive Disclosure
progressive_disclosure:
  enabled: true
  level1_tokens: 100
  level2_tokens: 5000

# MoAI Extension: Triggers
triggers:
  keywords: ["pencil", "pen", "design", "ui design", "ux", "mockup", "wireframe", "prototype", "landing page", "dashboard"]
  agents: ["expert-frontend", "manager-spec"]
  phases: ["plan", "run"]
---

# moai-platform-pencil: Pencil MCP Design Specialist

## Design File Management Rules

### Storage Convention

- [HARD] All .pen files MUST be stored in `{project_root}/designs/` directory
- [HARD] NEVER create .pen files outside the project directory
- [HARD] Use descriptive filenames: `{project-name}-{purpose}.pen` (e.g., `myoi-transition.pen`, `dashboard-admin.pen`)
- Screenshot backups go in `designs/screenshots/`

### Project Setup Requirements

When working with Pencil in any project:

1. Ensure `designs/` directory exists
2. Ensure `designs/screenshots/.gitkeep` exists
3. Ensure `.moai/config/sections/system.yaml` has designs directory config:

```yaml
designs:
  base: designs/
  retention_days: null
  description: Pencil .pen files and screenshot backups for UI designs
  subdirectories:
    screenshots: designs/screenshots/
```

4. Verify `.gitignore` does NOT exclude .pen files

### CDN Image Expiry Mitigation

Pencil G() (AI-generated) images use CDN URLs that expire after approximately 24 hours.

- [HARD] Always take screenshots of completed designs and save to `designs/screenshots/` as backup
- Before deploying to production, convert CDN image URLs to local assets
- Screenshot naming convention: `{screen-name}-{date}.png`

---

## Pencil MCP Tool Usage

### Workflow Order

1. `get_editor_state` - Check current editor state first
2. `open_document` - Open .pen file (may timeout, retry once)
3. `batch_get` - Read design structure
4. `get_guidelines` - Get design rules for the task
5. `get_style_guide_tags` + `get_style_guide` - Get design inspiration
6. `batch_design` - Create or modify designs
7. `get_screenshot` - Verify results visually
8. `snapshot_layout` - Check computed layout

### batch_design Best Practices

- Maximum 25 operations per call
- Use Insert I() for new nodes
- Use Update U() for modifications
- Use Replace R() for full node replacement
- Always verify with get_screenshot after batch operations
- For large designs (6+ screens), work in sequential batches

### Common Design Patterns

- Mobile-first: 375x812 frame size
- Desktop: 1440x900 frame size
- Frame spacing: 100px gap between frames on canvas
- Standard padding: 24px for content areas
- Use Inter font family for Korean/English mixed content

---

## Design-to-Code Workflow

### When implementing designs in code:

1. Use `batch_get` with `readDepth: 3` to extract design tokens
2. Map Pencil properties to CSS/Tailwind:
   - fill maps to background-color / bg-*
   - fontSize maps to text-*
   - fontWeight maps to font-*
   - padding maps to p-*
   - gap maps to gap-*
   - borderRadius maps to rounded-*
3. Use `get_screenshot` for visual reference during implementation
4. Validate implementation against screenshots

---

## Integration with MoAI Workflows

### During /moai plan

- Capture UI requirements and screen flow
- Create design mockups for each screen
- Store designs in `designs/{spec-name}.pen`

### During /moai run

- Reference designs for implementation accuracy
- Use batch_get to extract exact values
- Verify implementation matches design via screenshots

### During /moai sync

- Include design screenshots in documentation
- Reference .pen files in technical documentation

---

Version: 1.0.0
Last Updated: 2026-02-04

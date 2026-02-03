# Landing Page Structure

Comprehensive landing page patterns for high-conversion websites.

## SaaS Landing Page Template

### Section 1: Header (64-80px)

Structure:

```javascript
header=I(page, {type: "frame", name: "Header", layout: "horizontal", width: "fill_container", height: 64, padding: [0, 24], alignItems: "center", justifyContent: "space_between"})
logo=I(header, {type: "frame", layout: "horizontal", gap: 8, alignItems: "center"})
logoIcon=I(logo, {type: "frame", width: 32, height: 32, fill: "$--primary", cornerRadius: 8})
logoText=I(logo, {type: "text", content: "BrandName", fontSize: 20, fontWeight: "bold", fill: "$--foreground"})
nav=I(header, {type: "frame", layout: "horizontal", gap: 32, alignItems: "center"})
navItem1=I(nav, {type: "text", content: "Features", fontSize: 14, fill: "$--muted-foreground"})
navItem2=I(nav, {type: "text", content: "Pricing", fontSize: 14, fill: "$--muted-foreground"})
navItem3=I(nav, {type: "text", content: "About", fontSize: 14, fill: "$--muted-foreground"})
actions=I(header, {type: "frame", layout: "horizontal", gap: 12, alignItems: "center"})
loginLink=I(actions, {type: "text", content: "Log in", fontSize: 14, fill: "$--muted-foreground"})
ctaBtn=I(actions, {type: "frame", padding: [10, 20], fill: "$--primary", cornerRadius: 8})
ctaText=I(ctaBtn, {type: "text", content: "Get Started", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
```

Guidelines:

- Logo on left, navigation center or left, CTA on right
- Sticky header optional (position: sticky, top: 0)
- Transparent or solid background
- Mobile: Hamburger menu for navigation

### Section 2: Hero (fit_content, 500-800px)

Structure - Text Left, Visual Right:

```javascript
hero=I(page, {type: "frame", name: "Hero", layout: "horizontal", width: "fill_container", height: "fit_content(600)", padding: [80, 120], gap: 64, alignItems: "center"})
heroContent=I(hero, {type: "frame", layout: "vertical", width: "fill_container", gap: 24})
badge=I(heroContent, {type: "frame", layout: "horizontal", padding: [6, 12], fill: "$--secondary", cornerRadius: 9999, gap: 8, width: "fit_content"})
badgeText=I(badge, {type: "text", content: "New Feature", fontSize: 12, fontWeight: "500", fill: "$--foreground"})
headline=I(heroContent, {type: "text", content: "Transform Your Workflow Today", fontSize: 56, fontWeight: "bold", fill: "$--foreground", lineHeight: 1.1})
subheadline=I(heroContent, {type: "text", content: "The all-in-one platform that helps teams ship faster and collaborate better.", fontSize: 20, fill: "$--muted-foreground", lineHeight: 1.5})
ctas=I(heroContent, {type: "frame", layout: "horizontal", gap: 16})
primaryCta=I(ctas, {type: "frame", padding: [16, 32], fill: "$--primary", cornerRadius: 8})
primaryCtaText=I(primaryCta, {type: "text", content: "Start Free Trial", fontSize: 16, fontWeight: "600", fill: "#FFFFFF"})
secondaryCta=I(ctas, {type: "frame", padding: [16, 32], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8})
secondaryCtaText=I(secondaryCta, {type: "text", content: "Watch Demo", fontSize: 16, fontWeight: "500", fill: "$--foreground"})
trustLogos=I(heroContent, {type: "frame", layout: "horizontal", gap: 24, alignItems: "center"})
trustText=I(trustLogos, {type: "text", content: "Trusted by 1000+ companies", fontSize: 14, fill: "$--muted-foreground"})
heroVisual=I(hero, {type: "frame", width: "fill_container", height: 400, fill: "#F3F4F6", cornerRadius: 16})
screenshotLabel=I(heroVisual, {type: "text", content: "Screenshot placeholder", fontSize: 16, fill: "$--muted-foreground"})
```

Structure - Centered Hero:

```javascript
hero=I(page, {type: "frame", name: "Hero", layout: "vertical", width: "fill_container", height: "fit_content(700)", padding: [80, 120], gap: 32, alignItems: "center"})
badge=I(hero, {type: "frame", padding: [6, 12], fill: "$--secondary", cornerRadius: 9999})
badgeText=I(badge, {type: "text", content: "Announcing v2.0", fontSize: 12, fontWeight: "500", fill: "$--foreground"})
headline=I(hero, {type: "text", content: "Build Products Faster", fontSize: 64, fontWeight: "bold", fill: "$--foreground", textAlign: "center", width: 800})
subheadline=I(hero, {type: "text", content: "Everything you need to ship your next big idea.", fontSize: 20, fill: "$--muted-foreground", textAlign: "center", width: 600})
ctas=I(hero, {type: "frame", layout: "horizontal", gap: 16})
heroVisual=I(hero, {type: "frame", width: 1000, height: 500, fill: "#F3F4F6", cornerRadius: 16})
```

Hero Guidelines:

- Headline: Transformation-focused (who you become)
- Subheadline: Clear benefit or mechanism
- One primary CTA, one optional secondary
- Product visual with 50%+ above fold
- Trust signal (logos, metrics, testimonial)

### Section 3: Problem/Solution

Structure:

```javascript
section=I(page, {type: "frame", name: "Problem Solution", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 48})
sectionHeader=I(section, {type: "frame", layout: "vertical", gap: 16, width: 600})
sectionTitle=I(sectionHeader, {type: "text", content: "How It Works", fontSize: 36, fontWeight: "bold", fill: "$--foreground"})
sectionDesc=I(sectionHeader, {type: "text", content: "Three simple steps to transform your workflow", fontSize: 18, fill: "$--muted-foreground"})
steps=I(section, {type: "frame", layout: "horizontal", gap: 32, width: "fill_container"})
step1=I(steps, {type: "frame", layout: "vertical", gap: 16, width: "fill_container"})
step1Num=I(step1, {type: "frame", width: 48, height: 48, fill: "$--primary", cornerRadius: 9999, alignItems: "center", justifyContent: "center"})
step1NumText=I(step1Num, {type: "text", content: "1", fontSize: 20, fontWeight: "bold", fill: "#FFFFFF"})
step1Title=I(step1, {type: "text", content: "Connect Your Tools", fontSize: 20, fontWeight: "600", fill: "$--foreground"})
step1Desc=I(step1, {type: "text", content: "Integrate with your existing workflow in minutes.", fontSize: 16, fill: "$--muted-foreground"})
step2=I(steps, {type: "frame", layout: "vertical", gap: 16, width: "fill_container"})
step3=I(steps, {type: "frame", layout: "vertical", gap: 16, width: "fill_container"})
```

Guidelines:

- 3-5 steps maximum
- Clear numbered progression
- Brief title + description per step
- Optional visual for each step

### Section 4: Core Features

Structure - Alternating Layout:

```javascript
features=I(page, {type: "frame", name: "Features", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 64})
feature1=I(features, {type: "frame", layout: "horizontal", gap: 64, alignItems: "center"})
feature1Content=I(feature1, {type: "frame", layout: "vertical", gap: 16, width: "fill_container"})
feature1Title=I(feature1Content, {type: "text", content: "Automated Workflows", fontSize: 32, fontWeight: "bold", fill: "$--foreground"})
feature1Desc=I(feature1Content, {type: "text", content: "Set up powerful automations that save hours every week.", fontSize: 18, fill: "$--muted-foreground", lineHeight: 1.6})
feature1Visual=I(feature1, {type: "frame", width: "fill_container", height: 300, fill: "#F3F4F6", cornerRadius: 16})
feature2=I(features, {type: "frame", layout: "horizontal", gap: 64, alignItems: "center"})
feature2Visual=I(feature2, {type: "frame", width: "fill_container", height: 300, fill: "#F3F4F6", cornerRadius: 16})
feature2Content=I(feature2, {type: "frame", layout: "vertical", gap: 16, width: "fill_container"})
```

Guidelines:

- Alternate text/visual sides for rhythm
- One feature per block
- Screenshot placeholder for each feature
- Focus on outcomes, not just capabilities

### Section 5: Feature Grid

Structure:

```javascript
gridSection=I(page, {type: "frame", name: "Feature Grid", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 48})
gridHeader=I(gridSection, {type: "frame", layout: "vertical", gap: 16, alignItems: "center"})
gridTitle=I(gridHeader, {type: "text", content: "Everything You Need", fontSize: 36, fontWeight: "bold", fill: "$--foreground", textAlign: "center"})
grid=I(gridSection, {type: "frame", layout: "horizontal", gap: 24, width: "fill_container", flexWrap: "wrap"})
card1=I(grid, {type: "frame", layout: "vertical", gap: 16, width: 360, padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}})
card1Icon=I(card1, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "zap", width: 24, height: 24, fill: "$--primary"})
card1Title=I(card1, {type: "text", content: "Lightning Fast", fontSize: 18, fontWeight: "600", fill: "$--foreground"})
card1Desc=I(card1, {type: "text", content: "Built for speed with sub-second response times.", fontSize: 14, fill: "$--muted-foreground"})
```

Guidelines:

- 6-9 cards in 2x3 or 3x3 grid
- Icon + title + description per card
- Consistent card sizing
- Optional hover states

### Section 6: Social Proof

Structure:

```javascript
social=I(page, {type: "frame", name: "Social Proof", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 48, fill: "$--secondary"})
stats=I(social, {type: "frame", layout: "horizontal", gap: 64, justifyContent: "center"})
stat1=I(stats, {type: "frame", layout: "vertical", gap: 8, alignItems: "center"})
stat1Value=I(stat1, {type: "text", content: "10,000+", fontSize: 48, fontWeight: "bold", fill: "$--foreground"})
stat1Label=I(stat1, {type: "text", content: "Active Users", fontSize: 16, fill: "$--muted-foreground"})
stat2=I(stats, {type: "frame", layout: "vertical", gap: 8, alignItems: "center"})
stat3=I(stats, {type: "frame", layout: "vertical", gap: 8, alignItems: "center"})
testimonials=I(social, {type: "frame", layout: "horizontal", gap: 24})
testimonial1=I(testimonials, {type: "frame", layout: "vertical", gap: 16, padding: 24, fill: "$--card", cornerRadius: 12, width: "fill_container"})
quote1=I(testimonial1, {type: "text", content: "\"This tool transformed how our team works. We ship 2x faster now.\"", fontSize: 16, fill: "$--foreground", fontStyle: "italic"})
author1=I(testimonial1, {type: "frame", layout: "horizontal", gap: 12, alignItems: "center"})
authorPhoto1=I(author1, {type: "frame", width: 40, height: 40, fill: "#E5E7EB", cornerRadius: 9999})
authorInfo1=I(author1, {type: "frame", layout: "vertical", gap: 2})
authorName1=I(authorInfo1, {type: "text", content: "Sarah Chen", fontSize: 14, fontWeight: "600", fill: "$--foreground"})
authorTitle1=I(authorInfo1, {type: "text", content: "CTO at TechCorp", fontSize: 12, fill: "$--muted-foreground"})
```

Guidelines:

- 3-4 key metrics
- 2-3 testimonials with photos
- Company logos if applicable
- Background color for visual break

### Section 7: Pricing (Optional)

Structure:

```javascript
pricing=I(page, {type: "frame", name: "Pricing", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 48, alignItems: "center"})
pricingHeader=I(pricing, {type: "frame", layout: "vertical", gap: 16, alignItems: "center"})
pricingTitle=I(pricingHeader, {type: "text", content: "Simple, Transparent Pricing", fontSize: 36, fontWeight: "bold", fill: "$--foreground"})
pricingToggle=I(pricing, {type: "frame", layout: "horizontal", padding: 4, fill: "$--secondary", cornerRadius: 8})
plans=I(pricing, {type: "frame", layout: "horizontal", gap: 24})
plan1=I(plans, {type: "frame", layout: "vertical", gap: 24, padding: 32, fill: "$--card", cornerRadius: 16, stroke: {fill: "$--border", thickness: 1}, width: 320})
plan1Name=I(plan1, {type: "text", content: "Starter", fontSize: 20, fontWeight: "600", fill: "$--foreground"})
plan1Price=I(plan1, {type: "frame", layout: "horizontal", gap: 4, alignItems: "baseline"})
plan1Amount=I(plan1Price, {type: "text", content: "$29", fontSize: 48, fontWeight: "bold", fill: "$--foreground"})
plan1Period=I(plan1Price, {type: "text", content: "/month", fontSize: 16, fill: "$--muted-foreground"})
plan1Features=I(plan1, {type: "frame", layout: "vertical", gap: 12})
plan2=I(plans, {type: "frame", layout: "vertical", gap: 24, padding: 32, fill: "$--primary", cornerRadius: 16, width: 340})
```

Guidelines:

- 2-4 pricing tiers
- Highlight recommended tier
- Clear feature lists
- Monthly/annual toggle optional
- CTA on each tier

### Section 8: FAQ (Optional)

Structure:

```javascript
faq=I(page, {type: "frame", name: "FAQ", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 48})
faqHeader=I(faq, {type: "frame", layout: "vertical", gap: 16, alignItems: "center"})
faqTitle=I(faqHeader, {type: "text", content: "Frequently Asked Questions", fontSize: 36, fontWeight: "bold", fill: "$--foreground"})
faqList=I(faq, {type: "frame", layout: "vertical", gap: 16, width: 800, alignSelf: "center"})
faqItem1=I(faqList, {type: "frame", layout: "vertical", gap: 8, padding: 24, fill: "$--card", cornerRadius: 12})
faqQ1=I(faqItem1, {type: "text", content: "How do I get started?", fontSize: 18, fontWeight: "600", fill: "$--foreground"})
faqA1=I(faqItem1, {type: "text", content: "Sign up for a free trial and follow our quick start guide.", fontSize: 16, fill: "$--muted-foreground"})
```

Guidelines:

- 5-8 questions maximum
- Address common objections
- Expandable/collapsible optional
- Link to full help center

### Section 9: Final CTA

Structure:

```javascript
finalCta=I(page, {type: "frame", name: "Final CTA", layout: "vertical", width: "fill_container", padding: [96, 120], gap: 32, alignItems: "center", fill: "$--primary"})
ctaHeadline=I(finalCta, {type: "text", content: "Ready to Transform Your Workflow?", fontSize: 40, fontWeight: "bold", fill: "#FFFFFF", textAlign: "center"})
ctaSubline=I(finalCta, {type: "text", content: "Join 10,000+ teams already using our platform.", fontSize: 18, fill: "rgba(255,255,255,0.8)", textAlign: "center"})
ctaButton=I(finalCta, {type: "frame", padding: [16, 48], fill: "#FFFFFF", cornerRadius: 8})
ctaButtonText=I(ctaButton, {type: "text", content: "Start Your Free Trial", fontSize: 18, fontWeight: "600", fill: "$--primary"})
ctaTrust=I(finalCta, {type: "text", content: "No credit card required • 14-day free trial", fontSize: 14, fill: "rgba(255,255,255,0.7)"})
```

Guidelines:

- Single focus: primary conversion action
- Reinforce value proposition
- Trust element (no credit card, free trial, guarantee)
- Contrasting background for attention

### Section 10: Footer

Structure:

```javascript
footer=I(page, {type: "frame", name: "Footer", layout: "vertical", width: "fill_container", padding: [64, 120], gap: 48, fill: "$--card"})
footerMain=I(footer, {type: "frame", layout: "horizontal", gap: 64, justifyContent: "space_between"})
footerBrand=I(footerMain, {type: "frame", layout: "vertical", gap: 16, width: 300})
footerLogo=I(footerBrand, {type: "text", content: "BrandName", fontSize: 24, fontWeight: "bold", fill: "$--foreground"})
footerTagline=I(footerBrand, {type: "text", content: "Building the future of work.", fontSize: 14, fill: "$--muted-foreground"})
footerLinks=I(footerMain, {type: "frame", layout: "horizontal", gap: 64})
footerCol1=I(footerLinks, {type: "frame", layout: "vertical", gap: 16})
footerCol1Title=I(footerCol1, {type: "text", content: "Product", fontSize: 14, fontWeight: "600", fill: "$--foreground"})
footerCol1Link1=I(footerCol1, {type: "text", content: "Features", fontSize: 14, fill: "$--muted-foreground"})
footerCol1Link2=I(footerCol1, {type: "text", content: "Pricing", fontSize: 14, fill: "$--muted-foreground"})
footerCol2=I(footerLinks, {type: "frame", layout: "vertical", gap: 16})
footerCol3=I(footerLinks, {type: "frame", layout: "vertical", gap: 16})
footerBottom=I(footer, {type: "frame", layout: "horizontal", width: "fill_container", justifyContent: "space_between", paddingTop: 24, stroke: {fill: "$--border", thickness: {top: 1}}})
footerCopyright=I(footerBottom, {type: "text", content: "© 2026 BrandName. All rights reserved.", fontSize: 14, fill: "$--muted-foreground"})
```

Guidelines:

- Logo and tagline
- 3-4 link columns (Product, Company, Resources, Legal)
- Social icons optional
- Copyright and legal links at bottom

---

## Agency Landing Page Template

### Structure Differences

Hero: Portfolio showcase or team visual instead of product screenshot.

Services: Service cards instead of feature blocks.

Portfolio: Case studies or project gallery.

Team: Team member profiles.

Contact: Contact form or booking CTA.

### Key Elements

```javascript
services=I(page, {type: "frame", layout: "horizontal", gap: 24})
serviceCard=I(services, {type: "frame", layout: "vertical", gap: 16, padding: 32, fill: "$--card", cornerRadius: 16, width: "fill_container"})
serviceIcon=I(serviceCard, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "palette", width: 32, height: 32, fill: "$--primary"})
serviceTitle=I(serviceCard, {type: "text", content: "Brand Strategy", fontSize: 24, fontWeight: "600", fill: "$--foreground"})
serviceDesc=I(serviceCard, {type: "text", content: "We craft compelling brand identities that resonate.", fontSize: 16, fill: "$--muted-foreground"})

portfolio=I(page, {type: "frame", layout: "horizontal", gap: 16, flexWrap: "wrap"})
project=I(portfolio, {type: "frame", width: 360, height: 280, cornerRadius: 12, fill: "#F3F4F6"})
```

---

## Portfolio Landing Page Template

### Structure

Hero: Name, title, brief bio, and featured work preview.

Work: Project grid or case study cards.

About: Extended bio and skills.

Contact: Contact information or form.

### Key Elements

```javascript
hero=I(page, {type: "frame", layout: "vertical", gap: 32, padding: [120, 80], alignItems: "center"})
name=I(hero, {type: "text", content: "Jane Designer", fontSize: 64, fontWeight: "bold", fill: "$--foreground"})
title=I(hero, {type: "text", content: "Product Designer & Brand Strategist", fontSize: 24, fill: "$--muted-foreground"})
bio=I(hero, {type: "text", content: "I help startups create memorable digital experiences.", fontSize: 18, fill: "$--foreground", textAlign: "center", width: 600})

workGrid=I(page, {type: "frame", layout: "horizontal", gap: 24, flexWrap: "wrap", padding: [80, 80]})
projectCard=I(workGrid, {type: "frame", layout: "vertical", gap: 16, width: 400})
projectImage=I(projectCard, {type: "frame", width: "fill_container", height: 280, fill: "#F3F4F6", cornerRadius: 12})
projectTitle=I(projectCard, {type: "text", content: "Project Name", fontSize: 20, fontWeight: "600", fill: "$--foreground"})
projectDesc=I(projectCard, {type: "text", content: "Brand identity and web design", fontSize: 14, fill: "$--muted-foreground"})
```

---

## Dark Theme Variations

### Dark SaaS Hero

```javascript
hero=I(page, {type: "frame", layout: "vertical", width: "fill_container", padding: [100, 120], gap: 32, alignItems: "center", fill: "#0F172A"})
headline=I(hero, {type: "text", content: "Build Faster with AI", fontSize: 64, fontWeight: "bold", fill: "#FFFFFF", textAlign: "center"})
subheadline=I(hero, {type: "text", content: "The intelligent platform that accelerates development.", fontSize: 20, fill: "#94A3B8", textAlign: "center"})
ctaBtn=I(hero, {type: "frame", padding: [16, 32], fill: "#6366F1", cornerRadius: 8})
```

### Gradient Hero

```javascript
hero=I(page, {type: "frame", layout: "vertical", width: "fill_container", height: "fit_content(700)", alignItems: "center", justifyContent: "center"})
U(hero, {fill: {type: "linear", stops: [{position: 0, color: "#6366F1"}, {position: 1, color: "#8B5CF6"}], angle: 135}})
headline=I(hero, {type: "text", content: "The Future of Design", fontSize: 72, fontWeight: "bold", fill: "#FFFFFF"})
```

---

Last Updated: 2026-02-03

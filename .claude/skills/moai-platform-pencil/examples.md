# Pencil Design Examples

Practical examples for common design tasks with Pencil MCP.

## Example 1: Complete SaaS Landing Page

### Step 1: Create Page Container

```javascript
page=I(document, {type: "frame", name: "SaaS Landing Page", placeholder: true, layout: "vertical", width: 1440, height: "fit_content(3000)", fill: "#FFFFFF"})
```

### Step 2: Add Header

```javascript
header=I("pageId", {type: "frame", name: "Header", layout: "horizontal", width: "fill_container", height: 64, padding: [0, 120], alignItems: "center", justifyContent: "space_between"})
logo=I(header, {type: "frame", layout: "horizontal", gap: 8, alignItems: "center"})
logoIcon=I(logo, {type: "frame", width: 32, height: 32, fill: "#6366F1", cornerRadius: 8})
logoText=I(logo, {type: "text", content: "Acme", fontSize: 20, fontWeight: "bold", fill: "#0F172A"})
nav=I(header, {type: "frame", layout: "horizontal", gap: 32})
navFeatures=I(nav, {type: "text", content: "Features", fontSize: 14, fill: "#64748B"})
navPricing=I(nav, {type: "text", content: "Pricing", fontSize: 14, fill: "#64748B"})
navAbout=I(nav, {type: "text", content: "About", fontSize: 14, fill: "#64748B"})
cta=I(header, {type: "frame", padding: [10, 20], fill: "#6366F1", cornerRadius: 8})
ctaText=I(cta, {type: "text", content: "Get Started", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
```

### Step 3: Add Hero Section

```javascript
hero=I("pageId", {type: "frame", name: "Hero", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 32, alignItems: "center"})
badge=I(hero, {type: "frame", padding: [6, 16], fill: "#EEF2FF", cornerRadius: 9999})
badgeText=I(badge, {type: "text", content: "Introducing v2.0", fontSize: 13, fontWeight: "500", fill: "#4F46E5"})
headline=I(hero, {type: "text", content: "Build Products Faster Than Ever", fontSize: 64, fontWeight: "bold", fill: "#0F172A", textAlign: "center", width: 900, lineHeight: 1.1})
subheadline=I(hero, {type: "text", content: "The all-in-one platform that helps teams ship faster, collaborate better, and scale effortlessly.", fontSize: 20, fill: "#64748B", textAlign: "center", width: 700, lineHeight: 1.5})
ctas=I(hero, {type: "frame", layout: "horizontal", gap: 16})
primaryCta=I(ctas, {type: "frame", padding: [16, 32], fill: "#6366F1", cornerRadius: 8})
primaryCtaText=I(primaryCta, {type: "text", content: "Start Free Trial", fontSize: 16, fontWeight: "600", fill: "#FFFFFF"})
secondaryCta=I(ctas, {type: "frame", padding: [16, 32], stroke: {fill: "#E2E8F0", thickness: 1}, cornerRadius: 8})
secondaryCtaText=I(secondaryCta, {type: "text", content: "Watch Demo", fontSize: 16, fontWeight: "500", fill: "#0F172A"})
heroImage=I(hero, {type: "frame", width: 1000, height: 500, fill: "#F8FAFC", cornerRadius: 16, marginTop: 32})
placeholderText=I(heroImage, {type: "text", content: "Product Screenshot", fontSize: 18, fill: "#94A3B8"})
```

### Step 4: Add Features Grid

```javascript
features=I("pageId", {type: "frame", name: "Features", layout: "vertical", width: "fill_container", padding: [80, 120], gap: 48, fill: "#F8FAFC"})
featuresHeader=I(features, {type: "frame", layout: "vertical", gap: 16, alignItems: "center"})
featuresTitle=I(featuresHeader, {type: "text", content: "Everything You Need", fontSize: 40, fontWeight: "bold", fill: "#0F172A", textAlign: "center"})
featuresDesc=I(featuresHeader, {type: "text", content: "Powerful features to help you build, ship, and scale.", fontSize: 18, fill: "#64748B", textAlign: "center"})
grid=I(features, {type: "frame", layout: "horizontal", gap: 24, width: "fill_container", flexWrap: "wrap", justifyContent: "center"})
card1=I(grid, {type: "frame", layout: "vertical", gap: 16, width: 360, padding: 32, fill: "#FFFFFF", cornerRadius: 16, stroke: {fill: "#E2E8F0", thickness: 1}})
icon1=I(card1, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "zap", width: 32, height: 32, fill: "#6366F1"})
title1=I(card1, {type: "text", content: "Lightning Fast", fontSize: 20, fontWeight: "600", fill: "#0F172A"})
desc1=I(card1, {type: "text", content: "Sub-second response times with our optimized infrastructure.", fontSize: 15, fill: "#64748B", lineHeight: 1.5})
card2=I(grid, {type: "frame", layout: "vertical", gap: 16, width: 360, padding: 32, fill: "#FFFFFF", cornerRadius: 16, stroke: {fill: "#E2E8F0", thickness: 1}})
icon2=I(card2, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "shield", width: 32, height: 32, fill: "#6366F1"})
title2=I(card2, {type: "text", content: "Secure by Default", fontSize: 20, fontWeight: "600", fill: "#0F172A"})
desc2=I(card2, {type: "text", content: "Enterprise-grade security with SOC 2 compliance.", fontSize: 15, fill: "#64748B", lineHeight: 1.5})
card3=I(grid, {type: "frame", layout: "vertical", gap: 16, width: 360, padding: 32, fill: "#FFFFFF", cornerRadius: 16, stroke: {fill: "#E2E8F0", thickness: 1}})
icon3=I(card3, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "users", width: 32, height: 32, fill: "#6366F1"})
title3=I(card3, {type: "text", content: "Team Collaboration", fontSize: 20, fontWeight: "600", fill: "#0F172A"})
desc3=I(card3, {type: "text", content: "Real-time collaboration tools for distributed teams.", fontSize: 15, fill: "#64748B", lineHeight: 1.5})
```

### Step 5: Add Footer

```javascript
footer=I("pageId", {type: "frame", name: "Footer", layout: "vertical", width: "fill_container", padding: [64, 120], gap: 48, fill: "#0F172A"})
footerMain=I(footer, {type: "frame", layout: "horizontal", justifyContent: "space_between", width: "fill_container"})
footerBrand=I(footerMain, {type: "frame", layout: "vertical", gap: 16, width: 300})
footerLogo=I(footerBrand, {type: "text", content: "Acme", fontSize: 24, fontWeight: "bold", fill: "#FFFFFF"})
footerTagline=I(footerBrand, {type: "text", content: "Building the future of work.", fontSize: 14, fill: "#94A3B8"})
footerLinks=I(footerMain, {type: "frame", layout: "horizontal", gap: 64})
col1=I(footerLinks, {type: "frame", layout: "vertical", gap: 16})
col1Title=I(col1, {type: "text", content: "Product", fontSize: 14, fontWeight: "600", fill: "#FFFFFF"})
col1Link1=I(col1, {type: "text", content: "Features", fontSize: 14, fill: "#94A3B8"})
col1Link2=I(col1, {type: "text", content: "Pricing", fontSize: 14, fill: "#94A3B8"})
col2=I(footerLinks, {type: "frame", layout: "vertical", gap: 16})
col2Title=I(col2, {type: "text", content: "Company", fontSize: 14, fontWeight: "600", fill: "#FFFFFF"})
col2Link1=I(col2, {type: "text", content: "About", fontSize: 14, fill: "#94A3B8"})
col2Link2=I(col2, {type: "text", content: "Careers", fontSize: 14, fill: "#94A3B8"})
footerBottom=I(footer, {type: "frame", paddingTop: 24, stroke: {fill: "#1E293B", thickness: {top: 1}}})
copyright=I(footerBottom, {type: "text", content: "© 2026 Acme Inc. All rights reserved.", fontSize: 14, fill: "#64748B"})
```

---

## Example 2: Dashboard with Sidebar

### Step 1: Create Layout Structure

```javascript
dashboard=I(document, {type: "frame", name: "Dashboard", layout: "horizontal", width: 1440, height: "fit_content(900)", fill: "#FAFAFA", placeholder: true})
sidebar=I(dashboard, {type: "frame", layout: "vertical", width: 240, height: "fill_container", fill: "#FFFFFF", stroke: {fill: "#E5E7EB", thickness: {right: 1}}})
main=I(dashboard, {type: "frame", layout: "vertical", width: "fill_container", height: "fill_container(900)", padding: 24, gap: 24})
```

### Step 2: Build Sidebar

```javascript
sidebarHeader=I("sidebarId", {type: "frame", padding: [20, 16], layout: "horizontal", gap: 12, alignItems: "center"})
logoBox=I(sidebarHeader, {type: "frame", width: 32, height: 32, fill: "#6366F1", cornerRadius: 8})
brandName=I(sidebarHeader, {type: "text", content: "Dashboard", fontSize: 18, fontWeight: "bold", fill: "#111827"})
nav=I("sidebarId", {type: "frame", layout: "vertical", padding: [8, 8], gap: 4})
navActive=I(nav, {type: "frame", layout: "horizontal", padding: [10, 12], gap: 12, fill: "#6366F1", cornerRadius: 8, alignItems: "center"})
navActiveIcon=I(navActive, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "layout-dashboard", width: 20, height: 20, fill: "#FFFFFF"})
navActiveLabel=I(navActive, {type: "text", content: "Overview", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
navItem1=I(nav, {type: "frame", layout: "horizontal", padding: [10, 12], gap: 12, cornerRadius: 8, alignItems: "center"})
navIcon1=I(navItem1, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "users", width: 20, height: 20, fill: "#6B7280"})
navLabel1=I(navItem1, {type: "text", content: "Users", fontSize: 14, fill: "#6B7280"})
navItem2=I(nav, {type: "frame", layout: "horizontal", padding: [10, 12], gap: 12, cornerRadius: 8, alignItems: "center"})
navIcon2=I(navItem2, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "settings", width: 20, height: 20, fill: "#6B7280"})
navLabel2=I(navItem2, {type: "text", content: "Settings", fontSize: 14, fill: "#6B7280"})
```

### Step 3: Add Metric Cards

```javascript
metrics=I("mainId", {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})
metric1=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 20, fill: "#FFFFFF", cornerRadius: 12, stroke: {fill: "#E5E7EB", thickness: 1}, width: "fill_container"})
metric1Label=I(metric1, {type: "text", content: "Total Revenue", fontSize: 14, fill: "#6B7280"})
metric1Value=I(metric1, {type: "text", content: "$45,231", fontSize: 28, fontWeight: "bold", fill: "#111827"})
metric1Trend=I(metric1, {type: "text", content: "+20.1%", fontSize: 13, fill: "#22C55E"})
metric2=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 20, fill: "#FFFFFF", cornerRadius: 12, stroke: {fill: "#E5E7EB", thickness: 1}, width: "fill_container"})
metric2Label=I(metric2, {type: "text", content: "Active Users", fontSize: 14, fill: "#6B7280"})
metric2Value=I(metric2, {type: "text", content: "2,350", fontSize: 28, fontWeight: "bold", fill: "#111827"})
metric2Trend=I(metric2, {type: "text", content: "+12.5%", fontSize: 13, fill: "#22C55E"})
metric3=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 20, fill: "#FFFFFF", cornerRadius: 12, stroke: {fill: "#E5E7EB", thickness: 1}, width: "fill_container"})
metric3Label=I(metric3, {type: "text", content: "Conversion Rate", fontSize: 14, fill: "#6B7280"})
metric3Value=I(metric3, {type: "text", content: "3.2%", fontSize: 28, fontWeight: "bold", fill: "#111827"})
metric3Trend=I(metric3, {type: "text", content: "-0.4%", fontSize: 13, fill: "#EF4444"})
```

### Step 4: Add Data Table

```javascript
tableCard=I("mainId", {type: "frame", layout: "vertical", fill: "#FFFFFF", cornerRadius: 12, stroke: {fill: "#E5E7EB", thickness: 1}, width: "fill_container"})
tableHeader=I(tableCard, {type: "frame", layout: "horizontal", padding: 16, justifyContent: "space_between", alignItems: "center"})
tableTitle=I(tableHeader, {type: "text", content: "Recent Users", fontSize: 16, fontWeight: "600", fill: "#111827"})
table=I(tableCard, {type: "frame", layout: "vertical", width: "fill_container"})
headerRow=I(table, {type: "frame", layout: "horizontal", padding: [12, 16], fill: "#F9FAFB"})
col1Header=I(headerRow, {type: "text", content: "Name", fontSize: 12, fontWeight: "600", fill: "#6B7280", width: 200})
col2Header=I(headerRow, {type: "text", content: "Email", fontSize: 12, fontWeight: "600", fill: "#6B7280", width: "fill_container"})
col3Header=I(headerRow, {type: "text", content: "Status", fontSize: 12, fontWeight: "600", fill: "#6B7280", width: 100})
dataRow1=I(table, {type: "frame", layout: "horizontal", padding: [16, 16], alignItems: "center", stroke: {fill: "#E5E7EB", thickness: {bottom: 1}}})
name1=I(dataRow1, {type: "text", content: "John Doe", fontSize: 14, fill: "#111827", width: 200})
email1=I(dataRow1, {type: "text", content: "john@example.com", fontSize: 14, fill: "#6B7280", width: "fill_container"})
status1=I(dataRow1, {type: "frame", padding: [4, 8], fill: "#DCFCE7", cornerRadius: 9999, width: "fit_content"})
statusText1=I(status1, {type: "text", content: "Active", fontSize: 12, fontWeight: "500", fill: "#166534"})
```

---

## Example 3: Dark Theme Landing Page

### Hero with Gradient Background

```javascript
page=I(document, {type: "frame", name: "Dark Landing", layout: "vertical", width: 1440, height: "fit_content(2000)", fill: "#0F172A", placeholder: true})
hero=I(page, {type: "frame", layout: "vertical", width: "fill_container", padding: [100, 120], gap: 32, alignItems: "center"})
headline=I(hero, {type: "text", content: "Build the Future with AI", fontSize: 72, fontWeight: "bold", fill: "#FFFFFF", textAlign: "center", width: 900, lineHeight: 1.1})
subheadline=I(hero, {type: "text", content: "Harness the power of artificial intelligence to transform your workflow.", fontSize: 20, fill: "#94A3B8", textAlign: "center", width: 700})
cta=I(hero, {type: "frame", padding: [16, 40], cornerRadius: 8})
U(cta, {fill: {type: "linear", stops: [{position: 0, color: "#6366F1"}, {position: 1, color: "#8B5CF6"}], angle: 135}})
ctaText=I(cta, {type: "text", content: "Get Early Access", fontSize: 16, fontWeight: "600", fill: "#FFFFFF"})
```

### Glowing Cards

```javascript
features=I(page, {type: "frame", layout: "horizontal", gap: 24, padding: [80, 120]})
card1=I(features, {type: "frame", layout: "vertical", gap: 16, padding: 32, fill: "#1E293B", cornerRadius: 16, stroke: {fill: "#334155", thickness: 1}, width: "fill_container"})
U(card1, {shadow: "0 0 40px rgba(99, 102, 241, 0.15)"})
cardIcon1=I(card1, {type: "frame", width: 48, height: 48, fill: "#6366F1", cornerRadius: 12, alignItems: "center", justifyContent: "center"})
icon1=I(cardIcon1, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "cpu", width: 24, height: 24, fill: "#FFFFFF"})
cardTitle1=I(card1, {type: "text", content: "AI-Powered", fontSize: 20, fontWeight: "600", fill: "#FFFFFF"})
cardDesc1=I(card1, {type: "text", content: "Advanced machine learning algorithms that adapt to your needs.", fontSize: 15, fill: "#94A3B8", lineHeight: 1.5})
```

---

## Example 4: Using Stock Images

### Hero with Background Image

```javascript
hero=I(page, {type: "frame", layout: "vertical", width: "fill_container", height: 600, alignItems: "center", justifyContent: "center", gap: 24})
G(hero, "stock", "modern office workspace team collaboration bright")
U(hero, {fill: "#000000AA"})
headline=I(hero, {type: "text", content: "Work Better Together", fontSize: 56, fontWeight: "bold", fill: "#FFFFFF", textAlign: "center"})
subheadline=I(hero, {type: "text", content: "Collaboration tools for modern teams", fontSize: 20, fill: "rgba(255,255,255,0.8)", textAlign: "center"})
```

### Feature Image in Container

```javascript
featureSection=I(page, {type: "frame", layout: "horizontal", gap: 64, padding: [80, 120], alignItems: "center"})
featureContent=I(featureSection, {type: "frame", layout: "vertical", gap: 24, width: "fill_container"})
featureTitle=I(featureContent, {type: "text", content: "Real-time Collaboration", fontSize: 36, fontWeight: "bold", fill: "#0F172A"})
featureDesc=I(featureContent, {type: "text", content: "Work together in real-time with your team, no matter where they are.", fontSize: 18, fill: "#64748B", lineHeight: 1.6})
featureImage=I(featureSection, {type: "frame", width: 500, height: 350, cornerRadius: 16})
G(featureImage, "stock", "team meeting video call remote work laptop")
```

### AI Generated Abstract Background

```javascript
ctaSection=I(page, {type: "frame", layout: "vertical", width: "fill_container", height: 400, alignItems: "center", justifyContent: "center", gap: 24})
G(ctaSection, "ai", "abstract gradient mesh background purple blue vibrant")
U(ctaSection, {fill: "rgba(15, 23, 42, 0.7)"})
ctaHeadline=I(ctaSection, {type: "text", content: "Ready to Get Started?", fontSize: 40, fontWeight: "bold", fill: "#FFFFFF"})
ctaButton=I(ctaSection, {type: "frame", padding: [16, 40], fill: "#FFFFFF", cornerRadius: 8})
ctaButtonText=I(ctaButton, {type: "text", content: "Start Your Free Trial", fontSize: 16, fontWeight: "600", fill: "#6366F1"})
```

---

## Example 5: Form Design

### Contact Form

```javascript
formCard=I(content, {type: "frame", layout: "vertical", padding: 32, fill: "#FFFFFF", cornerRadius: 16, stroke: {fill: "#E2E8F0", thickness: 1}, width: 480})
formTitle=I(formCard, {type: "text", content: "Get in Touch", fontSize: 24, fontWeight: "bold", fill: "#0F172A"})
formDesc=I(formCard, {type: "text", content: "Fill out the form below and we'll get back to you within 24 hours.", fontSize: 14, fill: "#64748B", marginBottom: 24})
form=I(formCard, {type: "frame", layout: "vertical", gap: 20, width: "fill_container"})
nameRow=I(form, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})
firstNameField=I(nameRow, {type: "frame", layout: "vertical", gap: 6, width: "fill_container"})
firstNameLabel=I(firstNameField, {type: "text", content: "First Name", fontSize: 14, fontWeight: "500", fill: "#0F172A"})
firstNameInput=I(firstNameField, {type: "frame", padding: [10, 12], stroke: {fill: "#E2E8F0", thickness: 1}, cornerRadius: 8, width: "fill_container"})
firstNamePlaceholder=I(firstNameInput, {type: "text", content: "John", fontSize: 14, fill: "#94A3B8"})
lastNameField=I(nameRow, {type: "frame", layout: "vertical", gap: 6, width: "fill_container"})
lastNameLabel=I(lastNameField, {type: "text", content: "Last Name", fontSize: 14, fontWeight: "500", fill: "#0F172A"})
lastNameInput=I(lastNameField, {type: "frame", padding: [10, 12], stroke: {fill: "#E2E8F0", thickness: 1}, cornerRadius: 8, width: "fill_container"})
emailField=I(form, {type: "frame", layout: "vertical", gap: 6, width: "fill_container"})
emailLabel=I(emailField, {type: "text", content: "Email", fontSize: 14, fontWeight: "500", fill: "#0F172A"})
emailInput=I(emailField, {type: "frame", padding: [10, 12], stroke: {fill: "#E2E8F0", thickness: 1}, cornerRadius: 8, width: "fill_container"})
messageField=I(form, {type: "frame", layout: "vertical", gap: 6, width: "fill_container"})
messageLabel=I(messageField, {type: "text", content: "Message", fontSize: 14, fontWeight: "500", fill: "#0F172A"})
messageInput=I(messageField, {type: "frame", padding: 12, stroke: {fill: "#E2E8F0", thickness: 1}, cornerRadius: 8, width: "fill_container", height: 120})
submitBtn=I(form, {type: "frame", padding: [12, 24], fill: "#6366F1", cornerRadius: 8, alignSelf: "stretch", alignItems: "center"})
submitText=I(submitBtn, {type: "text", content: "Send Message", fontSize: 14, fontWeight: "600", fill: "#FFFFFF"})
```

---

## Quick Reference: Common Operations

### Create Container

```javascript
container=I(parent, {type: "frame", layout: "vertical", gap: 16, padding: 24})
```

### Add Text

```javascript
text=I(container, {type: "text", content: "Hello", fontSize: 16, fill: "#000000"})
```

### Add Icon

```javascript
icon=I(container, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "home", width: 24, height: 24, fill: "#000000"})
```

### Add Button

```javascript
btn=I(container, {type: "frame", padding: [10, 20], fill: "#6366F1", cornerRadius: 8})
btnText=I(btn, {type: "text", content: "Click", fontSize: 14, fill: "#FFFFFF"})
```

### Add Stock Image

```javascript
imgFrame=I(container, {type: "frame", width: 400, height: 300, cornerRadius: 12})
G(imgFrame, "stock", "search keywords here")
```

### Update Properties

```javascript
U("nodeId", {fill: "#FF0000", padding: 20})
```

### Delete Node

```javascript
D("nodeId")
```

---

Last Updated: 2026-02-03

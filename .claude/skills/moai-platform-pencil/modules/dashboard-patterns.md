# Dashboard Patterns

Comprehensive dashboard and admin interface patterns for Pencil MCP.

## Layout Patterns

### Pattern A: Sidebar + Content (Most Common)

```
┌──────────┬────────────────────────────────┐
│          │                                │
│ Sidebar  │     Main Content Area          │
│  240px   │      fill_container            │
│          │                                │
└──────────┴────────────────────────────────┘
```

Implementation:

```javascript
screen=I(document, {type: "frame", name: "Dashboard", layout: "horizontal", width: 1440, height: "fit_content(900)", fill: "$--background", placeholder: true})
sidebar=I(screen, {type: "frame", name: "Sidebar", layout: "vertical", width: 240, height: "fill_container", fill: "$--card", stroke: {fill: "$--border", thickness: {right: 1}}})
main=I(screen, {type: "frame", name: "Main", layout: "vertical", width: "fill_container", height: "fill_container(900)", padding: 32, gap: 24})
```

### Pattern B: Header + Content

```
┌────────────────────────────────────────────┐
│              Header Bar (64px)             │
├────────────────────────────────────────────┤
│                                            │
│            Content Area                    │
│                                            │
└────────────────────────────────────────────┘
```

Implementation:

```javascript
screen=I(document, {type: "frame", name: "App", layout: "vertical", width: 1200, height: "fit_content(800)", fill: "$--background", placeholder: true})
header=I(screen, {type: "frame", name: "Header", layout: "horizontal", width: "fill_container", height: 64, padding: [0, 24], alignItems: "center", justifyContent: "space_between", stroke: {fill: "$--border", thickness: {bottom: 1}}})
content=I(screen, {type: "frame", name: "Content", layout: "vertical", width: "fill_container", height: "fit_content(736)", padding: 32, gap: 24})
```

### Pattern C: Sidebar + Header + Content

```
┌──────────┬────────────────────────────────┐
│          │      Header (64px)             │
│ Sidebar  ├────────────────────────────────┤
│  240px   │                                │
│          │      Content Area              │
│          │                                │
└──────────┴────────────────────────────────┘
```

Implementation:

```javascript
screen=I(document, {type: "frame", name: "Dashboard", layout: "horizontal", width: 1440, height: "fit_content(900)", fill: "$--background", placeholder: true})
sidebar=I(screen, {type: "frame", layout: "vertical", width: 240, height: "fill_container", fill: "$--card"})
rightPanel=I(screen, {type: "frame", layout: "vertical", width: "fill_container", height: "fill_container(900)"})
header=I(rightPanel, {type: "frame", layout: "horizontal", width: "fill_container", height: 64, padding: [0, 24], alignItems: "center", stroke: {fill: "$--border", thickness: {bottom: 1}}})
content=I(rightPanel, {type: "frame", layout: "vertical", width: "fill_container", height: "fill_container(836)", padding: 32, gap: 24})
```

### Pattern D: Two-Column Content

```
┌─────────────────────┬─────────────┐
│                     │             │
│    Main (2/3)       │  Side (1/3) │
│   fill_container    │   360px     │
│                     │             │
└─────────────────────┴─────────────┘
```

Implementation:

```javascript
columns=I(content, {type: "frame", layout: "horizontal", width: "fill_container", height: "fill_container", gap: 24})
mainCol=I(columns, {type: "frame", layout: "vertical", width: "fill_container", height: "fit_content", gap: 24})
sideCol=I(columns, {type: "frame", layout: "vertical", width: 360, height: "fit_content", gap: 24})
```

---

## Sidebar Navigation

### Basic Sidebar Structure

```javascript
sidebar=I(screen, {type: "frame", layout: "vertical", width: 240, height: "fill_container", fill: "$--card", stroke: {fill: "$--border", thickness: {right: 1}}})

// Header with logo
sidebarHeader=I(sidebar, {type: "frame", layout: "horizontal", padding: [20, 16], gap: 12, alignItems: "center"})
logo=I(sidebarHeader, {type: "frame", width: 32, height: 32, fill: "$--primary", cornerRadius: 8})
brandName=I(sidebarHeader, {type: "text", content: "AppName", fontSize: 18, fontWeight: "bold", fill: "$--foreground"})

// Navigation
nav=I(sidebar, {type: "frame", layout: "vertical", padding: [8, 8], gap: 4, width: "fill_container"})
```

### Navigation Items

Active Item:

```javascript
navItemActive=I(nav, {type: "frame", layout: "horizontal", padding: [10, 12], gap: 12, alignItems: "center", fill: "$--primary", cornerRadius: 8, width: "fill_container"})
navIconActive=I(navItemActive, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "layout-dashboard", width: 20, height: 20, fill: "#FFFFFF"})
navLabelActive=I(navItemActive, {type: "text", content: "Dashboard", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
```

Default Item:

```javascript
navItem=I(nav, {type: "frame", layout: "horizontal", padding: [10, 12], gap: 12, alignItems: "center", cornerRadius: 8, width: "fill_container"})
navIcon=I(navItem, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "users", width: 20, height: 20, fill: "$--muted-foreground"})
navLabel=I(navItem, {type: "text", content: "Users", fontSize: 14, fill: "$--muted-foreground"})
```

Section Title:

```javascript
sectionTitle=I(nav, {type: "frame", padding: [16, 12, 8, 12], width: "fill_container"})
sectionText=I(sectionTitle, {type: "text", content: "SETTINGS", fontSize: 11, fontWeight: "600", fill: "$--muted-foreground", letterSpacing: 0.5})
```

### Sidebar Footer

```javascript
sidebarFooter=I(sidebar, {type: "frame", layout: "vertical", padding: 16, gap: 8, marginTop: "auto", stroke: {fill: "$--border", thickness: {top: 1}}})
userProfile=I(sidebarFooter, {type: "frame", layout: "horizontal", gap: 12, alignItems: "center"})
userAvatar=I(userProfile, {type: "frame", width: 36, height: 36, fill: "$--secondary", cornerRadius: 9999})
userInfo=I(userProfile, {type: "frame", layout: "vertical", gap: 2})
userName=I(userInfo, {type: "text", content: "John Doe", fontSize: 14, fontWeight: "500", fill: "$--foreground"})
userEmail=I(userInfo, {type: "text", content: "john@example.com", fontSize: 12, fill: "$--muted-foreground"})
```

---

## Header Components

### Standard Header

```javascript
header=I(content, {type: "frame", layout: "horizontal", width: "fill_container", height: 64, alignItems: "center", justifyContent: "space_between"})

// Left: Breadcrumbs
breadcrumbs=I(header, {type: "frame", layout: "horizontal", gap: 8, alignItems: "center"})
crumb1=I(breadcrumbs, {type: "text", content: "Dashboard", fontSize: 14, fill: "$--muted-foreground"})
crumbSep=I(breadcrumbs, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "chevron-right", width: 16, height: 16, fill: "$--muted-foreground"})
crumb2=I(breadcrumbs, {type: "text", content: "Users", fontSize: 14, fontWeight: "500", fill: "$--foreground"})

// Right: Actions
headerActions=I(header, {type: "frame", layout: "horizontal", gap: 12, alignItems: "center"})
searchBtn=I(headerActions, {type: "frame", padding: 8, cornerRadius: 8})
searchIcon=I(searchBtn, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "search", width: 20, height: 20, fill: "$--muted-foreground"})
notifyBtn=I(headerActions, {type: "frame", padding: 8, cornerRadius: 8})
notifyIcon=I(notifyBtn, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "bell", width: 20, height: 20, fill: "$--muted-foreground"})
userAvatar=I(headerActions, {type: "frame", width: 36, height: 36, fill: "$--secondary", cornerRadius: 9999})
```

### Page Header with Actions

```javascript
pageHeader=I(content, {type: "frame", layout: "horizontal", width: "fill_container", justifyContent: "space_between", alignItems: "center"})
pageTitle=I(pageHeader, {type: "frame", layout: "vertical", gap: 4})
titleText=I(pageTitle, {type: "text", content: "Users", fontSize: 24, fontWeight: "bold", fill: "$--foreground"})
titleDesc=I(pageTitle, {type: "text", content: "Manage your team members", fontSize: 14, fill: "$--muted-foreground"})
pageActions=I(pageHeader, {type: "frame", layout: "horizontal", gap: 12})
exportBtn=I(pageActions, {type: "frame", padding: [10, 16], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8})
exportText=I(exportBtn, {type: "text", content: "Export", fontSize: 14, fill: "$--foreground"})
addBtn=I(pageActions, {type: "frame", padding: [10, 16], fill: "$--primary", cornerRadius: 8})
addText=I(addBtn, {type: "text", content: "Add User", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
```

---

## Card Components

### Metric Card

```javascript
metricCard=I(content, {type: "frame", layout: "vertical", gap: 8, padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})
metricHeader=I(metricCard, {type: "frame", layout: "horizontal", justifyContent: "space_between", alignItems: "center", width: "fill_container"})
metricLabel=I(metricHeader, {type: "text", content: "Total Revenue", fontSize: 14, fill: "$--muted-foreground"})
metricIcon=I(metricHeader, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "dollar-sign", width: 20, height: 20, fill: "$--muted-foreground"})
metricValue=I(metricCard, {type: "text", content: "$45,231.89", fontSize: 32, fontWeight: "bold", fill: "$--foreground"})
metricTrend=I(metricCard, {type: "frame", layout: "horizontal", gap: 4, alignItems: "center"})
trendIcon=I(metricTrend, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "trending-up", width: 16, height: 16, fill: "$--color-success"})
trendText=I(metricTrend, {type: "text", content: "+20.1% from last month", fontSize: 12, fill: "$--muted-foreground"})
```

### Metric Card Grid

```javascript
metrics=I(content, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})
metric1=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})
metric2=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})
metric3=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})
metric4=I(metrics, {type: "frame", layout: "vertical", gap: 8, padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})
```

### Content Card

```javascript
card=I(content, {type: "frame", layout: "vertical", fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})
cardHeader=I(card, {type: "frame", layout: "horizontal", padding: 24, justifyContent: "space_between", alignItems: "center", stroke: {fill: "$--border", thickness: {bottom: 1}}})
cardTitle=I(cardHeader, {type: "text", content: "Recent Activity", fontSize: 18, fontWeight: "600", fill: "$--foreground"})
cardAction=I(cardHeader, {type: "text", content: "View all", fontSize: 14, fill: "$--primary"})
cardContent=I(card, {type: "frame", layout: "vertical", padding: 24, gap: 16})
cardFooter=I(card, {type: "frame", padding: 24, stroke: {fill: "$--border", thickness: {top: 1}}})
```

---

## Table Design

### Table Structure

```javascript
tableCard=I(content, {type: "frame", layout: "vertical", fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: "fill_container"})

// Table Header with Search
tableHeader=I(tableCard, {type: "frame", layout: "horizontal", padding: 16, justifyContent: "space_between", alignItems: "center"})
searchBox=I(tableHeader, {type: "frame", layout: "horizontal", padding: [8, 12], gap: 8, stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8, width: 300})
searchIcon=I(searchBox, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "search", width: 16, height: 16, fill: "$--muted-foreground"})
searchPlaceholder=I(searchBox, {type: "text", content: "Search users...", fontSize: 14, fill: "$--muted-foreground"})

// Table
table=I(tableCard, {type: "frame", layout: "vertical", width: "fill_container"})
```

### Table Header Row

```javascript
headerRow=I(table, {type: "frame", layout: "horizontal", width: "fill_container", padding: [12, 16], fill: "$--secondary", alignItems: "center"})
headerCell1=I(headerRow, {type: "frame", width: 200})
headerText1=I(headerCell1, {type: "text", content: "Name", fontSize: 12, fontWeight: "600", fill: "$--muted-foreground"})
headerCell2=I(headerRow, {type: "frame", width: "fill_container"})
headerText2=I(headerCell2, {type: "text", content: "Email", fontSize: 12, fontWeight: "600", fill: "$--muted-foreground"})
headerCell3=I(headerRow, {type: "frame", width: 100})
headerText3=I(headerCell3, {type: "text", content: "Status", fontSize: 12, fontWeight: "600", fill: "$--muted-foreground"})
headerCell4=I(headerRow, {type: "frame", width: 80})
headerText4=I(headerCell4, {type: "text", content: "Actions", fontSize: 12, fontWeight: "600", fill: "$--muted-foreground"})
```

### Table Data Row

```javascript
dataRow=I(table, {type: "frame", layout: "horizontal", width: "fill_container", padding: [16, 16], alignItems: "center", stroke: {fill: "$--border", thickness: {bottom: 1}}})
cell1=I(dataRow, {type: "frame", layout: "horizontal", gap: 12, alignItems: "center", width: 200})
avatar=I(cell1, {type: "frame", width: 32, height: 32, fill: "$--secondary", cornerRadius: 9999})
name=I(cell1, {type: "text", content: "John Doe", fontSize: 14, fontWeight: "500", fill: "$--foreground"})
cell2=I(dataRow, {type: "frame", width: "fill_container"})
email=I(cell2, {type: "text", content: "john@example.com", fontSize: 14, fill: "$--muted-foreground"})
cell3=I(dataRow, {type: "frame", width: 100})
statusBadge=I(cell3, {type: "frame", padding: [4, 8], fill: "$--color-success", cornerRadius: 9999, width: "fit_content"})
statusText=I(statusBadge, {type: "text", content: "Active", fontSize: 12, fontWeight: "500", fill: "$--color-success-foreground"})
cell4=I(dataRow, {type: "frame", layout: "horizontal", gap: 8, width: 80})
editBtn=I(cell4, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "edit", width: 16, height: 16, fill: "$--muted-foreground"})
deleteBtn=I(cell4, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "trash-2", width: 16, height: 16, fill: "$--muted-foreground"})
```

### Table Pagination

```javascript
tableFooter=I(tableCard, {type: "frame", layout: "horizontal", padding: 16, justifyContent: "space_between", alignItems: "center", stroke: {fill: "$--border", thickness: {top: 1}}})
rowCount=I(tableFooter, {type: "text", content: "Showing 1-10 of 100 results", fontSize: 14, fill: "$--muted-foreground"})
pagination=I(tableFooter, {type: "frame", layout: "horizontal", gap: 4})
prevBtn=I(pagination, {type: "frame", padding: [8, 12], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8})
prevText=I(prevBtn, {type: "text", content: "Previous", fontSize: 14, fill: "$--foreground"})
page1=I(pagination, {type: "frame", padding: [8, 12], fill: "$--primary", cornerRadius: 8})
page1Text=I(page1, {type: "text", content: "1", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
page2=I(pagination, {type: "frame", padding: [8, 12], cornerRadius: 8})
page2Text=I(page2, {type: "text", content: "2", fontSize: 14, fill: "$--foreground"})
nextBtn=I(pagination, {type: "frame", padding: [8, 12], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8})
nextText=I(nextBtn, {type: "text", content: "Next", fontSize: 14, fill: "$--foreground"})
```

---

## Form Patterns

### Form Layout

```javascript
formCard=I(content, {type: "frame", layout: "vertical", padding: 24, fill: "$--card", cornerRadius: 12, stroke: {fill: "$--border", thickness: 1}, width: 500})
formTitle=I(formCard, {type: "text", content: "Create User", fontSize: 20, fontWeight: "600", fill: "$--foreground"})
formDesc=I(formCard, {type: "text", content: "Add a new team member to your workspace.", fontSize: 14, fill: "$--muted-foreground", marginBottom: 24})
form=I(formCard, {type: "frame", layout: "vertical", gap: 20, width: "fill_container"})
```

### Form Fields

Text Input:

```javascript
field=I(form, {type: "frame", layout: "vertical", gap: 6, width: "fill_container"})
label=I(field, {type: "text", content: "Email", fontSize: 14, fontWeight: "500", fill: "$--foreground"})
input=I(field, {type: "frame", layout: "horizontal", padding: [10, 12], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8, width: "fill_container"})
inputText=I(input, {type: "text", content: "john@example.com", fontSize: 14, fill: "$--foreground"})
helpText=I(field, {type: "text", content: "We'll never share your email.", fontSize: 12, fill: "$--muted-foreground"})
```

Select:

```javascript
selectField=I(form, {type: "frame", layout: "vertical", gap: 6, width: "fill_container"})
selectLabel=I(selectField, {type: "text", content: "Role", fontSize: 14, fontWeight: "500", fill: "$--foreground"})
select=I(selectField, {type: "frame", layout: "horizontal", padding: [10, 12], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8, justifyContent: "space_between", alignItems: "center", width: "fill_container"})
selectValue=I(select, {type: "text", content: "Select a role", fontSize: 14, fill: "$--muted-foreground"})
selectIcon=I(select, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "chevron-down", width: 16, height: 16, fill: "$--muted-foreground"})
```

Checkbox:

```javascript
checkboxField=I(form, {type: "frame", layout: "horizontal", gap: 8, alignItems: "center"})
checkbox=I(checkboxField, {type: "frame", width: 20, height: 20, stroke: {fill: "$--border", thickness: 2}, cornerRadius: 4})
checkboxLabel=I(checkboxField, {type: "text", content: "Send welcome email", fontSize: 14, fill: "$--foreground"})
```

### Form Actions

```javascript
formActions=I(formCard, {type: "frame", layout: "horizontal", gap: 12, justifyContent: "end", marginTop: 24})
cancelBtn=I(formActions, {type: "frame", padding: [10, 20], stroke: {fill: "$--border", thickness: 1}, cornerRadius: 8})
cancelText=I(cancelBtn, {type: "text", content: "Cancel", fontSize: 14, fill: "$--foreground"})
submitBtn=I(formActions, {type: "frame", padding: [10, 20], fill: "$--primary", cornerRadius: 8})
submitText=I(submitBtn, {type: "text", content: "Create User", fontSize: 14, fontWeight: "500", fill: "#FFFFFF"})
```

---

## Common Column Widths

| Column Type | Recommended Width |
|-------------|-------------------|
| Checkbox | 48px |
| Avatar + Name | 200-250px |
| Email | fill_container |
| Status Badge | 100-120px |
| Date | 120-150px |
| Actions | 80-100px |
| Price/Number | 100-120px |

---

## Spacing Reference

| Context | Gap | Padding |
|---------|-----|---------|
| Sidebar nav items | 4px | [10, 12] |
| Card content | 16-24px | 24px |
| Table cells | - | [12, 16] |
| Form fields | 20px | - |
| Button groups | 12px | - |
| Page sections | 24-32px | 32px |
| Metric cards | 8px | 24px |

---

Last Updated: 2026-02-03

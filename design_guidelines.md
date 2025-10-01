# Design Guidelines: F-S AIPE Healthcare Educational Platform

## Design Approach
**Reference-Based Approach** drawing from modern SaaS and healthcare tech leaders:
- **Linear** - Clean typography, subtle animations, professional dashboard aesthetics
- **Stripe** - Clear hierarchy, restrained color usage, trust-building design
- **Healthcare Tech** - Professional blues, clinical whites, accessible information design

**Core Principle:** Create a trustworthy, professional educational experience that makes complex AI prompt engineering concepts visually accessible to healthcare administrators.

---

## Color Palette

**Primary Brand Colors:**
- Primary Blue (Trust): 212 95% 45% - Medical professionalism, used for primary actions and headers
- Deep Navy (Authority): 220 40% 20% - Section headers, key text elements
- Pure White: 0 0% 100% - Clean backgrounds, card surfaces

**Accent & Semantic Colors:**
- Success Green: 142 70% 45% - Positive outcomes, efficiency indicators
- Warning Amber: 38 92% 50% - Caution areas, cost metrics
- Error Red: 0 84% 60% - Risk areas, security alerts
- Neutral Gray Scale: 220 10% (95%, 70%, 50%, 30%) - Text hierarchy, borders, subtle backgrounds

**Background & Surface:**
- Page Background: 220 15% 98% - Soft white with subtle blue undertone
- Card Surfaces: 0 0% 100% - Pure white with subtle shadows
- Code Blocks: 220 20% 18% - Dark navy for technical content

---

## Typography

**Font Families (via Google Fonts):**
- Headings: 'Inter' - Modern, professional, excellent readability
- Body: 'Inter' - Consistent family, varied weights for hierarchy
- Code/Technical: 'JetBrains Mono' - Monospace for prompt examples and code

**Type Scale:**
- Hero/H1: text-5xl (3rem) font-bold
- Section Headers/H2: text-3xl (1.875rem) font-semibold
- Subsections/H3: text-xl (1.25rem) font-semibold
- Body: text-base (1rem) font-normal
- Small/Captions: text-sm (0.875rem) font-medium
- Code: text-sm font-mono

---

## Layout System

**Spacing Primitives:** Consistent Tailwind units of **2, 4, 8, 12, 16, 20, 24** for all spacing
- Component padding: p-6, p-8
- Section spacing: py-16, py-20
- Card gaps: gap-6, gap-8
- Element margins: mb-4, mb-8, mt-12

**Container Strategy:**
- Max width: max-w-7xl (1280px) for main content
- Section padding: px-6 md:px-12
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Component Library

### Navigation
- **Top Navigation Bar:** Fixed header with logo, five challenge area links, subtle shadow on scroll
- **Sticky Section Nav:** Side navigation showing current position within challenge areas
- **Breadcrumbs:** Hierarchical navigation showing current location

### Hero Section
- **Full-width hero** (h-[500px]) with gradient background (navy to blue)
- Bold headline explaining F-S AIPE mission
- Subheading describing target audience
- Primary CTA button: "Explore All Five Challenges"
- **Hero Image:** Abstract medical AI visualization (neural network + healthcare icons), right-aligned, 40% width

### Challenge Area Cards (Dashboard)
- **5 Large Cards** in responsive grid layout
- Each card: Icon (64px), Challenge title, Brief description, "Explore" CTA
- Hover state: Subtle lift (shadow increase), scale transform
- Color-coded borders matching challenge theme

### Interactive Demo Modules
- **Split-pane layout:** Left (before/traditional approach), Right (F-S AIPE approach)
- **Code viewer:** Syntax-highlighted prompt examples in dark code blocks
- **Live demo area:** Input field → AI response simulation with loading states
- **Comparison metrics:** Visual bars/charts showing improvements

### Data Visualization
- **Before/After Comparison Tables:** Clean bordered tables with alternating row colors
- **Metric Cards:** Large number displays with trend indicators
- **Progress Indicators:** Token usage, cost savings, efficiency gains visualized

### Content Sections
- **Component Breakdown Tables:** 3-column layouts (Component, Description, Impact)
- **Best Practice Callouts:** Bordered boxes with icons, light background tint
- **Code Examples:** Syntax-highlighted blocks with copy button
- **Guardrail Demonstrations:** Visual flowcharts showing prompt structure

---

## Key UI Patterns

**Interactive Elements:**
- Tabs for switching between challenge areas within modules
- Accordions for detailed component breakdowns
- Modal overlays for in-depth prompt structure examination
- Tooltips on hover for technical term definitions

**Trust Indicators:**
- Subtle lock icons for security/privacy sections
- Checkmark badges for compliance features
- Shield icons for regulatory components

**Visual Hierarchy:**
- Use generous whitespace (py-16 between sections)
- Clear visual separation with subtle borders (border-gray-200)
- Contrast through size, weight, and color, not clutter

---

## Images

**Hero Image:**
- Abstract medical + AI fusion visualization
- Placement: Right-aligned, occupying 40% width on desktop, full-width on mobile
- Style: Modern, semi-transparent with gradient overlay

**Section Images:**
- Each of the 5 challenge areas includes a relevant icon/illustration (256px)
- Interactive demo screenshots showing AI outputs
- Flowchart diagrams illustrating prompt injection prevention
- Before/after comparison visuals for data extraction

**No additional large hero images** in subsequent sections - focus on information clarity.

---

## Accessibility & Polish

- WCAG AA contrast ratios throughout
- Focus states: 2px blue ring on interactive elements
- Consistent dark mode: Invert to dark navy backgrounds, light text, maintain contrast
- Smooth transitions: transition-all duration-200 for hover states
- Loading states: Subtle skeleton screens, spinner for AI demos

**Animation Philosophy:** Minimal, purposeful only - subtle card hovers, smooth tab transitions, no distracting motion.
# TechLearn Solutions QOTD - Visual Architecture Guide

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        NAVBAR                                    │
│  Logo | Nav Items | User Profile                                │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                     PAGE HEADER                                  │
│  Title | Subtitle                            Timer Badge →      │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                     MAIN CONTENT (3-COLUMN)                     │
├──────────────────┬─────────────────────────┬──────────────────┤
│                  │                         │                   │
│  QUESTION CARD   │    CODE EDITOR          │   SIDEBAR         │
│                  │                         │                   │
│  • Difficulty    │  • Editor Textarea      │  • Progress Card  │
│  • Title         │  • Output/Test Tabs     │  • Leaderboard    │
│  • Description   │  • Run/Submit Buttons   │                   │
│  • Examples      │                         │                   │
│  • Hint Section  │                         │                   │
│                  │                         │                   │
└──────────────────┴─────────────────────────┴──────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                     DAILY CTA BANNER                             │
│  "Keep Your Streak Alive!" + Action Button                      │
└─────────────────────────────────────────────────────────────────┘
```

## 📱 Responsive Breakpoints

### Desktop (1200px+)
```
┌─────────────────────────────────────────────────────────────┐
│                      NAVBAR                                  │
├───────────────┬──────────────────────┬────────────────────┤
│   QUESTION    │    CODE EDITOR       │     SIDEBAR        │
│   (1fr)       │    (1.3fr)           │     (1fr)          │
│               │                      │                    │
└───────────────┴──────────────────────┴────────────────────┘
```

### Tablet (768px - 1199px)
```
┌─────────────────────────────────────────────────────────────┐
│                      NAVBAR                                  │
├───────────────────────┬──────────────────────────────────┤
│   QUESTION            │    CODE EDITOR                   │
│   (1fr)               │    (1fr)                         │
├───────────────────────┴──────────────────────────────────┤
│              SIDEBAR (2 columns)                           │
│     Progress Card  │  Leaderboard Card                   │
└──────────────────────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────────────────┐
│        NAVBAR                │
├──────────────────────────────┤
│     QUESTION CARD            │
├──────────────────────────────┤
│    CODE EDITOR               │
├──────────────────────────────┤
│   PROGRESS CARD              │
├──────────────────────────────┤
│   LEADERBOARD CARD           │
├──────────────────────────────┤
│     DAILY CTA                │
└──────────────────────────────┘
```

## 🎨 Color Usage by Component

### Navbar
- Background: `--color-white`
- Text: `--color-text-primary` / `--color-text-secondary`
- Accent: `--color-primary-blue` (logo, active nav)
- Border: `--color-gray`

### PageHeader
- Background: `--color-white`
- Title: `--color-text-primary` (large, bold)
- Subtitle: `--color-text-secondary`
- Timer badge: `--color-light-gray` background

### QuestionCard
- Background: `--color-white`
- Difficulty badges: `--color-easy/medium/hard`
- Tags: `--color-light-gray` background with `--color-primary-blue` text
- Examples: `--color-light-gray` background
- Hint: Left border accent with `--color-primary-blue`

### CodeEditor
- Editor BG: `--color-editor-bg` (#1e1e1e)
- Editor Text: `--color-editor-text` (#e0e0e0)
- Success: `--color-success-light` background, `--color-success` text
- Buttons: Primary (blue), Secondary (outlined)
- Tabs: `--color-primary-blue` underline for active

### Sidebar
- Progress values: `--color-primary-blue` text
- Streak: `--color-warning` emoji/text
- Badges: Gold/Silver/Bronze for ranks 1-3, then `--color-primary-blue`
- Backgrounds: `--color-light-gray` items

### DailyCTA
- Background: Gradient (`--color-primary-blue` to `--color-primary-blue-dark`)
- Text: `--color-white`
- Button: `--color-white` background with `--color-primary-blue` text

## 🧩 Component Hierarchy

```
App
├── Navbar
├── PageHeader
├── Main (with content-container grid)
│   ├── QuestionCard
│   ├── CodeEditor
│   └── Sidebar
│       ├── Progress Card
│       └── Leaderboard Card
└── DailyCTA
```

## 📊 Typography Hierarchy

### Heading Levels
- **Page Title** (h1): 32px, 700 weight
- **Section Title** (h2-h3): 24px/18px, 700/600 weight  
- **Component Title** (h3): 18px, 700 weight
- **Body Text**: 16px, 400 weight
- **Labels/Meta**: 12px-14px, 500-600 weight

### Font Styling
- **Bold**: Headings, labels, CTAs
- **Regular**: Body text, descriptions
- **Monospace**: Code snippets, runtime values

## 🎯 Interactive Elements

### Buttons
- **Primary CTA** (Submit): Blue background, white text, hover shadow
- **Secondary** (Run Code): Outlined, blue text
- **Hint Collapse** (Need a hint?): Text button with chevron icon

### Hover States
- Navbar links: Color change
- Cards: Subtle lift (via shadow)
- Buttons: Background shift + shadow
- Leaderboard items: Background color change

### Focus States
- All interactive elements: 2px outline with offset
- Color: `--color-primary-blue`

### Tabs
- Active tab: Blue underline + white background
- Inactive: Gray text on gray background

## 📏 Spacing Patterns

### Card Spacing
- Header padding: `var(--spacing-xl)` (16px)
- Body padding: `var(--spacing-xl)` (16px)
- Gap between items: `var(--spacing-lg)` (12px)

### Grid Gaps
- Desktop: `var(--spacing-xl)` (16px) between columns
- Tablet: `var(--spacing-lg)` (12px) between columns
- Mobile: `var(--spacing-base)` (8px) between sections

### Vertical Rhythm
- Headings to content: `var(--spacing-lg)` (12px)
- Section breaks: `var(--spacing-xl)` (16px)
- List items: `var(--spacing-base)` (8px) gap

## ✨ Visual Polish Details

### Shadows
- Cards: `var(--shadow-base)` (subtle depth)
- Hover buttons: `var(--shadow-md)` (elevated feel)
- CTA Banner: `var(--shadow-lg)` (prominent)

### Transitions
- Hover effects: `var(--transition-fast)` (150ms)
- Tab switches: `var(--transition-base)` (200ms)
- Hint expand: `var(--transition-slow)` (300ms)

### Border Radius
- Cards: `var(--border-radius-lg)` (8px)
- Inputs/tags: `var(--border-radius-base)` (6px)
- Avatars: 50% (perfect circle)

## 🚀 Performance Optimizations

1. **CSS Variables**: Reduces code duplication
2. **Efficient Grid**: Single layout definition per breakpoint
3. **Minimal Shadows**: Only on interactive elements
4. **Hardware Acceleration**: Transitions use GPU-friendly properties
5. **Semantic HTML**: Better tree structure

## 🔄 State Management

### Component State (Managed with `useState`)
- `QuestionCard`: `isHintExpanded` (boolean)
- `CodeEditor`: `activeTab` ('output' | 'test-cases')

### Potential Future State
- User authentication state
- Submission status
- Timer countdown
- Code input value
- Filter/sort preferences

## 📱 Touch-Friendly Design

- Minimum touch target: 44px (buttons, interactive elements)
- Generous padding on mobile
- Tappable areas clearly defined
- Hover states converted to active states on mobile

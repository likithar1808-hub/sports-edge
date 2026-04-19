# Design Brief

## Direction

Sports Edge — premium athletic merchandise e-commerce with navy/green/white palette and confident, bold modern aesthetic.

## Tone

Disciplined athletic brand executed with sharp geometric layouts and high contrast — no decoration, all intentionality. Strong navy foundations with forest green accents create premium sports positioning.

## Differentiation

Navy/green/white palette consistently applied across all surfaces (header, cards, buttons, footer) creates a distinctive athletic brand that stands apart from generic e-commerce defaults. Sharp product grid showcase with hero imagery elevates merchandise presentation.

## Color Palette

| Token      | OKLCH         | Role                                    |
| ---------- | ------------- | --------------------------------------- |
| background | 0.98 0.008 230 | Light: off-white primary surface        |
| foreground | 0.14 0.025 265 | Deep navy text on light                 |
| primary    | 0.38 0.16 265 | Dark navy interactive elements          |
| accent     | 0.58 0.18 155 | Forest green highlights & accents       |
| card       | 0.99 0.005 230 | Product cards, elevated surfaces        |
| muted      | 0.94 0.008 230 | Secondary backgrounds, borders          |

## Typography

- Display: Space Grotesk — geometric, athletic, headlines and hero text
- Body: Satoshi — clean, modern, readable UI labels and descriptions
- Scale: hero `text-5xl md:text-7xl font-bold`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold tracking-widest`, body `text-base text-foreground`

## Elevation & Depth

Sharp card elevation via subtle shadow hierarchy (xs/sm/md/lg) with dark navy typography on light surfaces; dark mode inverts with forest green accents on navy backgrounds. Shadows are functional, not decorative — they clarify depth, not mood.

## Structural Zones

| Zone    | Background          | Border                | Notes                                                    |
| ------- | ------------------- | --------------------- | -------------------------------------------------------- |
| Header  | primary navy        | primary/20 bottom     | Sticky, white text, sports logo + nav                    |
| Hero    | muted light surface | none                  | Full-width hero banner with sports imagery               |
| Content | background white    | none                  | Product grid, category sections, info blocks             |
| Footer  | foreground navy     | foreground/10 top     | White text, contact details, social links                |

## Spacing & Rhythm

Section spacing 12-16 units (py-12 md:py-16), card gap 24 units (gap-6), micro-spacing 8 units. Product grid alternates between full-width hero, 3-column grid on desktop, 2-column on tablet, 1-column mobile. Density increases from spacious header/hero to dense product grid.

## Component Patterns

- Buttons: navy primary `bg-primary text-white`, forest green accent `bg-accent text-navy`, 8px rounded corners, 6px padding sides
- Cards: white background, subtle shadow, 8px radius, hover lift (shadow-md), border-none
- Badges: forest green background, navy text, rounded full, 4px padding

## Motion

- Entrance: fade-in on scroll via intersection observer, 300ms smooth curve
- Hover: cards lift and shadow deepens (xs → md), buttons brighten 10% opacity shift, 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Decorative: none — focus on clarity and product showcase

## Constraints

- Navy/green/white only — no other accent colors in production
- No gradients — flat, bold color blocks
- No animations on products — only on interactive elements
- Dark mode toggle available; dark mode is primary design target (navy background, light text, green accents)

## Signature Detail

Forest green accent used sparingly on CTAs, category badges, and selected product highlights creates a premium athletic brand presence without competing with product imagery. Navy anchor keeps hierarchy grounded.


# ICP cards - spec for the animation

Live preview: /cards (15 selected), /cards?set=all (all 27), add &r=916 for 9:16.

Data: `cards.json` - one object per card:
- `name` app category (top of card), `head` (one line), `sub` (max two lines)
- `image` path to the photo (portrait 9:16 source, 720px wide, shown with object-fit: cover)
- `background.from` / `background.to` vertical gradient for the card
- `featured` true for the 15 selected cards

Card layout (reference: .card in cards.html):
- Card: aspect ratio 4:5 (same as the addflair.dev hero cards) or 9:16, radius 24px, soft shadow.
- Name: centered, top 22px, Bricolage Grotesque 700, 27px, letter-spacing -0.035em, #151515, one line (shrink to fit).
- Phone: centered, 60% of card width, starts 70px from the top and runs off the bottom edge.
  Border 2px #d4d2cd, radius 30px, small notch (30% wide, 9px tall, #1a1a1a) 7px from the top. Photo fills the screen.
- Glass card: 12px from left, right and bottom, radius 18px, centered text.
  Background rgba(255,255,255,.62), border 1px rgba(255,255,255,.8), backdrop-filter blur(22px) saturate(1.5).
  Head: Geist 600, 15.5px, #141414, one line. Sub: Geist 400, 12.5px, line-height 1.4, #4d4b48, max 2 lines.

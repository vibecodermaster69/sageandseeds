# Image sources

## Original packaging - do not redesign

The four *-original.jpeg files are byte-for-byte copies of the client's supplied photographs from C:/Users/Bot/Downloads/WhatsApp Unknown 2026-08-31 at 17.09.11.

- masala-original.jpeg: WhatsApp Image 2026-08-28 at 03.12.35.jpeg
- classic-original.jpeg: WhatsApp Image 2026-08-28 at 03.12.36 (1).jpeg
- pink-original.jpeg: WhatsApp Image 2026-08-28 at 03.12.36 (2).jpeg
- cacao-original.jpeg: WhatsApp Image 2026-08-28 at 03.12.36.jpeg

app/packaging.tsx uses SVG clipping to hide the room around the original pouches. It does not regenerate, retouch, recolour, or replace their artwork. The original Masala photograph is layered in the hero using CSS. The client mockup is a layout reference only, never a website asset.

## Generated surrounding scene

hero-scene.webp was generated with the built-in image generation tool and encoded as WebP. It contains no packaging. Final prompt:

Generate a photorealistic editorial food still life, landscape 3:2. Warm light ivory seamless wall and tabletop, soft daylight. A low rustic speckled beige ceramic bowl heaped with white round roasted makhana at lower left, oatmeal linen underneath spreading toward right, wooden scoop with a few makhana at far lower right, blurred small green plant at far right back. Crucial: the center-right area must be EMPTY tabletop with pale blank wall behind it, reserved for a real product photograph to be placed later. Absolutely NO packaging, NO pouch, NO bags, NO boxes, NO logos, NO text. Bowl occupies lower-left quarter, with entire bowl visible. Calm premium natural still life matching an earthy cream food brand website. Leave upper half predominantly empty cream wall.

## Updated flavour photos supplied by the client

The flavour cards and product popups now use byte-for-byte copies from C:/Users/Bot/Desktop/sageandseed. These photographs are displayed intact, without cropping or regeneration. The existing hero continues to use the original Masala pouch.

- pink-lifestyle.png: pinksalt.png (Himalayan Pink Salt)
- classic-lifestyle.png: saltandpeper.png (Classic Salt & Pepper)
- masala-lifestyle.png: indian masala.png (Indian Masala)
- cacao-lifestyle.png: cococrunch.png (Cacao Crunch)

## Current hero

hero-client.jpg is an unmodified copy of C:/Users/Bot/Desktop/sageandseed/hero.jpg, supplied by the client. It replaces the generated hero scene and separate original pouch overlay. The complete photo is displayed without cropping; the makhana click effect remains coded separately.

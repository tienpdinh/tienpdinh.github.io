"""
Builds public/favicon.svg from Space Grotesk glyph outlines.

The letters are baked into paths because an SVG favicon cannot load a webfont,
so the mark has to carry its own outlines.

    curl -A "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like \
Gecko) Chrome/25.0.1364.97 Safari/537.36" \
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700"
    # follow the url(...) in the response to fetch the .woff, then:
    python3 scripts/make-icon.py SpaceGrotesk-Bold.woff 38 1 > public/favicon.svg

favicon.ico and apple-touch-icon.png are rasterised from that SVG; the touch
icon is rendered from a square-cornered copy, since iOS masks the corners
itself and a pre-rounded tile would be clipped twice.

Usage: python3 scripts/make-icon.py <font.woff> [font-size] [tracking]
"""

import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont

BOX = 64.0
TILE = "#f0a868"
INK = "#101826"

font_path = sys.argv[1]
font_size = float(sys.argv[2]) if len(sys.argv) > 2 else 38.0
tracking = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5

font = TTFont(font_path)
upem = font["head"].unitsPerEm
cap = getattr(font["OS/2"], "sCapHeight", None) or 700
cmap = font.getBestCmap()
glyph_set = font.getGlyphSet()
hmtx = font["hmtx"]
scale = font_size / upem

glyphs = []
for ch in "TD":
    name = cmap[ord(ch)]
    pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(pen)
    glyphs.append((pen.getCommands(), hmtx[name][0]))

# Lay the pair out from its true advance width so it sits optically centred.
total = sum(adv for _, adv in glyphs) * scale + tracking * (len(glyphs) - 1)
x = (BOX - total) / 2.0
baseline = BOX / 2.0 + (cap * scale) / 2.0

paths = []
for commands, adv in glyphs:
    # Font space is y-up, SVG is y-down, hence the negative y scale.
    paths.append(
        f'<path transform="translate({x:.3f} {baseline:.3f}) '
        f'scale({scale:.5f} {-scale:.5f})" d="{commands}"/>'
    )
    x += adv * scale + tracking

svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    f'<rect width="64" height="64" rx="14" fill="{TILE}"/>'
    f'<g fill="{INK}">{"".join(paths)}</g>'
    "</svg>"
)

sys.stdout.write(svg + "\n")
sys.stderr.write(
    f"font-size={font_size} tracking={tracking} width={total:.2f}/{BOX:.0f} "
    f"({total / BOX:.0%} of tile)\n"
)

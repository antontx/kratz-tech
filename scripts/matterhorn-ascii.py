"""Render public/swiss-alps-dither.webp as ASCII art.

Usage: python3 scripts/matterhorn-ascii.py > src/components/matterhorn.txt
"""

import sys
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

COLS = 400
# Crop to the Matterhorn and its foothills (source pixels: left, top, right, bottom).
CROP = (700, 100, 2172, 724)
# Geist Mono advance width is 0.6em; rendered at line-height 1.
CELL_ASPECT = 0.6
# Dark-to-light, ordered by glyph ink coverage.
RAMP = " .,:;~=+*oxO#%@"

source = Path(__file__).resolve().parent.parent / "public" / "swiss-alps-dither.webp"
image = Image.open(source).convert("RGBA").crop(CROP)
rows = round(COLS * image.height / image.width * CELL_ASPECT)

alpha = image.getchannel("A").resize((COLS, rows), Image.Resampling.BOX)
tone = ImageOps.grayscale(image.convert("RGB"))
tone = tone.filter(ImageFilter.GaussianBlur(image.width / COLS / 2))
tone = tone.resize((COLS, rows), Image.Resampling.LANCZOS)
tone = tone.filter(ImageFilter.UnsharpMask(radius=2, percent=120, threshold=2))
mask = alpha.point(lambda value: 255 if value >= 128 else 0)
tone = ImageOps.equalize(tone, mask)

lines = []
for y in range(rows):
    line = ""
    for x in range(COLS):
        if alpha.getpixel((x, y)) < 128:
            line += " "
            continue
        light = tone.getpixel((x, y)) / 255
        # Push shadows down so rock faces read as dark gaps.
        light = light**1.6
        line += RAMP[round(light * (len(RAMP) - 1))]
    lines.append(line.rstrip())

while lines and not lines[0]:
    lines.pop(0)

sys.stdout.write("\n".join(lines) + "\n")

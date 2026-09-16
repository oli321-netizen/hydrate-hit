#!/usr/bin/env python3
"""Generate FluxHit lid, hero, pack, OG, and icon assets."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public"
TINS = OUT / "tins"

BLACK = "/tmp/ArchivoBlack-Regular.ttf"
INTER_B = "/usr/share/fonts/truetype/macos/Inter-Bold.ttf"
INTER = "/usr/share/fonts/truetype/macos/Inter-SemiBold.ttf"
INTER_R = "/usr/share/fonts/truetype/macos/Inter-Regular.ttf"
INTER_M = "/usr/share/fonts/truetype/macos/Inter-Medium.ttf"

BLUE = "#2F86E8"
PINK = "#D63D8C"
INK = "#18181B"
MUTED = "#8A8A92"
PROOF = "#6B6B73"
LID = "#FAFAFA"
RIM = "#E6E6EA"
NAVY = "#0B1C33"
BG = "#ECECEE"

FLAVOURS = [
    {
        "slug": "frost-mint",
        "a": "FROST",
        "b": "MINT",
        "tone_a": "#2F86E8",
        "tone_b": "#7EC8F0",
        "crystal": ("#2F86E8", "#7EC8F0"),
    },
    {
        "slug": "citrus-ice",
        "a": "CITRUS",
        "b": "ICE",
        "tone_a": "#E8A317",
        "tone_b": "#2F86E8",
        "crystal": ("#E8A317", "#2F86E8"),
    },
    {
        "slug": "blue-razz",
        "a": "BLUE",
        "b": "RAZZ",
        "tone_a": "#2F86E8",
        "tone_b": "#D63D8C",
        "crystal": ("#2F86E8", "#D63D8C"),
    },
    {
        "slug": "peach-ice",
        "a": "PEACH",
        "b": "ICE",
        "tone_a": "#E8896A",
        "tone_b": "#2F86E8",
        "crystal": ("#E8896A", "#F7D0C0"),
    },
    {
        "slug": "cherry-ice",
        "a": "CHERRY",
        "b": "ICE",
        "tone_a": "#D11F3C",
        "tone_b": "#2F86E8",
        "crystal": ("#D11F3C", "#F5A3B0"),
    },
]


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def hex_rgb(value: str) -> tuple[int, int, int]:
    v = value.lstrip("#")
    return int(v[0:2], 16), int(v[2:4], 16), int(v[4:6], 16)


def centered(draw: ImageDraw.ImageDraw, text: str, y: float, fnt: ImageFont.FreeTypeFont, fill, cx: float) -> None:
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w = bbox[2] - bbox[0]
    draw.text((cx - w / 2, y), text, font=fnt, fill=fill)


def draw_crystal(draw: ImageDraw.ImageDraw, cx: float, cy: float, scale: float, a: str, b: str) -> None:
    # CrystalMark polygons in a 64x64 box, mapped around (cx, cy).
    def pt(x: float, y: float) -> tuple[float, float]:
        return cx + (x - 32) * scale, cy + (y - 32) * scale

    draw.polygon(
        [pt(8, 28), pt(32, 6), pt(40, 30), pt(24, 58)],
        fill=hex_rgb(a),
    )
    draw.polygon(
        [pt(32, 6), pt(56, 28), pt(40, 58), pt(40, 30)],
        fill=hex_rgb(b),
    )


def make_lid(flavour: dict, size: int = 2000) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx = cy = size / 2
    r = size / 2 - 8

    # Outer rim + face
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=hex_rgb(RIM) + (255,))
    inner = r * 0.955
    draw.ellipse((cx - inner, cy - inner, cx + inner, cy + inner), fill=hex_rgb(LID) + (255,))

    # Dual-tone ring
    ring_r = r * 0.905
    ring_w = max(6, int(size * 0.011))
    bbox = (cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r)
    draw.arc(bbox, start=90, end=270, fill=hex_rgb(BLUE) + (255,), width=ring_w)
    draw.arc(bbox, start=270, end=360, fill=hex_rgb(PINK) + (255,), width=ring_w)
    draw.arc(bbox, start=0, end=90, fill=hex_rgb(PINK) + (255,), width=ring_w)

    f_brand = font(BLACK, int(size * 0.078))
    f_word = font(BLACK, int(size * 0.092))
    f_tag = font(INTER_R, int(size * 0.022))
    f_proof = font(INTER_M, int(size * 0.024))
    f_proof2 = font(INTER_B, int(size * 0.024))
    f_foot = font(INTER, int(size * 0.018))

    centered(draw, "FLUXHIT", size * 0.20, f_brand, hex_rgb(INK) + (255,), cx)

    a_bbox = draw.textbbox((0, 0), flavour["a"], font=f_word)
    b_bbox = draw.textbbox((0, 0), flavour["b"], font=f_word)
    a_h = a_bbox[3] - a_bbox[1]
    centered(draw, flavour["a"], size * 0.292, f_word, hex_rgb(flavour["tone_a"]) + (255,), cx)
    centered(draw, flavour["b"], size * 0.292 + a_h * 1.12, f_word, hex_rgb(flavour["tone_b"]) + (255,), cx)

    centered(
        draw,
        "smooth hit  ·  light electrolytes",
        size * 0.48,
        f_tag,
        hex_rgb(MUTED) + (255,),
        cx,
    )

    # Brand crystal is always blue / pink on-pack, even when the flavour pair differs.
    draw_crystal(draw, cx, size * 0.605, size / 64 * 0.22, BLUE, PINK)

    centered(
        draw,
        "CAFFEINE  ·  THEANINE  ·  Na  ·  K",
        size * 0.72,
        f_proof,
        hex_rgb(PROOF) + (255,),
        cx,
    )
    centered(draw, "B6  ·  B12", size * 0.755, f_proof2, hex_rgb(INK) + (255,), cx)
    centered(
        draw,
        "NICOTINE-FREE  ·  20 POUCHES",
        size * 0.81,
        f_foot,
        hex_rgb(MUTED) + (255,),
        cx,
    )

    # Circular alpha
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    img.putalpha(mask)
    return img


def tin_hero(lid: Image.Image, w: int = 1280, h: int = 720) -> Image.Image:
    canvas = Image.new("RGB", (w, h), hex_rgb(BG))
    # Soft vignette
    overlay = Image.new("RGB", (w, h), hex_rgb("#f7f7f8"))
    canvas = Image.blend(canvas, overlay, 0.35)

    tin_d = int(h * 0.78)
    rim = Image.new("RGBA", (tin_d + 28, tin_d + 28), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rim)
    rd.ellipse((0, 0, tin_d + 27, tin_d + 27), fill=(255, 255, 255, 255))
    rd.ellipse((10, 10, tin_d + 17, tin_d + 17), fill=hex_rgb(RIM) + (255,))
    lid_r = lid.resize((tin_d - 8, tin_d - 8), Image.Resampling.LANCZOS)
    rim.paste(lid_r, (18, 18), lid_r)
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    sx = (w - tin_d) // 2
    sy = (h - tin_d) // 2 + 8
    sd.ellipse((sx + 18, sy + tin_d - 28, sx + tin_d - 18, sy + tin_d + 18), fill=(0, 0, 0, 28))
    shadow = shadow.filter(ImageFilter.GaussianBlur(12))
    canvas.paste(Image.alpha_composite(canvas.convert("RGBA"), shadow).convert("RGB"))
    canvas.paste(rim, ((w - rim.width) // 2, (h - rim.height) // 2 - 6), rim)
    return canvas


def pack_shot(lids: list[Image.Image], title: str, subtitle: str, price: str, w=1280, h=720) -> Image.Image:
    canvas = Image.new("RGB", (w, h), hex_rgb(BG))
    draw = ImageDraw.Draw(canvas)
    box = (70, 90, w - 70, h - 90)
    draw.rounded_rectangle(box, radius=18, fill=(250, 250, 250), outline=hex_rgb("#d4d4d8"), width=2)
    f_brand = font(BLACK, 42)
    f_sub = font(INTER_B, 22)
    f_meta = font(INTER_R, 16)
    f_price = font(INTER_B, 22)
    centered(draw, "FLUXHIT", 118, f_brand, hex_rgb(INK), w / 2)
    centered(draw, title, 168, f_sub, hex_rgb(INK), w / 2)

    n = len(lids)
    window_y = 210
    window_h = 340
    window = (110, window_y, w - 110, window_y + window_h)
    draw.rounded_rectangle(window, radius=12, fill=hex_rgb("#f3f4f6"))
    lid_d = 210 if n <= 3 else 168
    gap = 28 if n <= 3 else 18
    total = n * lid_d + (n - 1) * gap
    x0 = (w - total) / 2
    y0 = window_y + (window_h - lid_d) / 2
    for i, lid in enumerate(lids):
        small = lid.resize((lid_d, lid_d), Image.Resampling.LANCZOS)
        canvas.paste(small, (int(x0 + i * (lid_d + gap)), int(y0)), small)

    centered(draw, subtitle, 565, f_meta, hex_rgb(PROOF), w / 2)
    centered(draw, "smooth hit · light electrolytes", 590, f_meta, hex_rgb(MUTED), w / 2)
    centered(draw, "Caffeine · Theanine · Na · K · B6 · B12", 615, f_meta, hex_rgb(MUTED), w / 2)
    draw.text((w - 170, 615), price, font=f_price, fill=hex_rgb(INK))
    return canvas


def make_side(flavour: dict, w=2048, h=360) -> Image.Image:
    img = Image.new("RGB", (w, h), hex_rgb(NAVY))
    draw = ImageDraw.Draw(img)
    f_rep = font(BLACK, 22)
    f_word = font(BLACK, 54)
    f_meta = font(INTER, 16)
    f_small = font(INTER_R, 14)
    # repeating wordmark
    text = "FLUXHIT   "
    tw = draw.textbbox((0, 0), text, font=f_rep)[2]
    x = 0
    while x < w:
        draw.text((x, 14), "FLUXHIT", font=f_rep, fill=(36, 64, 102))
        x += tw
    draw.line((0, 52, w, 52), fill=hex_rgb(PINK), width=3)

    draw.ellipse((48, 78, 68, 98), fill=hex_rgb(BLUE))
    draw.ellipse((76, 78, 96, 98), fill=hex_rgb(BLUE))
    draw.ellipse((104, 78, 124, 98), outline=hex_rgb(BLUE), width=2)
    draw.text((140, 78), "80 MG CAFFEINE / POUCH", font=f_meta, fill=(200, 210, 230))

    a_bbox = draw.textbbox((0, 0), flavour["a"] + "  ", font=f_word)
    ax = w / 2 - (a_bbox[2] + draw.textbbox((0, 0), flavour["b"], font=f_word)[2]) / 2
    draw.text((ax, 130), flavour["a"], font=f_word, fill=hex_rgb(flavour["tone_a"]))
    draw.text((ax + a_bbox[2], 130), flavour["b"], font=f_word, fill=hex_rgb(flavour["tone_b"]))

    pill = (w / 2 - 90, 210, w / 2 + 90, 246)
    draw.rounded_rectangle(pill, radius=18, fill=(250, 250, 250))
    centered(draw, "NICOTINE-FREE", 216, f_small, hex_rgb(INK), w / 2)

    draw.text((w - 420, 78), "FLUXHIT", font=font(BLACK, 20), fill=(230, 235, 245))
    draw.text((w - 420, 108), "smooth hit · light electrolytes", font=f_small, fill=(160, 175, 200))
    draw.text((w - 420, 132), "20 pouches · food supplement · 18+", font=f_small, fill=(160, 175, 200))

    draw.rectangle((0, h - 42, w, h), fill=(6, 14, 26))
    draw.text(
        (24, h - 30),
        "Oral pouches · Do not chew · Max 2 / day · Keep out of reach of children",
        font=f_small,
        fill=(150, 165, 190),
    )
    draw.text((w - 220, h - 30), "getfluxhit.com", font=f_small, fill=(150, 165, 190))
    return img


def make_og(lids: dict[str, Image.Image]) -> Image.Image:
    w, h = 1200, 630
    canvas = Image.new("RGB", (w, h), hex_rgb("#f4f5f7"))
    draw = ImageDraw.Draw(canvas)
    f_brand = font(BLACK, 64)
    f_tag = font(INTER, 26)
    f_line = font(INTER_R, 18)
    draw.text((64, 120), "FLUXHIT", font=f_brand, fill=hex_rgb(INK))
    draw.text((64, 200), "smooth hit · light electrolytes", font=f_tag, fill=hex_rgb(INK))
    draw.text((64, 250), "80mg caffeine · 60mg theanine · light electrolytes · B6 + B12", font=f_line, fill=hex_rgb(PROOF))
    draw.line((64, 300, 420, 300), fill=hex_rgb(BLUE), width=4)
    draw.line((420, 300, 520, 300), fill=hex_rgb(PINK), width=4)

    hero = lids["blue-razz"].resize((360, 360), Image.Resampling.LANCZOS)
    canvas.paste(hero, (760, 40), hero)
    xs = [620, 780, 940]
    slugs = ["frost-mint", "citrus-ice", "blue-razz"]
    for x, slug in zip(xs, slugs):
        small = lids[slug].resize((150, 150), Image.Resampling.LANCZOS)
        canvas.paste(small, (x, 430), small)

    draw.rectangle((0, h - 10, w // 2, h), fill=hex_rgb(BLUE))
    draw.rectangle((w // 2, h - 10, w, h), fill=hex_rgb(PINK))
    return canvas


def main() -> None:
    TINS.mkdir(parents=True, exist_ok=True)
    lids: dict[str, Image.Image] = {}
    for flavour in FLAVOURS:
        lid = make_lid(flavour)
        web = lid.resize((1024, 1024), Image.Resampling.LANCZOS)
        lids[flavour["slug"]] = web
        web.save(TINS / f"{flavour['slug']}-lid.png", optimize=True)
        tin_hero(lid).save(TINS / f"{flavour['slug']}.jpg", quality=90, optimize=True)
        if flavour["slug"] in {"frost-mint", "citrus-ice", "blue-razz"}:
            make_side(flavour).save(TINS / f"{flavour['slug']}-side.png", optimize=True)
        print("wrote", flavour["slug"])

    launch = [lids["frost-mint"], lids["citrus-ice"], lids["blue-razz"]]
    all_five = launch + [lids["peach-ice"], lids["cherry-ice"]]
    pack_shot(launch, "3-CAN VARIETY", "Frost Mint · Citrus Ice · Blue Razz", "£34.99").save(
        TINS / "variety-3.jpg", quality=90, optimize=True
    )
    pack_shot(all_five, "5-PACK", "Launch three · Peach Ice & Cherry Ice coming soon", "£54.99").save(
        TINS / "five-pack.jpg", quality=90, optimize=True
    )
    og = make_og(lids)
    og.save(OUT / "og.jpg", quality=90, optimize=True)
    og.save(OUT / "og.png", optimize=True)
    icon = lids["blue-razz"].resize((512, 512), Image.Resampling.LANCZOS)
    icon.save(OUT / "icon.png", optimize=True)
    print("done")


if __name__ == "__main__":
    main()

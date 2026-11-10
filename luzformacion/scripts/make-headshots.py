#!/usr/bin/env python3
"""Genera public/images/headshots/headshot-N-{400,800}.webp desde src/assets/headshots/.

Cada recorte es cuadrado y deja la cabeza (de la coronilla o gorra a la barbilla)
centrada en el cuadrado. Los datos de cada cara están medidos a mano sobre el
original, como fracción del ancho/alto:

  cx, cy   centro de la cabeza (punto medio entre coronilla y barbilla)
  head     alto de la cabeza, de la coronilla a la barbilla

El recorte ocupa `head / fill` de alto. Si la cabeza queda cerca de un borde del
original, se repite la fila de borde (fondos lisos) para no descentrar la cara.

Uso, desde luzformacion/:   python3 scripts/make-headshots.py
Requiere Pillow. El orden de FACES es el de headshot-1 … headshot-7
(= orden alfabético de los originales).
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/headshots"
OUT = ROOT / "public/images/headshots"

FILL = 0.30  # objetivo: la cabeza ocupa ~30 % del alto del cuadrado; el resto es entorno

# Cuánto se puede salir del original sin que se note (fracción del lado del
# recorte). Arriba hay fondo liso en casi todas las fotos; abajo y a los lados
# hay cuerpo, y repetir esas filas dejaría rayas.
PAD_TOP, PAD_BOTTOM, PAD_SIDE = 0.35, 0.03, 0.06
SIZES = (400, 800)

FACES = [
    # (original, cx, cy, head, fill opcional)
    ("christian-buehner-DItYlc26zVI-unsplash.jpg", 0.655, 0.343, 0.485),
    ("christina-wocintechchat-com-m-SJvDxw0azqw-unsplash.jpg", 0.490, 0.325, 0.260),
    ("clay-elliot-mpDV4xaFP8c-unsplash.jpg", 0.480, 0.195, 0.270),
    ("giorgio-trovato-VzusBjHlKM8-unsplash.jpg", 0.485, 0.290, 0.350),
    ("mina-rad-K9T9hdf4PmI-unsplash.jpg", 0.520, 0.415, 0.330),
    ("willian-souza-p5BoBF0XJUA-unsplash.jpg", 0.430, 0.248, 0.275),
    # Carretilla elevadora: muy abierto para que se vea el trabajo.
    ("wright-building-center-UawhUYH5Xyc-unsplash.jpg", 0.445, 0.339, 0.100, 0.20),
]


def pad_edges(im: Image.Image, left: int, top: int, right: int, bottom: int) -> Image.Image:
    """Amplía el lienzo repitiendo las filas/columnas del borde."""
    if not (left or top or right or bottom):
        return im
    w, h = im.size
    out = Image.new("RGB", (w + left + right, h + top + bottom))
    out.paste(im, (left, top))
    if top:
        out.paste(im.crop((0, 0, w, 1)).resize((w, top)), (left, 0))
    if bottom:
        out.paste(im.crop((0, h - 1, w, h)).resize((w, bottom)), (left, top + h))
    full_h = h + top + bottom
    if left:
        out.paste(out.crop((left, 0, left + 1, full_h)).resize((left, full_h)), (0, 0))
    if right:
        x = left + w - 1
        out.paste(out.crop((x, 0, x + 1, full_h)).resize((right, full_h)), (left + w, 0))
    return out


def crop_square(im: Image.Image, cx: float, cy: float, head: float, fill: float) -> Image.Image:
    w, h = im.size
    side = head * h / fill
    # Tope por cada lado: si el original no da para ese zoom, se aleja lo que
    # permita (siempre centrado).
    side = min(
        side,
        cx * w / (0.5 - PAD_SIDE),
        (w - cx * w) / (0.5 - PAD_SIDE),
        cy * h / (0.5 - PAD_TOP),
        (h - cy * h) / (0.5 - PAD_BOTTOM),
    )
    print(f"  cabeza = {head * h / side:.0%} del cuadrado")
    side = round(side)
    x = round(cx * w - side / 2)
    y = round(cy * h - side / 2)
    # Cuánto se sale del original por cada lado.
    left, top = max(0, -x), max(0, -y)
    right, bottom = max(0, x + side - w), max(0, y + side - h)
    padded = pad_edges(im, left, top, right, bottom)
    return padded.crop((x + left, y + top, x + left + side, y + top + side))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for n, (name, cx, cy, head, *rest) in enumerate(FACES, start=1):
        im = Image.open(SRC / name).convert("RGB")
        square = crop_square(im, cx, cy, head, rest[0] if rest else FILL)
        for size in SIZES:
            square.resize((size, size), Image.LANCZOS).save(
                OUT / f"headshot-{n}-{size}.webp", "WEBP", quality=82, method=6
            )
        print(f"headshot-{n}: recorte {square.size[0]}px desde {name}")


if __name__ == "__main__":
    main()

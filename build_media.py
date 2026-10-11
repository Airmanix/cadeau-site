#!/usr/bin/env python3
"""
Scanne les dossiers photos/ et videos/ et écrit media.js automatiquement.

Utilisation (dans le dossier du site) :
    python build_media.py

Astuce : les fichiers sont triés par nom. Nommez-les 01-..., 02-... pour choisir l'ordre.
Une légende s'affiche si vous nommez un fichier "03-Sortie au lac.jpg" (le texte après le numéro).
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
VIDEO_EXT = {".mp4", ".webm", ".mov", ".m4v"}


def pretty(stem: str) -> str:
    """'03-Sortie_au_lac' -> 'Sortie au lac' ; 'IMG_2043' -> '' (pas de légende)."""
    text = re.sub(r"^\d+[\s._-]*", "", stem).replace("_", " ").replace("-", " ").strip()
    if re.fullmatch(r"(IMG|VID|DSC|PXL|WA|Screenshot)[\s\d]*", text, flags=re.I):
        return ""
    return text if not text.isdigit() else ""


def collect(folder: str, exts: set, key: str):
    items = []
    d = ROOT / folder
    if not d.exists():
        return items
    for f in sorted(d.iterdir(), key=lambda p: p.name.lower()):
        if f.is_file() and f.suffix.lower() in exts:
            label = pretty(f.stem)
            item = {"src": f"{folder}/{f.name}"}
            if label:
                item[key] = label
            items.append(item)
    return items


photos = collect("photos", PHOTO_EXT, "caption")
videos = collect("videos", VIDEO_EXT, "title")

content = (
    "/* Fichier généré par build_media.py — relancez le script après avoir ajouté des fichiers. */\n\n"
    "window.MEDIA = "
    + json.dumps({"photos": photos, "videos": videos}, ensure_ascii=False, indent=2)
    + ";\n"
)
(ROOT / "media.js").write_text(content, encoding="utf-8")
print(f"OK : {len(photos)} photo(s) et {len(videos)} vidéo(s) enregistrées dans media.js")

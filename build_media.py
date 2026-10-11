#!/usr/bin/env python3
"""
Scanne les dossiers photos/ et videos/ et écrit media.js automatiquement.

Utilisation (dans le dossier du site) :
    python build_media.py

Titres accrocheurs
------------------
- Si vous nommez un fichier "05-Reine du mariage.jpg", le titre affiché sera "Reine du mariage".
- Si le nom n'a pas de texte (IMG_2043.jpg, 05.jpg...), le site choisit tout seul
  un titre accrocheur dans la liste du fichier config.js (rubrique "titles").
- Les fichiers sont triés par nom : mettez 01-, 02-... pour choisir l'ordre.
- Miniature d'une vidéo (facultatif) : mettez une image du même nom dans videos/
  (ex. 01-Fete.mp4 + 01-Fete.jpg).
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PHOTO_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
VIDEO_EXT = {".mp4", ".webm", ".mov", ".m4v"}


def pretty(stem: str) -> str:
    """'03-Sortie_au_lac' -> 'Sortie au lac' ; 'IMG_2043' -> '' (le site choisira un titre)."""
    text = re.sub(r"^\d+[\s._-]*", "", stem).replace("_", " ").replace("-", " ").strip()
    if re.fullmatch(r"(IMG|VID|VIDEO|PHOTO|IMAGE|DSC|PXL|WA|MOV|Screenshot|Capture)[\s\d]*", text, flags=re.I):
        return ""
    if not text or text.isdigit():
        return ""
    return text[0].upper() + text[1:]


def collect(folder: str, exts: set):
    items = []
    d = ROOT / folder
    if not d.exists():
        return items
    for f in sorted(d.iterdir(), key=lambda p: p.name.lower()):
        if f.is_file() and f.suffix.lower() in exts:
            item = {"src": f"{folder}/{f.name}"}
            title = pretty(f.stem)
            if title:
                item["title"] = title
            if folder == "videos":
                # Une image du même nom (ex. video-01.jpg) sert de miniature à la vidéo.
                for ext in (".jpg", ".jpeg", ".png", ".webp"):
                    cover = d / (f.stem + ext)
                    if cover.exists():
                        item["poster"] = f"{folder}/{cover.name}"
                        break
            items.append(item)
    return items


photos = collect("photos", PHOTO_EXT)
videos = collect("videos", VIDEO_EXT)

content = (
    "/* Fichier généré par build_media.py — relancez le script après avoir ajouté des fichiers.\n"
    "   Vous pouvez aussi y écrire/modifier à la main un \"title\" pour n'importe quelle photo ou vidéo. */\n\n"
    "window.MEDIA = "
    + json.dumps({"photos": photos, "videos": videos}, ensure_ascii=False, indent=2)
    + ";\n"
)
(ROOT / "media.js").write_text(content, encoding="utf-8")
print(f"OK : {len(photos)} photo(s) et {len(videos)} vidéo(s) enregistrées dans media.js")

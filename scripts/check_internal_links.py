#!/usr/bin/env python3
"""Check generated Jekyll HTML for broken internal links and fragment anchors."""

from __future__ import annotations

import os
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.hrefs: list[str] = []
        self.anchors: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        anchor_id = attributes.get("id")
        if anchor_id:
            self.anchors.add(anchor_id)

        anchor_name = attributes.get("name")
        if tag == "a" and anchor_name:
            self.anchors.add(anchor_name)

        if tag == "a":
            href = attributes.get("href")
            if href:
                self.hrefs.append(href)


def parse_html(path: Path) -> LinkParser:
    parser = LinkParser()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    return parser


def resolve_target(site_root: Path, source: Path, href_path: str) -> Path | None:
    if not href_path:
        return source

    decoded = unquote(href_path)
    if decoded.startswith("/"):
        candidate = site_root / decoded.lstrip("/")
    else:
        candidate = source.parent / decoded

    candidate = Path(os.path.normpath(candidate))
    try:
        candidate.relative_to(site_root)
    except ValueError:
        return None

    candidates: list[Path] = [candidate]
    if candidate.is_dir() or decoded.endswith("/"):
        candidates.insert(0, candidate / "index.html")
    elif candidate.suffix == "":
        candidates.extend([candidate.with_suffix(".html"), candidate / "index.html"])

    for target in candidates:
        if target.is_file():
            return target
    return None


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: check_internal_links.py <site-root>", file=sys.stderr)
        return 2

    site_root = Path(sys.argv[1]).resolve()
    html_files = sorted(site_root.rglob("*.html"))
    parsed = {path: parse_html(path) for path in html_files}
    errors: list[str] = []

    for source, document in parsed.items():
        source_label = source.relative_to(site_root)
        for href in document.hrefs:
            parts = urlsplit(href)

            # External/protocol links are intentionally out of scope; this CI check
            # protects the internal navigation that the repository controls.
            if parts.scheme or parts.netloc or href.startswith("//"):
                continue

            target = resolve_target(site_root, source, parts.path)
            if target is None:
                errors.append(f"{source_label}: broken internal link: {href}")
                continue

            fragment = unquote(parts.fragment)
            if fragment and target.suffix.lower() == ".html":
                target_document = parsed.get(target)
                if target_document is None:
                    target_document = parse_html(target)
                    parsed[target] = target_document
                if fragment not in target_document.anchors:
                    target_label = target.relative_to(site_root)
                    errors.append(
                        f"{source_label}: missing anchor #{fragment} in {target_label} (from {href})"
                    )

    if errors:
        print(f"Found {len(errors)} broken internal link(s):", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Checked {len(html_files)} HTML files: internal links and anchors are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

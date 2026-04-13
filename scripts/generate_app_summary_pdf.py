from pathlib import Path


PAGE_WIDTH = 595
PAGE_HEIGHT = 842
LEFT = 42
RIGHT = 42
TOP = 44
BOTTOM = 40


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def wrap_text(text: str, size: int, max_width: int) -> list[str]:
    avg_char = size * 0.52
    max_chars = max(20, int(max_width / avg_char))
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = word if not current else current + " " + word
        if len(trial) <= max_chars:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def add_text(commands: list[str], x: int, y: int, text: str, size: int = 10, font: str = "F1") -> None:
    commands.append("BT")
    commands.append(f"/{font} {size} Tf")
    commands.append(f"1 0 0 1 {x} {y} Tm")
    commands.append(f"({pdf_escape(text)}) Tj")
    commands.append("ET")


def add_rule(commands: list[str], x1: int, y1: int, x2: int, y2: int, width: float = 0.8) -> None:
    commands.append(f"{width} w")
    commands.append(f"{x1} {y1} m")
    commands.append(f"{x2} {y2} l")
    commands.append("S")


def add_wrapped_block(
    commands: list[str],
    x: int,
    y: int,
    title: str,
    body_lines: list[str],
    width: int,
    title_size: int = 11,
    body_size: int = 9,
    line_gap: int = 12,
) -> int:
    add_text(commands, x, y, title, title_size, "F2")
    y -= 16
    for item in body_lines:
        wrapped = wrap_text(item, body_size, width)
        for line in wrapped:
            add_text(commands, x, y, line, body_size, "F1")
            y -= line_gap
    return y


def add_bullet_block(
    commands: list[str],
    x: int,
    y: int,
    title: str,
    bullets: list[str],
    width: int,
    title_size: int = 11,
    body_size: int = 9,
    line_gap: int = 11,
) -> int:
    add_text(commands, x, y, title, title_size, "F2")
    y -= 16
    bullet_indent = 10
    text_width = width - bullet_indent
    for bullet in bullets:
        wrapped = wrap_text(bullet, body_size, text_width)
        for idx, line in enumerate(wrapped):
            prefix = "- " if idx == 0 else "  "
            add_text(commands, x, y, prefix + line, body_size, "F1")
            y -= line_gap
        y -= 1
    return y


def build_pdf(output_path: Path) -> None:
    commands: list[str] = []

    add_text(commands, LEFT, PAGE_HEIGHT - TOP, "UANL Explora - App Summary", 19, "F2")
    add_text(commands, PAGE_WIDTH - RIGHT - 160, PAGE_HEIGHT - TOP + 2, "Repo-based one-page brief", 9, "F1")
    add_rule(commands, LEFT, PAGE_HEIGHT - TOP - 8, PAGE_WIDTH - RIGHT, PAGE_HEIGHT - TOP - 8, 1.1)

    left_x = LEFT
    right_x = 310
    column_width = 243
    y_left = PAGE_HEIGHT - 86
    y_right = PAGE_HEIGHT - 86

    y_left = add_wrapped_block(
        commands,
        left_x,
        y_left,
        "What It Is",
        [
            "UANL Explora is a campus discovery web app for browsing places at UANL, reading peer reviews, saving favorites, and publishing new places or businesses.",
            "This repo contains a static HTML/CSS/JavaScript frontend with localStorage persistence plus optional calls to a localhost backend.",
        ],
        column_width,
    )
    y_left -= 8
    y_left = add_wrapped_block(
        commands,
        left_x,
        y_left,
        "Who It's For",
        [
            "Primary persona: UANL students and campus visitors who want quick campus recommendations for cafeterias, businesses, bathrooms, and popular spots.",
        ],
        column_width,
    )
    y_left -= 8
    y_left = add_bullet_block(
        commands,
        left_x,
        y_left,
        "What It Does",
        [
            "Shows landing, category, favorites, reviews, and business pages.",
            "Seeds example places and reviews on first load.",
            "Lets signed-in users add favorites and write ratings/reviews.",
            "Lets users suggest new places from a shared modal form.",
            "Lets users publish businesses with schedule/location details.",
            "Computes top-ranked places from rating average plus review count.",
            "Keeps user/session/favorites/place data in browser localStorage.",
        ],
        column_width,
    )

    y_right = add_bullet_block(
        commands,
        right_x,
        y_right,
        "How It Works",
        [
            "UI layer: multiple HTML pages share one stylesheet and one shared script.",
            "Shared client logic in script.js seeds data, renders header/nav/cards, manages auth/session, favorites, reviews, and suggestion flows.",
            "Client data flow: pages call shared helpers -> read/write localStorage keys uanl_lugares, uanl_usuarios, uanl_favoritos, uanl_sesion -> re-render or reload.",
            "Ranking flow: getTop10() scores places from average stars and review count, then landing and populares pages display the highest-ranked entries.",
            "Backend touchpoints from repo evidence only: fetch() calls target http://localhost:3000 for login, registro, lugares, resenas, and negocios.",
            "Backend implementation, API server code, database schema, and deployment config: Not found in repo.",
        ],
        column_width,
    )
    y_right -= 8
    y_right = add_bullet_block(
        commands,
        right_x,
        y_right,
        "How To Run",
        [
            "Open index.html in a browser for the frontend-only experience.",
            "Use registro.html to create/login to a local session.",
            "For API-backed login/business/place upload flows, run the localhost:3000 backend. Backend start commands: Not found in repo.",
            "Optional local asset note: styles.css references img/uanl-bg.jpg, but that image file was not found in this repo snapshot.",
        ],
        column_width,
    )

    footer_y = 56
    add_rule(commands, LEFT, footer_y + 12, PAGE_WIDTH - RIGHT, footer_y + 12, 0.6)
    add_text(
        commands,
        LEFT,
        footer_y,
        "Evidence used: index.html, registro.html, negocios.html, mis-resenas.html, banos.html, cafeterias.html, script.js, styles.css.",
        8,
        "F1",
    )

    content = "\n".join(commands).encode("latin-1", "replace")

    objects: list[bytes] = []
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    objects.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>".encode("ascii"))
    objects.append(f"<< /Length {len(content)} >>\nstream\n".encode("ascii") + content + b"\nendstream")
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for idx, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{idx} 0 obj\n".encode("ascii"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_start = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    pdf.extend(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_start}\n%%EOF\n"
        ).encode("ascii")
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(pdf)


if __name__ == "__main__":
    repo_root = Path(__file__).resolve().parent.parent
    build_pdf(repo_root / "output" / "pdf" / "uanl-explora-app-summary.pdf")

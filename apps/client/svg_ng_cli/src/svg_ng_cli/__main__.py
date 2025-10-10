from pathlib import Path
import sys

from svg_ng_cli.lib.etc import err, gen_template, to_kebab, to_pascal


def mng() -> None:
    if len(sys.argv) < 2:
        err("usage => svg_ng_cli $input.svg $output_dir")

    svg: Path = Path(sys.argv[1])
    output_dir: Path = Path(sys.argv[2])

    prefix: str = svg.stem
    class_name: str = "Svg" + to_pascal(prefix)
    selector: str = "app-" + to_kebab(prefix)

    with open(svg, "r", encoding="utf-8") as f:
        svg_data = f.read()

    Path.mkdir(output_dir, exist_ok=True)
    out_file: Path = output_dir / (to_kebab(prefix) + ".ts")

    if out_file.exists():
        print(f"🧹 delete existing {selector}")
        out_file.unlink()

    with open(out_file, "w", encoding="utf-8") as f:
        out_file.write_text(gen_template(selector, svg_data, class_name))

    print(f"🐍 generated {selector}")


if __name__ == "__main__":
    mng()

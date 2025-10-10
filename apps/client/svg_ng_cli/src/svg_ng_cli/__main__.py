from pathlib import Path
import argparse

from svg_ng_cli.lib.err import err
from svg_ng_cli.lib.etc import gen_template, to_kebab, to_pascal
from svg_ng_cli.lib.svg_type import SvgT


def mng() -> None:
    parser = argparse.ArgumentParser(
        prog="svg_ng_cli",
        description="🐍 convert SVG files into Angular components.",
    )

    parser.add_argument("input", type=Path, help="path to the input SVG file")

    parser.add_argument(
        "output",
        type=Path,
        help="directory where the Angular component will be generated",
    )

    parser.add_argument(
        "type",
        nargs="?",
        choices=["f", "s"],
        default="f",
        help="(optional) Type of SVG: 'f' for filled, 's' for stroke-only [default: f]",
    )

    args = parser.parse_args()

    svg: Path = args.input
    output_dir: Path = args.output
    svg_type: SvgT = SvgT.from_input(args.type)

    prefix = svg.stem
    class_name = ("SvgFill" if svg_type == SvgT.F else "SvgStroke") + to_pascal(prefix)
    selector = "app-" + to_kebab(prefix)

    try:
        svg_data = svg.read_text(encoding="utf-8")
    except FileNotFoundError:
        err(f"❌ file not found {svg}")
        return

    output_dir.mkdir(parents=True, exist_ok=True)
    out_file = output_dir / f"{to_kebab(prefix)}.ts"

    if out_file.exists():
        print(f"🧹 deleting existing {selector}")
        out_file.unlink()

    out_file.write_text(
        gen_template(selector, svg_data, class_name, svg_type), encoding="utf-8"
    )

    print(f"🛠️ generated component {selector}")


if __name__ == "__main__":
    mng()

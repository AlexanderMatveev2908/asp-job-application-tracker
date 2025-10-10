import sys
import re


def to_kebab(arg: str) -> str:
    return arg.replace("_", "-")


def to_pascal(arg: str) -> str:
    return arg.replace("-", " ").replace("_", " ").title().replace(" ", "")


def err(msg: str) -> None:
    print(f"❌ {msg}")
    sys.exit(1)


def patch_svg_attributes(svg: str) -> str:
    svg = re.sub(r'<\?xml[^>]*\?>', '', svg).strip()
    svg = re.sub(r'<!--.*?-->', '', svg, flags=re.DOTALL)

    def replacer(arg: re.Match) -> str:
        tag = arg.group(0)
        tag = re.sub(r'\bwidth="[^"]*"', r'[attr.width]="width()"', tag)
        tag = re.sub(r'\bheight="[^"]*"', r'[attr.height]="height()"', tag)
        tag = re.sub(r'\bfill="[^"]*"', r'[attr.fill]="fill()"', tag)
        tag = re.sub(r'\bstroke="[^"]*"', r'[attr.stroke]="stroke()"', tag)
        return tag

    svg = re.sub(r"<svg\b[^>]*>", replacer, svg, count=1)

    svg = re.sub(r'\bfill="[^"]*"', '[attr.fill]="fill()"', svg)
    svg = re.sub(r'\bstroke="[^"]*"', '[attr.stroke]="stroke()"', svg)

    return svg


def gen_template(selector: str, svg_data: str, class_name: str) -> str:
    return f"""
import {{ Component, input }} from '@angular/core';

@Component({{
  selector: '{selector}',
  template: `{patch_svg_attributes(svg_data)}`,
}})
export class {class_name} {{
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    fill = input<string>('currentColor');
    stroke = input<string | null>(null);
}}
  """

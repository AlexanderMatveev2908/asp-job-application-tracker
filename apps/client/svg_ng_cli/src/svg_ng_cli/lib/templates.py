import sys
import re

from svg_ng_cli.lib.svg_type import SvgT


def patch_svg_attributes(svg: str, svg_type: SvgT) -> str:
    svg = re.sub(r"<\?xml[^>]*\?>", "", svg).strip()
    svg = re.sub(r"<!--.*?-->", "", svg, flags=re.DOTALL)

    def replacer(arg: re.Match) -> str:
        tag = arg.group(0)
        tag = re.sub(r'\bwidth="[^"]*"', r'[attr.width]="width()"', tag)
        tag = re.sub(r'\bheight="[^"]*"', r'[attr.height]="height()"', tag)
        if svg_type != SvgT.A:
            tag = re.sub(r'\bfill="[^"]*"', r'[attr.fill]="fill()"', tag)
            tag = re.sub(r'\bstroke="[^"]*"', r'[attr.stroke]="stroke()"', tag)
        return tag

    svg = re.sub(r"<svg\b[^>]*>", replacer, svg, count=1)

    if svg_type != SvgT.A:
        svg = re.sub(r'\bfill="[^"]*"', '[attr.fill]="fill()"', svg)
        svg = re.sub(r'\bstroke="[^"]*"', '[attr.stroke]="stroke()"', svg)

    return svg


CURR_COLOR_TEMPLATE: str = "input<string>('currentColor')"
NULL_COLOR_TEMPLATE: str = "input<string | null>(null)"


def get_clr(curr_t: SvgT, input_t: SvgT) -> str:
    return CURR_COLOR_TEMPLATE if curr_t == input_t else NULL_COLOR_TEMPLATE


def needs_colors(svg_type) -> str:
    return (
        f"""
    fill = {get_clr(SvgT.F,svg_type) };
    stroke = {get_clr(SvgT.S,svg_type)};
    """
        if svg_type != SvgT.A
        else ""
    )


def gen_template_html(svg_data: str, svg_type: SvgT) -> str:
    return patch_svg_attributes(svg_data, svg_type)


def gen_template_ts(kebab_name: str, class_name: str, svg_type: SvgT) -> str:
    selector = "app-" + kebab_name

    return f"""
import {{ Component, input }} from '@angular/core';

@Component({{
  selector: '{selector}',
  templateUrl: `./{kebab_name}.html`,
}})
export class {class_name} {{
    width = input<'auto' | string>('100%');
    height = input<'auto' | string>('100%');
    {needs_colors(svg_type)}
}}
  """

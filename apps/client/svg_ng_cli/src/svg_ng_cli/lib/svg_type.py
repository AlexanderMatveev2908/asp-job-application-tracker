from enum import Enum

from svg_ng_cli.lib.err import err


class SvgT(Enum):
    F = "f"
    S = "s"

    @classmethod
    def from_input(cls, t: str) -> "SvgT":
        try:
            return cls(t.lower().strip())
        except ValueError:
            err("invalid type. Use 'f' for filled or 's' for stroke.")

from enum import Enum

from svg_ng_cli.lib.err_mng import err


class SvgT(Enum):
    F = "f"
    S = "s"
    A = "a"

    @classmethod
    def from_input(cls, t: str) -> "SvgT":
        try:
            return cls(t.lower().strip())
        except ValueError:
            err(
                "invalid type. Use 'f' for filled, 's' for stroke or 'a' for advanced pre-styed."
            )

from pathlib import Path
from re import Match, Pattern
import re
from sync_env_cli.lib.env_modes import EnvMode


def patch_env(
    existing: list[str], mode_to: EnvMode, exclude: list[str] | None = None
) -> list[str]:
    updated: list[str] = []

    for p in existing:
        trimmed: str = p.strip()
        if len(trimmed) and not trimmed.startswith("#"):
            pair: list[str] = trimmed.split("=", 2)
            if len(pair) != 2:
                continue

            key, val = pair
            if key == "ENV_MODE":
                updated.append(f"ENV_MODE={mode_to.long_value()}")
            else:
                if key in (exclude or []):
                    continue
                updated.append(f"{key}={val}")

    updated.append("\n")

    return updated


def patch_git(git_pipeline: Path, new_env: list[str]) -> None:
    content: str = git_pipeline.read_text()

    pattern: Pattern = re.compile(r"(env:\s*?)(.*?)(?=\n\s*steps:)", re.DOTALL)

    new_block: str = (" " * 4 + "\n").join(new_env)
    new_content: str = pattern.sub(rf"\1{new_block}\n", content)

    git_pipeline.write_text(new_content)

from sync_env_cli.lib.env_modes import EnvMode


def patch_env(existing: list[str], mode_to: EnvMode) -> list[str]:
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
                updated.append(f"{key}={val}")

    updated.append("\n")

    return updated

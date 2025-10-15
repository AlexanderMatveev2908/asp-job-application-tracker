from dataclasses import dataclass
from pathlib import Path

from sync_env_cli.lib.errors import err


@dataclass
class CtxPaths:
    root_env: Path
    client_env: Path
    server_env: Path
    git_pipeline: Path
    kind_secrets: Path


def ensure_repo_shape(cwd: Path) -> CtxPaths:
    client: Path = (cwd / "../apps/client").resolve()
    server: Path = (cwd / "../apps/server").resolve()
    # ? update based on your needs
    git_pipeline: Path = (cwd / "../.github/workflows/check_deploy.yml").resolve()
    kind_secrets: Path = (cwd / "../kind-secrets.yml").resolve()
    root_env: Path = (cwd / "../.env").resolve()

    if not root_env.is_file():
        err("root env file not present")
    if not client.is_dir():
        err("client dir not present")
    if not server.is_dir():
        err("server dir not present")
    if not git_pipeline.is_file():
        err("git CI/CD pipeline file not present")
    if not kind_secrets.is_file():
        err("kind secrets file not present")

    client_env: Path = client / ".env"
    client_env.touch(exist_ok=True)
    server_env: Path = server / ".env"
    server_env.touch(exist_ok=True)

    return CtxPaths(root_env, client_env, server_env, git_pipeline, kind_secrets)


def get_existing_vars(root_env: Path) -> list[str]:
    content: str = root_env.read_text()
    arr: list[str] = content.split("\n")

    return arr

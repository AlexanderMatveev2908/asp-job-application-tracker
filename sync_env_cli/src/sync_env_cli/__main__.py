from pathlib import Path

from sync_env_cli.lib.env_modes import EnvMode
from sync_env_cli.lib.repo_files import CtxPaths, ensure_repo_shape, get_existing_vars
from sync_env_cli.lib.args_input import setup_parser
from sync_env_cli.lib.update_env import patch_env


def main() -> None:
    cwd: Path = Path.cwd()
    ctx: CtxPaths = ensure_repo_shape(cwd)

    mode: EnvMode = setup_parser()
    arr = get_existing_vars(ctx.root_env)

    env_dev_work: list[str] = patch_env(arr, mode)
    env_kind_secrets: list[str] = patch_env(arr, EnvMode.K, exclude=["LINUX_PWD"])
    env_git_pipeline: list[str] = patch_env(arr, EnvMode.T, exclude=["LINUX_PWD"])

    base_flow_sync = [ctx.root_env, ctx.client_env, ctx.server_env]
    for f in base_flow_sync:
        f.write_text("\n".join(env_dev_work))


if __name__ == "__main__":
    main()

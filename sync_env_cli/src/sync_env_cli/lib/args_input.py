from argparse import ArgumentParser, Namespace

from sync_env_cli.lib.env_modes import EnvMode


def setup_parser() -> EnvMode:
    parser = ArgumentParser(description="🔐 sync env across monorepo")

    parser.add_argument(
        "mode",
        choices=[
            "d",
            "t",
            "k",
            "p",
        ],
        help="ENV mode (short form => d | t | k | p)",
    )

    args: Namespace = parser.parse_args()

    mode: EnvMode = EnvMode.from_input(args.mode)

    return mode

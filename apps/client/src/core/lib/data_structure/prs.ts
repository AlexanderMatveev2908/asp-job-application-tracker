export class Prs {
  public static devDate(date: Date | string | number): string {
    {
      const param =
        date instanceof Date ? date : /^\d{10,}n?$/.test(date + '') ? +date : new Date(date);

      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',

        hour12: true,
      }).format(param);
    }
  }

  public static strToBool(arg: string): boolean {
    const map = {
      true: true,
      false: false,
    };

    return map[arg as keyof typeof map];
  }

  public static minutesToMs(minutes: number): number {
    // eslint-disable-next-line no-magic-numbers
    return minutes * 60 * 1000;
  }

  public static txtOfCamelCase(arg: string, { titleCase }: { titleCase: boolean }): string {
    const splitted: string[] = arg.replace(/([A-Z])/g, ' $1').split(' ');
    const formatted: string[] = splitted.map((str: string) =>
      titleCase
        ? (str.at(0) ?? 'bug_split_word').toUpperCase() + str.slice(1).toLowerCase()
        : str.toLowerCase()
    );

    return formatted.join(' ');
  }

  public static toSnake(arg: string): string {
    const replaced: string = arg
      .replace(/\s+/g, '')
      .replace(/\//g, '_')
      .replace(/(?<!^)([A-Z])/g, '_$1')
      .replace(/_{3,}/g, '__');

    return replaced.toLowerCase();
  }
}

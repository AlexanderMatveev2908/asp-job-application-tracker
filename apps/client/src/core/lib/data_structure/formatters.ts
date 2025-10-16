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
}

export class Reg {
  private static readonly EMOJI: RegExp =
    /(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji})/u;

  public static isEmoji(arg: string): boolean {
    return this.EMOJI.test(arg);
  }
}
